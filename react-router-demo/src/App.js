import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from './mini-react-router/react-router-dom';
import { useHistory } from './mini-react-router/react-router/hooks';
import './App.css';

function App() {
  //简单案例，Route内部比较使用的===比较，因此不会渲染所有符合react-router的路由规则
  return (
    <Router>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/user">
        <User />
      </Route>
    </Router>
  );
}

function Home(props) {
  const history = useHistory();
  return (
    <div>
      <h1>首页</h1>
      <button onClick={() => history.push('/about')}>about</button>
      <button onClick={() => history.push('/user')}>user</button>
    </div>
  );
}
function About() {
  const history = useHistory();
  return (
    <div>
      <h1>关于</h1>
      <button onClick={() => history.push('/')}>home</button>
    </div>
  );
}
function User() {
  const history = useHistory();
  return (
    <div>
      <h1>我的</h1>
      <button onClick={() => history.push('/')}>home</button>
    </div>
  );
}

export default App;
