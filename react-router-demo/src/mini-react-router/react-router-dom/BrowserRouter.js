import React, { Component } from 'react';
import { createBrowserHistory as createHistory } from '../history';
import { Router } from './index';

class BrowserRouter extends Component {
  history = createHistory(this.props);
  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}

export default BrowserRouter;
