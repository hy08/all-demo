import React, { Component } from 'react';
import { connect, ConnectProps } from 'umi';
import styles from './index.less';

export interface Props extends Partial<ConnectProps> {}

class Home extends Component<Props> {
  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return <div className={styles.container}>Hello World</div>;
  }
}

export default connect(() => ({}))(Home);
