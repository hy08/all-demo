import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { id: 1, title: 'title1' },
        { id: 2, title: 'title2' },
        { id: 3, title: 'title3' },
      ]
    };
    // this.props.history.push('/home');
  }

  render() {
    const { list } = this.state;
    return (
      <>
        <h2>首页</h2>
        <ul>
          {
            list.map(item => {
              return (
                <li key={item.id}>
                  <Link to={`/list/${item.id}`}>{item.title}</Link>
                </li>
              )
            })
          }
        </ul>
        {/* <Redirect to='/home/' /> */}
      </>
    );
  }
}

Index.propTypes = {


};

export default Index;
