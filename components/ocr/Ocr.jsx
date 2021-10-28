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
  Input,
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
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import Uploader from './Uploader';
import RateJob from './RateJob';
import Modal from '../basic/Modal';

import convertNumberToArabic from '../../helpers/convertNumberToArabic';

export default function Ocr(props) {
  const { user } = props;
  const limit = 120;
  const offset = 0;
  const [uploaderDrawerVisible, setUploaderDrawerVisible] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [loadedTextFile, setLoadedTextFile] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [textLoading, setTextLoading] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(false);
  const textModalRef = React.createRef();
  const faces = {
    1: '😞',
    2: '😐',
    3: '🙂',
    4: '😀',
    5: '😄',
  };
  const loadTextFileContent = (url) => {
    setTextLoading(true);
    superagent
      .get(url)
      .end((err, info) => {
        if (!err) {
          setLoadedTextFile(info.text);
          setTextLoading(false);
        } else {
          notification.error({
            message: 'هەڵە ڕویدا',
            description: 'هەڵەیەک ڕویدا لەکاتی وەرگرتنەوەی ناوەڕۆکی نووسین',
            placement: 'bottomRight',
          });
        }
      });
  };

  const uploaderDrawerOnClose = () => {
    setUploaderDrawerVisible(false);
  };
  const loadJobList = (l = 120, o = 0) => {
    setJobsLoading(true);
    superagent.get(`${process.env.NEXT_PUBLIC_API_URL}/job/list`)
      .set('authorization', `Bearer ${user.token}`)
      .query({
        limit: l,
        offset: o,
        q: searchQuery,
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
        setJobsLoading(false);
      });
  };

  const onUploadDone = () => {
    loadJobList(limit, offset);
    setUploaderDrawerVisible(false);
  };

  const searchQuryInputChanged = debounce((e) => {
    const searchTerm = e.target.value;
    setSearchQuery(searchTerm);
  }, 400);
  useEffect(() => {
    loadJobList(limit, offset);
    const interval = setInterval(() => {
      loadJobList(limit, offset);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [searchQuery]);
  useEffect(() => {
    if (textModalRef.current && loadedTextFile !== '') {
      textModalRef.current.click();
    }
  }, [loadedTextFile]);

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
      width: '17%',
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
      width: '20%',
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
              <Popover content={<RateJob user={user} jobId={r.id} />} trigger="click">
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
      width: '30%',
      render: (v, r) => {
        const msWord = (
          <Button loading={textLoading} type="dashed" icon={<FileWordOutlined />} target="_blank" block disabled={r.status !== 'completed'} href={r.status === 'completed' ? `${process.env.NEXT_PUBLIC_API_URL}/assets/done/${user.id}/${v}/result.docx` : undefined}>
            MS Word
          </Button>
        );
        const pdf = (
          <Button loading={textLoading} type="dashed" icon={<FilePdfOutlined />} target="_blank" block disabled={r.status !== 'completed'} href={r.status === 'completed' ? `${process.env.NEXT_PUBLIC_API_URL}/assets/done/${user.id}/${v}/result.pdf` : undefined}>
            PDF
          </Button>
        );
        const text = (
          <Button loading={textLoading} type="dashed" icon={<FileTextOutlined />} block disabled={r.status !== 'completed'} onClick={() => loadTextFileContent(`${process.env.NEXT_PUBLIC_API_URL}/assets/done/${user.id}/${v}/result.txt`)}>
            دەق
          </Button>
        );
        return (
          <Button.Group style={{ width: '100%' }} disabled={r.status !== 'completed'}>
            {text}
            {msWord}
            {pdf}
          </Button.Group>
        );
      },
    },

  ];
  const modalEvents = {};
  return (
    <>
      <Modal
        btnRef={textModalRef}
        size="modal-lg"
        header="ناوەڕۆکی دەرهێندراو"
        onMount={(show, close) => {
          modalEvents.show = show;
          modalEvents.close = close;
        }}
        onCancel={() => {
          modalEvents.close();
          setLoadedTextFile('');
        }}
      >
        <Input.TextArea rows={15} readOnly value={loadedTextFile} />
      </Modal>
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
            <Uploader user={user} onUploadDone={onUploadDone} />
          </Col>
        </Row>
      </Drawer>
      <Row gutter={[10, 10]}>

        <Col span={7}>
          <Input onChange={searchQuryInputChanged} placeholder="بە کۆد بگەڕێ" size="large" style={{ width: '100%' }} />
        </Col>
        <Col span={3} style={{ paddingTop: 10 }}>
          <span className={classnames({ 'animate__animated animate__fadeInLeft': jobsLoading, 'animate__animated animate__fadeOutLeft': !jobsLoading })}>
            <LoadingOutlined spin />
          </span>
        </Col>
        <Col offset={9} span={5}>
          <Button block size="large" type="primary" icon={<UploadOutlined />} onClick={() => setUploaderDrawerVisible(true)}>وێنە باربکە</Button>
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
            dataSource={jobList}
          />
        </Col>
      </Row>
    </>
  );
}
