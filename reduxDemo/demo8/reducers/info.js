let initState = {
  name: '',
  description: ''
}

const infoReducer = (state, action) => {
  // 如果state没有值，那就给他初值
  if (!state) {
    state = initState;
  }
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

export default infoReducer;