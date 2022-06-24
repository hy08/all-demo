import { USER_CREATE, USER_UPDATE } from '../../actions/user/actionType';

const userList = [];
export default function userReducer(state = userList, action) {
  switch (action.type) {
    case USER_CREATE:
      if (!userList.find((user) => user.id === action.payload.id)) {
        state = [...state, action.payload];
      }
      break;
    case USER_UPDATE:
      for (let index = 0; index < state.length; index++) {
        const user = state[index];
        if (user.id === action.payload.id) {
          state[index] = action.payload;
        }
      }
      state = [...state];
      break;
    default:
      state = state;
      break;
  }
  return state;
}
