import React from 'react';
import {
  Menu, Layout, Row, Col,
  Button,
  Typography,
  Card,
  List,
  Tag,
} from 'antd';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons';
import { MdOutlineLogout } from 'react-icons/md';

export default function Home() {
  return (
    <Layout className="landing-main-wraper">
      <Layout.Header>
        <Row gutter={[10, 10]}>
          <Col span={10}>
            <Menu mode="horizontal" className="landing-menu" defaultActiveFirst>
              <Menu.Item icon={<HomeOutlined />}>سەرەکی</Menu.Item>
              <Menu.Item>بۆچی ژیر؟</Menu.Item>
              <Menu.Item>نرخەکانمان</Menu.Item>
              <Menu.Item>پەیوەندیمان پێوەبکە</Menu.Item>
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
            <Typography.Paragraph style={{ fontSize: 18 }}>
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
          <Col span={24} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Typography.Title>
              بۆچی
              <span className="is-primary-text"> ژیر؟ </span>
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Row gutter={[50, 10]} justify="center">
              <Col span={7}>
                <Card bordered={false} className="why-zhir-card">
                  <Typography.Title level={2} className="is-primary-text">خێرایە</Typography.Title>
                  <Typography.Paragraph style={{ fontSize: 18 }}>
                    ژیر تەنیا چەند چرکەیەکی پێدەچێ بۆ هەر لاپەڕەیەک. دەتوانی تا
                    ٣٠ لاپەڕە بە یەکجار باربکەی و کارەکان بۆ ژیر لێگەڕێی.
                  </Typography.Paragraph>
                  <object style={{ width: '40%' }} type="image/svg+xml" data="/assets/flash.svg">svg-animation</object>
                </Card>
              </Col>
              <Col span={7}>
                <Card bordered={false} className="why-zhir-card">
                  <Typography.Title level={2} className="is-primary-text">هەرزانە</Typography.Title>
                  <Typography.Paragraph style={{ fontSize: 18 }}>
                    بە پێی هەڵسەنگاندنەکان تێچوونی نووسینەوەی پەرە بە رێژەی ٩٠٪
                    کەمی کردووە ئەمە بۆ خاوەنکار و کریارەکان سوودی زۆرە.
                  </Typography.Paragraph>
                  <object style={{ width: '85%', left: '-7rem' }} type="image/svg+xml" data="/assets/money.svg">svg-animation</object>
                </Card>
              </Col>
              <Col span={7}>
                <Card bordered={false} className="why-zhir-card">
                  <Typography.Title level={2} className="is-primary-text">ئاسانە</Typography.Title>
                  <Typography.Paragraph style={{ fontSize: 18 }}>
                    پێویست ناکا لە تایپکردن خێرابی، ژیر کارەکانت بۆ دەکات.
                    بە چەند هەنگاوێکی ئاسان دۆکیومێنتەکانت بکە دیجیتاڵ.
                  </Typography.Paragraph>
                  <object style={{ width: '70%', left: '-6rem' }} type="image/svg+xml" data="/assets/idea.svg">svg-animation</object>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: '8rem' }}>
          <Col span={24} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Typography.Title className="is-primary-text">
              نرخەکانمان
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Row gutter={[50, 10]} justify="center">
              <Col span={6}>
                <Card
                  className="custom-box-shadow price-table"
                  bordered={false}
                  title={<Typography.Title level={2} className="is-primary-text" style={{ textAlign: 'center' }}>٢٠ پەڕە</Typography.Title>}
                >
                  <Card.Meta description="مانگانە ٢٠ پەڕە بەخۆڕایی وەردەگریت" />
                  <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
                    <Col span={24}>
                      <List>
                        <List.Item>وەرگرتنی ٢٠ پەڕە مانگانە</List.Item>
                        <List.Item> بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                        <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                      </List>
                    </Col>

                  </Row>
                </Card>
              </Col>

              <Col span={6}>
                <Card
                  className="custom-box-shadow price-table price-table-primary-bg"
                  title={<Typography.Title level={2} style={{ textAlign: 'center', color: 'white' }}>١٠٠ پەڕە</Typography.Title>}

                >
                  <Card.Meta description={<span>&nbsp;</span>} />
                  <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
                    <Col span={24}>
                      <List>
                        <List.Item>١٠٠ پەڕ بکڕە تەنها بە ٨،٠٠٠ دینار</List.Item>
                        <List.Item> بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                        <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                      </List>
                    </Col>

                  </Row>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  className="custom-box-shadow price-table "
                  title={<Typography.Title className="is-primary-text" level={2} style={{ textAlign: 'center' }}>٥٠٠ پەڕە</Typography.Title>}

                >
                  <Card.Meta description={<span>&nbsp;</span>} />
                  <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
                    <Col span={24}>
                      <List>
                        <List.Item>٥٠٠ پەڕ بکڕە تەنها بە ٣٠،٠٠٠ دینار</List.Item>
                        <List.Item> بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                        <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                      </List>
                    </Col>

                  </Row>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  className="custom-box-shadow price-table "
                  title={<Typography.Title className="is-primary-text" level={2} style={{ textAlign: 'center' }}>١٠٠٠ پەڕە</Typography.Title>}
                >
                  <Card.Meta description={<span>&nbsp;</span>} />
                  <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
                    <Col span={24}>
                      <List>
                        <List.Item>١٠٠٠ پەڕ بکڕە تەنها بە ٥٠،٠٠٠ دینار</List.Item>
                        <List.Item> بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                        <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                      </List>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[10, 30]} style={{ marginTop: '8rem' }} justify="center">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Typography.Title>
              <span className="is-primary-text"> پەیوەندیمان </span>
              پێوەبکە
            </Typography.Title>
          </Col>
          <Col span={24} style={{ textAlign: 'center', marginTop: '-2rem' }}>
            <Typography.Paragraph>
              دەتوانیت پەیوەندیمان پێوە بکەیت لە ڕێگای ژمارە مۆبایلی
            </Typography.Paragraph>
          </Col>
          <Col span={24} style={{ textAlign: 'center', marginTop: '-2rem' }}>
            <Tag
              className=" custom-box-shadow"
              style={{
                padding: 15, fontSize: 16, border: 'none',
              }}
            >
              <bdi>+964 750 766 5935</bdi>
            </Tag>
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            <a style={{ fontSize: '1.5rem' }} href="https://www.facebook.com/zhir.io" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            &nbsp;
            &nbsp;
            &nbsp;
            <a style={{ fontSize: '1.5rem' }} href="https://twitter.com/zhir_io" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
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
