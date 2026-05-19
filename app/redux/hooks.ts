import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRedux = (keys: string[] = []) => {
  const dispatch = useAppDispatch();

  const groups = useAppSelector((state) => state.groupsDetail);
  const drawerStatus = useAppSelector((state) => state.drawerStatus);
  const chatDetail = useAppSelector((state) => state.chatDetail);
  const tabStatus = useAppSelector((state) => state.tabStatus);
  const loginDetail = useAppSelector((state) => state.loginDetail);
  const profileDetail = useAppSelector((state) => state.profileDetail);
  const mapDetail = useAppSelector((state) => state.mapDetail);
  const memberDetail = useAppSelector((state) => state.memberDetail);
  const dynamicTab = useAppSelector((state) => state.dynamicTab);
  const result: Record<string, any> = { dispatch };

  keys.forEach((key) => {
    switch (key) {
      case "groups_detail":
        result.group_detail = groups;
        break;
      case "drawer_status":
        result.drawer_status = drawerStatus;
        break;
      case "chat_detail":
        result.chat_detail = chatDetail;
        break;
      case "tab_status":
        result.tab_status = tabStatus;
        break;
      case "login_detail":
        result.login_detail = loginDetail;
        break;
      case "profile_detail":
        result.profile_detail = profileDetail;
        break;
      case "member_detail":
        result.member_detail = memberDetail;
        break;
      case "map_detail":
        result.map_detail = mapDetail;
        break;
      case "dynamic_tab":
        result.dynamic_tab = dynamicTab;
        break;
      case "dispatch":
        result.dispatches = dispatch;
        break;
    }
  });

  return result;
};
