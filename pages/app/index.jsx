import React from 'react';

export default function Index() {
  return (<p>APP Index</p>);
}
export const getServerSideProps = async ({ res }) => {
  res.writeHead(302, { Location: '/app/ocr' });
  res.end();
  return {
    props: { },
  };
};
