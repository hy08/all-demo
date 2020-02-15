const applyMiddleware = function (...middlewares) {
  //返回一个重写createStore的方法
  return function rewriteCreateStoreFunc(oldCreateStore) {
    // 返回重写的新的createStore
    return function newCreateStore(reducer, initState) {
      //1.生成store
      const store = oldCreateStore(reducer, initState);
      /*给每个 middleware 传下store，相当于 const logger = loggerMiddleware(store);*/
      /* const chain = [exception, time, logger]*/
      const chain = middlewares.map(middleware => middleware(store));
      /* 实现 exception(time((logger(dispatch))))*/
      let dispatch = store.dispatch;
      chain.reverse().forEach(middleware => {
        dispatch = middleware(dispatch);
      });
      /*2. 重写 dispatch*/
      store.dispatch = dispatch;
      return store;
    }
  }
}

export default applyMiddleware;