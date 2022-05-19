import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { createUser, updateUser } from '../../store/actions/user/index';

export default function ReduxDemo(props) {
  const userList = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>redux-demo</h3>
      {userList.map((user) => (
        <div key={user.id} style={{ marginBottom: 20 }}>
          <span style={{ marginRight: 10 }}>{`${user.id}: ${user.name}`}</span>
          <button
            onClick={() => {
              dispatch(updateUser({ ...user, name: user.name + '修改后' }));
            }}
          >
            修改用户
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          dispatch(
            createUser({
              id: uuid(),
              name: '名字' + Math.floor(Math.random() * 100),
            })
          );
        }}
      >
        新增用户
      </button>
    </div>
  );
}
