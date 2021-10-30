import React, { useState, useEffect } from 'react';
import {
  Row, Col,
  Slider,
  Card,
} from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import superagent from 'superagent';
import dayjs from 'dayjs';

export default function Balance(props) {
  const { user } = props;
  const [pageIndex, setPageIndex] = useState(0);
  const fastpayMob = '964 750 766 5935';
  const pages = [20, 50, 100, 500, 1000];
  const labels = ['🎁 دیاری ', '٥٠ لاپەڕە', '١٠٠ لاپەڕە', '٥٠٠ لاپەڕە ', '١،٠٠٠ لاپەڕە'];
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
      label: <span>٥٠ لاپەڕە</span>,
    },
    2: {
      style: labelStyle,
      label: <span>١٠٠ لاپەڕە</span>,
    },
    3: {
      style: labelStyle,
      label: <span>٥٠٠ لاپەڕە </span>,
    },
    4: {
      style: labelStyle,
      label: <span>١،٠٠٠ لاپەڕە</span>,
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
        <Col span={24}>
          <Card
            bordered={false}
            className="custom-box-shadow"
            title={
            (
              <>
                {
                pageIndex > 0
                  ? <span>{labels[pageIndex]}</span>
                / <span>{prices[pageIndex]}</span>
                  : (null)
              }

              </>
            )
          }
          />
        </Col>
        <Col span={24}>
          {/* <Slider
            onChange={onTrackChange}
            dots
            reverse
            tooltipVisible={false}
            min={0}
            max={pages.length - 1}
            marks={marks}
            step={1}
            defaultValue={0}
          /> */}

        </Col>
        <Col span={10}>
          <Card
            className="custom-box-shadow"
            headStyle={{ background: 'red' }}
            title={<h2 style={{ textAlign: 'center' }}>خۆڕایی</h2>}
          >
            <h1>Hello</h1>
          </Card>
        </Col>
      </Row>
    </>
  );
}
