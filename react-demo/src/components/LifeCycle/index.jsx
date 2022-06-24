import React, { Component } from 'react';
import Parent from './Parent';
import PropTypes from 'prop-types';
import './index.css';

class LifeCycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'lifeCycle组件文本',
      visible: true,
    };
  }

  changeText = () => {
    this.setState({ text: '修改后LifeCycle组件文本' });
  };
  changeVisible = () => {
    this.setState({ visible: !this.state.visible });
  };
  render() {
    return (
      <div className="life-container">
        <div className="life-operates">
          <button onClick={this.changeText}>修改LifeCycle组件state</button>
          <button onClick={this.changeVisible}>
            {`${this.state.visible ? '卸载' : '显示'}`}Parent组件
          </button>
        </div>
        {this.state.visible && <Parent text={this.state.text}></Parent>}
      </div>
    );
  }
}

LifeCycle.propTypes = {};

export default LifeCycle;
