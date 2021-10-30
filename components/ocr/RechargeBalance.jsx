import React, { useState, useEffect } from 'react';
import {
  Row, Col,
  List,
  Card,
  Button,
} from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import superagent from 'superagent';
import dayjs from 'dayjs';

export default function Balance(props) {
  const { user } = props;
  const [pageIndex, setPageIndex] = useState(0);
  const fastpayMob = '964 750 766 5935';
  const pages = [20, 50, 100, 500, 1000];
  const labels = ['🎁 دیاری ', '٥٠ پەڕە', '١٠٠ پەڕە', '٥٠٠ پەڕە ', '١،٠٠٠ پەڕە'];
  const prices = ['٠', '٥ هەزار', '٨ هەزار', '٣٠ هەزار', '٥٠ هەزار'];
  const QRCodeUrls = [
    '',
    '/assets/fastpay-qrcodes/5000IQD.png',
    '/assets/fastpay-qrcodes/8000IQD.png',
    '/assets/fastpay-qrcodes/30000IQD.png',
    '/assets/fastpay-qrcodes/50000IQD.png',
  ];
  const currency = 'iqd'; // it could take iqd,rial
  const labelStyle = { fontSize: 15 };
  const marks = {

    0: {
      style: labelStyle,
      label: <span>🎁 دیاری </span>,
    },
    1: {
      style: labelStyle,
      label: <span>٥٠ پەڕە</span>,
    },
    2: {
      style: labelStyle,
      label: <span>١٠٠ پەڕە</span>,
    },
    3: {
      style: labelStyle,
      label: <span>٥٠٠ پەڕە </span>,
    },
    4: {
      style: labelStyle,
      label: <span>١،٠٠٠ پەڕە</span>,
    },
  };
  const onDrawerClose = () => {
    setDrawerVisible(false);
  };
  const showBalanceDrawer = () => {
    setDrawerVisible(true);
  };
  const onTrackChange = (index) => {
    setPageIndex(index);
  };
  return (
    <>
      <Row gutter={[15, 15]} style={{ padding: 20 }}>

        {/* <Col span={6}>
          <Card
            className="custom-box-shadow price-table price-table-primary-bg"
            title={<h2 style={{ textAlign: 'center', color: 'white' }}>خۆڕایی</h2>}
          >
            <Card.Meta description="مانگانە ٢٠ پەڕە بەخۆڕایی وەردەگریت" />
            <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
              <Col span={24}>
                <List bordered>
                  <List.Item>وەرگرتنی ٢٠ پەڕە مانگانە</List.Item>
                  <List.Item>توانای بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                  <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                </List>
              </Col>
              <Col span={24}>
                <Button size="large" type="dashed" block>
                  <img src="/assets/fastpay.png" width="50" alt="" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col> */}
        <Col span={6}>
          <Card
            className="custom-box-shadow price-table price-table-primary-bg"
            title={<h2 style={{ textAlign: 'center', color: 'white' }}>خۆڕایی</h2>}
          >
            <Card.Meta description="مانگانە ٢٠ پەڕە بەخۆڕایی وەردەگریت" />
            <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
              <Col span={24}>
                <List bordered>
                  <List.Item>وەرگرتنی ٢٠ پەڕە مانگانە</List.Item>
                  <List.Item>توانای بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                  <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                </List>
              </Col>
              <Col span={24}>
                <Button size="large" type="dashed" block>
                  <img src="/assets/fastpay.png" width="50" alt="" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="custom-box-shadow price-table price-table-primary-bg"
            title={<h2 style={{ textAlign: 'center', color: 'white' }}>خۆڕایی</h2>}
          >
            <Card.Meta description="مانگانە ٢٠ پەڕە بەخۆڕایی وەردەگریت" />
            <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
              <Col span={24}>
                <List bordered>
                  <List.Item>وەرگرتنی ٢٠ پەڕە مانگانە</List.Item>
                  <List.Item>توانای بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                  <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                </List>
              </Col>
              <Col span={24}>
                <Button size="large" type="dashed" block>
                  <img src="/assets/fastpay.png" width="50" alt="" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="custom-box-shadow price-table price-table-primary-bg"
            title={<h2 style={{ textAlign: 'center', color: 'white' }}>خۆڕایی</h2>}
          >
            <Card.Meta description="مانگانە ٢٠ پەڕە بەخۆڕایی وەردەگریت" />
            <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
              <Col span={24}>
                <List bordered>
                  <List.Item>وەرگرتنی ٢٠ پەڕە مانگانە</List.Item>
                  <List.Item>توانای بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                  <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                </List>
              </Col>
              <Col span={24}>
                <Button size="large" type="dashed" block>
                  <img src="/assets/fastpay.png" width="50" alt="" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="custom-box-shadow price-table price-table-primary-bg"
            title={<h2 style={{ textAlign: 'center', color: 'white' }}>خۆڕایی</h2>}
          >
            <Card.Meta description="مانگانە ٢٠ پەڕە بەخۆڕایی وەردەگریت" />
            <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
              <Col span={24}>
                <List bordered>
                  <List.Item>وەرگرتنی ٢٠ پەڕە مانگانە</List.Item>
                  <List.Item>توانای بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                  <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                </List>
              </Col>
              <Col span={24}>
                <Button size="large" type="dashed" block>
                  <img src="/assets/fastpay.png" width="50" alt="" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}
