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
  return (
    <>
      <Drawer
        visible={uploaderDrawerVisible}
        onClose={uploaderDrawerOnClose}
        placement="left"
        width="70%"
        keyboard={false}
        destroyOnClose
        title="بارکردنی وێنە"
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Uploader />
          </Col>
        </Row>
      </Drawer>
      <Button onClick={() => setUploaderDrawerVisible(true)}>وێنە باربکە</Button>
    </>
  );
}
