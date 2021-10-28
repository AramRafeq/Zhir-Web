import React from 'react';
import {
  Row, Col,
  Typography,
  List,
} from 'antd';

export default function Guideline() {
  return (
    <Row justify="center">
      <Col span={24}>
        <Row gutter={[10, 5]}>
          <Col span={24}>
            <Typography.Title>ڕێنماییەکانی بەکارهێنان</Typography.Title>

            <List>
              <List.Item>
                <Row gutter={[10, 10]} style={{ textAlign: 'center' }} justify="center">
                  <Col span={24}>
                    <h3>
                      ١. هەوڵ بدە پەڕەکان سکان بکەی. هەرچەندە ژیر دەتوانێ وێنەی
                      مۆبایلیش بخوێنێتەوە، بەڵام سکانکردنی پەڕەکان ئەنجامی زۆر باشترت دەدەنێ.
                    </h3>
                  </Col>
                  <Col span={24}>
                    <img width="55%" alt="rule-1-scanned-is-better" src="/assets/rule-1-scanned-is-better.png" />
                  </Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row gutter={[10, 10]} style={{ textAlign: 'center' }} justify="center">
                  <Col span={24}>
                    <h3>
                      ٢. هەوڵ بدە پەڕەکە بە ڕێکی سکان بکەی. ژیر هەوڵ
                      دەدا کە پەڕەکان ڕێک بکا ئەگەر لار ببن،
                      بەڵام ئەگەر لە بنەڕەتەوە پەڕەکان ڕێک بن، ئەنجامی باشترت دەست دەکەوێ.
                    </h3>
                  </Col>
                  <Col span={24}>
                    <img width="55%" alt="rule-2-no-angles.png" src="/assets/rule-2-no-angles.png" />
                  </Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row gutter={[10, 10]} style={{ textAlign: 'center' }} justify="center">
                  <Col span={24}>
                    <h3>
                      ٣. با باکگراوندی وێنەکان سپی یان ڕەنگێکی سادەی کاڵ بن.
                      ژیر زەحمەتتر دەتوانێ وێنەیەک بخوێنێتەوە
                      کە لەسەر باکگڕاوندی ئاڵۆز یان ڕەش نووسرابێت.
                    </h3>
                  </Col>
                  <Col span={24}>
                    <img width="55%" alt="rule-3-no-background.png" src="/assets/rule-3-no-background.png" />
                  </Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row gutter={[10, 10]} style={{ textAlign: 'center' }} justify="center">
                  <Col span={24}>
                    <h3>
                      ٤. با پەڕەکان بە فلاتی سکان کرابێ، چەمانەوە لە پەڕەکان
                      هەڵە زیاد دەکا لە کاتی ناسینەوەی نووسەکان.
                    </h3>
                  </Col>
                  <Col span={24}>
                    <img width="55%" alt="rule-4-no-curve.png" src="/assets/rule-4-no-curve.png" />
                  </Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row gutter={[10, 10]} style={{ textAlign: 'center' }} justify="center">
                  <Col span={24}>
                    <h3>
                      ٥. ژیر ناتوانێت دەسنوس بناسێتەوە و زانیاری دروست دەربهێنێت،
                      خۆت بەدووربگرە لە ناردنی وێنەی دەسنوس.
                    </h3>
                  </Col>
                  <Col span={24}>
                    <img width="55%" alt="rule-5-no-handwriting.png" src="/assets/rule-5-no-handwriting.png" />
                  </Col>
                </Row>
              </List.Item>

            </List>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
