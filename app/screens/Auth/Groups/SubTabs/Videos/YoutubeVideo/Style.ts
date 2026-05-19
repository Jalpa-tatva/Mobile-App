import { ViewStyle } from "react-native";
import { color } from "@theme/index";

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.secondary };

export const HEADERTOP: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.secondary,
};
export const PLAYER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  backgroundColor: color.palette.black,
  alignItems: "center",
};

export const WRAPPER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
};
