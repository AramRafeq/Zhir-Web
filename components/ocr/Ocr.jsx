/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Row, Col,

} from 'antd';
import Uploader from './Uploader';

export default function Ocr() {
  return (
    <>
      <Row gutter={[10, 10]}>
        <Col span={14}>
          <Uploader />
        </Col>
      </Row>
    </>
  );
}
