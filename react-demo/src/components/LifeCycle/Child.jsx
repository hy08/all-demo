import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Child extends Component {
  //#region render阶段：纯净且不包含副作用。可能会被 React 暂停，中止或重新启动
  constructor(props) {
    super(props);
    console.log('Child组件的constructor()');
    this.state = {
      text: 'Child组件文本',
      visible: true,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Child组件的getDerivedStateFromProps()');
    return {
      parentText: nextProps.text,
    };
  }

  /**
   * Update是触发的声明周期函数，常用于性能优化
   * 根据返回值来判断是否执行后续的声明周期，是否对组件进行re-render(重渲染)
   * @param {object} nextProps
   * @param {object} nextState
   */
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Child组件的shouldComponentUpdate()');
    return true;
  }

  /**
   * componentWillReceiveProps：react 16不建议使用，违反单一职责原则，容易导致bug
   * react16建议由**和**这两个声明周期钩子代替该方法
   * 并非仅由父组件props更新触发，而是由父组件的更新触发(哪怕相关state没有作为该子组件的props)
   * @param {object} nextProps
   */
  // componentWillReceiveProps(nextProps) {}

  //#endregion

  /**
   * Pre-commit阶段：可以读取DOM
   * 返回值作为componentDidUpdate钩子的第三个参数
   * @param {object} prevProps
   * @param {object} prevState
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Child组件的getSnapshotBeforeUpdate()');
    return {
      value: 'getSnapshotBeforeUpdate',
    };
  }

  //#region Commit阶段： 可以使用 DOM，运行副作用，安排更新。

  /**
   * 组件加载完之后执行，适合执行包含副作用的函数
   */
  componentDidMount() {
    console.log('Child组件的componentDidMount()');
  }
  /**
   * 组件更新完毕之后
   * @param {object} prevProps
   * @param {object} prevState
   * @param {*} valueFromSnapshot
   */
  componentDidUpdate(prevProps, prevState, valueFromSnapshot) {
    console.log(
      'Child组件的componentDidUpdate()',
      '从Child组件的getSnapshotBeforeUpdate获得的值',
      valueFromSnapshot
    );
  }

  /**
   * 组件卸载前执行该钩子函数
   * 执行场景：
   * 1.组件在父组件中移除了
   * 2.组件中设置了key值，父组件在render过程中，发现子组件两次key值不同
   */
  componentWillUnmount() {
    console.log('Child组件的componentWillUnmount()');
  }
  //#endregion

  changeText = () => {
    this.setState({ text: '修改后Child组件文本' });
  };

  changeVisible = () => {
    this.setState({ visible: !this.state.visible });
  };
  render() {
    return (
      <div className="child-container">
        <button onClick={this.changeText}>修改Child组件的state</button>
        <button onClick={this.changeVisible}>
          {`${this.visible ? '隐藏' : '显示'}`}Parent组件
        </button>
        <p>Child组件的text:{this.state.text}</p>
        <p>
          Parent组件的text:{this.props.text}
          ,Child组件getDerivedStateFromProps钩子转换成的state:
          {this.state.parentText}
        </p>
      </div>
    );
  }
}

export default Child;
