import { color, fontSize } from "@app/theme";
import { Platform, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.secondary,
  },
  body: {
     width: '100%',
     flex: 1,
     backgroundColor: color.white,
     borderTopLeftRadius: 30,
     borderTopRightRadius: 30,
     marginTop: Platform.OS === 'android' ? '-1%' : '-3%',
  },
  spaceTop: { flex: 1, marginTop: fontSize(10) },
  listing: {
    flex: 1,
    paddingBottom: fontSize(20),
  },
  headerTop: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.secondary,
    // paddingBottom: fontSize(10),
  },
});
