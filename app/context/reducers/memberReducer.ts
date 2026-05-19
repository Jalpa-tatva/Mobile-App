const memberReducer = (state = {}, action: any) => {
  console.log("state is rendering", state,action?.payload);
  
  switch (action.type) {
    case 'MEMBERS':
      return {...state, ...action?.payload};
    default:
      return state;
  }
};
export default memberReducer;