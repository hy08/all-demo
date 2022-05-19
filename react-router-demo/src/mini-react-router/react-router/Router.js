import React from 'react';

import HistoryContext from './HistoryContext.js';
import RouterContext from './RouterContext.js';

/**
 * Router组件的作用主要：
 * 1. 监听history的最新location，并当作props传递给子组件
 * 2. 渲染children
 */
class Router extends React.Component {
  // 静态方法，计算当前pathname是否匹配根路径
  static computeRootMatch(pathname) {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
  }

  constructor(props) {
    console.log('router constructor');
    super(props);

    this.state = {
      location: props.history.location, //挂载history的location属性
    };
  }
  componentDidMount() {
    this.unlisten = this.props.history.listen((location) => {
      this.setState({ location });
    });
  }
  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    //传递两个context给子组件
    //一个是路由相关属性，包括history、location、match（是否匹配根路由）
    //一个是history信息，同时将子组件渲染出来
    console.log('render');
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}
      >
        <HistoryContext.Provider
          children={this.props.children || null}
          value={this.props.history}
        />
      </RouterContext.Provider>
    );
  }
}
export default Router;
