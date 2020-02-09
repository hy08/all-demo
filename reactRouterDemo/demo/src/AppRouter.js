import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { isNil, isEmpty } from 'lodash';
import Index from './Pages/Index';
import Home from './Pages/Home';
import styles from './AppRouter.less';


//1.路由异步加载（代码分割）
const List = lazy(() => import('./Pages/List'));
const Video = lazy(() => import('./Pages/video/Video'));
const WorkPlace = lazy(() => import('./Pages/workPlace/WorkPlace'));

//2.代码包大小优化，工具->webpack-bundle-analyzer,优化文件：moment,lodash，
const moment = require('moment');

//2.路由守卫
//在生命周期内实现

//3.权限路由问题，怎么加载用户的菜单
//将权限<=>菜单配置保存在数据库中，每次加载请求数据，返回格式化json，再渲染菜单

function AppRouter() {
  // console.log(isNil(''));
  // if (isEmpty('123')) {
  //   console.log(isNil('123'));
  // }
  // console.log(moment().toString());
  return (
    <Router>
      <Suspense fallback={null}>
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
      </Suspense>
    </Router>
  );
}

export default AppRouter;