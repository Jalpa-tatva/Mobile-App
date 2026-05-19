import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";

// import external libraries
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";

// import custom function
import { Loader, EmptyView, LoadMore } from "@components/index";
import { getActivityList, postActivityEmoji } from "@app/services/api/groups";
import { ActivitiesItem } from "./ActivitiesItem";

// import custom styling & utils
import { Full, Body, styles } from "./styles";
import { color, fontSize } from "@theme/index";
import commonStyle from "@app/theme/commonStyle";
import moment from "moment";
import { getDeviceTimeZone, showErrorMessage } from "@app/utils/commonFunction";
import { useRedux } from "@app/redux/hooks";
import { content } from "@app/utils/string";
import { useRoute } from "@react-navigation/native";
import useAppNavigation from "@app/navigation/navigation";
import { GROUP_DETAILS } from "@app/constants";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { translate } from "@app/i18n";
import styleConfig from "@app/theme/styleConfig";
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

/**
 *  Activities Props
 */
export interface ActivitiesProps {
  relativeText: string;
  imageUrl: string;
  user: string;
  messageText: string;
  originalImageUrl: string;
  relativeDate?: string;
  uniqueId?: string;
  id?: string;
  commentCount?: string;
  reactions?: any;
  profile?: any;
}

/**
 * ActivitiesScreen component
 */
export const ActivitiesScreen: React.FC<{
  reload?: boolean;
  setReload: any;
}> = ({ reload, setReload }) => {
  console.log("activity response ====>", reload, setReload);

  const [init] = useState({ width: Dimensions.get("window").width });
  const route = useRoute<any>();
  const [isReply, setReply] = useState(false);
  const [emojiUser, setEmojiUser] = useState([]);
  const { groups } = content;
  const { group_detail, map_detail, chat_detail, login_detail } = useRedux([
    groups.groupsDetail,
    groups.chatDetail,
    groups.mapDetail,
    groups.loginDetail,
  ]);
  const uniqueId =
    route?.params?.isType == "maps"
      ? map_detail?.uniqueId
      : group_detail.uniqueId;

  const [activityList, setActivityList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigation = useAppNavigation();
  const [visible, setVisible] = useState(false);
  const [openUserList, setOpenUserList] = useState(false);
  const [commentId, setCommentId] = useState("0");
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeProfile, setActiveProfile] = useState<any>();
  const [indexEmoji, setIndexEmoji] = useState(-1);

  const snapPoints = useMemo(
    () => [
      fontSize(50) +
        fontSize(
          activeProfile?.usersCount > 1
            ? activeProfile?.usersCount * 110
            : activeProfile?.usersCount * 120
        ),
    ],
    [activeProfile?.usersCount]
  );

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  useEffect(() => {
    onRefresh();
    const focus = navigation.addListener("focus", () => {
      global.screenName = "Activity";
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    });

    return focus;
  }, []);
  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const showUsers = (react: any) => {
    reactMessage(
      react?.emoji?.id,
      commentId,
      activeProfile?.profile,
      login_detail?.userName,
      activeProfile?.emojiUser ? JSON.parse(activeProfile?.emojiUser) : [],
      react?.profileImageUrl
    );
    setOpenUserList(false);
  };

  const showAllTab = () => {
    return (
      <ReactMessages
        data={emojiUser}
        loginUser={login_detail.userName}
        commentId={commentId}
        reactMessage={(react: any) => showUsers(react)}
      />
    );
  };

  useEffect(() => {
    console.log("chat_detail ======>", chat_detail);

    let cloneData: any = activityList;
    let notifyData = chat_detail?.data;
    let fromss = notifyData?.fromss;
    let message = chat_detail?.notification?.body;

    let title = chat_detail?.notification?.title;

    const username = title?.split(" has posted")[0];
    const messageTxt = `${username} @${notifyData?.title}: ${message}`;
    console.log("messageTxt ======>", messageTxt, username, notifyData?.titleS);

    if (fromss === "Activity") {
      const newMsg = {
        recordNumber: Math.floor(Math.random() * 20),
        recordName: "message",
        id: notifyData?.replyParentId,
        subject: "Individual message",
        messageText: messageTxt,
        user: username,
        relativeText: "moment ago",
        profile: notifyData?.title,
        uniqueId: notifyData?.uniqueId,
        imageUrl: notifyData?.imageUrl,
        relativeDate: Date.now().toString(),
      };
      const index = cloneData.findIndex((item) => item.id === newMsg.id);

      if (index !== -1) {
        const updatedItem = { ...cloneData[index] };

        updatedItem.commentCount = (
          parseInt(updatedItem.commentCount || "0", 10) + 1
        ).toString();

        cloneData[index] = updatedItem;

        // optional: move to top
        const [item] = cloneData.splice(index, 1);
        cloneData.unshift(item);
      } else {
        cloneData.unshift(newMsg);
      }
      setActivityList(cloneData);
    } else if (fromss == "ActivityReaction") {
      const {
        messageId = "",
        emojiId = 1,
        username: userName = "Guest",
        imageUrl: image = "",
      } = notifyData || {};

      const selectedEmojiId = emojiId.toString(); // Convert ID to string
      let cloneData = activityList;

      // Find the specific message object based on the messageId
      let message: any = cloneData.find((item: any) => item?.id === messageId);

      let reactions =
        message &&
        message?.reactions &&
        Object.keys(message?.reactions)?.length > 0
          ? JSON.parse(message.reactions)
          : {};

      // Check if the user has already reacted with any emoji
      const userCurrentReaction = Object.keys(reactions).find((key) =>
        reactions[key]?.users?.some((user) => user.name === userName)
      );

      if (userCurrentReaction) {
        if (userCurrentReaction === selectedEmojiId) {
          reactions[selectedEmojiId].users = reactions[
            selectedEmojiId
          ].users.filter((u) => u.name !== userName);
          reactions[selectedEmojiId].count -= 1;

          if (reactions[selectedEmojiId].count === 0) {
            delete reactions[selectedEmojiId];
          }
        } else {
          if (reactions[userCurrentReaction]) {
            reactions[userCurrentReaction].users = reactions[
              userCurrentReaction
            ].users.filter((u) => u.name !== userName);
            reactions[userCurrentReaction].count -= 1;

            if (reactions[userCurrentReaction].count === 0) {
              delete reactions[userCurrentReaction];
            }
          }

          // Add the new reaction
          if (reactions[selectedEmojiId]) {
            reactions[selectedEmojiId].count += 1;
            reactions[selectedEmojiId].users.push({
              name: userName,
              profileImageUrl: image,
              enteredTime: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
            });
          } else {
            reactions[selectedEmojiId] = {
              count: 1,
              users: [
                {
                  name: userName,
                  profileImageUrl: image,
                  enteredTime: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
                },
              ],
            };
          }
        }
      } else {
        // Case: User has not reacted before
        if (reactions[selectedEmojiId]) {
          // Emoji already exists, increment count and add user
          reactions[selectedEmojiId].count += 1;
          reactions[selectedEmojiId].users.push({
            name: userName,
            profileImageUrl: image,
            enteredTime: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
          });
        } else {
          // Create a new entry for the emoji

          reactions[selectedEmojiId] = {
            count: 1,
            users: [
              {
                name: userName,
                profileImageUrl: image,
                enteredTime: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
              },
            ],
          };
        }
      }

      // Update the group list with the new reactions
      const updatedData: any = activityList.map((item: any) => {
        if (item.id === messageId) {
          return { ...item, reactions: JSON.stringify(reactions) };
        }
        return item;
      });

      setActivityList(updatedData);
    }
  }, [chat_detail?.id || chat_detail?.messageId]);

  const reactMessage = async (
    emoji: string,
    id: string,
    profile: string,
    userName: string,
    reactions: any = {},
    image: string
  ) => {
    // Initialize reactions object if it's not an object or if it's an empty array
    const selectedEmojiId = emoji.toString();

    if (
      !reactions ||
      typeof reactions !== "object" ||
      Array.isArray(reactions)
    ) {
      reactions = {};
    }

    // Check if reactions is a string (e.g., from server response), parse it
    if (typeof reactions === "string") {
      try {
        reactions = JSON.parse(reactions);
      } catch (error) {
        reactions = {}; // Fallback to empty object if parsing fails
      }
    }

    // Check if the user has already reacted
    const userCurrentReaction = Object.keys(reactions).find((key) =>
      reactions[key]?.users?.some((user) => user.name === userName)
    );

    if (userCurrentReaction) {
      // User has reacted with an emoji before
      if (userCurrentReaction === selectedEmojiId) {
        // User is reacting with the same emoji again, remove the reaction
        if (reactions[selectedEmojiId]) {
          reactions[selectedEmojiId].users = reactions[
            selectedEmojiId
          ].users.filter((u) => u.name !== userName);
          reactions[selectedEmojiId].count -= 1;
          if (reactions[selectedEmojiId]?.users?.length === 0) {
            delete reactions[selectedEmojiId];
          }
        }
      } else {
        // Remove user from the previous emoji
        if (reactions[userCurrentReaction]) {
          reactions[userCurrentReaction].users = reactions[
            userCurrentReaction
          ].users.filter((u) => u.name !== userName);
          reactions[userCurrentReaction].count -= 1;
          if (reactions[userCurrentReaction]?.users?.length === 0) {
            delete reactions[userCurrentReaction];
          }
        }

        // Add user to the new emoji
        if (reactions[selectedEmojiId]) {
          reactions[selectedEmojiId].count += 1;
          reactions[selectedEmojiId].users.push({
            name: userName,
            profileImageUrl: image,
            enteredTime: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
          });
        } else {
          // If emoji doesn't exist, create a new entry
          reactions[selectedEmojiId] = {
            count: 1,
            users: [
              {
                name: userName,
                profileImageUrl: image,
                enteredTime: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
              },
            ],
          };
        }
      }
    } else {
      // User hasn't reacted before, add the reaction
      if (reactions[selectedEmojiId]) {
        // If emoji already exists, increment the count and add user
        reactions[selectedEmojiId].count += 1;
        reactions[selectedEmojiId].users.push({
          name: userName,
          profileImageUrl: image,
          enteredTime: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
        });
      } else {
        // If emoji doesn't exist, create a new entry
        reactions[selectedEmojiId] = {
          count: 1,
          users: [
            {
              name: userName,
              profileImageUrl: image,
              enteredTime: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
            },
          ],
        };
      }
    }

    try {
      setIsLoading(true);

      // Send the request to the server
      const res = await postActivityEmoji(
        id,
        emoji,
        userCurrentReaction === selectedEmojiId,
        profile
      );
      console.log("eresponse of messageReact", res);

      if (res?.data && res?.data[0]?.objectList.length > 0) {
        const updatedData: any = activityList.map((item: any) => {
          if (item.id === id) {
            return { ...item, reactions: JSON.stringify(reactions) };
          }
          return item;
        });
        setIsLoading(false);
        setVisible(false);
        setActivityList(updatedData);
      } else {
        showErrorMessage("Unexpected server response");
        setIsLoading(false);
      }
    } catch (error) {
      showErrorMessage("Error sending reaction to server:");
    }
  };

  useEffect(() => {
    if (reload) {
      onRefresh();
      setReload(false);
    }
  }, [reload]);

  const activityApiCall = () => {
    setActivityList([]);
    setIsLoader(true);
    getActivityList(1, uniqueId)
      .then((res) => {
        setIsLoader(false);
        console.log("activity list", res?.data);

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            setActivityList(res.data[0].objectList);
          } else {
            setActivityList([]);
          }
        } else {
          setActivityList([]);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setActivityList([]);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const loadMoreData = (page: number) => {
    setMoreLoader(true);
    setEndReach(false);
    getActivityList(page, uniqueId)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let groupObjectList = res.data[0].objectList;
            setActivityList(
              page === 1
                ? groupObjectList
                : [...activityList, ...groupObjectList]
            );
            setMoreLoader(false);
          } else {
            setMoreLoader(false);
            setEndReach(true);
          }
        } else {
          setMoreLoader(false);
          setEndReach(true);
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > activityList.length) {
      const pageData = page + 1;
      setPage(pageData);
      setMoreLoader(true);
      setEndReach(false);
      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };

  const onRefresh = () => {
    setOpenUserList(false);
    setCommentId("0");
    setPage(1);
    setTotalRecords(0);
    setActivityList([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    activityApiCall();
  };

  const navigateToComment = useCallback(
    (id: string) => {
      navigation.push(GROUP_DETAILS.Comment, { id: id });
    },
    [navigation]
  );

  const renderRaw = (item: ActivitiesProps) => {
    let msg = "";

    if (item?.messageText && item.messageText.includes(":")) {
      msg = item.messageText
        .substring(item.messageText.indexOf(":") + 1)
        .trim();
    }
    const pattern = new RegExp(`${item?.profile}:\\s*(.*)$`);

    const match = item.messageText.match(pattern);
    const result = match ? match[1].trim() : "";

    const startDate =
      moment(Number(item?.relativeDate)).format("ddd DD MMM YYYY, hh:mm A") +
      " " +
      getDeviceTimeZone();
    null;
    console.log("activty reaction logs", item);
    return (
      <ActivitiesItem
        publishText={item.relativeText}
        publishedByImageUrl={item.imageUrl}
        subject={result}
        setOpenUserList={setOpenUserList}
        publishedBy={item.user}
        startDate={startDate}
        userId={item.uniqueId}
        replyParentId={item.id}
        commentCount={item?.commentCount}
        onPress={() => navigateToComment(item?.id ?? "")}
        updateList={activityApiCall}
        setVisible={setVisible}
        visible={visible}
        id={item?.id}
        setCommentId={setCommentId}
        commentId={commentId}
        emojiUser={item?.reactions}
        onSelectionUser={onSelectionUser}
        reactMessage={reactMessage}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setReply={setReply}
        removeAction={removeAction}
        isReply={isReply}
      />
    );
  };

  const onSelectionUser = useCallback(
    (props: {
      users: [];
      profile: string;
      emojiUser: any;
      profileImage: string;
    }) => {
      setActiveProfile({
        profile: props.profile,
        emojiUser: props?.emojiUser,
        profileImage: props?.profileImage,
        usersCount: Number(props?.users?.length),
      });

      setEmojiUser(props?.users);
      setIndexEmoji(1);
      setVisible(false);
      setReply(false);
      setOpenUserList(true);
      bottomSheetRef?.current?.expand();
    },
    []
  );

  const removeAction = () => {
    setVisible(false);
    setOpenUserList(false);
    setReply(false);
  };

  return (
    // <View>
    <View testID="ActivitiesScreen" style={Full}>
      <View style={{ ...Body, ...styles.margeTop }}>
        {isLoader ? <Loader /> : null}
        {!isLoader && activityList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyActivities")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <FlatList
            data={activityList}
            renderItem={({ item }) => renderRaw(item)}
            showsVerticalScrollIndicator={false}
            style={commonStyle.flatRadiousStyle}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.1}
            onEndReached={() => (endReach == false ? loadMorePage() : null)}
            onMomentumScrollBegin={() => setEndReachedMomentum(false)}
            ListFooterComponent={() => {
              return isMoreLoader ? (
                <LoadMore animating={isMoreLoader} />
              ) : null;
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
      {emojiUser && emojiUser?.length > 0 && openUserList && (
        <BottomSheet
          ref={bottomSheetRef}
          index={indexEmoji}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          backgroundStyle={styles.sheetContainer}
        >
          <BottomSheetView style={styles.fullFlex}>
            <View style={styles.sheetHeader}>
              <Text style={styles.closeLabel}>
                {translate("common.all")} {emojiUser?.length}
              </Text>
            </View>
            <View style={styles.fullFlex}>
              <ReactMessages
                data={emojiUser}
                loginUser={login_detail.userName}
                commentId={commentId}
                reactMessage={(react: any) => showUsers(react)}
              />
            </View>
            <TouchableOpacity
              style={styles.closeContainer}
              onPress={() => bottomSheetRef.current?.close()}
            >
              <Text style={styles.closeLabel}>{translate("common.close")}</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
    // </View>
  );
};

const CustomeTabBar = ({ state, descriptors, navigation }) => {
  // console.log("=====>",JSON.stringify());

  return (
    <>
      <View style={styles.mainNavigator}>
        {state.routes.map(
          (route: { key: string | number; name: any }, index: any) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <View style={styles.menuTab}>
                {!isFocused ? (
                  <TouchableOpacity style={styles.nonFocus} onPress={onPress}>
                    {label.includes("All") ? (
                      <Text style={styles.nonFocusLabel}>{label}</Text>
                    ) : null}
                    {label === "Setting" ? (
                      <Text
                        style={{ ...styles.nonFocusLabel, ...styles.focusCal }}
                      >
                        {label}
                      </Text>
                    ) : null}
                    {label.includes("ðŸ‘") ? (
                      <Text
                        style={{ ...styles.nonFocusLabel, ...styles.focusCal }}
                      >
                        {label}
                      </Text>
                    ) : null}
                    {label.includes("ðŸ‘Ž") ? (
                      <Text
                        style={{ ...styles.nonFocusLabel, ...styles.focusCal }}
                      >
                        {label}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={onPress} style={styles.nonFocus}>
                    {label.includes("All") ? (
                      <Text style={styles.focusLabel}>{label}</Text>
                    ) : null}
                    {label === "Setting" ? (
                      <Text
                        style={{ ...styles.nonFocusLabel, ...styles.focusCal }}
                      >
                        {label}
                      </Text>
                    ) : null}
                    {label.includes("ðŸ‘") ? (
                      <Text
                        style={{ ...styles.nonFocusLabel, ...styles.focusCal }}
                      >
                        {label}
                      </Text>
                    ) : null}
                    {label.includes("ðŸ‘Ž") ? (
                      <Text
                        style={{ ...styles.nonFocusLabel, ...styles.focusCal }}
                      >
                        {label}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                )}
              </View>
            );
          }
        )}
      </View>
      <View style={styles.CommonLine} />
    </>
  );
};
