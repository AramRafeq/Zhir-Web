/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactDragListView from 'react-drag-listview/lib/index';
import _ from 'lodash';
import {
  Spin, List,
  notification, Avatar,
  Button,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  AiOutlineCloudUpload,

  AiOutlineEdit,
} from 'react-icons/ai';

import {
  BsTrash,
} from 'react-icons/bs';

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

export default function Uploader() {
  const [uploaderLoading, setuploaderLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const onDropAccepted = (acceptedFiles) => {
    setFileList([...acceptedFiles, ...fileList]);
    // use bellow url for generating blob url for an image
    // URL.createObjectURL(file)
  };
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: acceptedFileTypes.join(','),
    maxFiles,
    disabled: uploaderLoading,
    maxSize: maxFileSize,
    onDropAccepted,
  });
  const onDragEnd = (fromIndex, toIndex) => {
    if (toIndex < 0) return; // Ignores if outside designated area
    const fileListCopy = _.clone(fileList);
    console.log(fromIndex, toIndex);
    console.log(fileListCopy);

    swapArrayLoc(fileListCopy, fromIndex - 1, toIndex - 1);
    console.log(fileListCopy);
    setFileList(fileListCopy);

    // const items = [...this.state.data];
    // const item = items.splice(fromIndex, 1)[0];
    // items.splice(toIndex, 0, item);
    // this.setState({ data: items });
  };

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
      {' '}
      -
      {' '}
      {file.size}
      {' '}
      bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path}
      {' '}
      -
      {' '}
      {file.size}
      {' '}
      bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>
            {e.code}
            /
            {' '}
            {e.message}
          </li>
        ))}
      </ul>
    </li>
  ));

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
        <aside>
          {/* <h4>Accepted files</h4>
              <ul>{acceptedFileItems}</ul> */}
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>

        <ReactDragListView
          nodeSelector=".draggble"
          onDragEnd={onDragEnd}
        >
          <List bordered>
            <List.Item>
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
            {fileList.map((file) => (

              <List.Item
                key={file.name}
                className="draggble"
                actions={[
                  <Button type="link" size="small"><AiOutlineEdit /></Button>,
                  <Button type="link" size="small"><BsTrash /></Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={URL.createObjectURL(file)} />}
                  title={<a href="https://ant.design">{file.name}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            ))}
          </List>
        </ReactDragListView>
      </section>

    </>
  );
}
