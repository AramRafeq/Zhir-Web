import React from 'react';
import Head from 'next/head';
import { withIronSession } from 'next-iron-session';
import { Tabs } from 'antd';
import { MdDocumentScanner } from 'react-icons/md';
import authGuard from '../../../helpers/authGuard';
import Layout from '../../../components/layout/Index';
import OCR from '../../../components/ocr/Ocr';

class OCRIndex extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { url } = this.props;
    const TabIconStyle = {
      fontSize: 15,
      marginLeft: 5,
      marginBottom: -5,
    };
    return (
      <>
        <Head>
          <script src="https://cdn.scaleflex.it/plugins/filerobot-image-editor/3.12.17/filerobot-image-editor.min.js" />
        </Head>
        <Layout
          url={url}
        >
          <Tabs tabPosition="top" defaultActiveKey="ocr">
            <Tabs.TabPane
              tab={(
                <span>
                  <MdDocumentScanner style={TabIconStyle} />
                  دەرهێنانی نووسین
                </span>
            )}
              key="ocr"
            >
              <OCR />
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
