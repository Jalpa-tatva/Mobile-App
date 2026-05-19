import { StyleSheet, ViewStyle } from "react-native";
import { color } from "@theme/index";

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.white };

export const CalanderWrapper: ViewStyle = {
  width: 80,
  height: 5,
  backgroundColor: color.palette.lighterGrey,
  borderRadius: 10,
  marginBottom: 5,
};
export const FullWrapper: ViewStyle = {
  flex: 1,
  width: "100%",
};

export const styles = StyleSheet.create({
  padEventSpace: { paddingVertical: 8 },
  markWrapper: {
    backgroundColor: "#007BFF",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  dateLabel:{
    color:color.white,
  }
});
