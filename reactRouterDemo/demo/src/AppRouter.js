import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Index from './Pages/Index';
import List from './Pages/List';
import Home from './Pages/Home';
import styles from './AppRouter.less';

function AppRouter() {
  return (
    //路由基础使用和传值
    // <Router>
    //   <ul>
    //     <li><Link to='/'>首页</Link></li>
    //     <li><Link to='/list/123'>列表页</Link></li>
    //   </ul>
    //   <Route path='/list/:id' component={List} />
    //   <Route path='/home' component={Home} />
    //   <Route path='/' exact component={Index} />
    // </Router>
    //嵌套路由
    <Router>
      <div className={styles.mainDiv}>
        <div className={styles.leftNav}>
          <h3>一级导航</h3>
          <ul>
            <li><Link to='/'>首页</Link></li>
            <li><Link to=''>A页面</Link></li>
            <li><Link to=''>B页面</Link></li>
          </ul>
        </div>
        <div className={styles.rightMain}>
          <Route path='/' exact component={Index} />
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;