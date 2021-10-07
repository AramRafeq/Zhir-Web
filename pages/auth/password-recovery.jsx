import React from 'react';
import { withIronSession } from 'next-iron-session';

import {
  Row, Col, Form, Card,
  Input,
  Button,
  Divider,
  Alert,
} from 'antd';
import Link from 'next/link';

import { ContactsOutlined } from '@ant-design/icons';
import superagent from 'superagent';
import PasswordRecoverySuccess from '../../components/auth/PasswordRecoverySuccess';
import PasswordRecoveryForm from '../../components/auth/PasswordRecoveryForm';

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
      superagent.post('/api/auth/request-password-recovery')
        .send({
          email: values.email,
        }).end((err) => {
          this.setState({ loading: false });

          if (!err) {
            this.setState({ success: true });
          } else {
            this.setState({ errMsg: err.response.body.errors[0].msg });
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
    const { token } = this.props;
    return (
      <Row justify="center" align="middle" style={{ height: `${windowHeight}px` }}>
        <Col span={6}>
          <Card className="custom-box-shadow" bordered={false} style={{ padding: '0.75rem' }}>
            <Row justify="center">
              <Col style={{ marginTop: '-5rem' }} span={7}>
                <Card className="custom-box-shadow is-primary-bg" bordered={false}>
                  <img src="/assets/white-logo.png" alt="logo" style={{ width: '100%' }} />
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: '2rem' }}>
              <Col span={24}>
                <p className="is-size-6">
                  لەکاتی لەبیرچوونەوە دەتوانیت تێپەڕەوشەی نوێ لە رێگای ئیمێڵەوە بەدەست بهێنیت
                  <Link href="/auth/login">
                    <a href="#_" style={{ color: 'red' }}> چوونەژوورەوە! </a>
                  </Link>
                </p>
                <Divider />
              </Col>
              <Col span={24} style={{ display: (success || token) ? 'none' : '' }}>
                <Form onFinish={this.onFinish} layout="vertical">
                  <Row gutter={[5, 5]}>
                    <Col span={24}>
                      <Form.Item
                        extra="* دەبێت پۆستی ئەلیکترۆنی پێشوتر تۆمارکرابێت"
                        name="email"
                        label="پۆستی ئەلیکترۆنی/ئیمەیڵ"
                        rules={[
                          { required: true, message: '* پۆستی ئەلیکترۆنی/ئیمەیڵ پێویستە ' },
                          { type: 'email', message: '* پۆستی ئەلیکترۆنی/ئیمەیڵ دروست بنووسە' },
                        ]}
                      >
                        <Input size="large" autoComplete="new" className="is-ltr" prefix={<ContactsOutlined className="is-icon-prefix" />} />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="submit">
                        <Button loading={loading} size="large" htmlType="submit" block type="primary">تێپەڕەوشە بنێرە</Button>
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
              <Col span={24} style={{ display: (!success && token !== '') ? 'none' : '' }}>
                <PasswordRecoverySuccess />
              </Col>
              <Col span={24} style={{ display: !token ? 'none' : '' }}>
                <PasswordRecoveryForm token={token} />
              </Col>

              <Col span={24}>
                <Divider />
                <p className="is-size-6">
                  هەژمارم نیە
                  <Link href="/auth/register">
                    <a href="#_" style={{ color: 'red' }}>فۆرمی خۆتۆمارکردن  </a>
                  </Link>
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

export const getServerSideProps = withIronSession(async ({ query, req, res }) => {
  const user = req.session.get('user');
  if (user) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return { props: {} };
  }
  return {
    props: {
      ...query,
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
