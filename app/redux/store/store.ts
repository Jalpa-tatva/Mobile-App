import { configureStore, combineReducers } from "@reduxjs/toolkit";
import groupReducer from "@redux/reducer/groupsReducer";
import mapReducer from "@redux/reducer/mapReducer";
import drawerReducer from "@redux/reducer/drawerStatusReducer";
import chatReducer from "@redux/reducer/chatReducer";
import tabReducer from "@redux/reducer/activeTabReducer";
import loginDetail from "@redux/reducer/loginReducer";
import profileDetail from "@redux/reducer/profileReducer";
import memberDetail from "@redux/reducer/MemberReducer";
import dynamicTab from "@redux/reducer/dynamicTabsReducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

//  Combine reducers first
const appReducer = combineReducers({
  groupsDetail: groupReducer,
  mapDetail: mapReducer,
  drawerStatus: drawerReducer,
  chatDetail: chatReducer,
  tabStatus: tabReducer,
  loginDetail,
  profileDetail,
  memberDetail,
  dynamicTab,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_APP") {
    return appReducer(
      {
        dynamicTab: state?.dynamicTab,
      },
      action
    );
  }
  console.log("<------state------->", state, action);

  return appReducer(state, action);
};

//  Set up persist config
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Configure store
export const store = configureStore({
  reducer: persistedReducer,
});

store.subscribe(() => {
  console.log("Redux State:", store.getState());
});
export const persistor = persistStore(store);

//  Define types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
