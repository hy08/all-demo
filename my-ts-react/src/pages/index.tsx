import React from 'react';
import FunctionComponent from '../components/functionComponent';
import TodoInput from '../components/todoInput';
import styles from './index.css';

export default function () {
  return (
    <div className={styles.normal}>
      <FunctionComponent title='logo' />
      <TodoInput
        handleSubmit={() => { }}  //明明定义了函数签名，为什么可以赋值不符合签名的实现呢
      />
    </div>
  );
}
