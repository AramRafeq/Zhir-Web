import React from 'react';
import {
  Menu, Layout, Row, Col,
  Button,
  Typography,
} from 'antd';
// import { FcHome } from 'react-icons/fc';
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons';
import { MdOutlineLogout } from 'react-icons/md';

export default function Home() {
  return (
    <Layout className="landing-main-wraper">
      <Layout.Header>
        <Row gutter={[10, 10]}>
          <Col span={10}>
            <Menu mode="horizontal" className="landing-menu">
              <Menu.Item icon={<HomeOutlined />}>سەرەکی</Menu.Item>
              <Menu.Item>بۆچی ژیر؟</Menu.Item>
              <Menu.Item>خزمەتگوزاریەکانمان</Menu.Item>
              <Menu.Item>نرخەکانمان</Menu.Item>
            </Menu>
          </Col>
          <Col span={3} offset={7}>
            <Button block type="primary" icon={<DashboardOutlined />}>داشبۆردی ژیر</Button>
          </Col>
          <Col span={2}>
            <Button type="primary" danger icon={<MdOutlineLogout className="custom-icon" />}> &nbsp; چوونەدەرەوە </Button>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content style={{ padding: '4rem', paddingTop: '8rem' }}>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Typography.Title>خــزمـەتــگــوزاری ژیـــر</Typography.Title>
            <Typography.Paragraph>
              ژیر خزمەتگوزارییەکی سەرهێڵی OCR ، واتە بەکاردێ بۆ دەرهێنانی نووسین (دەق) لە ناو
              وێنە، بۆ نموونە دۆکیومێنتێکی پرینتکراوت هەیە دەتەوێ تایپی بکەی، دەتوانی
              دۆکیومێنتەکە سکان بکەی یانیش بە مۆبایل وێنەی پەڕەکانی بگری و ئەپڵۆدی بکەی و ژیر
              بۆت دەکاتە فایلی MS WORD و PDF

            </Typography.Paragraph>
          </Col>
          <Col span={12} style={{ textAlign: 'center' }}>
            <object style={{ width: '85%', marginTop: '-2rem' }} type="image/svg+xml" data="/assets/landing-animation.svg">svg-animation</object>
          </Col>
        </Row>
        <Row style={{ marginTop: '8rem' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Typography.Title>
              بۆچی
              <span className="is-primary-text"> ژیر؟ </span>
            </Typography.Title>
          </Col>

        </Row>
      </Layout.Content>
      <Layout.Footer style={{
        marginRight: '-4rem', marginLeft: '-4rem', marginBottom: '-4rem', padding: 0, background: 'white',
      }}
      >
        <object style={{ width: '100%', marginBottom: '-1rem' }} type="image/svg+xml" data="/assets/footer.svg">svg-animation</object>
      </Layout.Footer>
    </Layout>
  );
}
