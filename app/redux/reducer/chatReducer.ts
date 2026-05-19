import {content} from '@app/utils/string';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ChatState {
  [key: string]: any;
}

const initialState: ChatState = {};

export const chat_detail = createSlice({
  name: content?.reducer_state?.chatDetail,
  initialState,
  reducers: {
    chat: (state, action: PayloadAction<ChatState>) => {
      return {...state, ...action.payload};
    },
  },
});

export const {chat} = chat_detail.actions;
export default chat_detail.reducer;
