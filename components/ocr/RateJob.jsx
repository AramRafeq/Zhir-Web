/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Rate,
  notification,
} from 'antd';
import superagent from 'superagent';
import { LoadingOutlined } from '@ant-design/icons';

export default function RateJob(props) {
  const { user, jobId } = props;
  const [rating, setRating] = useState(false);
  const faces = {
    1: rating ? <LoadingOutlined spin /> : '😞',
    2: rating ? <LoadingOutlined spin /> : '😐',
    3: rating ? <LoadingOutlined spin /> : '🙂',
    4: rating ? <LoadingOutlined spin /> : '😀',
    5: rating ? <LoadingOutlined spin /> : '😄',
  };
  const faceDesc = [
    'زۆر خراپ',
    'خراپ',
    'باش',
    'زۆرباش',
    'نایاب',
  ];
  const onRatechange = (v) => {
    setRating(true);
    superagent.put(`${process.env.NEXT_PUBLIC_API_URL}/job/rate/${jobId}`)
      .set('authorization', `Bearer ${user.token}`)
      .send({
        rate: v,
      }).end((err) => {
        if (!err) {
          notification.success({
            message: 'نێردرا',
            description: 'سوپاس بۆ ناردنی هەڵسەنگاندن ماندووبونت  بەرز دەنرخێنین',
            placement: 'bottomRight',
          });
        } else {
          notification.error({
            message: 'هەڵە رویدا',
            description: 'هەڵەیەک رویدا لەکاتی ناردنی هەڵسەنگاندن',
            placement: 'bottomRight',
          });
        }
        setRating(false);
      });
  };
  return (
    <>
      <Rate
        onChange={onRatechange}
        tooltips={faceDesc}
        defaultValue={3}
        character={({ index }) => faces[index + 1]}
        disabled={rating}
      />
    </>
  );
}
