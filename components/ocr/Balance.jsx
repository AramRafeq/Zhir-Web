import React, { useState, useEffect } from 'react';
import {
  Row, Col,
  Table,
  Button,
  Drawer,
} from 'antd';
import { QrcodeOutlined } from '@ant-design/icons';
import superagent from 'superagent';
import dayjs from 'dayjs';
import RechargeBalance from './RechargeBalance';

export default function Balance(props) {
  const { user } = props;
  const [balance, setBalance] = useState(0);
  const [transactionList, setTransactionList] = useState([]);
  const [paymentDrawerVisible, setPaymentDrawerVisible] = useState(false);
  const loadBalanceCount = () => {
    superagent.get(`${process.env.NEXT_PUBLIC_API_URL}/user/balance`)
      .set('authorization', `Bearer ${user.token}`)
      .end((err, info) => {
        if (!err) {
          const { page_count: pageCount } = info.body;
          setBalance(pageCount);
        }
      });
  };
  const loadTransactions = () => {
    superagent.get(`${process.env.NEXT_PUBLIC_API_URL}/user/transactions`)
      .set('authorization', `Bearer ${user.token}`)
      .end((err, info) => {
        if (!err) {
          setTransactionList(info.body);
        }
      });
  };

  const paymentDrawerClose = () => {
    setPaymentDrawerVisible(false);
  };
  const paymentDrawerOpen = () => {
    setPaymentDrawerVisible(true);
  };
  useEffect(() => {
    loadBalanceCount();
    loadTransactions();
  }, []);
  const tableColumns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      responsive: ['sm'],
      render: (v, r, index) => index + 1,
    },
    {
      title: 'ڕێکەوت',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
      responsive: ['sm'],
      render: (v) => (dayjs(v).format('YYYY-MM-DD')),
    },
    {
      title: 'ڕێگای پارەدان',
      dataIndex: 'payment_medium_name',
      key: 'payment_medium_name',
      width: '15%',
    },
    {
      title: 'بڕی پارە',
      dataIndex: 'amount',
      key: 'amount',
      width: '10%',
      render: (v, r) => `${v} ${r.payment_medium_currency_symbol}`,
    },
    {
      title: 'ژمارەی لاپەڕەکان',
      dataIndex: 'page_count',
      key: 'page_count',
      width: '15%',
    },
    {
      title: 'تێبینی',
      dataIndex: 'user_note',
      key: 'user_note',
      responsive: ['sm'],

    },

  ];
  return (
    <>
      <Drawer title="پڕکردنەوەی بالانسی ژیر OCR" onClose={paymentDrawerClose} visible={paymentDrawerVisible} placement="bottom" height="68%">
        <RechargeBalance user={user} />
      </Drawer>
      <Row justify="center">
        <Col span={24}>
          <Row gutter={[10, 10]} justify="center" align="middle">
            <Col lg={16} md={24} sm={24} xs={24}>
              <Button onClick={paymentDrawerOpen} block size="large" type="dashed">
                باڵانسی ماوە بریتیە لە
                {' '}
                <u>
                  {' '}
                  {balance}
                  {' '}
                </u>
                {' '}
                لاپەڕە
              </Button>
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <Button type="primary" onClick={paymentDrawerOpen} block size="large" icon={<QrcodeOutlined />}>پڕکردنەوەی باڵانس</Button>
            </Col>
            <Col span={24}>
              <Table
                bordered
                size="small"
                className="joblist-table"
                rowClassName=" animate__animated animate__fadeIn"
                pagination={{
                  pageSize: 120,
                  position: ['none', 'none'],
                }}
                columns={tableColumns}
                dataSource={transactionList}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
