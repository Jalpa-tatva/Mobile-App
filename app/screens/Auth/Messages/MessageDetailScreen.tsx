import React, {
  JSX,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  FlatList,
  BackHandler,
  ActivityIndicator,
  RefreshControl,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  AppState,
  TouchableOpacity,
  Text,
  Dimensions,
  Keyboard,
  Alert,
} from "react-native";

// import external libraries
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import FileViewer from "react-native-file-viewer";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import moment from "moment";

// import custom function & component
import {
  getMessageDetail,
  getMyMemberList,
  postEmoji,
  postMessage,
} from "@app/services/api/groups";
import { CommentItem } from "./CommentItem";
import { color, fontSize } from "@theme/index";
import { loadString } from "@app/utils/storage";
import { assets } from "../../../../assets/images";
import { MessageHeader } from "@app/components/MessageHeader/MessageHeader";
import MessageBox from "@app/components/MessageBox/MessageBox";
import ShowImage from "@app/components/FastImage/ShowImage";
import ReactMessages from "./ReactMessages/ReactMessages";
import { useRedux } from "@app/redux/hooks";
import { EmptyView, Loader } from "@app/components";
import { chat } from "@app/redux/reducer/chatReducer";

// import custom styling & utils
import {
  FULL,
  HEADERTOP,
  BODY,
  InputRaw,
  TextInputStyle,
  SendButton,
  TitleTxt,
  CenterContainerOther,
  BottomMsgCal,
  docModalStyle,
  detailModalStyle,
  style,
  ProfileWrapper,
  MainView,
  ProfileWrapperSpace,
  LoaderCal,
  MAIN_FULL,
  leftContainer,
} from "./HomeStyle";
import {
  checkPermissionAbove33Version,
  checkPermissionBelow33Version,
} from "@app/utils/Permissions/Permission";
import { showErrorMessage } from "@app/utils/commonFunction";
import { styles } from "./Styles";
import styleConfig from "@app/theme/styleConfig";
import { getMyGroupDetail } from "@app/services/api/careTeam";
import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@app/utils/icons/VectorIcons";
import { content } from "@app/utils/string";
import RBSheet from "react-native-raw-bottom-sheet";
import { translate } from "@app/i18n";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";
import { MESSAGE, MODULES } from "@app/constants";

const moreDetail = [
  {
    name: "user-circle",
    title: "View Profile",
  },
];

const docsDetail = [
  {
    name: "file-text",
    title: "Document",
  },
  {
    name: "image",
    title: "Photo",
  },
  {
    name: "toggle-right",
    title: "Video",
  },
];

interface MessageDetailRouteParams {
  conversationid: string;
  title: string;
  isGroup?: boolean | string; // your earlier use-case
  imageUrl?: string;
  params: {
    title: string;
  };
  profileDetail?: {
    email?: string | boolean;
    mobile_no?: string | boolean;
    country?: string | boolean;
  };
}

export interface ListProps {
  setEndReachedMomentum?: Function;
  onRefresh?: Function;
  loadMorePage: any;
  renderDate: Function;
  onSelectionUser: Function;
  screenParams: {
    isLoader?: boolean;
    refreshing?: any;
    isMoreLoader?: boolean;
    groupList?: Array<{}>;
    visible?: boolean;
    commentId?: string;
    closeBottomSheet: any;
  };
}

interface SubList {
  screenParams: {
    addMessage?: Function;
    setEmojiUser?: Function;
    setDocsVisible?: Function;
    emojiUser?: boolean;
    isLoader?: boolean;
    reactLoader?: boolean;
    commentId?: string;
    setVisible?: Function;
    setCommentId?: Function;
    checkPermission?: Function;
    isGroup?: any;
    reactMessage?: Function;
    visible?: boolean;
    groupList?: Array<{}>;
    loginData?: {
      userName: string;
      password: string;
      user_name: string;
      userUniqueId: string;
    };
    closeBottomSheet: any;
  };
  item?: {
    message?: string;
    reactions?: Object;
    profile?: string;
    enteredDate?: string;
    id?: string;
    profileImageUrl?: string;
    uniqueId?: string;
  };
  onSelectionUser?: Function;
}

interface ProfilProps {
  closeProfile?: any;
  profileData?: any;
  memberList?: any;
  profileId?: any;

  route?: {
    params?: { imageUrl?: string; title: string };
  };
}

const RenderList = (props: SubList) => {
  const { onSelectionUser, item, screenParams } = props;

  return (
    <CommentItem
      comment={item?.message}
      bottomSheetRef={(item1) => onSelectionUser(item1)}
      emoji={item?.reactions ? JSON.parse(item.reactions as string) : []}
      from={item.uniqueId}
      time={item.enteredDate}
      originalImageUrl={item.profileImageUrl}
      loginUser={screenParams?.loginData.userUniqueId}
      id={item.id}
      reactMessage={screenParams?.reactMessage}
      visible={screenParams?.visible}
      isLoader={screenParams?.reactLoader}
      commentId={screenParams?.commentId}
      setVisible={screenParams?.setVisible}
      setCommentId={screenParams?.setCommentId}
      item={item}
      closeBottomSheet={screenParams?.closeBottomSheet}
      isGroup={screenParams?.isGroup}
      setDocsVisible={screenParams?.setDocsVisible}
    />
  );
};

const RenderFlatList = (props: ListProps) => {
  const {
    setEndReachedMomentum,
    onRefresh,
    loadMorePage,
    renderDate,
    screenParams,
    onSelectionUser,
  } = props;

  const { groupList, isMoreLoader, isLoader, refreshing } =
    props?.screenParams ?? {};

  const renderMoreLoader = (props) => {
    if (props?.isMoreLoader) {
      return (
        <ActivityIndicator
          animating={isMoreLoader}
          color={color.secondary}
          size="large"
        />
      );
    } else {
      return null;
    }
  };
  const renderRaw = (item: MessageDetailProps, index) => {
    return (
      <View key={item?.id?.toString()}>
        {renderDate(item, groupList[Number(index) + 1])}
        <RenderList
          item={item}
          screenParams={screenParams}
          onSelectionUser={onSelectionUser}
        />
      </View>
    );
  };

  if (!isLoader && groupList && groupList.length == 0) {
    return (
      <EmptyView
        title={I18n.t("EmptyView.EmptyMessage")}
        onPressRefresh={() => onRefresh()}
      />
    );
  } else {
    return (
      <FlatList
        data={groupList}
        inverted={true}
        renderItem={({ item, index }: any) => renderRaw(item, index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 44, flexGrow: 1 }}
        style={style.listing}
        keyExtractor={(item: { id: string }) => item?.id?.toString()} // Ensure unique keys
        onEndReachedThreshold={0.5}
        onEndReached={loadMorePage}
        onMomentumScrollBegin={() => setEndReachedMomentum()}
        ListFooterComponent={renderMoreLoader}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      />
    );
  }
};

interface RouteParams {
  isGroup?: string;
  profileDetail?: {
    email: string | boolean;
    mobile_no: string | boolean;
    country: string | boolean;
  };
  imageUrl?: string;
}

const UserProfile = memo((props: ProfilProps) => {
  const { route, memberList, profileData, closeProfile } = props;
  const routeData: RouteParams = route?.params;
  const profile = routeData?.profileDetail;
  const updateImg = routeData?.imageUrl?.replace("0x0", "200x200");
  const createDate = moment(Number(profileData?.startDate)).format(
    "DD/MM/YYYY"
  );
  const calculateHeight = () => {
    if (memberList?.length == 1) {
      return fontSize(50);
    } else if (memberList?.length == 2) {
      return fontSize(80);
    } else {
      return fontSize(104);
    }
  };
  return (
    <View
      style={{
        ...ProfileWrapper,
        ...ProfileWrapperSpace,
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeIcn}
          onPress={() => closeProfile(false)}
        >
          <AntDesign
            size={fontSize(17)}
            color={color.secondary}
            name={"close"}
          />
        </TouchableOpacity>
        <View style={styles.profileWrapper}>
          <ShowImage
            source={assets.profileBackground}
            imageStyle={styles.profileBackImg}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageWrapper}>
          <ShowImage
            url={updateImg}
            imageStyle={styles.userImage}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.containerWrapper}>
        <View style={styles.userDetail}>
          {
            <Text style={styles.name}>
              {profileData?.title ? profileData?.title : route?.params?.title}
            </Text>
          }
          {routeData?.isGroup == "false" && routeData.profileDetail.email && (
            <Text style={styles.groups}>{routeData?.profileDetail?.email}</Text>
          )}
          {routeData?.isGroup == "false" &&
            routeData?.profileDetail?.mobile_no && (
              <View style={styles.groupsWrap}>
                <Text style={styles.groups}>
                  {`${routeData?.profileDetail?.mobile_no},`}
                </Text>
                {profile?.country && (
                  <View style={{ ...styles.groupsWrap, ...styles.spaceStart }}>
                    <View style={styles.locationIcn}>
                      <FontAwesome
                        name="map-marker"
                        size={fontSize(13)}
                        color={color.palette.darkGray}
                      />
                    </View>
                    <Text style={styles.designation}>{profile.country}</Text>
                  </View>
                )}
              </View>
            )}
          {routeData?.isGroup == "true" && (
            <View>
              <Text style={styles.groups}>
                <Text style={styles.groupBold}>{"Group"}</Text>
                {`  ${memberList?.length} members`}
              </Text>
            </View>
          )}
        </View>
        <>
          {(profileData.description || profileData?.startDate) && (
            <View style={styles.detailWrap}>
              {profileData.description && (
                <Text style={styles.designation} numberOfLines={3}>
                  {profileData.description}
                </Text>
              )}
              {profileData?.startDate && (
                <Text
                  style={styles.createDate}
                >{`Created on ${createDate}`}</Text>
              )}
            </View>
          )}

          {routeData?.isGroup == "true" && (
            <View style={style.memberListing}>
              <Text style={style.members}>Members</Text>
              <View
                style={[style.listingWrapper, { maxHeight: calculateHeight() }]}
              >
                <FlatList
                  data={memberList}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={(item) => {
                    console.log("item", item);
                    return (
                      <View style={style.profileCal}>
                        <ShowImage
                          url={item?.item?.imageUrl}
                          imageStyle={style.profileImage}
                        />
                        <Text style={style.profileName}>
                          {item?.item?.uniqueId == props?.profileId
                            ? "You"
                            : item?.item?.name}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          )}
        </>
      </View>
    </View>
  );
});

/**
 * MessageDetail Props
 */
export interface MessageDetailProps {
  comment: string;
  from: string;
  time: string;
  originalImageUrl: string;
  message?: any;
  emoji?: Array<{}>;
  reactions: Array<{}>;
  profile?: string;
  enteredDate?: string;
  profileImageUrl?: string;
  id?: string;
  isGroup: boolean;
}

/**
 * MessageDetail component
 */
type MessageDetailScreenRouteProp = RouteProp<
  { MessageDetail: MessageDetailRouteParams },
  "MessageDetail"
>;
const { groups } = content;
const MessageDetailScreen: React.FC = () => {
  const { chat_detail, dispatches, login_detail } = useRedux([
    groups.chatDetail,
    groups.dispatch,
    groups.loginDetail,
  ]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [emojiUser, setEmojiUser] = useState(false);
  const [userList, setUserList] = useState<{
    reaction: any;
    emojiUser: any[];
  } | null>(null);
  let loginData = login_detail;
  const CommentRef = useRef(null);
  const [comment, setComment] = useState("");
  const navigation = useNavigation();
  const route = useRoute<MessageDetailScreenRouteProp>();
  const [indexEmoji, setIndexEmoji] = useState(-1);
  const conversationid = route?.params?.conversationid;

  const messageTitle = route?.params?.title;
  const snapPoints = useMemo(() => ["30%", "30%", "30%"], []);
  const appState = useRef(AppState.currentState);
  const [groupList, setGroupList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [visible, setVisible] = useState(false);
  const [commentId, setCommentId] = useState("0");

  const [isMoreLoader, setIsMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isReactLoader, setIsReactLoader] = useState(false);
  const [isSendMessage, setIsSendMessage] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [docsVisible, setDocsVisible] = useState(false);
  const [refreshing] = useState(false);
  const [profileView, setProfileView] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [profileData, setProfileData] = useState({});
  const refRBSheetAlbum = useRef<RBSheet>(null);

  const createNewMessage = (notifyData, message) => ({
    recordNumber: Math.floor(Math.random() * 20),
    recordName: "message",
    id: notifyData?.messageId,
    subject: "Individual message",
    message,
    profile: notifyData?.username,
    uniqueId: notifyData?.uniqueId,
    profileImageUrl: notifyData?.imageUrl,
    enteredDate: Date.now().toString(),
  });

  const findUserReaction = (reactions, userName) => {
    return Object.keys(reactions).find((key) =>
      reactions[key]?.users?.some((u) => u.name === userName)
    );
  };

  const removeUserReaction = (reactions, emojiId, userName) => {
    const users = reactions[emojiId]?.users ?? [];

    reactions[emojiId].users = users.filter((u) => u.name !== userName);
    reactions[emojiId].count -= 1;

    if (reactions[emojiId].count === 0) delete reactions[emojiId];
  };

  const addUserReaction = (reactions, emojiId, userName, image) => {
    if (!reactions[emojiId]) {
      reactions[emojiId] = { count: 0, users: [] };
    }

    reactions[emojiId].count += 1;
    reactions[emojiId].users.push({ name: userName, profileImageUrl: image });
  };

  const handleReactionUpdate = (groupList, notifyData) => {
    const { messageId, emojiId, username, imageUrl } = notifyData;
    const selectedEmojiId = emojiId.toString();

    const updatedList = groupList.map((msg) => {
      if (msg.id !== messageId) return msg;

      let reactions = msg?.reactions ? JSON.parse(msg.reactions) : {};
      const existingId = findUserReaction(reactions, username);

      if (existingId) {
        removeUserReaction(reactions, existingId, username);

        if (existingId !== selectedEmojiId) {
          addUserReaction(reactions, selectedEmojiId, username, imageUrl);
        }
      } else {
        addUserReaction(reactions, selectedEmojiId, username, imageUrl);
      }

      return { ...msg, reactions: JSON.stringify(reactions) };
    });

    return updatedList;
  };

  useEffect(() => {
    const fromss = chat_detail?.data?.fromss;
    const notifyData = chat_detail?.data;

    if (!notifyData) return;

    const messageText = styleConfig?.isIphone
      ? chat_detail?.notification?.body
      : chat_detail?.message;

    if (fromss === "Messages") {
      const newMessage = createNewMessage(notifyData, messageText);
      console.log("Notification data received MessageDetailScreen:", [
        newMessage,
        ...groupList,
      ]);
      setGroupList([newMessage, ...groupList]);
      return;
    }

    if (fromss === "MessagesReaction") {
      const updated = handleReactionUpdate(groupList, notifyData);
      setGroupList(updated);
    }
  }, [chat_detail?.id, chat_detail?.messageId]);

  const checkAcess = () => {
    getMyGroupDetail(conversationid)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProfileData(res.data[0].objectList[0]);
        } else {
          setProfileData({});
        }
      })
      .catch((err) => {
        setProfileData({});
      });
  };

  useEffect(() => {
    checkAcess();
    const unsubscribe = navigation.addListener("blur", () => {
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return focus;
  }, []);

  useEffect(() => {
    myCommentApiCall();
    memberListService();
    const subscribe = navigation.addListener("focus", () => {
      global.screenName = "MessageDetail";
    });
    const unsubscribe = navigation.addListener("blur", () => {
      global.screenName = null;
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });
    return () => {
      subscribe();
      unsubscribe();
    };
  }, []);

  const memberListService = async () => {
    setIsLoader(true);
    const commonArray = [];
    try {
      const memberData = await getMyMemberList(conversationid);
      setIsLoader(false);
      if (
        memberData?.data?.length > 0 &&
        memberData?.data[0]?.objectList?.length > 0
      ) {
        memberData?.data[0]?.objectList.forEach((val) => {
          commonArray.push(val);
          // }
        });
        setMemberList(JSON.parse(JSON.stringify(commonArray)));
        console.log("commonArray", commonArray);
      } else {
        setIsLoader(false);

        setMemberList([]);
      }
      setIsLoader(false);
    } catch {
      console.log("Error");
      setMemberList([]);
      setIsLoader(false);
      Snackbar.show({
        text: I18n.t("EmptyView.somethingWentWrong"),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.lightGreen,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  const onSelectionUser = useCallback((itemData) => {
    setUserList(itemData);
    setEmojiUser(!emojiUser);
    setIndexEmoji(1);
    bottomSheetRef.current?.expand();
    refRBSheetAlbum?.current?.open();
  }, []);

  const onChangeComment = useCallback(
    (text) => {
      setComment(text);
    },
    [comment]
  );

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );

    return () => {
      subscription.remove(); // Properly remove the event listener
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      (async () => {
        const current = await loadString("@notification");
        if (current === "true") {
          console.log("Status of current state", current);
          myCommentApiCall();
        }
      })();
    }

    appState.current = nextAppState;
  };

  const backAction = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
    return true;
  };

  /**
   * Message details api call
   */

  const myCommentApiCall = async () => {
    setGroupList([]);
    setIsLoader(true);
    getMessageDetail(conversationid, 1)
      .then((res) => {
        let cleanData = [];

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            res.data[0].objectList?.map((item) => {
              cleanData?.push(item);
            });
            const filteredArr = [...new Set(cleanData)];
            setGroupList(filteredArr);
            setTotalRecords(res.data[0].status.total);
            setIsLoader(false);
          } else {
            setGroupList([]);
            setIsLoader(false);
          }
        } else {
          setGroupList([]);
          setIsLoader(false);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setGroupList([]);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const loadMoreData = (page: number) => {
    if (loading || endReach) return; // Prevent concurrent or unnecessary API calls

    setLoading(true); // Set loading flag to true when starting an API call
    setIsMoreLoader(true);

    getMessageDetail(conversationid, page)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const newItems = res.data[0].objectList.filter(
              (val) => val?.enteredDate
            );

            // Ensure uniqueness by checking for duplicate IDs
            const existingIds = new Set(groupList.map((item) => item.id));
            const uniqueNewItems = newItems.filter(
              (item) => !existingIds.has(item.id)
            );

            if (uniqueNewItems.length > 0) {
              setGroupList((prevList) => [...prevList, ...uniqueNewItems]);
            }

            // If less data received than the page limit, mark end reached
            if (uniqueNewItems.length < 10) {
              setEndReach(true);
            }

            setIsMoreLoader(false);
          } else {
            setEndReach(true); // No more data
            setIsMoreLoader(false);
          }
        } else {
          setEndReach(true); // No more data
          setIsMoreLoader(false);
        }
        setLoading(false); // Reset loading flag after API call
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
        setIsMoreLoader(false);
      });
  };

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > groupList.length && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMoreData(nextPage);
      setEndReachedMomentum(true);
    }
  };

  const onRefresh = () => {
    setPage(1);
    setTotalRecords(0);
    setGroupList([]);
    setEndReach(false);
    setIsMoreLoader(false);
    setEndReachedMomentum(false);
    myCommentApiCall();
  };

  // Normalize reactions object
  const normalizeReactions = (reactions) => {
    if (!reactions || typeof reactions !== "object") return {};
    if (Array.isArray(reactions)) return {};

    if (typeof reactions === "string") {
      try {
        return JSON.parse(reactions);
      } catch {
        return {};
      }
    }

    return reactions;
  };

  // Add user to emoji reaction
  const addReaction = (reactions, emojiId, userName, image) => {
    if (!reactions[emojiId]) {
      reactions[emojiId] = {
        count: 1,
        users: [{ name: userName, profileImageUrl: image }],
      };
    } else {
      reactions[emojiId].count += 1;
      reactions[emojiId].users.push({
        name: userName,
        profileImageUrl: image,
      });
    }
  };

  // Remove user from emoji reaction
  const removeReaction = (reactions, emojiId, userName) => {
    const emojiData = reactions[emojiId];
    if (!emojiData) return;

    emojiData.users = emojiData.users.filter((u) => u.name !== userName);
    emojiData.count -= 1;

    if (emojiData.count <= 0) {
      delete reactions[emojiId];
    }
  };

  // Main reaction update logic
  const updateReactions = (reactions, prevId, newId, userName, image) => {
    const updated = { ...reactions };

    if (prevId) {
      removeReaction(updated, prevId, userName);

      // If tapping same emoji → remove only
      if (prevId === newId) return updated;
    }

    // Add new reaction
    addReaction(updated, newId, userName, image);

    return updated;
  };

  const reactMessage = async (emoji, id, userName, image, reactions = {}) => {
    setVisible(false);
    const selectedEmojiId = emoji.id.toString();

    // --- 1. Normalize reactions -----------------------------------------------
    const normalized = normalizeReactions(reactions);
    let updatedReactions = { ...normalized };

    // --- 2. Identify user’s previous reaction ---------------------------------
    const prevReactionId = findUserReaction(updatedReactions, userName);

    // --- 3. Apply reaction change ---------------------------------------------
    updatedReactions = updateReactions(
      updatedReactions,
      prevReactionId,
      selectedEmojiId,
      userName,
      image
    );

    // --- 4. Server call -------------------------------------------
    try {
      setIsReactLoader(true);

      const unReact = prevReactionId === selectedEmojiId;
      const res = await postEmoji(id, emoji.id, unReact, conversationid);

      if (!res?.data || res?.data[0]?.objectList?.length <= 0) {
        showErrorMessage("Unexpected server response");
        setIsReactLoader(false);
        return;
      }

      // --- 5. Update message list on UI -----------------------------
      const updatedData = groupList.map((item) =>
        item.id === id
          ? { ...item, reactions: JSON.stringify(updatedReactions) }
          : item
      );

      setGroupList(updatedData);
      setIsReactLoader(false);
    } catch (error) {
      console.error("Error sending reaction to server:", error);
    }
  };

  const showUsers = (react) => {
    reactMessage(
      react?.emoji,
      commentId,
      loginData?.userName,
      react?.profileImageUrl,
      userList?.reaction
    );
    setEmojiUser(false);
  };

  const showAllTab = () => {
    return (
      <ReactMessages
        data={userList?.emojiUser}
        loginUser={loginData.userName}
        reactMessage={(react) => showUsers(react)}
      />
    );
  };

  const addMessage = (message) => {
    setComment("");
    let arr = groupList;
    const newRecord = {
      recordNumber: Math.floor(Math.random() * 10),
      recordName: "message",
      id: Date.now().toString(),
      subject: "group message 1",
      message: message,
      profile: loginData.userName,
      uniqueId: conversationid,
      thumbnail: message.thumbnail,
      profileImageUrl:
        "https://lynchburgcares.org/image/2008090514-230-114-0x0-303a4a34f95c51680088750204-204000000-11/03fd9215-5c28-40a2-bbed-9e7e7af9a14b.jpg",
      enteredDate: Date.now().toString(),
      enteredText: "2 months ago",
    };
    arr.unshift(newRecord);
    setGroupList(arr);
    setDocsVisible(false);
    Keyboard.dismiss();
  };

  const formatMsgDate = (created_date) => {
    const today = moment().startOf("day");
    const msgDate = moment(created_date);
    let dateDay = "";

    if (msgDate.isSame(today, "day")) {
      dateDay = "Today";
    } else if (msgDate.isSame(today.clone().subtract(1, "days"), "day")) {
      dateDay = "Yesterday";
    } else if (msgDate.isSame(today.clone().subtract(2, "days"), "day")) {
      dateDay = msgDate.format("dddd");
    } else if (msgDate.isSame(today.clone().subtract(3, "days"), "day")) {
      dateDay = msgDate.format("dddd");
    } else if (msgDate.isSame(today.clone().subtract(4, "days"), "day")) {
      dateDay = msgDate.format("dddd");
    } else if (msgDate.isSame(today.clone().subtract(5, "days"), "day")) {
      dateDay = msgDate.format("dddd");
    } else if (msgDate.isSame(today.clone().subtract(6, "days"), "day")) {
      dateDay = msgDate.format("dddd");
    } else if (msgDate.isSame(today.clone().subtract(7, "days"), "day")) {
      dateDay = msgDate.format("dddd");
    } else {
      dateDay = msgDate.format("MMM DD, YYYY");
    }

    return dateDay;
  };

  const renderDate = (item, nextMessage) => {
    const dateTimeStamp = moment(Number(item.enteredDate))
      .format("YYYY-MM-DD")
      .valueOf();
    let nextMsgdateTimeStamp = "";

    if (nextMessage) {
      nextMsgdateTimeStamp = moment(Number(nextMessage.enteredDate))
        .format("YYYY-MM-DD")
        .valueOf();
    }

    // Render the date only if it's different from the next message's date
    return nextMsgdateTimeStamp !== dateTimeStamp ? (
      <View style={style.chatDateContainer}>
        <View style={style.chatWrapper}>
          <Text style={style.chatDate}>
            {formatMsgDate(Number(item?.enteredDate))}
          </Text>
        </View>
      </View>
    ) : null;
  };

  /**
   * Send message api call
   */

  const postCommentService = async (comment: string) => {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log("fcmtoken", loginData);

    setIsSendMessage(true);
    postMessage(conversationid, comment, fcmtoken)
      .then((res) => {
        setIsSendMessage(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let newComment = {
              message: comment,
              id: res.data[0].objectList[0]?.id,
              profile: loginData?.user_name,
              enteredDate: Date.now(),
              uniqueId: loginData?.userUniqueId,
            };
            const updatedArray = [newComment, ...groupList];
            console.log("in then responsse", res.data[0].objectList);
            setGroupList(updatedArray);
            setComment("");
          } else {
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        } else {
          console.log("err=1=");
          Snackbar.show({
            text: I18n.t("EmptyView.somethingWentWrong"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        setIsSendMessage(false);
        console.log("err==", err);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const isNavigatingRef = useRef(false);

  const refreshGlobal = () => {
    if (isNavigatingRef.current) return;

    isNavigatingRef.current = true;

    global.getMessage = false;
    global.conversationid = "";
    global.screenName = "";

    Keyboard.dismiss();

    setTimeout(() => {
      navigation.goBack();

      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 500);
    }, 200);
  };
  /**
  const createVideoThumbnail = async (data) => {
    let thumbnail = await createThumbnail({
      url: data.uri,
      timeStamp: 10000,
    });
    const obj = data;
    const newObj = { ...obj, thumbnail: thumbnail.path };
    return newObj;
  };
  * */

  const getFileExtention = (fileUrl) => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  const checkPermission = async (document) => {
    const { name: subject, documentUrl } = document;

    if (Platform.OS === "ios") {
      downloadIos(documentUrl, subject);
    } else {
      try {
        const granted =
          Number(Platform.Version) < 33
            ? await checkPermissionBelow33Version()
            : await checkPermissionAbove33Version();

        if (granted) {
          Download(documentUrl, subject);
        } else {
          Alert.alert("Error", I18n.t("groupDetails.StoragePermissionDenied"));
        }
      } catch (err) {
        console.log("++++" + err);
        Alert.alert("Error", err);
      }
    }
  };

  const onLoadMorePage = () => {
    if (!endReach) {
      return loadMorePage();
    } else {
      return null;
    }
  };

  const updateMoments = () => {
    setEndReachedMomentum(false);
  };

  const Download = async (documentUrl, subject) => {
    let url = documentUrl;

    const raw = getFileExtention(url);
    const ext = "." + String(raw)?.[0];

    const localFile = `${RNFS.DocumentDirectoryPath}/${subject}${ext}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
      // begin: (res) => setIsUpload(true),
    };
    setIsLoader(true);
    RNFS.downloadFile(options)
      .promise.then((res) => console.log("response", res))
      .then(() => {
        FileViewer.open(localFile);
        setIsLoader(false);
      })
      .catch((error) => {
        setIsLoader(false);

        Snackbar.show({
          text: error?.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .catch((error) => {
        setIsLoader(false);
        console.log("error:", error);
      });
  };
  const [init] = useState({ width: Dimensions.get("window").width });

  const downloadIos = async (documentUrl, subject) => {
    setIsLoader(true);

    let subjectName = subject;
    subjectName = subjectName.replace(/\..*/, "");

    let dirs = RNFetchBlob.fs.dirs.DocumentDir;
    let url = documentUrl;

    const raw = getFileExtention(url);
    const ext = "." + String(raw)?.[0];
    RNFetchBlob.config({
      fileCache: true,
      path: dirs + "/File" + subjectName + ext,
    })
      .fetch("GET", documentUrl, {
        //some headers ..
      })
      .then((res) => {
        if (Platform.OS === "ios") {
          setIsLoader(false);
          RNFetchBlob.ios.openDocument(res.data);
        }
      });
  };

  const handleUserDetails = (type) => {
    if (type === "Clear Chat") {
      setGroupList([]);
      setDetailVisible(false);
    } else {
      setVisible(false);
      setDocsVisible(false);
      setProfileView(true);
    }
  };

  const messageBox = (type) => {
    if (type == "detail") {
      setDetailVisible(!detailVisible);
      setDocsVisible(false);
    } else {
      setDocsVisible(!docsVisible);
    }
  };

  const onLeftCall = useCallback(() => {
    dispatches(chat({}));
    refreshGlobal();
  }, []);

  const onRightCall = useCallback(() => {
    setDetailVisible(!detailVisible);
  }, []);
  const removeAction = () => {
    setDocsVisible(false);
    setProfileView(false);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIndexEmoji(-1);
  };

  const screenParams = {
    visible: visible,
    commentId: commentId,
    setVisible: setVisible,
    reactLoader: isReactLoader,
    setCommentId: setCommentId,
    checkPermission: checkPermission,
    isGroup: route?.params?.isGroup,
    navigation: navigation,
    groupList: groupList,
    isLoader: isLoader,
    refreshing: refreshing,
    isMoreLoader: isMoreLoader,
    setEmojiUser: setEmojiUser,
    emojiUser: emojiUser,
    addMessage: addMessage,
    loginData: loginData,
    reactMessage: reactMessage,
    setDocsVisible: removeAction,
    closeBottomSheet: closeBottomSheet,
  };

  const parentCall = () => {
    Keyboard.dismiss();
    setVisible(false);
    setDetailVisible(false);
    setDocsVisible(false);
    setProfileView(false);
    setEmojiUser(false);
    console.log("touch outside");
  };
  return (
    <View style={FULL}>
      <View testID="CommentScreen" style={MAIN_FULL}>
        <View style={MainView}>
          <TouchableOpacity
            style={HEADERTOP}
            activeOpacity={0.5}
            onPress={handleUserDetails}
          >
            {!profileView && (
              <MessageHeader
                title={messageTitle}
                icon="chevron-left"
                onPressLeft={onLeftCall}
                leftImage={route?.params?.imageUrl}
                iconRightother={"ellipsis-v"}
                titleStyle={TitleTxt}
                containerStyle={CenterContainerOther}
                leftContainerStyle={leftContainer}
                onPressRightOther={onRightCall}
              />
            )}
          </TouchableOpacity>

          {profileView && (
            <UserProfile
              route={route}
              memberList={memberList}
              closeProfile={setProfileView}
              profileData={profileData}
              profileId={loginData?.userUniqueId}
            />
          )}
          <RNKeyboardView
            keyboardVerticalOffset={
              styleConfig?.isIphone ? fontSize(10) : fontSize(46)
            }
            from={MESSAGE.messageDetail}
            containerStyle={{backgroundColor:color.secondary}}
            onPress={parentCall}
          >
            <View style={BODY}>
              {isLoader ? <Loader /> : null}
              <RenderFlatList
                renderDate={renderDate}
                setEndReachedMomentum={updateMoments}
                onRefresh={onRefresh}
                loadMorePage={onLoadMorePage}
                onSelectionUser={onSelectionUser}
                screenParams={screenParams}
              />
            </View>
            <View style={BottomMsgCal}>
              <View style={InputRaw}>
                <TextInput
                  style={TextInputStyle}
                  multiline
                  placeholder={I18n.t(
                    "sendReportPlaceholder.MessageYourMessage"
                  )}
                  placeholderTextColor={color.white}
                  ref={CommentRef}
                  maxLength={200}
                  selectionColor={color.palette.lightGrey}
                  onChangeText={onChangeComment}
                  value={comment}
                />
              </View>
              {isSendMessage && (
                <View style={LoaderCal}>
                  <Loader />
                </View>
              )}
              {comment.trim().length !== 0 && !isSendMessage && (
                <TouchableOpacity onPress={() => postCommentService(comment)}>
                  <View style={SendButton}>
                    <MaterialIcons
                      name="send"
                      size={25}
                      color={color.secondary}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </RNKeyboardView>
        </View>
        {detailVisible && (
          <MessageBox
            visible={detailVisible}
            onClose={() => messageBox("detail")}
            onOpenDetails={handleUserDetails}
            modalList={moreDetail}
            parentViewStyle={detailModalStyle}
          />
        )}
        {docsVisible && (
          <MessageBox
            visible={docsVisible}
            onClose={() => messageBox("docs")}
            onOpenDetails={() => {}}
            modalList={docsDetail}
            parentViewStyle={docModalStyle}
          />
        )}
      </View>

      {emojiUser && (
        <BottomSheet
          ref={bottomSheetRef}
          index={indexEmoji}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          enablePanDownToClose={true}
          backgroundStyle={styles.container}
        >
          <BottomSheetView style={styles.fullFlex}>
            {/* Header */}
            <View style={styles.sheetHeader}>
              <Text style={styles.closeLabel}>
                {translate("common.all")} {userList?.emojiUser?.length}
              </Text>
            </View>

            {/* List */}
            <View style={styles.fullFlex}>
              <ReactMessages
                data={userList?.emojiUser}
                loginUser={loginData.userName}
                reactMessage={(react) => showUsers(react)}
              />
            </View>

            {/* Close Button */}
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
  );
};

export default MessageDetailScreen;
