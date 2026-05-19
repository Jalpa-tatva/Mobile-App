import { content } from "@app/utils/string";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  [key: string]: any;
}

const initialState: LoginState = {};
export const login_details = createSlice({
  name: content?.reducer_state?.loginDetail,
  initialState: initialState,
  reducers: {
    loginDetail: (state, action: PayloadAction<LoginState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { loginDetail } = login_details.actions;
export default login_details.reducer;
