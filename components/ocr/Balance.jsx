import React, { useState, useEffect } from 'react';
import {
  Row, Col,
  Typography,
  Table,
  Button,
} from 'antd';
import superagent from 'superagent';
import dayjs from 'dayjs';
import convertNumberToArabic from '../../helpers/convertNumberToArabic';

export default function Balance(props) {
  const { user } = props;
  const [balance, setBalance] = useState(0);
  const [transactionList, setTransactionList] = useState([]);
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
      render: (v, r, index) => index + 1,
    },
    {
      title: 'ڕێکەوت',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '10%',
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
    },

  ];
  return (
    <Row justify="center">
      <Col span={24}>
        <Row gutter={[10, 5]} justify="center" align="middle">
          <Col span={24}>
            <Typography.Title
              style={{
                textAlign: 'center', border: '1px dashed', borderRadius: 5, padding: 20,
              }}
              level={4}
              className="is-primary-text"
            >
              باڵانسی ماوە بریتیە لە
              {' '}
              <u>{balance}</u>
              {' '}
              لاپەڕە
            </Typography.Title>

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
  );
}
