import React from 'react';
import styles from './index.less';

const BasicLayout: React.FC = props => {
  console.log('props.children', props.children);
  return (
    <div className={styles.app}>
      <div className={styles.page}>{props.children}</div>
    </div>
  );
};

export default BasicLayout;
