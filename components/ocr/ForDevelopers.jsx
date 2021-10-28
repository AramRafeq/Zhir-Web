import React from 'react';
import {
  Row, Col, Form, Card,
  Input,
  Typography,
  List,
} from 'antd';

export default class ForDevelopers extends React.Component {
  constructor() {
    super();
    this.initialState = () => ({
      windowHeight: 0,
      loading: false,
      errMsg: null,
      success: false,
    });
    this.state = this.initialState();
  }

  componentDidMount() {
    this.setState({ windowHeight: window.innerHeight });
  }

  render() {
    const {
      windowHeight,
    } = this.state;
    const { user } = this.props;
    const initialFormValues = {
      api_key: user.api_key,
      monthly_recharge: user.monthly_recharge,
    };
    return (
      <Row justify="center" style={{ height: `${windowHeight}px` }}>
        <Col span={24}>
          <Card bordered={false}>
            <Row style={{ marginTop: '2rem' }}>
              <Col span={24}>
                <Form layout="vertical" initialValues={initialFormValues}>
                  <Row gutter={[10, 5]}>
                    <Col span={12}>

                      <Form.Item extra="تێبینی: دەتوانیت ئەم کلیلە بەکارببەیت بۆ بەکارهێنانی API ئەم کلیلە نەگۆرێکی تایبەتە بە هەژماری تۆ" label="کلیلی API" name="api_key">
                        <Input style={{ textAlign: 'center' }} size="large" autoComplete="new" readOnly />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item extra="تێبینی: ئەم بڕە بەپێی ڕێکەوتنە بەڵام وەک هەر هەژمارێکی ئاسایی دەتوانیت باڵانسی زیاتر بکڕیت بۆ بەکارهێنانی لە API یان بە هەژماری خۆڕایی مانگانە ٥٠ لاپەڕە وەربگرە" label="پەڕەی وەرگیراو / مانگانە" name="monthly_recharge">
                        <Input style={{ textAlign: 'center' }} size="large" autoComplete="new" readOnly />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Typography.Title>ڕێنمایی بەکارهێنانی API</Typography.Title>

                      <List>
                        <List.Item>
                          1. بۆ ئەوەی API ژیر بەکاربهێنیت دەبێت کلیلەکە لە هێدەری x-api-key
                          بنێریت لەگەڵ هەموو داواکاریەک بەڵام
                          ئاگاداربە دەبێت ئەم داواکاری ناردن و کردارە
                          لەسەر ڕاژە (سێرڤەر) بکرێت بۆ ئەوەی کەس دەستی نەگات بەم کلیلە
                        </List.Item>
                        <List.Item>
                          2. هەرکاتێک تاقیکردنەوەت کرد پێویستە هێدەری IS-SANDBOX
                          ىنێریت بۆ ئەوەی ژیر هەندێک کردار و ئاسانکاری بکات
                        </List.Item>
                        <List.Item>
                          3. لەکاتی گەشەپێدان لەسەر کۆمپیتەری کەسی بۆ ئەوەی
                          ژیر بتوانێت بانگی بەستەرێکی وەک
                          localhost بکات کە لەسەر کۆمپیتەری کەسیە دەبێت خزمەتگوزاریەکی وەک
                          ngrok.io بەکاربهێنیت و ئەو بەستەرەی ئەو پێتی دەدات لە پرۆفایلەکەت دابنێیت
                          &nbsp;
                          <a href="https://blog.theodo.com/2016/06/expose-your-local-environment-to-the-world-with-ngrok/" alt="how to use ngrok">
                            دەتوانیت سوود لەم بەستەرە وەربگریت
                          </a>
                          &nbsp;
                          بە کرتەکردن
                          &nbsp;
                          <a href="https://www.getpostman.com/collections/f49f67137ca6c4319897" target="_blank" rel="noreferrer">
                            لەسەر ئەم بەسەتەرە دەتوانیت
                            کۆلێکشنی پۆستمان وەبگریت بە فۆرماتی JSON
                          </a>

                        </List.Item>
                      </List>
                    </Col>
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
