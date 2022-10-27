const initialState = {
  count: 0,
  objects: []
};
 
export default (state = initialState, action) => {
  switch (action.type) {
    case 'COUNT_INCRESE':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'COUNT_DECRESE':
      return {
        ...state,
        count: state.count - 1,
      };
      case 'GET':
        return {
          ...state,
          objects: action.item,
        };
    default:
      return state;
  }
};