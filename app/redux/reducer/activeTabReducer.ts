import {content} from '@app/utils/string';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TabState {
  [key: string]: any;
}

const initialState: TabState = {};

export const active_tab = createSlice({
  name: content?.reducer_state?.activeTab,
  initialState: initialState,
  reducers: {
    tabStatus: (state, action: PayloadAction<TabState>) => {
      return {...state, ...action.payload};
    },
  },
});

export const {tabStatus} = active_tab.actions;
export default active_tab.reducer;
