import React from 'react';
import {
  Row, Col, Form, Card,
  Input,
  Button,
  Alert,
  notification,
} from 'antd';

import {
  ContactsOutlined, LockOutlined, UserOutlined, TeamOutlined, MobileOutlined,
} from '@ant-design/icons';
import superagent from 'superagent';

export default class Profile extends React.Component {
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
      const reqBody = {
        ...values,
        password: values.password !== '' ? values.password : undefined,
        password_retype: values.password !== '' ? values.password : undefined,
      };
      this.setState({ loading: true });
      superagent.put('/api/user/profile')
        .send(reqBody).end((err) => {
          this.setState({ loading: false });
          if (!err) {
            notification.success({
              message: 'تەواوکرا',
              description:
                'زانیاریەکانت نوێکرایەوە',
              placement: 'bottomRight',
            });
          } else if (err.status === 422) {
            const msg = (
              <ul>
                {' '}
                {(err.response.body.errors).map((e) => <li>{e.msg}</li>)}
                {' '}
              </ul>
            );
            this.setState({ errMsg: msg });
          } else {
            this.setState({ errMsg: 'بوورە ‌هەڵەیەک روویدا لەکاتی نوێکردنەوە' });
          }
        });
    };
  }

  componentDidMount() {
    this.setState({ windowHeight: window.innerHeight });
  }

  render() {
    const {
      windowHeight, loading, errMsg,
    } = this.state;
    const { user } = this.props;
    const initialFormValues = {
      name: user.name,
      company_name: user.company_name,
      phone_no: user.phone_no,
      email: user.email,
      password: '',
      password_retype: '',
    };
    return (
      <Row justify="center" style={{ height: `${windowHeight}px` }}>
        <Col span={24}>
          <Card bordered={false}>
            <Row style={{ marginTop: '2rem' }}>
              <Col span={24}>
                <Form initialValues={initialFormValues} onFinish={this.onFinish} layout="vertical">
                  <Row gutter={[10, 5]}>
                    <Col lg={12} xl={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="name"
                        label="ناوی بەکارهێنەر"
                        rules={[
                          { required: true, message: 'ناوی بەکارهێنەر پێویستە هەبێت' },
                        ]}
                      >
                        <Input size="large" autoComplete="new" prefix={<UserOutlined className="is-icon-prefix" />} />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xl={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="company_name"
                        label="شوێنی کار/کۆمپانیا"
                        extra="دەکرێت بە بەتاڵی بەجێی بهێڵیت / ئارەزوومەندانەیە "
                      >
                        <Input size="large" autoComplete="new" prefix={<TeamOutlined className="is-icon-prefix" />} />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xl={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="email"
                        label="پۆستی ئەلیکترۆنی/ئیمەیڵ"
                        rules={[
                          { required: true, message: 'پۆستی ئەلیکترۆنی/ئیمەیڵ پێویستە' },
                          { type: 'email', message: 'پۆستی ئەلیکترۆنی/ئیمەیڵ دروست بنووسە' },
                        ]}
                      >
                        <Input size="large" autoComplete="new" className="is-ltr" prefix={<ContactsOutlined className="is-icon-prefix" />} />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xl={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="phone_no"
                        label="ژمارەی مۆبایل"
                        rules={[
                          { required: true, message: 'ژمارەی مۆبایل پێویستە' },
                        ]}
                      >
                        <Input size="large" autoComplete="new" className="is-ltr" prefix={<MobileOutlined className="is-icon-prefix" />} />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xl={12} md={12} sm={24} xs={24}>
                      <Form.Item
                        name="password"
                        extra="تێبینی: ئەم بەشە پێویست نیە بنوسرێت تەنها لەکاتی گۆڕینی تێپەڕەوشە"
                        label="تێپەڕەوشە"
                        hasFeedback
                      >
                        <Input.Password size="large" autoComplete="new-password" className="is-ltr" prefix={<LockOutlined className="is-icon-prefix" />} />

                      </Form.Item>
                    </Col>
                    <Col lg={12} xl={12} md={12} sm={24} xs={24}>

                      <Form.Item
                        name="password_retype"
                        label="تێپەڕەوشە/دووبارە"
                        extra="تێبینی: ئەم بەشە پێویست نیە بنوسرێت تەنها لەکاتی گۆڕینی تێپەڕەوشە"
                        dependencies={['password']}
                        hasFeedback
                        rules={[

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
                        <Input.Password size="large" autoComplete="new" className="is-ltr" prefix={<LockOutlined className="is-icon-prefix" />} />

                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item name="submit">
                        <Button size="large" loading={loading} htmlType="submit" block type="primary">نوێکردنەوەی زانیاریەکانم</Button>
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
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
