import React, { memo, useCallback, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

// import external libraries
import I18n from "i18n-js";
// import custom function
import ShowImage from "@app/components/FastImage/ShowImage";

// import custom styling & utils
import {
  ApprovalWrapper,
  TitleApproval,
  ImageWrapper,
  ImageContainer,
  RawContainerMain,
  Title,
  RawContainer,
  TextContainer,
  followingWrap,
  Description,
  ReadMoreText,
  BottomTimeRow,
  authorBy,
  startDateStyle,
  styles,
} from "../styles";
import { translate } from "@app/i18n";
import { color, fontSize } from "@app/theme";
import { FontAwesome } from "@app/utils/icons/VectorIcons";
import { postUpdateStatus } from "@app/services/api/groups";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@app/components";
import Snackbar from "react-native-snackbar";

/**
 *  Comment Props
 */

interface CommentProps {
  publishText: string;
  publishedByImageUrl: string;
  subject: string;
  publishedBy: string;
  startDate?: string;
  userId?: string;
  replyParentId?: string;
  removeItem?: () => void;
  commentCount?: string;
  onPress?: () => void;
  updateList?: any;
}

/**
 * CommentItem component
 */
export const CommentItem = memo((props: CommentProps) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [isTruncated] = useState(false);
  const [isReply, setReply] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
console.log("props in comment item", props);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e: any) => {
    const { lines } = e.nativeEvent;
    if (lines.length >= 2) {
      if (lines[1].width > 200) {
        setLengthMore(true);
      }
    }
  }, []);

  const onReply = (status: boolean) => {
    setReply(status);
    setComment("");
  };

  const addReply = async () => {
    setIsLoading(true);
    const { userId, replyParentId } = props;

    let fcmtoken: string = (await AsyncStorage.getItem("fcmtoken")) ?? "";
    const response: any = await postUpdateStatus(
      userId ?? "",
      comment.trim(),
      fcmtoken,
      replyParentId
    );

    try {
      setIsLoading(false);
      if (response.data && response.data.length > 0) {
        if (
          response.data[0].objectList &&
          response.data[0].objectList.length > 0
        ) {
          console.log("helllosdaksdakjsdjakds", response.data[0].objectList);

          setComment("");
          setReply(false);
          props?.updateList();
        } else {
          Snackbar.show({
            text: response.data[0].status.errorText,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      } else {
        Snackbar.show({
          text: response.data[0].status.errorText,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

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
            <View>
              {/* <TouchableOpacity
                onPress={props?.removeItem}
                style={styles.alignRight}>
                <Text style={{...styles.replyTitle, ...styles.secColorTxt}}>
                  {translate('groupDetails.Delete')}
                </Text>
              </TouchableOpacity> */}
              {/* Comment Reply Flow */}
              <View style={styles.bottomWrapper}>
                <TouchableOpacity
                  style={styles.commentCount}
                  onPress={props.onPress}
                >
                  <Text
                    style={{ ...TitleApproval, ...styles.contentLowerCase }}
                  >{`${props?.commentCount}  ${
                    Number(props.commentCount) > 1
                      ? translate("groupDetails.Comment") + "s"
                      : translate("groupDetails.Comment")
                  }`}</Text>
                </TouchableOpacity>
                {!isReply && (
                  <TouchableOpacity
                    onPress={() => onReply(true)}
                    style={styles.alignRight}
                  >
                    <Text style={TitleApproval}>
                      {translate("groupDetails.Reply")}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {isReply && (
                <View style={styles.replyMainWrapper}>
                  <View style={styles.commentClose}>
                    <Text style={TitleApproval}>
                      {translate("groupDetails.AddComment")}
                    </Text>
                    <FontAwesome
                      name={`times-circle`}
                      size={fontSize(16)}
                      onPress={() => onReply(false)}
                    />
                  </View>
                  <TextInput
                    style={styles.replyWrapper}
                    value={comment}
                    placeholderTextColor={color.searchIcon}
                    placeholder={`${translate("groupDetails.EnterReply")}`}
                    onChangeText={(text) => setComment(text)}
                  />
                  <Button
                    onPress={addReply}
                    isLoader={isLoading}
                    style={styles.replyButton}
                    textStyle={styles.replyTitle}
                    tx={"groupDetails.Reply"}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});
