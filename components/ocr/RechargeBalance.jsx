import React, { useState, useEffect } from 'react';
import {
  Row, Col,
  List,
  Card,
  Button,
  Alert,
} from 'antd';
import Modal from '../basic/Modal';

export default function Balance(props) {
  const { user } = props;
  const qrCodeModalRef = React.createRef();
  const [pageIndex, setPageIndex] = useState(-1);
  const fastpayMob = '964 750 766 5935';
  const pages = [20, 50, 100, 500, 1000];
  const labels = ['🎁 دیاری ', '٥٠ پەڕە', '١٠٠ پەڕە', '٥٠٠ پەڕە ', '١،٠٠٠ پەڕە'];
  const prices = ['٠', '٥ هەزار', '٨ هەزار', '٣٠ هەزار', '٥٠ هەزار'];
  const QRCodeUrls = [
    '',
    '/assets/fastpay-qrcodes/5000IQD.png',
    '/assets/fastpay-qrcodes/8000IQD.png',
    '/assets/fastpay-qrcodes/30000IQD.png',
    '/assets/fastpay-qrcodes/50000IQD.png',
  ];
  const currency = 'iqd'; // it could take iqd,rial
  const showFastpayBarcode = (pI = 0) => {
    setPageIndex(pI);
  };
  useEffect(() => {
    if (pageIndex !== -1) {
      qrCodeModalRef.current.click();
    }
  }, [pageIndex]);

  return (
    <>
      <Modal btnRef={qrCodeModalRef} size="modal-md">
        <Row justify="center" style={{ marginTop: 20 }}>
          <Col span={24}>
            <Alert
              message={(
                <p style={{ fontSize: 15 }}>
                  گەر دڵنیای لە کڕینی
                  {' '}
                  <u>{labels[pageIndex]}</u>
                  {' '}
                  بە بڕی
                  &nbsp;
                  <u>
                    {' '}
                    {prices[pageIndex]}
                  </u>
                  &nbsp;
                  ئەم
                  بارکۆدەی خوارەوە بە فاستپەی (
                  <img src="/assets/fastpay.png" width="60" alt="fastpay" />
                  ) سکان بکە
                </p>
            )}
              type="warning"
              style={{ border: 'none' }}
            />
          </Col>
          <Col style={{ textAlign: 'center' }} span={24}>
            <img width="40%" src={QRCodeUrls[pageIndex]} alt="fastpay" />
          </Col>
          <Col style={{ textAlign: 'center' }} span={24}>
            <Alert
              type="info"
              style={{ border: 'none' }}
              message={(
                <List size="small">
                  <List.Item>
                    ئاگاداری ژمارەی مۆبایلی هەژمارەکەت بە دەبێت هەمان ئەو
                    ژمارەی فاستپەی بێت (
                    <a target="_blank" href="/app/profile"> نوێکردنەوەی ژمارەی مۆبایل</a>
                    )
                  </List.Item>
                  <List.Item>
                    لە ماوەی کەمتر لە ٢ کاتژمێر هەژمارەکەت پڕ
                    دەکرێتەوە ئەگەر لەو کاتە زیاتر بوو تکایە پەیوەندی بکە
                  </List.Item>
                  <List.Item>
                    لەکاتی بوونی هەر هەڵەیەک پەیوەندی بکەن بە ژمارە
                    <bdi className="is-ltr">

                      +964 750 766 5935
                    </bdi>
                  </List.Item>
                </List>
              )}
            />

          </Col>

        </Row>
      </Modal>
      <Row gutter={[15, 15]} style={{ padding: 20 }}>
        <Col span={6}>
          <Card
            className="custom-box-shadow price-table "
            title={<h2 className="is-primary-text" style={{ textAlign: 'center' }}>٢٠ پەڕە</h2>}
          >
            <Card.Meta description="مانگانە ٢٠ پەڕە بەخۆڕایی وەردەگریت" />
            <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
              <Col span={24}>
                <List>
                  <List.Item>وەرگرتنی ٢٠ پەڕە مانگانە</List.Item>
                  <List.Item>توانای بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                  <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                </List>
              </Col>
              <Col span={24}>
                <Button size="large" type="dashed" block disabled>
                  {/* <img src="/assets/fastpay.png" width="50" alt="" /> */}
                  بەخۆڕاییە
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6} style={{ display: 'none' }}>
          <Card
            className="custom-box-shadow price-table "
            title={<h2 style={{ textAlign: 'center' }}>٥٠ پەڕە</h2>}
          >
            <Card.Meta description={<span>&nbsp;</span>} />
            <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
              <Col span={24}>
                <List>
                  <List.Item>٥٠ پەڕ بکڕە تەنها بە ٥،٠٠٠ دینار</List.Item>
                  <List.Item>توانای بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                  <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                </List>
              </Col>
              <Col span={24}>
                <Button size="large" type="dashed" block>
                  <img src="/assets/fastpay.png" width="50" alt="" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="custom-box-shadow price-table price-table-primary-bg"
            title={<h2 style={{ textAlign: 'center', color: 'white' }}>١٠٠ پەڕە</h2>}
          >
            <Card.Meta description={<span>&nbsp;</span>} />
            <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
              <Col span={24}>
                <List>
                  <List.Item>١٠٠ پەڕ بکڕە تەنها بە ٨،٠٠٠ دینار</List.Item>
                  <List.Item>توانای بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                  <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                </List>
              </Col>
              <Col span={24}>
                <Button onClick={() => showFastpayBarcode(2)} size="large" type="dashed" block>
                  <img src="/assets/fastpay.png" width="50" alt="" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="custom-box-shadow price-table "
            title={<h2 className="is-primary-text" style={{ textAlign: 'center' }}>٥٠٠ پەڕە</h2>}
          >
            <Card.Meta description={<span>&nbsp;</span>} />
            <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
              <Col span={24}>
                <List>
                  <List.Item>٥٠٠ پەڕ بکڕە تەنها بە ٣٠،٠٠٠ دینار</List.Item>
                  <List.Item>توانای بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                  <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                </List>
              </Col>
              <Col span={24}>
                <Button onClick={() => showFastpayBarcode(3)} size="large" type="dashed" block>
                  <img src="/assets/fastpay.png" width="50" alt="" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            className="custom-box-shadow price-table "
            title={<h2 className="is-primary-text" style={{ textAlign: 'center' }}>١٠٠٠ پەڕە</h2>}
          >
            <Card.Meta description={<span>&nbsp;</span>} />
            <Row gutter={[0, 10]} style={{ marginTop: 10 }}>
              <Col span={24}>
                <List>
                  <List.Item>١٠٠٠ پەڕ بکڕە تەنها بە ٥٠،٠٠٠ دینار</List.Item>
                  <List.Item>توانای بەکارهێنانی ژیر OCR بە هەموو توانایەکانیەوە</List.Item>
                  <List.Item>بەکارهێنانی API بەردەرستە</List.Item>
                </List>
              </Col>
              <Col span={24}>
                <Button onClick={() => showFastpayBarcode(4)} size="large" type="dashed" block>
                  <img src="/assets/fastpay.png" width="50" alt="" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>

      </Row>
    </>
  );
}
