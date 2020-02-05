import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { isNil } from 'lodash';
import Index from './Pages/Index';
import List from './Pages/List';
import Home from './Pages/Home';
import Video from './Pages/video/Video';
import WorkPlace from './Pages/workPlace/WorkPlace';
import styles from './AppRouter.less';

//1.路由异步加载（代码分割）
//2.路由守卫
//3.权限路由问题，怎么加载用户的菜单

function AppRouter() {
  console.log(isNil(''));
  return (
    <Router>
      <div className={styles.mainDiv}>
        <div className={styles.leftNav}>
          <h3>一级导航</h3>
          <ul>
            <li><Link to='/'>首页</Link></li>
            <li><Link to='/list/123'>列表页</Link></li>
            <li><Link to='/video/'>视频教程</Link></li>
            <li><Link to='/workplace'>职场</Link></li>
          </ul>
        </div>
        <div className={styles.rightMain}>
          <Route path='/list/:id' component={List} />
          <Route path='/video/' component={Video} />
          <Route path='/workplace' component={WorkPlace} />
          <Route path='/home' component={Home} />  {/*Home组件和Index配合可使用redirect */}
          <Route path='/' exact component={Index} />
        </div>
      </div>
    </Router>
  );
}

export default AppRouter;