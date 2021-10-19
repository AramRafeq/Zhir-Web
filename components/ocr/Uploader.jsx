/* eslint-disable react/jsx-props-no-spreading */
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
} from 'antd';

import {
  LoadingOutlined, ClearOutlined, CloudUploadOutlined,
} from '@ant-design/icons';
import {
  AiOutlineCloudUpload,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';
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
const maxFiles = 12;
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

export default function Uploader() {
  const [uploaderLoading, setuploaderLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [PDFfiles, setPDFfiles] = useState([]);
  const [convertedPDFfiles, setConvertedPDFfiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);

  const onDropAccepted = (acceptedFiles) => {
    const filteredPDFfiles = acceptedFiles.filter((f) => f.type === 'application/pdf');
    const otherFiles = acceptedFiles.filter((f) => f.type !== 'application/pdf');
    const uniqFiles = _.uniqBy([...otherFiles, ...fileList], 'name');
    setFileList(uniqFiles);
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
    setFileList([...images, ...fileList]);
    setuploaderLoading(false);
  };
  const onPDFConvertStart = () => {
    setuploaderLoading(true);
  };
  return (
    <>
      <ImageEditor file={editingFile} onFinish={imageEditingFinished} />
      {/* <Button onClick={imageEditBtnClicked}>Edit Image</Button> */}
      <section className={`upload-container-base ${uploaderLoading ? 'upload-container-disabled' : 'upload-container-active'}`}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>کرتە لێرە بکە یاخود هەندێک فایل رابکێشە سەر ئەم بەشە</p>
          {uploaderLoading
            ? <Spin size="large" className="upload-container-spin" indicator={<LoadingOutlined />} />
            : <AiOutlineCloudUpload style={{ fontSize: '4rem', color: '#d9aeed' }} />}
          <p>(تەنها: وێنەو و فایلی PDF ڕێگەپێدراون)</p>
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
        <ReactDragListView
          nodeSelector=".draggble"
          onDragEnd={onDragEnd}
        >
          <List bordered>
            <List.Item
              className="is-primary-text"
              actions={[
                <Button loading={uploaderLoading} disabled={fileList.length === 0} type="primary" icon={<CloudUploadOutlined />}>
                  ناردن / بارکردن
                </Button>,
                <Popconfirm
                  title="ئایا دڵنیای لە سڕینەوەی هەموو فایلەکان ؟"
                  onConfirm={clearAll}
                  okText="بەڵێ"
                  cancelText="نەخێر"
                  disabled={fileList.length === 0}
                >
                  <Button disabled={fileList.length === 0} danger icon={<ClearOutlined />}>
                    سڕینەوەی هەموو
                  </Button>
                </Popconfirm>,

              ]}
            >
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
            </List.Item>

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
                    avatar={<Avatar src={blobUrl} />}
                    title={<a href={blobUrl} target="_blank" rel="noreferrer">{file.name}</a>}
                    description={(
                      <>
                        <Tag color="gold" style={{ margin: 2 }}>
                          قەبارە
                          &nbsp;
                          {prettyBytes(file.size)}
                        </Tag>
                        <Tag color="cyan" style={{ margin: 2 }}>
                          جۆر
                          &nbsp;
                          {file.type}
                        </Tag>
                        <Tag color="default" style={{ margin: 2 }}>
                          بەرواری دەسکاریکردن
                          &nbsp;
                          {new Date(file.lastModified).toUTCString()}
                        </Tag>
                        {
                          file.edits
                            ? (
                              <Tag color="red" style={{ margin: 2 }}>
                                {file.edits}
                                &nbsp;
                                جار
                                دەسکاری کراوە
                              </Tag>
                            )
                            : null
                        }
                      </>
                    )}
                  />
                </List.Item>
              );
            })}
          </List>
        </ReactDragListView>
      </section>
    </>
  );
}
