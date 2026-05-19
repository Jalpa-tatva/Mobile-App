const chatReducer = (state = {}, action: any) => {
  
  switch (action.type) {
    case 'CHAT':
      return {...state, ...action?.payload};
    default:
      return state;
  }
};
export default chatReducer;