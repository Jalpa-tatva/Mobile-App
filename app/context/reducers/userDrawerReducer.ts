const userDrawerReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'DRAWER_STATUS':
      return {...state, ...action?.payload};
    default:
      return state;
  }
};
export default userDrawerReducer;
