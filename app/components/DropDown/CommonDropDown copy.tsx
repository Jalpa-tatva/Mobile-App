// components/DropDown/CommonDropdown.tsx

import React from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleProp, ViewStyle, TextStyle, StyleSheet } from "react-native";
import { color, font, fontSize } from "@app/theme";

export interface DropdownItem {
  label: string;
  value: string;
  albumId: string;
}

interface CommonDropdownProps {
  items: DropdownItem[] | any;
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | null;
  placeholder?: string | null;
  setValue: (value: any) => void;
  onChangeItem: (item: DropdownItem) => void;
  formTypeInput?: React.MutableRefObject<any>;
  containerStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  zIndex?: any;
  dropDownContainerStyle?: StyleProp<ViewStyle>;
  searchableError?: any;
  textStyle?: any;
  disabled?: boolean;
  listMode?: string | any;
}

const CommonDropdown: React.FC<CommonDropdownProps> = ({
  open,
  setOpen,
  value,
  setValue,
  placeholder = "",
  items,
  onChangeItem,
  formTypeInput,
  containerStyle,
  dropdownStyle,
  labelStyle,
  itemStyle,
  zIndex,
  dropDownContainerStyle,
  listMode,
  ...rest
}) => {
  console.log("listMode", listMode);

  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      items={items}
      setItems={() => {}} // optional if parent manages items
      controller={(instance) => {
        if (formTypeInput) formTypeInput.current = instance;
      }}
      scrollViewProps={{
        persistentScrollbar: true,
      }}
      style={dropdownStyle}
      containerStyle={containerStyle}
      labelStyle={{ ...Style.labelStyle, ...labelStyle }}
      itemStyle={itemStyle}
      onSelectItem={onChangeItem}
      placeholder={placeholder}
      zIndex={zIndex}
      dropDownContainerStyle={{
        ...Style.containerBorder,
        ...dropDownContainerStyle,
      }}
      arrowIconStyle={{
        tintColor: "white",
      }}
      
      listMode={listMode ?? "DEFAULT"}
      {...rest}
    />
  );
};

export default CommonDropdown;

const Style = StyleSheet.create({
  containerBorder: {
    marginVertical: 8,
    borderWidth: 0.5,
    borderColor: color.border,
  },
  labelStyle: {
    fontFamily: font.Poppins_Medium,
    fontSize: fontSize(19),
    color: color.palette.black,
  },
});
