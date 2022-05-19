import React, { Component } from 'react';
import RouterContext from './RouterContext.js';

const matchPath = (pathName, path) => {
  return pathName === path;
};
/**
 * 消费RouterContext，判断是否匹配路由，匹配则根据children、component、render
 * 这三个prop情况渲染路由组件
 * 优先级：children=>component=>render
 */
class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const location = this.props.location || context.location;
          const match = matchPath(location.pathname, this.props.path);
          const props = { ...context, location, match };
          let { children, component, render } = this.props;
          if (Array.isArray(children) && children.length === 0) {
            children = null;
          }
          return (
            <RouterContext.Provider value={props}>
              {props.match
                ? children
                  ? typeof children === 'function'
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === 'function'
                ? children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
