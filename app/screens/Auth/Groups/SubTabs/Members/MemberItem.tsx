import React, { memo, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// External libraries
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Snackbar from "react-native-snackbar";

// Components & Context
import { color, font, fontSize } from "@theme/index";
import ShowImage from "@app/components/FastImage/ShowImage";
import styleConfig from "@app/theme/styleConfig";

/**
 * MembersProps
 */
export interface MembersProps {
  connectionName: string;
  role: string;
  memberList: any;
  isMainOwner: boolean;
  setMemberList: Function;
  isAdded: string;
  isOwner: string;
  uniqueId: string;
  userUniqueId: string;
  isPending: string;
  canEditInfos: string;
  canApproveOrDeny: string;
  originalImageUrl: string;
  checkLoginUser: any;
  onPressOption: Function;
  onPressPending: () => void;
}

/**
 * getRolepower
 */
const getRolepower = (props) => {
  if (props?.isOwner === "false" && props.userUniqueId !== props.uniqueId) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.OptionWrapper}
        onPress={props.onPressOption}
      >
        <SimpleLineIcons
          name="options-vertical"
          size={fontSize(20)}
          color={color.palette.black}
        />
      </TouchableOpacity>
    );
  }

  return null; // ✔ always return a value
};

/**
 * MemberItem
 */
export const MemberItem = memo((props: MembersProps) => {
  useEffect(() => {
    props.checkLoginUser;
  }, []);

  return (
    <View style={styles.RawContainerMain}>
      {props.isAdded == "true" && props.canEditInfos == "true"
        ? getRolepower(props)
        : null}
      <View style={styles.RawContainer}>
        <View style={styles.ImageContainer}>
          <ShowImage
            url={props.originalImageUrl}
            imageStyle={styles.ImageWrapper}
          />
        </View>
        <View style={styles.TextContainer}>
          <View style={styles.TitleWrapper}>
            <Text style={styles.Title} numberOfLines={2}>
              {props.connectionName}
            </Text>
          </View>

          <View style={styles.roleWrapper}>
            {props?.role && <Text style={styles.roleLbl}>{props?.role}</Text>}
            {props.isPending == "true" && (
              <TouchableOpacity
                style={styles.ApprovalWrapper}
                onPress={props.onPressPending}
              >
                <Text style={styles.TitleApproval}>Pending Invitation</Text>
              </TouchableOpacity>
            )}

            {props.role == "Guest" ? (
              <TouchableOpacity
                activeOpacity={1}
                style={{ ...styles.ApprovalWrapper, ...styles.greenBg }}
                onPress={() =>
                  props.canApproveOrDeny != "true" &&
                  Snackbar.show({
                    text: "You do not have a permisson",
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: color.red,
                    textColor: color.palette.white,
                    numberOfLines: 5,
                  })
                }
              >
                <Text style={styles.TitleApproval}>Needs Approval</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  RawContainerMain: {
    backgroundColor: color.white,
    // width: '90%',
    marginVertical: 10,
    paddingRight: fontSize(20),
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: fontSize(10),
    borderRadius: 10,
    // alignSelf: 'center',
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: fontSize(2) },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  roleLbl: {
    fontSize: fontSize(11),
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Medium,
    marginRight: fontSize(15),
  },
  roleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: fontSize(2),
    justifyContent: "space-between",
  },
  greenBg: {
    backgroundColor: color.palette.green,
  },
  TitleWrapper: {
    width: "90%",
  },
  fullFlex: {
    flex: 1,
  },
  ApprovalWrapper: {
    paddingHorizontal: fontSize(5),
    height: styleConfig?.isAndroid ? fontSize(20) : fontSize(22),
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: styleConfig?.isAndroid ? fontSize(1) : fontSize(2),
    borderRadius: fontSize(3),
    backgroundColor: color.palette.orange,
  },
  OptionWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 10,
    right: 10,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  RawContainer: {
    backgroundColor: color.white,
    alignItems: "center",
    marginVertical: 2,
    paddingVertical: 2,
    flexDirection: "row",
    flex: 1,
  },
  ImageContainer: {
    backgroundColor: color.searchBg,
    width: fontSize(55),
    height: fontSize(55),
    // borderRadius: fontSize(60),
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    alignSelf: "flex-start",
    marginHorizontal: fontSize(12),
  },
  ImageWrapper: {
    width: fontSize(55),
    height: fontSize(55),
  },
  TextContainer: {
    justifyContent: "center",
    flex: 1,
    bottom: fontSize(2),
  },
  Title: {
    fontSize: fontSize(14),
    color: color.palette.blackSecondary,
    fontFamily: font.Poppins_Medium,
  },
  TitleLocation: {
    fontSize: fontSize(12),
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Medium,
  },
  TitleApproval: {
    fontSize: fontSize(10),
    color: color.palette.white,
    fontFamily: font.Poppins_Medium,
  },
});
