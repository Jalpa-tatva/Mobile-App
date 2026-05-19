import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StyleSheet,
} from "react-native";
import { color, font, fontSize } from "@theme/index";
import styleConfig from "@app/theme/styleConfig";

export const FULL: ViewStyle = { flex: 1, backgroundColor: color.secondary };

export const HEADERTOP: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.secondary,
};
export const DialogViewWraper: ViewStyle = {
  width: "100%",
  alignItems: "center",
};

export const BODY: ViewStyle = {
  width: "100%",
  height: "88%",
  flex: 1,
  backgroundColor: color.white,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  marginTop: Platform.OS === "android" ? "-1%" : "-3%",
};

export const RawContainerMainItem: ViewStyle = {
  backgroundColor: color.white,
  width: "90%",
  marginTop: 10,
  paddingVertical: 8,
  borderRadius: 10,
  alignItems: "center",
  alignSelf: "center",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 0.5 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 3,
};

export const RawContainer: ViewStyle = {
  backgroundColor: color.white,
  width: "100%",
  alignItems: "center",
  marginVertical: 2,
  paddingVertical: 2,
  flexDirection: "row",
};

export const ImageWrapper: ImageStyle = {
  marginHorizontal: fontSize(10),
  width: fontSize(60),
  height: fontSize(60),
};

export const TextContainer: ViewStyle = {
  justifyContent: "center",
  flex: 1,
};

export const Title: TextStyle = {
  fontSize: fontSize(14),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
};
export const UnpairTitle: TextStyle = {
  fontSize: fontSize(14),
  color: color.palette.white,
  fontFamily: font.Poppins_Medium,
};

export const TitleLocation: TextStyle = {
  fontSize: fontSize(14),
  color: color.palette.blackSecondary,
  fontFamily: font.Poppins_Medium,
};

export const TitleUpdate: TextStyle = {
  fontSize: fontSize(14),
  color: color.palette.lightGrey,
  fontFamily: font.Poppins_Medium,
};
export const mainView: ViewStyle = {
  backgroundColor: color.palette.black,
  marginVertical: 20,
  alignSelf: "center",
  paddingHorizontal: 4,
  borderRadius: 20,
  flex: 1,
  width: "98%",
};
export const childView: ViewStyle = {
  flexDirection: "row",
  // width: styleConfig.width / 2,
  width: "100%",
  justifyContent: "center",
  alignSelf: "center",
  marginVertical:10
};

export const styles = StyleSheet.create({
  selectDate: {
    fontSize: fontSize(13),
    color: color.palette.black,
    fontFamily: font.Poppins_Medium,
    top: 1.2,
    left: fontSize(-3),
    // textAlign: 'center',
    paddingVertical: fontSize(2),
  },

  chartParentPage: {
    // flex:1,
    justifyContent: "flex-end",
  },
  chartPageView: {
    justifyContent: "center",
    alignItems: "center",
  },
  dateWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentSelf: {
    alignSelf: "center",
  },
  crossAlign: {
    alignItems: "center",
    flexGrow: 1,
  },
  crossAlignWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  chartOne: {
    fontFamily: font.Poppins_Regular,
    fontSize: fontSize(8),
  },
  chartSecond: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  chartPage: { color: color.white, marginLeft: 10 },

  borderChart: { borderRadius: 16 },
  chartThird: {
    paddingVertical: 10,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    marginBottom: 10,
  },
  chartFourth: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
  },
  crossStyle: { width: "100%", alignItems: "flex-end" },
  chartWraper: {
    flex: 1,
    justifyContent: "center",
  },

  //
  legendContainer: {
    // flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: 'flex-start',
    // paddingTop: 10,
    // flex:1,
    paddingHorizontal: 10,
    alignSelf:'flex-end',
    marginRight: 10,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },

  legendDot: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    marginRight: 6,
  },

  legendText: {
    color: color.white,
    fontSize: fontSize(11),
    fontFamily: font.Poppins_Medium,
  },
});
