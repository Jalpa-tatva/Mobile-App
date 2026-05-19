import {content} from '@app/utils/string';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TabState {
  [key: string]: any;
}

const initialState: TabState = {};

export const member_detail = createSlice({
  name: content?.reducer_state?.memberDetail,
  initialState: initialState,
  reducers: {
    memberDetail: (state, action: PayloadAction<TabState>) => {
      return {...state, ...action.payload};
    },
  },
});

export const {memberDetail} = member_detail.actions;
export default member_detail.reducer;
