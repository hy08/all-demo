const createStore = (initState) => {
  let state = initState;
  let listeners = []; //监听列表

  // 订阅
  function subscribe(listener) {
    listeners.push(listener);
  }

  function changeState(newState) {
    state = newState;
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
    changeState,
    getState
  }
}

// 使用
let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '',
    description: ''
  }
};
let store = createStore(initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(`${state.info.name}: ${state.info.description}`);
});
store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count);
});

store.changeState({
  ...store.getState(),
  info: {
    name: '前端9部',
    description: '前端从业者'
  }
});
store.changeState({
  ...store.getState(),
  counter: {
    count: 1
  }
});
