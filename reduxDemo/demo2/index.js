//readme：有计划的修改state

//action={type:'',other:''},必须有一个type属性;
//reducer 理解为修改计划，plan
const reducer = (state, action) => {
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
let initState = {
  count: 0
};
let store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.count);
});

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.dispatch({ count: 11 }); //无效
