import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/user/index';

const reducer = combineReducers({
  userList: userReducer,
});
const middlewares = [thunk];
const enhancer =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middlewares)
    : window.__REDUX_DEVTOOLS_EXTENSION__
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

export const store = createStore(reducer, {}, enhancer);
