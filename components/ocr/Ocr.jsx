/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Spin, List } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { AiOutlineCloudUpload } from 'react-icons/ai';

// Global Variables
const maxFiles = 2;
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
export default function Uploader() {
  const [uploaderLoading, setuploaderLoading] = useState(false);
  const onDropAccepted = (acceptedFiles) => {
    console.log(acceptedFiles);
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
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
        <List bordered>
          <List.Item>
            {(maxFiles - acceptedFileItems.length) <= 0 ? 'گەشیتیت بە سنوری بارکردن بۆ یەک کرداری ناسینەوە '
              : (
                <>
                  <span>
                    توانای باردکردنی
                    <b>
                    &nbsp;
                      {maxFiles - acceptedFileItems.length}
                    &nbsp;
                    </b>
                    فایلی دیکەت هەیە
                  </span>
                </>
              )}
          </List.Item>
        </List>
      </section>

    </>
  );
}
