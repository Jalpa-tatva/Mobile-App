import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GroupsState} from '../type/reducerType';
import {content} from '@app/utils/string';

const initialState: GroupsState = {};

export const group_detail = createSlice({
  name: content?.reducer_state?.groupsDetail,
  initialState,
  reducers: {
    groups: (state, action: PayloadAction<GroupsState>) => {
      return {...state, ...action.payload};
    },
  },
});
export const {groups} = group_detail.actions;

export default group_detail.reducer;
