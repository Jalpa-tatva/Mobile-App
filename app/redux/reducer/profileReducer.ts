import {content} from '@app/utils/string';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ProfileState {
  [key: string]: any;
}

const initialState: ProfileState = {};

export const profile_detail = createSlice({
  name: content?.reducer_state?.profileDetail,
  initialState: initialState,
  reducers: {
    profileDetail: (state, action: PayloadAction<ProfileState>) => {
      return {...state, ...action.payload};
    },
  },
});

export const {profileDetail} = profile_detail.actions;
export default profile_detail.reducer;
