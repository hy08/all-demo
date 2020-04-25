import React from 'react';
import FunctionComponent from '../components/functionComponent';
import styles from './index.css';

export default function () {
  return (
    <div className={styles.normal}>
      <FunctionComponent title='logo' />
    </div>
  );
}
