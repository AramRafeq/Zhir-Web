import React, { useState, useEffect } from 'react';
import {
  Progress, notification, Row, Col,
} from 'antd';

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
export default function PDFConvertor(props) {
  const { file, onFinish, onStart } = props;
  const [PDFProgress, setPDFProgress] = useState(0);
  const [PDFPageCount, setPDFPageCount] = useState(0);

  const convertFile = (fileObject) => {
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.disableWorker = true;

    const fileReader = new FileReader();
    fileReader.onload = function PDFFileLoaded() {
      // Step 4:turn array buffer into typed array
      // eslint-disable-next-line react/no-this-in-sfc
      const typedarray = new Uint8Array(this.result);

      // Step 5:pdfjs should be able to read this
      const loadingTask = pdfjsLib.getDocument(typedarray);
      loadingTask.promise.then(async (pdf) => {
        try {
          onStart(fileObject);
        } catch (e) {
          // comment
        }
        const pages = [];
        const heights = [];
        let width = 0;
        let height = 0;
        let currentPage = 1;
        const scale = 1.5;

        setPDFPageCount(pdf.numPages);

        const done = () => {
          pages.sort((a, b) => a.pageIndex - b.pageIndex);
          const finishedPages = [];

          for (let i = 0; i < pages.length; i += 1) {
            finishedPages.push(
              dataURLtoFile(pages[i].base64, `${file.name.split('.').slice(0, -1).join('.')} - ${pages[i].pageIndex}.jpg`),
            );
          }
          try {
            onFinish(finishedPages, file);
          } catch (e) {
            // do not handle it
          }
        };
        const getPage = () => {
          pdf.getPage(currentPage).then((page) => {
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const ctx = canvas.getContext('2d');
            const renderContext = { canvasContext: ctx, viewport };
            const renderTask = page.render(renderContext).promise;
            renderTask.then(() => {
              pages.push({
                pageIndex: currentPage,
                imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
                base64: canvas.toDataURL('image/jpeg', 0.85),
              });
              heights.push(height);
              height += canvas.height;
              if (width < canvas.width) width = canvas.width;
              if (currentPage < pdf.numPages) {
                currentPage += 1;
                setPDFProgress(currentPage);
                getPage();
              } else {
                done();
              }
            });
          });
        };
        if (PDFPageCount < 100) {
          getPage();
        } else {
          notification.error({
            description: 'هەڵە ڕویدا لەکاتی گۆڕینی PDF',
            message: 'لە ئێستادا ناتوانیت PDF ێک باربکەیت کە لە ١٠٠ لاپەڕە زیاتر بێت',
            placement: 'bottomRight',
          });
        }
      }, () => {
        // PDF loading error
      });
    };
    // Step 3:Read the file as ArrayBuffer
    fileReader.readAsArrayBuffer(fileObject);
  };

  useEffect(() => {
    if (file !== null) {
      convertFile(file);
    }
  }, [file]);

  if (process.browser) {
    return (
      <>
        <Row
          gutter={[10, 0]}
          justify="center"
          align="middle"
          style={{
            borderRadius: 7,
            border: '1px dashed rgb(135 208 104)',
            marginBottom: 10,
            padding: 10,
          }}
        >
          <Col span={24}>
            <h4>
              گۆڕینی
              &nbsp;
              {file.name}
              &nbsp;
              بۆ وێنە
            </h4>
          </Col>
          <Col span={24}>

            <Progress
              strokeColor={{
                '100%': '#87d068',
                '0%': '#87d068',
              }}
              className="is-ltr"
              percent={Math.round((PDFProgress / PDFPageCount) * 100)}
            />
          </Col>
          <Col span={24}>
            <span>
              گۆڕین پەڕەی
              &nbsp;
              {PDFProgress}
              &nbsp;
              سەرکەوتووبوو لە کۆی
              &nbsp;
              {PDFPageCount}
            </span>
          </Col>
        </Row>
      </>
    );
  }
  return <h1>Hello Server Inside PDF Convertor</h1>;
}
