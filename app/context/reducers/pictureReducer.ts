const pictureReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'PICTURE':
      return {...state, ...action.payload};
    default:
      return state;
  }
};
export default pictureReducer;
