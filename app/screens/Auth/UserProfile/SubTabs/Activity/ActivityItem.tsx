import React, { memo, useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// import external libraries
import I18n from "i18n-js";

// import custom compoents, styling & utils
import {
  ApprovalWrapper,
  TitleApproval,
  ImageWrapper,
  ImageContainer,
  RawContainerMain,
  Title,
  RawContainer,
  TextContainer,
  Description,
  ReadMoreText,
  BottomTimeRow,
  authorBy,
  startDateStyle,
} from "./style";
import ShowImage from "@app/components/FastImage/ShowImage";
import { followingWrap } from "../Following/styles";

/**
 *  Activities Props
 */

export interface ActivityItemProps {
  publishText: string;
  publishedByImageUrl: string;
  subject: string;
  publishedBy: string;
  startDate?: string;
}

/**
 * ActivitiesItem component
 */
export const ActivityItem = memo((props: ActivityItemProps) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [isTruncated] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    const { lines } = e.nativeEvent;
    if (lines.length >= 2) {
      if (lines[1].width > 200) {
        setLengthMore(true);
      }
    }
  }, []);

  return (
    <View style={followingWrap}>
      <TouchableOpacity
        activeOpacity={1}
        disabled={true}
        style={RawContainerMain}
      >
        <View style={RawContainer}>
          <View style={ImageContainer}>
            <ShowImage
              imageStyle={ImageWrapper}
              url={props.publishedByImageUrl}
            />
          </View>

          <View style={TextContainer}>
            <View>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={textShown ? undefined : 2}
                style={Title}
              >
                {props.subject}
              </Text>
            </View>
            <View>
              {lengthMore || isTruncated ? (
                <Text onPress={toggleNumberOfLines} style={ReadMoreText}>
                  {textShown ? "Read less" : "Read more"}
                </Text>
              ) : null}
            </View>
            <View style={BottomTimeRow}>
              <View style={authorBy}>
                <Text numberOfLines={2} style={Description}>
                  {I18n.t("TabTitle.By")} {props.publishedBy}
                </Text>
              </View>
              <TouchableOpacity activeOpacity={1} style={ApprovalWrapper}>
                <Text style={TitleApproval}>{props.publishText}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ ...Description, ...startDateStyle }}>
                {props?.startDate}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});
