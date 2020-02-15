//创建仓库
const createStore = (reducer, initState, rewriteCreateStoreFunc) => {
  if (typeof initState === 'function' && typeof rewriteCreateStoreFunc === 'undefined') {
    rewriteCreateStoreFunc = initState;
    initState = undefined;
  }
  //如果有rewiteCreateStoreFunc，就采用新的createStore
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore);
    return newCreateStore(reducer, initState)
  }
  let state = initState;
  let listeners = []; //监听列表

  // 订阅
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
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

  dispatch({ type: Symbol() });

  function getState() {
    return state;
  }
  return {
    subscribe,
    dispatch,
    getState
  }
}

export default createStore;