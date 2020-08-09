import React, { Component } from 'react';
import styles from './index.less';

export default class Home extends Component {
  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return <div className={styles.container}>Hello World</div>;
  }
}
