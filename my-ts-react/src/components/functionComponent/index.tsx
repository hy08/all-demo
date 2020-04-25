import React from 'react';
import styles from './index.less';

interface IProps {
  /**
   * title
   */
  title?: string
};

const FunctionComponent: React.FC<IProps> = props => {
  return (
    <div className={styles.container}>
      <h2>{props.title}</h2>
      <div>{props.children}</div>
    </div>
  );
}

export default FunctionComponent;