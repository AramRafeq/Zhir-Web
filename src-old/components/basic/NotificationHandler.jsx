import React from 'react';
import { notification, Timeline } from 'antd';
const notificationPlacemnet = 'bottomLeft';
const duration = 4.5;
function info(
  message,
  description = '',
  onClick = () => {},
  onClose = () => {}
) {
  notification.info({
    placement: notificationPlacemnet,
    duration: duration,
    message: message,
    description: description,
    onClick: onClick,
    onClose: onClose,
  });
}
function error(
  message,
  description = '',
  onClick = () => {},
  onClose = () => {}
) {
  notification.error({
    placement: notificationPlacemnet,
    duration: duration,
    message: message,
    description: description,
    onClick: onClick,
    onClose: onClose,
  });
}

function warning(
  message,
  description = '',
  onClick = () => {},
  onClose = () => {}
) {
  notification.warning({
    placement: notificationPlacemnet,
    duration: duration,
    message: message,
    description: description,
    onClick: onClick,
    onClose: onClose,
  });
}
function success(
  message,
  description = '',
  onClick = () => {},
  onClose = () => {}
) {
  notification.success({
    placement: notificationPlacemnet,
    duration: duration,
    message: message,
    description: description,
    onClick: onClick,
    onClose: onClose,
  });
}
function requestError(
  message = 'server error',
  axiosErr,
  onClick = () => {},
  onClose = () => {}
) {
  const response = axiosErr.response;
  const {
    status,
    data: { errors },
  } = response;
  if (response) {
    let description = '';
    if (status === 422) {
      description = (
        <Timeline>
          {errors.map((err) => (
            <Timeline.Item color="red">
              <b>
                <i>{err.param}</i>
              </b>{' '}
              - {err.msg}
            </Timeline.Item>
          ))}
        </Timeline>
      );
    }
    if (status === 500) {
      description = 'Internal server error ';
    }
    if (status === 502) {
      description = 'Bad geatway';
    }
    if (status === 503) {
      description = 'Service unavilable';
    }
    if (status === 400) {
      description = 'Bad Request';
    }
    if (status === 401) {
      description = 'Unauthorized';
    }
    if (status === 404) {
      description = 'Resourse was not found';
    }
    notification.error({
      placement: notificationPlacemnet,
      duration: duration,
      message: message,
      description: description,
      onClick: onClick,
      onClose: onClose,
    });
  }
  notification.error({
    placement: notificationPlacemnet,
    duration: duration,
    message: message,
    description: 'Unknown Server Error',
    onClick: onClick,
    onClose: onClose,
  });
}
export default {
  info,
  requestError,
  success,
  warning,
  error,
};
