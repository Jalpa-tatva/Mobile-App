import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupsState } from "../type/reducerType";
import { content } from "@app/utils/string";

const initialState: GroupsState = {};

export const map_detail = createSlice({
  name: content?.reducer_state?.groupsDetail,
  initialState,
  reducers: {
    maps: (state, action: PayloadAction<GroupsState>) => {
      console.log("map details data", state, action);

      return { ...state, ...action.payload };
    },
  },
});
export const { maps } = map_detail.actions;

export default map_detail.reducer;
