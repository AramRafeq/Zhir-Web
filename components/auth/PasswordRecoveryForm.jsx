import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import Router from 'next/router';

import {
  Form, Row, Col, Alert, Button, Input,
} from 'antd';
import superagent from 'superagent';

class PasswordRecoveryForm extends React.Component {
  constructor(props) {
    super();
    this.initialState = () => ({
      loading: false,
      errMsg: null,
    });
    this.state = this.initialState();
    this.onFinish = (values) => {
      this.setState({ loading: true });
      superagent.post('/api/auth/password-recovery')
        .send({
          password: values.password,
          password_retype: values.password_retype,
          token: props.token,
        }).end((err) => {
          this.setState({ loading: false });

          if (!err) {
            // this.setState({ success: true });
            Router.push('/private');
          } else if (err.response.status === 400) {
            this.setState({ errMsg: err.response.body.msg });
          } else {
            this.setState({ errMsg: err.response.body.errors[0].msg });
          }
        });
    };
  }

  render() {
    const { token } = this.props;
    const { loading, errMsg } = this.state;
    if (token === '' || token === undefined) {
      return <p>تکایە تۆکنێکی دروست دابنێ</p>;
    }
    return (
      <Form onFinish={this.onFinish} layout="vertical">
        <Row gutter={[5, 10]}>
          <Col span={24}>
            <Form.Item
              name="password"
              label="تێپەڕەوشەی نوێ"
              rules={[
                { required: true, message: 'تێپەڕەوشە پێویستە' },
              ]}
              hasFeedback
            >
              <Input.Password autoComplete="off" size="large" className="is-ltr" prefix={<LockOutlined className="is-icon-prefix" />} />

            </Form.Item>
          </Col>
          <Col span={24}>

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
              <Button loading={loading} size="large" htmlType="submit" block type="primary">گۆڕینی تێپەڕەوشە</Button>
            </Form.Item>
          </Col>
          {errMsg ? (
            <Col span={24}>
              <Alert type="error" message={errMsg} />
            </Col>
          ) : null}
        </Row>
      </Form>
    );
  }
}
export default PasswordRecoveryForm;
