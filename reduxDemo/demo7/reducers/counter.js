let initState = {
  count: 0
}

const counterReducer = (state, action) => {
  // 如果state没有值，那就给他初值
  if (!state) {
    state = initState;
  }
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

export default counterReducer;