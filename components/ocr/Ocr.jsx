/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Row, Col,
  Drawer,
  Button,
  Table,
  notification,
  Tag,
  Popover,
} from 'antd';
import {
  LoadingOutlined,
  StarOutlined,
  FileWordOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import superagent from 'superagent';
import dayjs from 'dayjs';
import Uploader from './Uploader';
import convertNumberToArabic from '../../helpers/convertNumberToArabic';

export default function Ocr(props) {
  const { user } = props;
  const [uploaderDrawerVisible, setUploaderDrawerVisible] = useState(false);
  const [jobList, setJobList] = useState([]);

  const faces = {
    1: '😞',
    2: '😐',
    3: '🙂',
    4: '😀',
    5: '😄',
  };
  const loadTextFileContent = (url) => {
    superagent
      .get(url)
      .end((err, info) => {
        console.log(info.text);
      });
  };
  const uploaderDrawerOnClose = () => {
    setUploaderDrawerVisible(false);
  };
  const onUploaderUserDone = () => {
    setUploaderDrawerVisible(false);
  };
  const loadJobList = (limit = 120, offset = 0, q = '') => {
    superagent.get(`${process.env.NEXT_PUBLIC_API_URL}/job/list`)
      .set('authorization', `Bearer ${user.token}`)
      .query({
        limit,
        offset,
        q,
      }).end((err, res) => {
        if (!err) {
          setJobList(res.body);
        } else {
          notification.error({
            message: 'هەڵە رویدا',
            description: 'هەڵەیەک رویدا لەکاتی وەرگرتنەوەی لیستی کردارەکان',
            placement: 'bottomRight',
          });
        }
      });
  };
  useEffect(() => {
    loadJobList();
  }, []);

  const tableColumns = [
    {
      title: 'کۆد',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: 'ژمارەی وێنەکان',
      dataIndex: 'page_count',
      key: 'page_count',
      width: '13%',
      render: (v, r) => {
        let returnObject = (<></>);
        if ((v - r.paid_page_count) > 0) {
          if (v === 1) {
            returnObject = (
              <Tag className="is-round-tag" color="green">
                بەخۆڕایی 🎉
              </Tag>
            );
          } else {
            returnObject = (
              <Tag className="is-round-tag" color="default">
                {convertNumberToArabic(v - r.paid_page_count)}
                &nbsp;
                پەڕە لە
                &nbsp;
                <b>{convertNumberToArabic(v)}</b>
                &nbsp;
                بەخۆڕایی
              </Tag>
            );
          }
        } else {
          returnObject = convertNumberToArabic(v);
        }

        return returnObject;
      },
    },
    {
      title: 'لە ڕێکەوتی',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '15%',
      render: (v) => convertNumberToArabic(dayjs(v).format('YYYY-MM-DD')),
    },
    {
      title: 'بار',
      dataIndex: 'status',
      key: 'status',
      render: (v, r) => {
        let returnObject = (<></>);
        if (v === 'pending') {
          returnObject = <Tag className="is-round-tag" color="orange">نێردرا</Tag>;
        }
        if (v === 'queued') {
          returnObject = <Tag className="is-round-tag" color="cyan">لە چاوەروانیدا</Tag>;
        }
        if (v === 'processing') {
          returnObject = <Tag className="is-round-tag" color="processing" icon={<LoadingOutlined spin />}>دەرهێنانی دەقەکان</Tag>;
        }
        if (v === 'completed') {
          if (r.rate > -1000) {
            returnObject = (
              <Tag className="is-round-tag" color="green" icon={faces[r.rate]}>
                &nbsp;
                تەواوبوو
              </Tag>
            );
          } else {
            returnObject = (
              <Popover content={<h1>hello wolrd</h1>} trigger="click">
                <Tag style={{ cursor: 'pointer' }} className="is-round-tag" color="green" icon={<StarOutlined />}>تەواوبوو</Tag>
              </Popover>
            );
          }
        }
        if (v === 'failed') {
          returnObject = <Tag className="is-round-tag" color="error">هەڵە ڕویدا</Tag>;
        }
        return returnObject;
      },
    },
    {
      title: 'کردارەکان',
      dataIndex: 'id',
      key: 'id',
      render: (v, r) => {
        const styles = {
          // word: { background: 'rgb(181 222 255)', color: 'rgb(82 124 153)',
          // borderColor: 'rgb(82 124 153)' },
          // pdf: { background: 'rgb(255 43 90)', color: 'white', borderColor: 'rgb(175 29 61);' },
          // text: { background: '#f6ffed', color: '#47a51e', borderColor: '#47a51e' },
        };
        styles.word = {};
        styles.pdf = {};
        styles.text = {};

        const msWord = (
          <Button size="small" style={styles.word} icon={<FileWordOutlined />} block disabled={r.status !== 'completed'} href={r.status === 'completed' ? `${process.env.NEXT_PUBLIC_API_URL}/assets/done/${user.id}/${v}/result.docx` : undefined}>
            MS Word
          </Button>
        );
        const pdf = (
          <Button style={styles.pdf} size="small" icon={<FilePdfOutlined />} block disabled={r.status !== 'completed'} href={r.status === 'completed' ? `${process.env.NEXT_PUBLIC_API_URL}/assets/done/${user.id}/${v}/result.pdf` : undefined}>
            PDF
          </Button>
        );
        const text = (
          <Button size="small" style={styles.text} icon={<FileTextOutlined />} block disabled={r.status !== 'completed'} onClick={loadTextFileContent(`${process.env.NEXT_PUBLIC_API_URL}/assets/done/${user.id}/${v}/result.txt`)}>
            دەق
          </Button>
        );
        return (
          <Button.Group block disabled={r.status !== 'completed'} size="small">
            {text}
            {msWord}
            {pdf}
          </Button.Group>
        );
      },
    },

  ];

  return (
    <>
      <Drawer
        zIndex={10}
        visible={uploaderDrawerVisible}
        onClose={uploaderDrawerOnClose}
        placement="top"
        height="100%"
        destroyOnClose
        title="بارکردنی وێنە"
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Uploader user={user} onUserDone={onUploaderUserDone} />
          </Col>
        </Row>
      </Drawer>
      <Row gutter={[10, 10]}>

        <Col span={24}>
          <Button type="primary" icon={<UploadOutlined />} onClick={() => setUploaderDrawerVisible(true)}>وێنە باربکە</Button>
        </Col>
        <Col span={24}>
          <Table
            size="middle"
            className="joblist-table"
            pagination={{
              pageSize: 120,
              position: ['none', 'none'],
            }}
            columns={tableColumns}
            dataSource={jobList}
          />
        </Col>
      </Row>
    </>
  );
}
