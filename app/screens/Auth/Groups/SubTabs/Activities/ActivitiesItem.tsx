import React, { memo, useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

// import external libraries
import I18n from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Snackbar from "react-native-snackbar";

// import custom function
import { postUpdateStatus } from "@app/services/api/groups";
import { Button, Loader } from "@app/components";
import { emojiList } from "@app/constants";
import ShowEmoji from "./Emoji/ShowEmoji";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import ShowImage from "@app/components/FastImage/ShowImage";

// import custom styling & utils
import {
  ApprovalWrapper,
  TitleApproval,
  ImageWrapper,
  ImageContainer,
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
} from "./styles";
import { translate } from "@app/i18n";
import { color, fontSize } from "@app/theme";
import { FontAwesome } from "@app/utils/icons/VectorIcons";
import AddReact from "../../../../../../assets/svg/AddReact";

/**
 *  Activities Props
 */

export interface ActivitiesProps {
  publishText: string;
  publishedByImageUrl: string;
  subject: string;
  publishedBy: string;
  startDate?: string;
  userId?: string;
  replyParentId?: string;
  commentCount?: string;
  onPress?: () => void;
  updateList?: any;
  setVisible: (status: boolean) => void;
  setCommentId: (status: string) => void;
  visible?: boolean;
  id?: string;
  commentId?: string;
  onSelectionUser?: any;
  emojiUser?: any;
  reactMessage?: any;
  isLoading?: boolean;
  isReply?: boolean;
  setIsLoading: (status: boolean) => void;
  setOpenUserList: (status: boolean) => void;
  setReply: (status: boolean) => void;
  removeAction: () => void;
}

const { groups } = content;

/**
 * ActivitiesItem component
 */
export const ActivitiesItem = memo((props: ActivitiesProps) => {
  const updateReaction = props?.emojiUser ? JSON.parse(props?.emojiUser) : [];
  const { setVisible, visible, setCommentId, commentId } = props;
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [isTruncated] = useState(false);
  const [comment, setComment] = useState("");
  const { login_detail } = useRedux([groups.loginDetail]);

  let loginData = login_detail;

  const toggleNumberOfLines = () => {
    props?.setOpenUserList(false);
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
    props?.setOpenUserList(false);
    props?.setReply(status);
    props?.setVisible(false);
    props?.setCommentId(props?.id ?? "");
    setComment("");
  };

  const addReply = async () => {
    props?.setIsLoading(true);
    const { userId, replyParentId } = props;

    let fcmtoken: string = (await AsyncStorage.getItem("fcmtoken")) ?? "";
    const response: any = await postUpdateStatus(
      userId ?? "",
      comment.trim(),
      fcmtoken,
      replyParentId
    );

    try {
      props?.setIsLoading(false);
      if (response.data && response.data.length > 0) {
        if (
          response.data[0].objectList &&
          response.data[0].objectList.length > 0
        ) {
          setComment("");
          props?.setReply(false);
          props?.updateList();
          setCommentId("0");
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
      props?.setIsLoading(false);
    }
  };

  const onOpenEmojis = () => {
    setVisible(true);
    props?.setOpenUserList(false);
    props?.setReply(false);
    setCommentId(props?.id ?? "");
  };

  return (
    <TouchableWithoutFeedback onPress={() => props?.removeAction()}>
      <View style={followingWrap}>
        <View style={RawContainer}>
          <View style={ImageContainer}>
            <ShowImage
              imageStyle={ImageWrapper}
              url={props.publishedByImageUrl}
            />
          </View>

          <View style={TextContainer}>
            <View style={styles.contentWithReact}>
              <View style={styles.fullFlex}>
                <Text
                  onTextLayout={onTextLayout}
                  numberOfLines={textShown ? undefined : 2}
                  style={Title}
                >
                  {props.subject}
                </Text>
              </View>
              <View style={styles.reactWrapper}>
                <AddReact
                  color={color.secondary}
                  onPress={() => onOpenEmojis()}
                />
              </View>
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
              {visible && props?.id == commentId && (
                <ShowEmoji
                  loginData={loginData}
                  setVisible={setVisible}
                  emojies={updateReaction}
                  reactMessage={(
                    id: string,
                    activityId: string,
                    userId: string
                  ) =>
                    props?.reactMessage(
                      id,
                      activityId,
                      userId,
                      loginData?.userName,
                      props?.emojiUser ? JSON.parse(props?.emojiUser) : [],
                      loginData?.userImageUrl
                    )
                  }
                  items={{
                    userName: props.publishedBy,
                    userId: props.userId,
                    activtyId: props.id,
                  }}
                />
              )}
              <View style={styles.bottomWrapper}>
                <TouchableOpacity
                  style={styles.commentCount}
                  onPress={props.onPress}
                >
                  <Text
                    style={{
                      ...TitleApproval,
                      ...styles.contentLowerCase,
                    }}
                  >{`${props?.commentCount ?? 0}  ${
                    Number(props.commentCount) > 1
                      ? translate("groupDetails.Comment") + "s"
                      : translate("groupDetails.Comment")
                  }`}</Text>
                </TouchableOpacity>
                {!props?.isReply && (
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

              {props?.isReply && props?.id == commentId && (
                <View style={styles.replyMainWrapper}>
                  <View style={styles.commentClose}>
                    <Text style={TitleApproval}>
                      {translate("groupDetails.AddComment")}
                    </Text>
                    <FontAwesome
                      name={`times-circle`}
                      size={fontSize(16)}
                      onPress={() => onReply(false)}
                      color={color.secondary}
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
                    isLoader={props.isLoading}
                    style={styles.replyButton}
                    textStyle={styles.replyTitle}
                    tx={"groupDetails.Reply"}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.emojiCounter}>
          {Object.keys(updateReaction).map((emoji, index) => {
            const combinedUsers = Object.entries(updateReaction).flatMap(
              ([key, value]: any) =>
                value?.users?.map((user: any) => ({
                  ...user,
                  emoji: emojiList[Number(key) - 1], // Add emoji to each user based on key
                }))
            );
            return (
              <TouchableOpacity
                key={index}
                style={styles.emojiWrapper}
                // onLongPress={() => removeEmoji(props?.id)}
                onPress={(e) => {
                  props?.onSelectionUser({
                    users: combinedUsers,
                    profile: props?.userId,
                    emojiUser: props?.emojiUser,
                    profileImage: props?.publishedByImageUrl,
                  });
                  props?.setCommentId(props?.id ?? "");
                }}
              >
                <View>
                  <Text style={styles.EmojiTitle}>
                    {`${emojiList[Number(emoji) - 1]?.emoji}`}

                    {updateReaction[emoji]?.count > 0 &&
                      ` ${updateReaction[emoji]?.count}`}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {props?.isLoading && props?.id == commentId && visible && (
          <View style={styles.loaderWrapper}>
            <Loader size={"small"} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});
