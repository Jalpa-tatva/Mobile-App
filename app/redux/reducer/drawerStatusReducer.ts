import {content} from '@app/utils/string';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DrawerStatusState {
  [key: string]: any;
}

const initialState: DrawerStatusState = {};

export const drawer_status = createSlice({
  name: content?.reducer_state?.drawerStatus,
  initialState,
  reducers: {
    drawerStatus: (state, action: PayloadAction<DrawerStatusState>) => {
      return {...state, ...action.payload};
    },
  },
});

export const {drawerStatus} = drawer_status.actions;
export default drawer_status.reducer;
