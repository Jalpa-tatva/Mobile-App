import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { color, font, fontSize } from "@theme/index";
import Icons from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export interface CustomDrawerProps {
  title?: string;
  icon?: string;
  selected?: boolean;
  onPress?: () => void;
}

export function CustomDrawerItem(props: CustomDrawerProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (props?.selected) {
      Animated.spring(scaleAnim, {
        toValue: 1.1,
        friction: 3,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [props?.selected]);

  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={1}
      style={[
        styles.mainContainerStyle,
        {
          backgroundColor: !props.selected
            ? color.secondary
            : color.secondaryTransprent,
        },
      ]}
    >
      <View style={[styles.sub1ContainerStyle]}>
        <View
          style={[
            styles.titleStyle,
            // {transform: [{scale: props.selected ? scaleAnim : 1}]},
          ]}
        >
          {props?.title == "Profile" ? (
            <FontAwesome
              name={props.icon}
              color={color.palette.white}
              size={fontSize(21)}
              // style={{justifyContent: 'center'}}
            />
          ) : (
            <Icons
              name={props.icon}
              color={color.palette.white}
              size={fontSize(21)}
              // style={{justifyContent: 'center'}}
            />
          )}
          <Text numberOfLines={1} style={[styles.textStyle]}>
            {props.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainerStyle: {
    alignItems: "center",
    backgroundColor: color.white,
    width: "100%",
    justifyContent: "center",
    marginVertical: 4,
    borderRadius: fontSize(10),
  },

  sub1ContainerStyle: {
    width: "100%",
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: "5%",
    borderBottomColor: color.linecolor,
  },

  imageStyle: {
    flex: 0.7,
    justifyContent: "center",
  },

  ImageBg: {
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    backgroundColor: color.imagebg,
  },

  titleStyle: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  checkboxStyle: {
    flex: 0.2,
    justifyContent: "center",
  },

  checkStyle: {
    alignSelf: "center",
    width: 24,
    height: 24,
  },

  textStyle: {
    fontSize: fontSize(14.5),
    marginLeft: 14,
    flex: 1,
    fontFamily: font.Poppins_Medium,
    color: color.palette.white,
  },
  text1Style: {
    fontSize: fontSize(12),
    color: color.detailscolor,
    marginLeft: 14,
    paddingRight: 10,
    fontFamily: font.Poppins_Regular,
  },
});
