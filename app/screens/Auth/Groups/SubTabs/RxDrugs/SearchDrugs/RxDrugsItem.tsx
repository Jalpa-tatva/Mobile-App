import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

// Import the external lib.
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import I18n from "i18n-js";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Import the custom function, styles and common components
import { color, fontSize } from "@theme/index";
import { assets } from "../../../../../../../assets/images";
import {
  RawContainerMainItem,
  RawContainer,
  ImageWrapper,
  TextContainer,
  DrugTitle,
  DateContainer,
  DateLabel,
  AddDrugContainer,
  StartDateContainer,
  AddDrugLabel,
  TitleLocationOne,
  ReviewContainer,
  WebIcon,
  TopContainer,
  TopSubContainer,
} from "./Style";

export interface RxDrugsSearchProps {
  title: string;
  category: string;
  subcategory: string;
  description: string;
  createDate?: string;
  webPage: string;
  onPress: () => void;
  onPressWeb: () => void;
}
// onPress={props.onPress}
export function RxDrugsItem(props: RxDrugsSearchProps) {
  const startDate = moment(Number(props.createDate)).format("ddd DD MMM YYYY");
  return (
    <TouchableOpacity activeOpacity={1} style={RawContainerMainItem}>
      <View style={RawContainer}>
        <Image
          source={assets.rxdrugs}
          style={ImageWrapper}
          resizeMode="stretch"
        />

        <View style={TextContainer}>
          <View style={TopContainer}>
            <View style={TopSubContainer}>
              <Text style={DrugTitle} numberOfLines={2}>
                {props.title}
              </Text>
            </View>
            {props.webPage ? (
              <View style={WebIcon}>
                <MaterialCommunityIcons
                  name="web"
                  color={color.secondaryLight}
                  size={fontSize(25)}
                />
              </View>
            ) : null}
          </View>
          <View style={DateContainer}>
            <View style={StartDateContainer}>
              <AntDesign
                name="calendar"
                size={fontSize(15)}
                color={color.palette.blackSecondary}
              />
              <Text style={DateLabel}>{startDate}</Text>
            </View>
            <TouchableOpacity onPress={props.onPress} style={AddDrugContainer}>
              <FontAwesome
                name="plus-circle"
                size={fontSize(15)}
                color={color.palette.white}
              />
              <Text style={AddDrugLabel}>{"Add Drug"}</Text>
            </TouchableOpacity>
          </View>
          {props.webPage ? (
            <TouchableOpacity
              style={ReviewContainer}
              onPress={props.onPressWeb}
            >
              <View>
                <FontAwesome
                  name="arrow-circle-right"
                  size={fontSize(15)}
                  color={color.palette.blackSecondary}
                />
              </View>
              <Text numberOfLines={3} style={TitleLocationOne}>
                {I18n.t("rxDrug.ClickToReview")}
              </Text>
            </TouchableOpacity>
          ) : null}

          {/* <Button
            tx={'rxDrug.addThisDrugs'}
            onPress={props.onPress}
            isLoader={false}
            style={loginButtonContainer}
            textStyle={BottonTitle}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}
