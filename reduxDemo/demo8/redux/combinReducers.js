//合并reducer
const combineReducer = (reducers) => {
  // reducerKeys = ['counter','info']
  const reducerKeys = Object.keys(reducers);

  //返回合并后的新的reducer函数
  return function combination(state = {}, action) {
    //生成的新的state
    const nextState = {};

    //遍历执行所有的reducer，整合成为一个新的state
    for (let index = 0; index < reducerKeys.length; index++) {
      const key = reducerKeys[index];
      const reducer = reducers[key];
      //之前key的state  
      const previousStateForKey = state[key];
      // 执行分reducer，获得新的state
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
    }
    return nextState;
  }
}

export default combineReducer;