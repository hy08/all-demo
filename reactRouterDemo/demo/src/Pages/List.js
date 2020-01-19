import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.log('this.props', this.props)
  }

  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <h2>列表页:{id}</h2>
    );
  }
}

List.propTypes = {

};

export default List;
