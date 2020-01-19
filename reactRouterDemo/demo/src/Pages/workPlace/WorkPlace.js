import React from 'react';
import { Route, Link } from 'react-router-dom';
import GetUp from './GetUp';
import Money from './Money';
import styles from '../video/Video.less';

function WorkPlace(props) {
  return (
    <div>
      <div className={styles.topNav}>
        <ul>
          <li><Link to='/workplace/money'>薪资</Link></li>
          <li><Link to='/workplace/getup'>作息</Link></li>
        </ul>
      </div>
      <div className={styles.videoContent}>
        <h3>重点</h3>
        <Route path='/workplace/money' component={Money} />
        <Route path='/workplace/getup' component={GetUp} />
      </div>
    </div>
  );
}

export default WorkPlace;