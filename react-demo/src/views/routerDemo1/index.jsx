import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from 'react-router-dom';
export default function RouterDemo1() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(props) {
  console.log('home', props.push);
  return (
    <div>
      <h2>Home</h2>
      <Route
        path="/a"
        children={() => {
          console.log('a');
          return <p>a</p>;
        }}
      ></Route>
      <Route path="/b">
        <p>b</p>
      </Route>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();
  console.log('match', match);
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
        {/* 当想要重定向的时候使用，而且是单独使用，这样会命中重定向的规则；
        如果和其他路由匹配组件(<Route>,)一起使用，会按照代码的先后顺序匹配路由规则，
        而不是一定重定向*/}
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

function Topic() {
  let match = useRouteMatch();
  console.log('match1', match);
  let params = useParams();
  console.log('params', params);
  return <h3>Requested topic ID: {params.topicId}</h3>;
}
