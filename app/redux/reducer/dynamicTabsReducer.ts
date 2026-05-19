import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { menuConfig } from "@app/utils/NavigationConfigJson";

export const dynamic_tab = createSlice({
  name: "dynamic_tab",
  initialState: menuConfig,
  reducers: {
    dynamicTab: (state, action: PayloadAction<any>) => {
      const id = action.payload;

      // bottom tabs
      state.bottom_tab = state.bottom_tab.map((item) =>
        item.id === id ? { ...item, enable: !item.enable } : item
      );

      // drawer tabs
      state.drawer_menu = state.drawer_menu.map((item) =>
        item.id === id ? { ...item, enable: !item.enable } : item
      );

      // profile tabs
      state.profile_tab = state.profile_tab.map((item) =>
        item.id === id ? { ...item, enable: !item.enable } : item
      );

      // group details header tabs
      state.group_details_header_tab = state.group_details_header_tab.map(
        (item) => (item.id === id ? { ...item, enable: !item.enable } : item)
      );

      // group details tabs
      state.group_detail_tab = state.group_detail_tab.map((item) =>
        item.id === id ? { ...item, enable: !item.enable } : item
      );
    },
  },
});

export const { dynamicTab } = dynamic_tab.actions;

export default dynamic_tab.reducer;
