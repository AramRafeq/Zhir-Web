import React from 'react';
import { withIronSession } from 'next-iron-session';
import {
  Row, Col, Form, Card,
  Input,
  Button,
  Divider,
  Alert,
} from 'antd';
import {
  ContactsOutlined, LockOutlined, UserOutlined, TeamOutlined,
} from '@ant-design/icons';
import superagent from 'superagent';
import RegestrationSuccess from '../../components/auth/RegestrationSuccess';

export default class Login extends React.Component {
  constructor() {
    super();
    this.initialState = () => ({
      windowHeight: 0,
      loading: false,
      errMsg: null,
      success: false,
    });
    this.state = this.initialState();
    this.onFinish = (values) => {
      this.setState({ loading: true });
      superagent.post('/api/auth/register')
        .send(values).end((err) => {
          this.setState({ loading: false });

          if (!err) {
            this.setState({ success: true });
          } else if (err.status === 422) {
            const msg = (
              <ul>
                {' '}
                {(err.response.body.errors).map((e) => <li>{e.msg}</li>)}
                {' '}
              </ul>
            );
            this.setState({ errMsg: msg });
          }
        });
    };
  }

  componentDidMount() {
    this.setState({ windowHeight: window.innerHeight });
  }

  render() {
    const {
      windowHeight, loading, errMsg, success,
    } = this.state;
    return (
      <Row justify="center" align="middle" style={{ height: `${windowHeight}px` }}>
        <Col span={10}>
          <Card className="custom-box-shadow" bordered={false} style={{ padding: '0.75rem' }}>
            <Row justify="center">
              <Col style={{ marginTop: '-5rem' }} span={4}>
                <Card className="custom-box-shadow is-primary-bg" bordered={false}>
                  <img src="/assets/white-logo.png" alt="logo" style={{ width: '100%' }} />
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: '2rem' }}>
              <Col span={24}>
                <p className="is-size-6">
                  فۆرمی دروستکردنی هەژمارێکی نوێ /
                  <a href="/auth/login"> چوونەژوورەوە ! </a>
                </p>
                <Divider />
              </Col>
              <Col span={24} style={{ display: (success) ? 'none' : '' }}>
                <Form onFinish={this.onFinish} layout="vertical">
                  <Row gutter={[10, 5]}>
                    <Col span={12}>
                      <Form.Item
                        name="name"
                        label="ناوی بەکارهێنەر"
                        rules={[
                          { required: true, message: 'ناوی بەکارهێنەر پێویستە هەبێت' },
                        ]}
                      >
                        <Input size="large" autoComplete="off" prefix={<UserOutlined className="is-icon-prefix" />} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="company_name"
                        label="شوێنی کار/کۆمپانیا"
                        extra="دەکرێت بە بەتاڵی بەجێی بهێڵیت / ئارەزوومەندانەیە "
                      >
                        <Input size="large" autoComplete="off" prefix={<TeamOutlined className="is-icon-prefix" />} />
                      </Form.Item>
                    </Col>
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
                    <Col span={12}>
                      <Form.Item
                        name="password"
                        label="تێپەڕەوشە"
                        rules={[
                          { required: true, message: 'تێپەڕەوشە پێویستە' },
                        ]}
                        hasFeedback
                      >
                        <Input.Password autoComplete="off" size="large" className="is-ltr" prefix={<LockOutlined className="is-icon-prefix" />} />

                      </Form.Item>
                    </Col>
                    <Col span={12}>

                      <Form.Item
                        name="password_retype"
                        label="تێپەڕەوشە/دووبارە"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: 'دوبارەی تێپەڕەوشە پێویستە',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('تێپەڕەوشەکان جیاوازن'));
                            },
                          }),
                        ]}
                      >
                        <Input.Password autoComplete="off" size="large" className="is-ltr" prefix={<LockOutlined className="is-icon-prefix" />} />

                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="submit">
                        <Button loading={loading} size="large" htmlType="submit" block type="primary">دروستکردنی هەژمار</Button>
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
              <Col span={24} style={{ display: (!success) ? 'none' : '' }}>
                <RegestrationSuccess />
              </Col>

              <Col span={24}>
                <Divider />
                <p className="is-size-6">
                  چوونەژوورەوە بۆ ناسینەوەی وێنە
                  <a href="/auth/password-recovery"> تێپەڕەوشەم بیرچۆتەوە ؟ </a>
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
