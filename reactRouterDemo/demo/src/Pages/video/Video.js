import React from 'react';
import { Route, Link } from 'react-router-dom';
import ReactPage from './ReactPage';
import Vue from './Vue';
import Flutter from './Flutter';
import styles from './Video.less';

function Video(props) {
  return (
    <div>
      <div className={styles.topNav}>
        <ul>
          <li><Link to='/video/reactpage'>React页面</Link></li>
          <li><Link to='/video/vue'>Vue页面</Link></li>
          <li><Link to='/video/flutter'>Flutter页面</Link></li>
        </ul>
      </div>
      <div className={styles.videoContent}>
        <h3>视频教程</h3>
        <Route path='/video/reactpage/' component={ReactPage} />
        <Route path='/video/vue/' component={Vue} />
        <Route path='/video/flutter/' component={Flutter} />
      </div>
    </div>
  );
}

export default Video;