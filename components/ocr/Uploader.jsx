/* eslint-disable react/jsx-props-no-spreading */
// https://www.npmjs.com/package/react-grid-drag use for draging from a grid
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactDragListView from 'react-drag-listview/lib/index';
import prettyBytes from 'pretty-bytes';
import _ from 'lodash';

import {
  Spin, List,
  notification, Avatar,
  Popconfirm,
  Button,
  Tag,
  Form,
  Input,
  Checkbox,
  Row, Col,
  Card,
  Image,
} from 'antd';

import {
  LoadingOutlined, ClearOutlined, CloudUploadOutlined,
  BorderlessTableOutlined,
  DragOutlined,
} from '@ant-design/icons';
import {
  AiOutlineCloudUpload,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

import {
  SortableContainer,
  SortableElement,
  SortableHandle,

} from 'react-sortable-hoc';
import arrayMove from 'array-move';
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
const maxFiles = 30;
const maxFileSize = 7e+6; // 7mb
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
  const { onUserDone } = props;
  const [uploaderLoading, setuploaderLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [PDFfiles, setPDFfiles] = useState([]);
  const [convertedPDFfiles, setConvertedPDFfiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);

  const onDropAccepted = (acceptedFiles) => {
    const filteredPDFfiles = acceptedFiles.filter((f) => f.type === 'application/pdf');
    const otherFiles = acceptedFiles.filter((f) => f.type !== 'application/pdf');
    const uniqFiles = _.uniqBy([...otherFiles, ...fileList], 'name');
    if (uniqFiles.length <= maxFiles) {
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
  const imageEditingFinished = (editedFile, originalFile) => {
    setEditingFile(null);
    const fileListCopy = _.clone(fileList);
    fileListCopy[originalFile.index] = editedFile;
    setFileList(fileListCopy);
  };
  const onPDFConvertFinish = (images, originalFile) => {
    setConvertedPDFfiles([...convertedPDFfiles, originalFile.name]);
    const PDFFilesCopy = PDFfiles.filter((f) => f.name !== originalFile.name);
    setPDFfiles(PDFFilesCopy);
    const newFileList = [...images, ...fileList];
    if (newFileList.length <= maxFiles) {
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
      onUserDone(values, fileList);
    } catch (e) {
      // handle on DoUpload
    }
  };
  const onGridSortEnd = ({ oldIndex, newIndex }) => {
    const fileListCopy = _.clone(fileList);
    swapArrayLoc(fileListCopy, oldIndex, newIndex);
    setFileList(fileListCopy);
  };
  const initialFormValues = {
    lang: ['ku'],
  };
  const cardStyleGrid = {
    width: '25%',
    height: 200,
    padding: 10,
    'z-index': '1001',
  };
  const Handle = SortableHandle(({ tabIndex }) => (
    <Button block type="link" size="small" tabIndex={tabIndex}>
      <DragOutlined className="is-dark-grey-text" />
    </Button>
  ));
  const SortableItem = SortableElement((elementProps) => {
    const { file, index } = elementProps;
    const blobUrl = URL.createObjectURL(file);
    return (
      <Card.Grid style={cardStyleGrid} hoverable={false}>
        <Image height={100} width="100%" src={blobUrl} />
        <p>{file.name}</p>
        <Button.Group style={{ width: '100%' }}>
          <Button block type="link" onClick={() => imageEditBtnClicked(file, index)} size="small"><AiOutlineEdit className="is-dark-grey-text" /></Button>
          <Popconfirm
            title="ئایا دڵنیای لە سڕینەوەی ئەم وێنەیە ؟"
            onConfirm={() => deleteConfirmed(file)}
            okText="بەڵێ"
            cancelText="نەخێر"
          >
            <Button block type="link" size="small"><AiOutlineDelete className="is-danger-text" /></Button>
          </Popconfirm>
          <Handle />
        </Button.Group>
      </Card.Grid>
    );
  });

  const SortableList = SortableContainer((containerPops) => {
    const { files, ...restProps } = containerPops;
    return (
      <Card gutter={[10, 10]} hoverable={false}>
        {files.map((file, index) => (
          <SortableItem
            key={`item-${file.name}`}
            index={index}
            file={file}
            {...restProps}
          />
        ))}
      </Card>
    );
  });

  return (
    <>
      <ImageEditor file={editingFile} onFinish={imageEditingFinished} />

      <Row gutter={[30, 10]}>
        <Col span={8} style={{ position: 'fixed' }}>
          <Form className="custom-box-shadow" style={{ width: '100%', padding: 12, borderRadius: 3 }} layout="vertical" initialValues={initialFormValues} onFinish={onFormFinish}>
            <Row gutter={[10, 0]} align="middle">
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
                        <Checkbox value="ku" style={{ lineHeight: '32px' }}>
                          کوردی
                        </Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="ar" style={{ lineHeight: '32px' }}>
                          عربی
                        </Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="pr" style={{ lineHeight: '32px' }}>
                          فارسی
                        </Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="en" style={{ lineHeight: '32px' }}>
                          ئینگلیزی
                        </Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="fr" style={{ lineHeight: '32px' }}>
                          فەڕەنسی
                        </Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col span={20}>
                <Button size="middle" htmlType="submit" block loading={uploaderLoading} disabled={fileList.length === 0} type="primary" icon={<CloudUploadOutlined />}>
                  {fileList.length}
                  &nbsp;
                  وێنە باربکە و بینێرە بۆ ژیر
                </Button>
              </Col>
              <Col span={4}>
                <Popconfirm
                  title="ئایا دڵنیای لە سڕینەوەی هەموو فایلەکان ؟"
                  onConfirm={clearAll}
                  okText="بەڵێ"
                  cancelText="نەخێر"
                  disabled={fileList.length === 0}
                >
                  <Button block htmlType="button" type="primary" disabled={fileList.length === 0} danger icon={<ClearOutlined />} />
                </Popconfirm>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={16} offset={8}>
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
                        : <AiOutlineCloudUpload style={{ fontSize: '4.5rem', color: '#d9aeed' }} />}
                      <p style={{ fontSize: 10, color: '#d9aeed' }}>
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
              {/* {fileList.map((file, index) => {
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
              })} */}
            </List>
          </ReactDragListView>
          <SortableList
            shouldUseDragHandle
            useDragHandle
            axis="xy"
            files={fileList}
            onSortEnd={onGridSortEnd}
          />
          {/* <Card title="لیستی وێنەکان" hoverable={false}>
            {fileList.map((file, index) => {
              const blobUrl = URL.createObjectURL(file);
              return (
                <Card.Grid style={cardStyleGrid}>
                  <Image width="100%" src={blobUrl} />
                  <Button.Group style={{ width: '100%' }}>
                    <Button block type="link" onClick={() => imageEditBtnClicked(file, index)} size="small"><AiOutlineEdit className="is-dark-grey-text" /></Button>
                    <Popconfirm
                      title="ئایا دڵنیای لە سڕینەوەی ئەم وێنەیە ؟"
                      onConfirm={() => deleteConfirmed(file)}
                      okText="بەڵێ"
                      cancelText="نەخێر"
                    >
                      <Button block type="link" size="small"><AiOutlineDelete className="is-danger-text" /></Button>
                    </Popconfirm>
                  </Button.Group>
                </Card.Grid>
              );
            })}
          </Card> */}

        </Col>
      </Row>
    </>
  );
}
