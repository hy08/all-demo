import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { createUser } from '../../store/actions/user';

class connectDemo extends Component {
  render() {
    const { userList, createUser, dispatch } = this.props;
    return (
      <div>
        {userList.map((user) => (
          <div key={user.id} style={{ marginBottom: 20 }}>
            <span
              style={{ marginRight: 10 }}
            >{`${user.id}: ${user.name}`}</span>
          </div>
        ))}
        <button
          onClick={() => {
            createUser({
              id: uuid(),
              name: '名字' + Math.floor(Math.random() * 100),
            });
          }}
        >
          新增用户
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userList: state.userList,
  };
}
const mapDispatchToProps = {
  createUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(connectDemo);
