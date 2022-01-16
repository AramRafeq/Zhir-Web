import React from 'react';
import { withIronSession } from 'next-iron-session';

import {
  Menu, Layout, Row, Col,
  Button,
  Typography,
  Card,
  List,
  Tag,
  Alert,
} from 'antd';
import Head from 'next/head';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons';
import { MdOutlineLogout, MdOutlineLogin } from 'react-icons/md';

export default function Home(props) {
  const {
    user,
    rechargeStatus,
    cashoutStatus,
  } = props;
  const isLogedIn = !!user;

  const homeRef = React.createRef();
  const whyZhirRef = React.createRef();
  const pricingRef = React.createRef();
  const contactUsRef = React.createRef();

  const scroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <Head>
        <title>ژیر | خزمەتگوزاری دەرهێنانی دەقەکان</title>
      </Head>

      <Layout className="landing-main-wraper">
        <Layout.Header>
          <Row gutter={[10, 10]}>
            <Col lg={10} md={24} sm={24}>
              <Menu mode="horizontal" className="landing-menu" defaultActiveFirst>
                <Menu.Item
                  onClick={() => scroll(homeRef)}
                  icon={<HomeOutlined />}
                >
                  سەرەکی
                </Menu.Item>
                <Menu.Item onClick={() => scroll(whyZhirRef)}>بۆچی ژیر؟</Menu.Item>
                <Menu.Item onClick={() => scroll(pricingRef)}>نرخەکانمان</Menu.Item>
                <Menu.Item onClick={() => scroll(contactUsRef)}>پەیوەندیمان پێوەبکە</Menu.Item>
              </Menu>
            </Col>
            {isLogedIn
              ? (
                <>
                  <Col lg={{ span: 3, offset: 7 }} md={{ span: 24, offset: 0 }} sm={24} xs={24}>
                    <Button style={{ marginBottom: '-2rem' }} block type="primary" href="/app" icon={<DashboardOutlined />}>داشبۆردی ژیر</Button>
                  </Col>
                  <Col lg={{ span: 3, offset: 0 }} md={{ span: 24, offset: 0 }} sm={24} xs={24}>
                    <Button block type="dashed" href="/api/auth/logout" danger icon={<MdOutlineLogout className="custom-icon" />}> &nbsp; چوونەدەرەوە </Button>
                  </Col>
                </>
              )

              : (
                <>
                  <Col style={{ marginBottom: '-2rem' }} lg={{ span: 3, offset: 7 }} md={{ span: 24, offset: 0 }} sm={24} xs={24}>
                    <Button block type="dashed" href="/auth/login" icon={<MdOutlineLogin className="custom-icon" />}>چوونەژوورەوە</Button>
                  </Col>
                  <Col lg={{ span: 4, offset: 0 }} md={{ span: 24, offset: 0 }} sm={24} xs={24}>
                    <Button block type="primary" href="/auth/register" icon={<MdOutlineLogout className="custom-icon" />}> &nbsp; دروستکردنی هەژمار </Button>
                  </Col>
                </>
              )}

          </Row>
        </Layout.Header>
        <Layout.Content className="lainding-content" style={{ padding: '4rem', paddingTop: '8rem' }}>
          <Row gutter={[10, 30]} ref={homeRef}>
            {
              rechargeStatus === 'fail'
                ? (
                  <Col span={24}>
                    <Alert
                      closable
                      type="error"
                      showIcon
                      message={(
                        <Typography.Text>
                          پڕکردنەوەی باڵانس سەرکەوتوو نەبوو
                        </Typography.Text>
                        )}
                    />
                  </Col>
                )
                : null
            }
            {
              rechargeStatus && rechargeStatus !== 'fail'
                ? (
                  <Col span={24}>
                    <Alert
                      closable
                      type="success"
                      showIcon
                      message={(
                        <Typography.Text>
                          باڵانس بە سەرکەتووی پڕکرایەوە
                        </Typography.Text>
                        )}
                    />
                  </Col>
                )
                : null
            }
            <Col md={12} sm={24}>
              <Typography.Title>خــزمـەتــگــوزاری ژیـــر</Typography.Title>
              <Typography.Paragraph style={{ fontSize: 18 }}>
                ژیر خزمەتگوزارییەکی سەرهێڵی OCRـە ، واتە بەکاردێ بۆ دەرهێنانی نووسین (دەق) لە ناو
                وێنە، بۆ نموونە دۆکیومێنتێکی پرینتکراوت هەیە دەتەوێ تایپی بکەی، دەتوانی
                دۆکیومێنتەکە سکان بکەی یانیش بە مۆبایل وێنەی پەڕەکانی بگری و ئەپڵۆدی بکەی و ژیر
                بۆت دەکاتە فایلی MS WORD و PDF

                <a href="https://www.youtube.com/watch?v=edAIZkdskR4"> چۆنیەتی بەکارهێنان  ؟ </a>
              </Typography.Paragraph>
            </Col>
            <Col md={12} sm={24} style={{ textAlign: 'center' }}>
              <object style={{ width: '85%', marginTop: '-2rem' }} type="image/svg+xml" data="/assets/landing-animation.svg">svg-animation</object>
            </Col>
          </Row>
          <Row style={{ marginTop: '8rem' }} ref={whyZhirRef}>
            <Col span={24} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Typography.Title>
                بۆچی
                <span className="is-primary-text"> ژیر؟ </span>
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Row gutter={[50, 30]} justify="center">
                <Col md={7} sm={24}>
                  <Card bordered={false} className="why-zhir-card">
                    <Typography.Title level={2} className="is-primary-text">خێرایە</Typography.Title>
                    <Typography.Paragraph style={{ fontSize: 18 }}>
                      ژیر تەنیا چەند چرکەیەکی پێدەچێ بۆ هەر لاپەڕەیەک. دەتوانی تا
                      ٣٠ لاپەڕە بە یەکجار باربکەی و کارەکان بۆ ژیر لێگەڕێی.
                    </Typography.Paragraph>
                    <object style={{ width: '30%' }} type="image/svg+xml" data="/assets/flash.svg">svg-animation</object>
                  </Card>
                </Col>
                <Col md={7} sm={24}>
                  <Card bordered={false} className="why-zhir-card">
                    <Typography.Title level={2} className="is-primary-text">هەرزانە</Typography.Title>
                    <Typography.Paragraph style={{ fontSize: 18 }}>
                      بە پێی هەڵسەنگاندنەکان تێچوونی نووسینەوەی پەرە بە رێژەی ٩٠٪
                      کەمی کردووە ئەمە بۆ خاوەنکار و کریارەکان سوودی زۆرە.
                    </Typography.Paragraph>
                    <object style={{ width: '30%' }} type="image/svg+xml" data="/assets/money.svg">svg-animation</object>
                  </Card>
                </Col>
                <Col md={7} sm={24}>
                  <Card bordered={false} className="why-zhir-card">
                    <Typography.Title level={2} className="is-primary-text">ئاسانە</Typography.Title>
                    <Typography.Paragraph style={{ fontSize: 18 }}>
                      پێویست ناکات لە تایپکردن خێرابی، ژیر کارەکانت بۆ دەکات.
                      بە چەند هەنگاوێکی ئاسان دۆکیومێنتەکانت بکە دیجیتاڵ.
                    </Typography.Paragraph>
                    <object style={{ width: '50%', left: '-4rem' }} type="image/svg+xml" data="/assets/idea.svg">svg-animation</object>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: '8rem' }} ref={pricingRef}>
            <Col span={24} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Typography.Title className="is-primary-text">
                نرخەکانمان
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Row gutter={[50, 30]} justify="center">
                <Col md={6} sm={24}>
                  <Card
                    className="custom-box-shadow price-table"
                    bordered={false}
                    title={<Typography.Title level={2} className="is-primary-text" style={{ textAlign: 'center' }}>٥٠ پەڕە</Typography.Title>}
                  >
                    <Card.Meta description="مانگانە ٥٠ پەڕە بەخۆڕایی وەردەگریت" />
                    <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
                      <Col span={24}>
                        <List>

                          <List.Item>
                            وەرگرتنی
                            {' '}
                            <span className="is-primary-text">٥٠</span>
                            {' '}
                            پەڕە مانگانە
                          </List.Item>
                          <List.Item> بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                          <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                        </List>
                      </Col>

                    </Row>
                  </Card>
                </Col>

                <Col md={6} sm={24}>
                  <Card
                    className="custom-box-shadow price-table price-table-primary-bg"
                    title={<Typography.Title level={2} style={{ textAlign: 'center', color: 'white' }}>١٠٠ پەڕە</Typography.Title>}
                    bordered={false}
                  >
                    <Card.Meta description={<span>&nbsp;</span>} />
                    <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
                      <Col span={24}>
                        <List>

                          <List.Item>
                            ١٠٠ پەڕ بکڕە تەنها بە
                            {' '}
                            <span className="is-primary-text">٨،٠٠٠</span>
                            {' '}
                            دینار
                          </List.Item>
                          <List.Item> بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                          <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                        </List>
                      </Col>

                    </Row>
                  </Card>
                </Col>
                <Col md={6} sm={24}>
                  <Card
                    className="custom-box-shadow price-table "
                    title={<Typography.Title className="is-primary-text" level={2} style={{ textAlign: 'center' }}>٥٠٠ پەڕە</Typography.Title>}
                    bordered={false}
                  >
                    <Card.Meta description={<span>&nbsp;</span>} />
                    <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
                      <Col span={24}>
                        <List>

                          <List.Item>
                            ٥٠٠ پەڕ بکڕە تەنها بە
                            {' '}
                            <span className="is-primary-text">٣٠،٠٠٠</span>
                            {' '}
                            دینار
                          </List.Item>
                          <List.Item> بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                          <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                        </List>
                      </Col>

                    </Row>
                  </Card>
                </Col>
                <Col md={6} sm={24}>
                  <Card
                    className="custom-box-shadow price-table "
                    title={<Typography.Title className="is-primary-text" level={2} style={{ textAlign: 'center' }}>١٠٠٠ پەڕە</Typography.Title>}
                    bordered={false}
                  >
                    <Card.Meta description={<span>&nbsp;</span>} />
                    <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
                      <Col span={24}>
                        <List>

                          <List.Item>
                            ١٠٠٠ پەڕ بکڕە تەنها بە
                            {' '}
                            <span className="is-primary-text">٥٠،٠٠٠</span>
                            {' '}
                            دینار
                          </List.Item>
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

          <Row style={{ marginTop: '8rem' }} align="middle">
            <Col md={12} sm={24} xs={24}>
              <Row gutter={[10, 30]} justify="center" align="middle" ref={contactUsRef}>
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
                    className=""
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
            </Col>
            <Col md={12} sm={24} style={{ textAlign: 'center' }}>
              <object style={{ width: '90%', marginBottom: '-1rem' }} type="image/svg+xml" data="/assets/footer.svg">svg-animation</object>
            </Col>
          </Row>

        </Layout.Content>

      </Layout>
    </>
  );
}

export const getServerSideProps = withIronSession(async ({ req, query }) => {
  const userObject = req.session.get('user');
  return {
    props: {
      user: userObject || null,
      rechargeStatus: query['recharge-status'] || null,
    },

  };
},
{
  cookieName: process.env.COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.SESSION_SECRET,
});
