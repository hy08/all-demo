import request from '../request';

export const getAllToDoList = () =>
  request({
    url: '/todos',
    method: 'get',
  });
