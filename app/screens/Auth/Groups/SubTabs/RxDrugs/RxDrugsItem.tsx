import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Import the external lib.
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Tooltip from "react-native-walkthrough-tooltip";

// Import the custom function,styles and common components.
import { color, fontSize } from "@theme/index";
import { assets } from "../../../../../../assets/images";
import {
  RawContainerMainItem,
  RawContainer,
  ImageWrapper,
  Title,
  TitleLocation,
  ImageSub,
  DetailWrapper,
  BottomWrapper,
  BottomlWrapperLeft,
  BottomTitle,
  BottomlWrapperRight,
  InfoWrapper,
  TitleLocationBold,
  TooltipWrapper,
  TitleLocationOther,
} from "./styles";
import ShowImage from "@app/components/FastImage/ShowImage";

/***
 * RxDrugsProps
 */
export interface RxDrugsProps {
  tablateName: string;
  weight: string;
  imageUrl: string;
  perDay: string;
  desc: string;
  webPage: string;
  customDataMedicationForm: string;
  id: number;
  HasNotes: boolean;
  HasWebInfo: boolean;
  onPress: () => void;
  onPressWeb: () => void;
}

/***
 * RxDrugsItem
 */
export function RxDrugsItem(props: RxDrugsProps) {
  const [toolTipVisible, setToolTipVisible] = useState(false);

  return (
    <TouchableOpacity onPress={props.onPress} style={RawContainerMainItem}>
      <View style={RawContainer}>
        <View style={ImageWrapper}>
          <ShowImage
            imageStyle={ImageSub}
            source={assets.rxdrugs}
            resizeMode="stretch"
          />
        </View>
        <View style={DetailWrapper}>
          <Text numberOfLines={2} style={Title}>
            {props?.tablateName}
          </Text>
          {props.customDataMedicationForm && (
            <Text style={[TitleLocation]} numberOfLines={2}>
              {props.customDataMedicationForm}
            </Text>
          )}
        </View>
      </View>
      <View style={BottomWrapper}>
        {props.weight && (
          <View style={BottomlWrapperLeft}>
            <View>
              <Text style={BottomTitle}>Dosage</Text>
            </View>
            <Text numberOfLines={1} style={TitleLocation}>
              {props.weight}
            </Text>
          </View>
        )}
        {props.perDay && (
          <View style={BottomlWrapperRight}>
            <View>
              <Text style={BottomTitle}>Frequency</Text>
            </View>
            <Text numberOfLines={1} style={TitleLocation}>
              {props.perDay}
            </Text>
          </View>
        )}
      </View>
      <View style={InfoWrapper}>
        {props.webPage ? (
          <MaterialCommunityIcons
            name="web"
            color={color.secondaryLight}
            size={fontSize(22)}
            onPress={props.onPressWeb}
            style={{ marginRight: 8 }}
          />
        ) : null}

        {props.desc ? (
          <Tooltip
            isVisible={toolTipVisible}
            content={
              <View style={TooltipWrapper}>
                <Text style={TitleLocationBold}>{"Note : "}</Text>
                <Text style={[TitleLocation, TitleLocationOther]}>
                  {props.desc}
                </Text>
              </View>
            }
            placement="top"
            onClose={() => setToolTipVisible(false)}
          >
            <AntDesign
              name="infocirlce"
              color={color.secondaryLight}
              size={fontSize(22)}
              onPress={() => setToolTipVisible(true)}
              style={{ marginRight: 8, marginTop: 10 }}
            />
          </Tooltip>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
