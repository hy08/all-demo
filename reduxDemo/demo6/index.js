import { combinReducers, createStore } from './redux/index';
import counterReducer from './reducers/counter';
import exceptionMiddleware from './middlewares/exceptionMiddleware';
import loggerMiddleware from './middlewares/loggerMiddleware';
import timeMiddleware from './middlewares/timeMiddleware';

// 使用
const reducer = combinReducers({
  counter: counterReducer
});

/** 
 * 注意：我们没有传 initState 进去，因为初始化的时候会执行 dispatch({ type: Symbol() });;
 * 触发 state = reducer(state, action)
 * 因为 state 为 undefined，action.type 为不匹配任何计划中 type 的值，所以会返回 reducer 中设置的默认值
 * */
let store = createStore(reducer);

const next = store.dispatch;
const exception = exceptionMiddleware(store);
const time = timeMiddleware(store);
const logger = loggerMiddleware(store);
store.dispatch = exception(time(logger(next)));

console.log('initial store: ', store.getState());

store.subscribe(() => {
  let state = store.getState();
  console.log('subscribe: ', state.counter.count);
});

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'SET_NAME', name: '前端9部' });
