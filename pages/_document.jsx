import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charset="utf-8" />
          <meta content="width=device-width,initial-scale=1" name="viewport" />
          <meta content="ژیر | خزمەتگوزاری دەرهێنانی دەقەکان" name="title" />
          <meta content="ژیر خزمەتگوزارییەکی سەرهێڵی OCR ـە، واتە بەکاردێ بۆ دەرهێنانی نووسین (دەق) لە ناو وێنە، بۆ نموونە دۆکیومێنتێکی پرینتکراوت هەیە دەتەوێ تایپی بکەی، دەتوانی دۆکیومێنتەکە سکان بکەی یانیش بە مۆبایل وێنەی پەڕەکانی بگری و ئەپڵۆدی بکەی و ژیر بۆت دەکاتە فایلی MS WORD و PDF" name="description" />
          <meta content="ocr,kurdish ocr,sorani ocr, ckb ocr,zhir,وێنە بۆ نووسین, AI, AI company, AI 2021, camscaner kurdish" name="keywords" />
          <title>ژیر | خزمەتگوزاری دەرهێنانی دەقەکان</title>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                window.fbAsyncInit = function() {
                  FB.init({
                  xfbml            : true,
                  version          : 'v9.0'
                  });
                };
                
                (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              
            `,
            }}
          />

          <script src="https://cdn.scaleflex.it/plugins/filerobot-image-editor/3.12.17/filerobot-image-editor.min.js" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
        </Head>
        <body>
          <div id="fb-root" />
          <div
            className="fb-customerchat"
            attribution="setup_tool"
            page_id="106496797999813"
            theme_color="#0A7CFF"
            logged_in_greeting="سڵاو چۆن دەتوانین یارمەتیت بدەین"
            logged_out_greeting="سڵاو چۆن دەتوانین یارمەتیت بدەین"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
