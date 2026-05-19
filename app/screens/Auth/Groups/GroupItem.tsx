import React, { memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// import external libraries
import Animated from "react-native-reanimated";

// import custom styling & utils
import { color, font, fontSize } from "@theme/index";
import styleConfig from "@app/theme/styleConfig";
import ShowImage from "@app/components/FastImage/ShowImage";
import FontAwesome from "react-native-vector-icons/FontAwesome"

/**
 *  Group Props
 */
export interface GroupProps {
  title: string;
  openTicketsCount: number;
  description: string;
  location: string;
  imageUrl: string;
  id?: string;
  viewableItems?: any;
  onPress: Function;
}

/**
 *  GroupItem component
 */
export const GroupItem = memo((props: GroupProps) => {
  // const r1Style = useListingAnimationStyle({
  //   viewableItems: props?.viewableItems,
  //   id: props.id,
  // });

  return (
    // <Animated.View style={[styles.mainContainerStyle, r1Style]}>
    <Animated.View style={[styles.mainContainerStyle]}>
      <TouchableOpacity onPress={() => props.onPress()}>
        <View style={styles.sub1ContainerStyle}>
          <View style={styles.imageStyle}>
            <View style={styles.ImageBg}>
              <ShowImage
                url={props.imageUrl}
                imageStyle={styles.profileStyle}
              />
            </View>
          </View>

          <View style={styles.titleStyle}>
            <View style={styles.contentWrap}>
              <Text numberOfLines={1} style={styles.textStyle}>
                {props.title}
              </Text>
              {props.openTicketsCount > 0 ? (
                <FontAwesome
                  name="flag"
                  color={color.secondary}
                  size={fontSize(20)}
                />
              ) : null}
            </View>

            <Text numberOfLines={2} style={styles.text1Style}>
              {props.description}
            </Text>
            {props.location && (
              <View style={styles.userLocation}>
                <FontAwesome
                  name="map-marker"
                  size={fontSize(12)}
                  color={color.palette.blackSecondary}
                />
                <Text numberOfLines={1} style={styles.TitleLocation}>
                  {props.location}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

export const styles = StyleSheet.create({
  contentWrap: { flexDirection: "row", paddingRight: 5 },
  mainContainerStyle: {
    width: "94%",
    marginHorizontal: 2,
    alignSelf: "center",
    backgroundColor: color.white,
    flex: 1,
    marginBottom: fontSize(10),
    padding: fontSize(8),
    // paddingVertical:fontSize(50),
    borderColor: color.searchBg,
    shadowColor: color.searchBg,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: fontSize(10),
    elevation: 5,
    borderWidth: 1,

    borderRadius: fontSize(10),
  },

  sub1ContainerStyle: {
    flex: 1,
    backgroundColor: color.white,
    flexDirection: "row",
    // alignItems: 'flex-start',
  },

  imageStyle: {
    // flex: 0.7,
    justifyContent: "center",
  },

  ImageBg: {
    alignItems: "center",
    borderRadius: fontSize(5),
    justifyContent: "center",
    backgroundColor: color.imagebg,
    height: fontSize(60),
    width: fontSize(60),
  },

  titleStyle: {
    // flex: 3.3,
    flex: 1,
    justifyContent: "center",
    paddingLeft: fontSize(15),
    // backgroundColor:'pink'
  },
  checkboxStyle: {
    flex: 0.2,
    justifyContent: "center",
  },

  profileStyle: {
    height: fontSize(60),
    width: fontSize(60),
    resizeMode: "stretch",
    borderRadius: fontSize(5),
  },

  checkStyle: {
    alignSelf: "center",
    width: 24,
    height: 24,
  },

  textStyle: {
    fontSize: fontSize(14.5),
    color: color.palette.blackSecondary,
    // marginLeft: 14,
    flex: 1,
    marginRight: fontSize(2),
    fontFamily: font.Poppins_Medium,
  },
  text1Style: {
    fontSize: fontSize(11),
    color: color.detailscolor,
    // marginLeft: fontSize(14),
    paddingRight: 10,
    fontFamily: font.Poppins_Regular,
  },
  userLocation: {
    flexDirection: "row",
    alignItems: "center",
    // paddingLeft: fontSize(10),
    paddingTop: styleConfig.isAndroid ? fontSize(2) : fontSize(3),
  },
  TitleLocation: {
    fontSize: fontSize(10),
    color: color.palette.blackSecondary,
    fontFamily: font.Poppins_Medium,
    paddingTop: fontSize(1),
    paddingLeft: fontSize(1),
  },
});
