import React from 'react';
import {
  Row, Col,
  Typography,
  List,
} from 'antd';
import faq from './faq';

export default function Faq() {
  return (
    <Row justify="center">
      <Col span={24}>
        <Row gutter={[10, 5]}>
          <Col span={24}>
            <Typography.Title>پرسیارە باوەکان دەربارەی OCR</Typography.Title>

            <List>
              {faq.map((f, index) => (
                <List.Item>
                  <h3>
                    {index + 1}
                    .
                    {' '}
                    {f.question}
                  </h3>
                  {f.answer}
                </List.Item>
              ))}

            </List>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
