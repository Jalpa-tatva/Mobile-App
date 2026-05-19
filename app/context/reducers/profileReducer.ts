const profileReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'PROFILE':
      return {...state, ...action.payload};
    default:
      return state;
  }
};
export default profileReducer;
