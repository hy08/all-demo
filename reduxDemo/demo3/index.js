//readme：reducer的拆分和合并
//question：为什么所有的reducer都要执行一遍，很怀疑效率

// counterReducer，一个子reducer
// 注意：counterReducer接受的state是state.counter
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}
// infoReducer，一个子reducer
// 注意：infoReducer接受的state是state.info
const infoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      };
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      };
    default:
      return state;
  }
}

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

//创建仓库
const createStore = (reducer, initState) => {
  let state = initState;
  let listeners = []; //监听列表

  // 订阅
  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    //请按照我的计划修改state
    state = reducer(state, action);
    // 通知
    for (let index = 0; index < listeners.length; index++) {
      const listener = listeners[index];
      listener();
    }
  }

  function getState() {
    return state;
  }
  return {
    subscribe,
    dispatch,
    getState
  }
}


// 使用
const reducer = combineReducer({
  counter: counterReducer,
  info: infoReducer
});

let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '',
    description: ''
  }
};

let store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'SET_NAME', name: '前端9部' });
