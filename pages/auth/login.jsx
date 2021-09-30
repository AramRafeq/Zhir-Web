import React from 'react';
import Router from 'next/router';
import { withIronSession } from 'next-iron-session';
import {
  Row, Col, Form, Card,
  Input,
  Button,
  Divider,
  Alert,
} from 'antd';
import { ContactsOutlined, LockOutlined } from '@ant-design/icons';
import superagent from 'superagent';

export default class Login extends React.Component {
  constructor() {
    super();
    this.initialState = () => ({
      windowHeight: 0,
      loading: false,
      errMsg: null,
    });
    this.state = this.initialState();
    this.onFinish = (values) => {
      this.setState({ loading: true });
      superagent.post('/api/auth/login')
        .send({
          email: values.email,
          password: values.password,
        }).end((err) => {
          this.setState({ loading: false });

          if (!err) {
            Router.push('/private');
          } else {
            this.setState({ errMsg: err.response.body.msg });
          }
        });
    };
  }

  componentDidMount() {
    this.setState({ windowHeight: window.innerHeight });
  }

  render() {
    const { windowHeight, loading, errMsg } = this.state;
    return (
      <Row justify="center" align="middle" style={{ height: `${windowHeight}px` }}>
        <Col span={8}>
          <Card className="custom-box-shadow" bordered={false} style={{ padding: '0.75rem' }}>
            <Row justify="center">
              <Col style={{ marginTop: '-5rem' }} span={6}>
                <Card className="custom-box-shadow" bordered={false}>
                  <img src="/assets/black-logo.png" alt="logo" style={{ width: '100%' }} />
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: '2rem' }}>
              <Col span={24}>
                <p className="is-size-6">
                  چوونەژوورەوە بۆ هەژماری ژیر بۆ سوودمەندبوون لە خزمەتگوزاریەکان
                  <a href="/auth/register"> هەژمارم نیە نوێ ! </a>
                </p>
                <Divider />
              </Col>
              <Col span="24">
                <Form onFinish={this.onFinish} layout="vertical">
                  <Row gutter={[5, 10]}>
                    <Col span={24}>
                      <Form.Item
                        name="email"
                        label="پۆستی ئەلیکترۆنی/ئیمەیڵ"
                        rules={[
                          { required: true, message: 'پۆستی ئەلیکترۆنی/ئیمەیڵ پێویستە' },
                          { type: 'email', message: 'پۆستی ئەلیکترۆنی/ئیمەیڵ دروست بنووسە' },
                        ]}
                      >
                        <Input size="large" autoComplete="off" className="is-ltr" prefix={<ContactsOutlined className="is-icon-prefix" />} />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="password"
                        label="تێپەڕەوشە"
                        rules={[
                          { required: true, message: 'تێپەڕەوشە پێویستە' },
                        ]}
                      >
                        <Input.Password size="large" className="is-ltr" prefix={<LockOutlined className="is-icon-prefix" />} />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="submit">
                        <Button loading={loading} size="large" htmlType="submit" block type="primary">چوونەژوورەوە</Button>
                      </Form.Item>
                    </Col>
                    {errMsg ? (
                      <Col span={24}>
                        <Alert type="error" message={errMsg} />
                      </Col>
                    ) : null}
                  </Row>
                </Form>
              </Col>
              <Col span={24}>
                <Divider />
                <p className="is-size-6">
                  چوونەژوورەوە بۆ ناسینەوەی وێنە
                  <a href="/auth/register"> تێپەڕەوشەم بیرچۆتەوە ؟ </a>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get('user');
  if (user) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return { props: {} };
  }

  return {
    props: { },
  };
},
{
  cookieName: process.env.COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
  password: process.env.SESSION_SECRET,
});
