import React from 'react';
import { notification } from 'antd';

export default (err) => {
  if (err.response) {
    const { response } = err;
    const { statusCode, body, statusText } = response;
    if (statusCode === 422) {
      notification.error({
        message: 'Sorry..',
        description: (
          <ul>
            {body.errors.map((err2) => (
              <li>
                {err2.param}
                {' '}
                -
                {' '}
                {err2.msg}
              </li>
            ))}
          </ul>
        ),
        placement: 'bottomRight',
      });
    } else if (statusCode === 401) {
      notification.error({
        message: 'Sorry..',
        description: statusText,
        placement: 'bottomRight',
      });
    } else if (statusCode === 400) {
      notification.error({
        message: 'Sorry..',
        description: body.msg,
        placement: 'bottomRight',
      });
    } else if (statusCode === 403) {
      notification.warning({
        message: 'Sorry..',
        description: body.msg,
        placement: 'bottomRight',
      });
    }
  } else {
    notification.error({
      message: 'Sorry..',
      description: 'Server Error',
      placement: 'bottomRight',
    });
  }
};
