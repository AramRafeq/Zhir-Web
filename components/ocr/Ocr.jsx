/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Row, Col,
  Drawer,
  Button,
} from 'antd';
import Uploader from './Uploader';

export default function Ocr() {
  const [uploaderDrawerVisible, setUploaderDrawerVisible] = useState(false);
  const uploaderDrawerOnClose = () => {
    setUploaderDrawerVisible(false);
  };
  const onUploaderDone = (formValues, fileList) => {
    console.log(formValues, fileList);
  };
  return (
    <>
      <Drawer
        zIndex={10}
        visible={uploaderDrawerVisible}
        onClose={uploaderDrawerOnClose}
        placement="top"
        height="100%"
        keyboard={false}
        destroyOnClose
        title="بارکردنی وێنە"
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Uploader onUserDone={onUploaderDone} />
          </Col>
        </Row>
      </Drawer>
      <Button onClick={() => setUploaderDrawerVisible(true)}>وێنە باربکە</Button>
    </>
  );
}
