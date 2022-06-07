import React from 'react';
import Head from 'next/head';
import { withIronSession } from 'next-iron-session';
import { Tabs, Modal } from 'antd';
import { MdDocumentScanner, MdAttachMoney } from 'react-icons/md';
import { AiFillApi, AiFillQuestionCircle } from 'react-icons/ai';
import { GoBook } from 'react-icons/go';

import authGuard from '../../../helpers/authGuard';
import Layout from '../../../components/layout/Dashboard';
import OCR from '../../../components/ocr/Ocr';
import ForDevelopers from '../../../components/ocr/ForDevelopers';
import Faq from '../../../components/ocr/Faq.jsx';
import Guideline from '../../../components/ocr/Guideline';
import Balance from '../../../components/ocr/Balance';

const PepuModal = () => {
  Modal.info({
    title: 'ئەپلیکەیشنی پەپوو هاوڕێی خوێندنت',
    okText: 'دابخە',
    width: '85%',
    content: (
      <div>
        <h3 style={{ textAlign: 'right' }}>
          پەپوو پلاتفۆڕمێکی پەروەردەیی نوێیە ئامانج تێیدا یارمەتیدانی
          قوتابیانە بۆ تێگەیشتنی باشتر و بەدەستهێنانی نمرەی بەرزتر.
          &nbsp;
          <b>
            <a href="http://onelink.to/hv2tk3">دابەزاندنی ئەپلیکەیشنی پەپوو</a>
          </b>
        </h3>
        <a href="http://onelink.to/hv2tk3">
          <img width="100%" alt="ئەپلیکەیشنی پەپوو داببەزێنە" src="https://ewr1.vultrobjects.com/pepu/images/main-slides/s1.png" />
        </a>
      </div>
    ),
    onOk() {},
  });
};
class OCRIndex extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    PepuModal();
  }

  render() {
    const { url, user } = this.props;
    const TabIconStyle = {
      fontSize: 15,
      marginLeft: 5,
      marginBottom: -5,
    };
    return (
      <>
        <Head>
          <title>ژیر | داشبۆردی ژیر</title>

          <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js" integrity="sha512-Z8CqofpIcnJN80feS2uccz+pXWgZzeKxDsDNMD/dJ6997/LSRY+W4NmEt9acwR+Gt9OHN0kkI1CTianCwoqcjQ==" crossOrigin="anonymous" />
          <style />
        </Head>
        <Layout
          url={url}
        >
          <Tabs animated destroyInactiveTabPane tabPosition="top" defaultActiveKey="ocr">
            <Tabs.TabPane
              tab={(
                <span>
                  <MdDocumentScanner style={TabIconStyle} />
                  دەرهێنانی نووسین / OCR
                </span>
            )}
              key="ocr"
            >
              <OCR user={user} />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={(
                <span>
                  <GoBook style={TabIconStyle} />
                  ڕێنمایەکانی بەکارهێنان
                </span>
            )}
              key="ocr-guideline"
            >
              <Guideline />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={(
                <span>
                  <AiFillQuestionCircle style={TabIconStyle} />
                  پرسیارەکان
                  دەربارەی OCR
                </span>
            )}
              key="ocr-faq"
            >
              <Faq />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={(
                <span>
                  <MdAttachMoney style={TabIconStyle} />
                  باڵانس
                </span>
            )}
              key="balance"
            >
              <Balance user={user} />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={(
                <span>
                  <AiFillApi style={TabIconStyle} />
                  API

                  بۆ گەشەپێدەران
                </span>
            )}
              key="for-devs"
            >
              <ForDevelopers user={user} />
            </Tabs.TabPane>

          </Tabs>
        </Layout>
      </>
    );
  }
}

export default OCRIndex;
export const getServerSideProps = withIronSession(authGuard,
  {
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
    password: process.env.SESSION_SECRET,
  });
