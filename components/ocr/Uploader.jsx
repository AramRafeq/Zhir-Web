/* eslint-disable react/jsx-props-no-spreading */
// https://www.npmjs.com/package/react-grid-drag use for draging from a grid
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactDragListView from 'react-drag-listview/lib/index';
import prettyBytes from 'pretty-bytes';
import _ from 'lodash';
import superagent from 'superagent';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  Spin, List,
  notification, Avatar,
  Popconfirm,
  Button,
  Form,
  Input,
  Checkbox,
  Row,
  Col,
  Image,
} from 'antd';

import {
  LoadingOutlined, ClearOutlined, CloudUploadOutlined,
  BorderlessTableOutlined,
  DragOutlined,
  UnorderedListOutlined,
  TableOutlined,
} from '@ant-design/icons';
import {
  AiOutlineCloudUpload,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

import ImageEditor from './ImageEditor';
import PDFConvertor from './PDFConvertor';

const swapArrayLoc = (arr, from, to) => {
  const temp = arr[to];
  // eslint-disable-next-line no-param-reassign
  arr[to] = arr[from];
  // eslint-disable-next-line no-param-reassign
  arr[from] = temp;
};

// Global Variables
const maxFiles = 50;
const maxFileSize = 1.2e+7; // 12mb
const acceptedFileTypes = [
  'image/jpg',
  'image/jpeg',
  'image/jfif',
  'image/webp',
  'image/bmp',
  'image/tiff',
  'image/tif',
  'image/png',
  'application/pdf',
];

const mapErrCodeToMsg = (code) => {
  // alert(code);
  switch (code) {
    case 'file-too-large': return (
      <>
        قەبارەی فایل گەورەترە لە
        &nbsp;
        <span className="is-ltr">
          {prettyBytes(maxFileSize)}
        </span>
      </>
    );
    case 'file-invalid-type': return 'جۆری فایل ڕێگەپێدراو نیە';
    default: return 'هەڵەیەکی نەزانراو';
  }
};

export default function Uploader(props) {
  const { onUserDone, onUploadDone, user } = props;
  const [uploaderLoading, setuploaderLoading] = useState(false);
  const [viewingMode, setViewingMode] = useState('grid'); // possible values grid,list
  const [fileList, setFileList] = useState([]);
  const [PDFfiles, setPDFfiles] = useState([]);
  const [convertedPDFfiles, setConvertedPDFfiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const initialFormValues = {
    lang: ['ckb'],
  };
  const toggleViewingMode = () => {
    const newMode = viewingMode === 'grid' ? 'list' : 'grid';
    setViewingMode(newMode);
  };
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const sendOcrJob = async (values, files) => {
    setuploaderLoading(true);
    const bodyFilePromises = files.map(async (f, index) => {
      const base64 = await fileToBase64(f);
      const ff = {
        index,
        name: f.name,
        type: f.type,
        extention: path.extname(f.name).substr(1),
        base64,
      };
      return ff;
    });
    const bodyFiles = await Promise.all(bodyFilePromises);
    const body = {
      job_id: uuidv4(),
      group_name: values.group_name !== undefined ? values.group_name : '',
      lang: (values.lang).join(','),
      files: bodyFiles,
    };

    superagent.post(`${process.env.NEXT_PUBLIC_API_URL}/job`)
      .set('authorization', `Bearer ${user.token}`)
      .send(body)
      .end((err, res) => {
        if (!err) {
          try {
            onUploadDone(res, values, files);
          } catch (e) {
            // handle on DoUpload
          }
        } else {
          notification.error({
            message: 'هەڵەیەک رویدا',
            description: 'هەڵەیەک رویدا لەکاتی ناردنی وێنەکان بۆ ڕاژە',
            placement: 'bottomRight',
          });
        }
        setuploaderLoading(false);
        setFileList([]);
        setConvertedPDFfiles([]);
        setEditingFile(null);
        notification.success({
          message: 'نێردرا',
          description: 'وێنەکان بە سەرکەوتووی نێردران بۆ ژیر',
          placement: 'bottomRight',
        });
      });
  };
  const onDropAccepted = (acceptedFiles) => {
    const filteredPDFfiles = acceptedFiles.filter((f) => f.type === 'application/pdf');
    const otherFiles = acceptedFiles.filter((f) => f.type !== 'application/pdf');
    const uniqFiles = _.uniqBy([...otherFiles, ...fileList], 'name');
    if (uniqFiles.length <= maxFiles) {
      uniqFiles.map((f) => {
        // eslint-disable-next-line no-param-reassign
        f.blob = URL.createObjectURL(f);
        return f;
      });
      setFileList(uniqFiles);
    } else {
      notification.warn({
        message: 'هەڵە ڕویدا',
        description: `بەهۆی ئەوەی ژمارەی پەڕەکان زیاترە لە ${maxFiles} وێنە`,
        placement: 'bottomRight',
      });
    }

    if (filteredPDFfiles.length > 0) {
      const filteredPDFfiles2 = filteredPDFfiles
        .filter((f) => convertedPDFfiles.indexOf(f.name) < 0);
      if (filteredPDFfiles2.length !== filteredPDFfiles.length) {
        notification.error({
          message: 'فایلی PDF دوبارە دۆزرایەوە',
          description: 'هەندێک فایلی دووبارە دۆزرانەوە کە پێشووتر کراون بە وێنە',
          placement: 'bottomRight',
        });
      } else {
        notification.warn({
          message: 'فایلی PDF دۆزرایەوە',
          description: 'تکایە چاوەڕوان بکە تاوەکو ژیر فایلکەت دەگۆڕێت بۆ وێنە',
          placement: 'bottomRight',
          icon: <LoadingOutlined spin />,
        });
      }
      if (filteredPDFfiles2.length > 1) {
        notification.error({
          message: 'زیاتر لە یەک فایلی PDF ت هەڵبژاردووە',
          description: 'ژیر لەتوانایداهەیە یەک فایلی PDF بگۆرێت لە یەک کاتدا تکایە دوای تەواوبوونی ئەم کردارە دووبارە هەوڵبدەرەوە',
          placement: 'bottomRight',
        });
        setPDFfiles([filteredPDFfiles2[0]]);
      } else {
        setPDFfiles(filteredPDFfiles2);
      }
    }
    // use bellow url for generating blob url for an image
    // URL.createObjectURL(file)
  };
  const onDropRejected = (rejectedFiles) => {
    rejectedFiles.forEach((o) => {
      notification.error({
        message: `نەتواندرا فایلی  ${o.file.name} زیاد بکرێت لەبەر ئەم هۆکارانە`,
        description: (
          <ul>
            {o.errors.map((err) => <li>{mapErrCodeToMsg(err.code)}</li>)}
          </ul>
        ),
        placement: 'bottomRight',
      });
    });
  };
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: acceptedFileTypes.join(','),
    maxFiles,
    disabled: uploaderLoading,
    maxSize: maxFileSize,
    onDropAccepted,
    onDropRejected,
  });
  const onDragEnd = (fromIndex, toIndex) => {
    if (toIndex < 0) return; // Ignores if outside designated area
    const fileListCopy = _.clone(fileList);
    swapArrayLoc(fileListCopy, fromIndex - 1, toIndex - 1);
    fileListCopy.map((f) => {
      // eslint-disable-next-line no-param-reassign
      f.blob = URL.createObjectURL(f);
      return f;
    });
    setFileList(fileListCopy);
  };
  const deleteConfirmed = (file) => {
    const fileListCopy = _.clone(fileList);
    _.remove(fileListCopy, (f) => f.name === file.name);

    setFileList(fileListCopy);
    setEditingFile(null);
    if (fileListCopy.length === 0) setConvertedPDFfiles([]);
  };
  const clearAll = () => {
    setFileList([]);
    setEditingFile(null);
    setConvertedPDFfiles([]);
  };
  const imageEditBtnClicked = (file, index) => {
    // eslint-disable-next-line no-param-reassign
    file.index = index;
    setEditingFile(file);
  };
  const onImageEditorClose = () => {
    setEditingFile(null);
  };
  const imageEditingFinished = (editedFile, originalFile) => {
    setEditingFile(null);
    const fileListCopy = _.clone(fileList);
    // eslint-disable-next-line no-param-reassign
    editedFile.blob = URL.createObjectURL(editedFile);
    fileListCopy[originalFile.index] = editedFile;
    setFileList(fileListCopy);
  };
  const onPDFConvertFinish = (images, originalFile) => {
    setConvertedPDFfiles([...convertedPDFfiles, originalFile.name]);
    const PDFFilesCopy = PDFfiles.filter((f) => f.name !== originalFile.name);
    setPDFfiles(PDFFilesCopy);
    const newFileList = [...images, ...fileList];
    if (newFileList.length <= maxFiles) {
      newFileList.map((f) => {
        // eslint-disable-next-line no-param-reassign
        f.blob = URL.createObjectURL(f);
        return f;
      });
      setFileList(newFileList);
    } else {
      notification.warn({
        message: 'نەتوانرا پەڕەکانی PDF بارکرێن',
        description: `بەهۆی ئەوەی زیادکردنی پەڕەکان زیاترە لە ${maxFiles} وێنە`,
        placement: 'bottomRight',
      });
    }
    setuploaderLoading(false);
  };
  const onPDFConvertStart = () => {
    setuploaderLoading(true);
  };
  const onFormFinish = (values) => {
    try {
      sendOcrJob(values, fileList);
    } catch (e) {
      // handle on DoUpload
    }
    try {
      onUserDone(values, fileList);
    } catch (e) {
      // handle on DoUpload
    }
  };

  const SortableItem = (itemProps) => {
    const { id, file, index } = itemProps;
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      padding: 5,
    };
    // const blobUrl = URL.createObjectURL(file);

    return (
      <Col
        lg={4}
        md={12}
        xs={24}
        sm={24}
        ref={setNodeRef}
        style={style}
      >
        <div
          style={{
            border: '1px solid #e3e3e3',
            borderRadius: 2,
            paddingBottom: 5,
          }}
        >

          <Image width="100%" src={file.blob} />
          <p style={{ fontSize: 10, textAlign: 'center' }}>{file.name}</p>
          <Button.Group style={{ width: '100%' }}>
            <Button block type="link" onClose={onImageEditorClose} onClick={() => imageEditBtnClicked(file, index)} size="small"><AiOutlineEdit className="is-dark-grey-text" /></Button>

            <Popconfirm
              title="ئایا دڵنیای لە سڕینەوەی ئەم وێنەیە ؟"
              onConfirm={() => deleteConfirmed(file)}
              okText="بەڵێ"
              cancelText="نەخێر"
            >
              <Button block type="link" size="small"><AiOutlineDelete className="is-danger-text" /></Button>
            </Popconfirm>
            <Button
              {...attributes}
              {...listeners}
              block
              type="link"
              size="small"
            >
              <DragOutlined className="is-dark-grey-text" />
            </Button>
          </Button.Group>

        </div>
      </Col>
    );
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleGridDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setFileList((items) => {
        const oldIndex = items.findIndex(({ name }) => name === active.id);
        const newIndex = items.findIndex(({ name }) => name === over.id);
        const fileListCopy = _.clone(items);
        swapArrayLoc(fileListCopy, oldIndex, newIndex);
        return fileListCopy;
      });
    }
  };

  return (
    <>
      <ImageEditor file={editingFile} onFinish={imageEditingFinished} />

      <Row gutter={[30, 10]}>
        <Col className="uploader-options-panel" lg={{ span: 6 }} md={{ span: 24, order: 2 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }} style={{ position: 'fixed' }}>
          <Form className="custom-box-shadow" style={{ width: '100%', padding: 12, borderRadius: 3 }} layout="vertical" initialValues={initialFormValues} onFinish={onFormFinish}>
            <Row gutter={[10, 10]} align="middle">
              <Col span={24}>
                <Form.Item name="group_name" label="ناوێ بۆ کرداری ناسینەوە">
                  <Input prefix={<BorderlessTableOutlined />} style={{ width: '100%' }} placeholder="نموونە: دیوانی مەحوی ١-١٠٠" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="lang" label="وێنەی بارکراو بە چەند زمان نووسراوە؟">
                  <Checkbox.Group>
                    <Row gutter={[10, 0]}>
                      <Col span={24}>
                        <Checkbox value="ckb" style={{ lineHeight: '32px' }}>
                          کوردی
                        </Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="ara" style={{ lineHeight: '32px' }}>
                          عربی
                        </Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="pr" style={{ lineHeight: '32px' }}>
                          فارسی
                        </Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="eng" style={{ lineHeight: '32px' }}>
                          ئینگلیزی
                        </Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="fra" style={{ lineHeight: '32px' }}>
                          فەڕەنسی
                        </Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col lg={16} md={24} sm={24} xs={24}>
                <Button size="middle" htmlType="submit" block loading={uploaderLoading} disabled={fileList.length === 0} type="primary" icon={<CloudUploadOutlined />}>
                  {fileList.length}
                  &nbsp;
                  وێنە باربکە و بینێرە بۆ ژیر
                </Button>
              </Col>
              <Col lg={4} md={24} sm={24} xs={24}>
                <Popconfirm
                  title="ئایا دڵنیای لە سڕینەوەی هەموو فایلەکان ؟"
                  onConfirm={clearAll}
                  okText="بەڵێ"
                  cancelText="نەخێر"
                  disabled={fileList.length === 0}
                >
                  <Button block htmlType="button" type="primary" disabled={(fileList.length === 0 || uploaderLoading)} danger icon={<ClearOutlined />} />
                </Popconfirm>
              </Col>
              <Col lg={4} md={24} sm={24} xs={24}>
                <Button block htmlType="button" onClick={toggleViewingMode} type="dashed" disabled={(fileList.length === 0 || uploaderLoading)} icon={viewingMode === 'grid' ? <UnorderedListOutlined /> : <TableOutlined />} />
              </Col>
            </Row>
          </Form>
        </Col>
        <Col lg={{ span: 18, offset: 6 }} ms={12} sm={24} xs={24}>
          <ReactDragListView
            nodeSelector=".draggble"
            onDragEnd={onDragEnd}
          >
            <List className="custom-box-shadow" style={{ padding: 12, borderRadius: 3 }}>
              <List.Item>
                <Row justify="center" style={{ width: '100%' }}>
                  <Col span={24} style={{ textAlign: 'center' }}>
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>وێنە یاخود PDF رابكیشە سەر ئەم بەشە بۆ بارکردن</p>
                      {uploaderLoading
                        ? <Spin size="large" className="upload-container-spin" indicator={<LoadingOutlined />} />
                        : <AiOutlineCloudUpload className="is-primary-text" style={{ fontSize: '3rem' }} />}
                      <p style={{ fontSize: 10 }} className="is-primary-text">
                        {(maxFiles - fileList.length) <= 0 ? 'گەشیتیت بە سنوری بارکردن بۆ یەک کرداری ناسینەوە '
                          : (
                            <>
                              <span>
                                توانای باردکردنی
                                <b>
                              &nbsp;
                                  {maxFiles - fileList.length}
                              &nbsp;
                                </b>
                                فایلی دیکەت هەیە
                              </span>
                            </>
                          )}
                      </p>
                    </div>
                    {PDFfiles.map((f, index) => {
                    // eslint-disable-next-line no-param-reassign
                      f.index = index;
                      if (convertedPDFfiles.indexOf(f.name) < 0) {
                        return (
                          <PDFConvertor
                            key={f.name}
                            onStart={onPDFConvertStart}
                            onFinish={onPDFConvertFinish}
                            file={f}
                          />
                        );
                      }
                      return null;
                    })}
                  </Col>
                </Row>
              </List.Item>
              {
                viewingMode === 'grid' ? (
                  <List.Item>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleGridDragEnd}
                    >
                      <SortableContext
                        items={fileList.map(({ name }) => name)}
                        strategy={rectSortingStrategy}
                      >
                        <Row gutter={[0, 0]} title="لیستی وێنەکان" hoverable={false}>
                          {fileList.map((file, index) => (
                            <SortableItem
                              key={file.name}
                              id={file.name}
                              file={file}
                              index={index}
                            />
                          ))}
                        </Row>
                      </SortableContext>
                    </DndContext>
                  </List.Item>
                ) : (
                  <>
                    {fileList.map((file, index) => {
                      const blobUrl = URL.createObjectURL(file);
                      return (
                        <List.Item
                          key={file.name}
                          className="draggble"
                          actions={[
                            <Button type="link" onClick={() => imageEditBtnClicked(file, index)} size="small"><AiOutlineEdit className="is-dark-grey-text" /></Button>,
                            <Popconfirm
                              title="ئایا دڵنیای لە سڕینەوەی ئەم وێنەیە ؟"
                              onConfirm={() => deleteConfirmed(file)}
                              okText="بەڵێ"
                              cancelText="نەخێر"
                            >
                              <Button type="link" size="small"><AiOutlineDelete className="is-danger-text" /></Button>
                            </Popconfirm>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={blobUrl} size="large" />}
                            title={<a href={blobUrl} target="_blank" rel="noreferrer">{file.name}</a>}
                          />
                        </List.Item>
                      );
                    })}
                  </>
                )

              }
            </List>
          </ReactDragListView>
        </Col>
      </Row>
    </>
  );
}
