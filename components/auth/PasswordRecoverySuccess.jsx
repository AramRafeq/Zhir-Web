import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';

export default function PasswordRecoverySuccess() {
  return (
    <div className="is-success-text" style={{ textAlign: 'center' }}>
      <CheckCircleOutlined style={{ fontSize: '3rem' }} />
      <p style={{ marginTop: '1rem' }}>بەستەری گۆڕینی تێپەڕەوشە بە سەرکەوتووی نێردرا</p>
    </div>
  );
}
