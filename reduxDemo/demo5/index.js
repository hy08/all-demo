import { combinReducers, createStore } from './redux/index';
import counterReducer from './reducers/counter';
import infoReducer from './reducers/info';
// 使用
const reducer = combinReducers({
  counter: counterReducer,
});

/** 
 * 注意：我们没有传 initState 进去，因为初始化的时候会执行 dispatch({ type: Symbol() });;
 * 触发 state = reducer(state, action)
 * 因为 state 为 undefined，action.type 为不匹配任何计划中 type 的值，所以会返回 reducer 中设置的默认值
 * */
let store = createStore(reducer);

const nextReducer = combinReducers({
  counter: counterReducer,
  info: infoReducer
});

store.replaceReducer(nextReducer);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'SET_NAME', name: '前端9部2' });
