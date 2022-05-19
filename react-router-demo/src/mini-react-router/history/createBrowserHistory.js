function createListenerManager() {
  let listeners = [];
  return {
    //订阅
    subscribe: function (listener) {
      if (typeof listener !== 'function') {
        throw new Error('typeof listener must is function');
      }
      listeners.push(listener);
      //取消订阅函数
      return function unSubscribe() {
        listeners = listeners.filter(function (item) {
          return item !== listener;
        });
      };
    },
    //发布：调用所有监听函数，并传入新的location
    notify: function (location) {
      listeners.forEach((listen) => listen(location));
    },
  };
}
/**
 * browser Histroy,用于支持histroy API的路由
 */
export function createBrowserHistory() {
  const location = {
    pathname: '/',
  };
  const lietenerManager = createListenerManager();
  window.addEventListener('popstate', handlePop);
  //监听事件
  function listen(listener) {
    return lietenerManager.subscribe(listener);
  }
  /**
   * onpopstate事件响应函数
   * 处理history变更，主要是监听浏览器的前进和回退，histroy.go、histroy.go、histroy.go也会触发onpopstate
   * history.pushState和history.replaceState API调用并不会触发该事件
   * @param {*} e
   */
  function handlePop(e) {
    lietenerManager.notify({ pathname: window.location.pathname });
  }

  function push(path) {
    //虽然pushState不会触发popstate事件，但是不可省略
    //这样可以保持state状态在当前路由记录中得到正确更改，保证state信息一致
    window.history.pushState(null, '', path);
    lietenerManager.notify({ pathname: path });
  }
  return {
    listen,
    location,
    push,
  };
}
