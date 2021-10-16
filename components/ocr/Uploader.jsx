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
import { LoadingOutlined, ClearOutlined } from '@ant-design/icons';
import {
  AiOutlineCloudUpload,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

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
  // 'application/pdf',
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

  const onDropAccepted = (acceptedFiles) => {
    const uniqFiles = _.uniqBy([...acceptedFiles, ...fileList], 'name');
    setFileList(uniqFiles);
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
  };
  const clearAll = () => {
    setFileList([]);
  };

  return (
    <>

      <section className={`upload-container-base ${uploaderLoading ? 'upload-container-disabled' : 'upload-container-active'}`}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>کرتە لێرە بکە یاخود هەندێک فایل رابکێشە سەر ئەم بەشە</p>
          {uploaderLoading
            ? <Spin size="large" className="upload-container-spin" indicator={<LoadingOutlined />} />
            : <AiOutlineCloudUpload style={{ fontSize: '6rem', color: '#d9aeed' }} />}
          <p>(تەنها: وێنەو و فایلی PDF ڕێگەپێدراون)</p>
        </div>

        <ReactDragListView
          nodeSelector=".draggble"
          onDragEnd={onDragEnd}
        >
          <List bordered>
            <List.Item
              className="is-primary-text"
              actions={[
                <Popconfirm
                  title="ئایا دڵنیای لە سڕینەوەی هەموو فایلەکان ؟"
                  onConfirm={clearAll}
                  okText="بەڵێ"
                  cancelText="نەخێر"
                  disabled={fileList.length === 0}
                >
                  <Button disabled={fileList.length === 0} size="small" danger icon={<ClearOutlined />}>
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
            {fileList.map((file) => {
              const blobUrl = URL.createObjectURL(file);
              return (

                <List.Item
                  key={file.name}
                  className="draggble"
                  actions={[
                    <Button type="link" size="small"><AiOutlineEdit className="is-dark-grey-text" /></Button>,
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
                        <Tag className="is-ltr" color="gold">{prettyBytes(file.size)}</Tag>
                        <Tag className="is-ltr" color="cyan">{file.type}</Tag>
                        <Tag className="is-ltr" color="pink">{new Date(file.lastModified).toUTCString()}</Tag>
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
