/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Row, Col,
  Drawer,
  Button,
} from 'antd';
import Uploader from './Uploader';

export default function Ocr(props) {
  const { user } = props;
  const [uploaderDrawerVisible, setUploaderDrawerVisible] = useState(false);
  const uploaderDrawerOnClose = () => {
    setUploaderDrawerVisible(false);
  };
  const onUploaderUserDone = () => {
    // setUploaderDrawerVisible(false);
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
            <Uploader user={user} onUserDone={onUploaderUserDone} />
          </Col>
        </Row>
      </Drawer>
      <Row>

        <Col span={24}>
          <Button onClick={() => setUploaderDrawerVisible(true)}>وێنە باربکە</Button>
        </Col>
      </Row>
    </>
  );
}
