import { USER_CREATE, USER_UPDATE } from './actionType';

/**
 * redux-thunk 处理异步数据流
 * @param {object} payload user
 */
export const createUser = (user) => {
  return async (dispatch) => {
    const res = await new Promise((resolve) => setTimeout(resolve, 1000, user));
    dispatch({
      type: USER_CREATE,
      payload: res,
    });
  };
};

export const updateUser = (user) => {
  return {
    type: USER_UPDATE,
    payload: user,
  };
};
