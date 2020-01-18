import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Index() {
  return (
    <h2>首页</h2>
  );
}

function List() {
  return (
    <h2>List page</h2>
  );
}

function AppRouter() {
  return (
    <Router>
      <ul>
        <li><Link to='/'>首页</Link></li>
        <li><Link to='/list/'>列表页</Link></li>
      </ul>
      <Route path='/' exact component={Index} />
      <Route path='/list' component={List} />
    </Router>
  );
}

export default AppRouter;