const activeTabReducer = (state = {}, action: any) => {
  console.log("state is rendering", state,action?.payload);
  
  switch (action.type) {
    case 'ACTIVE_TAB':
      return {...state, ...action?.payload};
    default:
      return state;
  }
};
export default activeTabReducer;