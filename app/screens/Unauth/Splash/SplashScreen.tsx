import React, { useEffect, useMemo } from "react";
import { View, StatusBar, Text } from "react-native";

// import external libraries
import { CommonActions, useRoute } from "@react-navigation/native";

// import custom function & component
import { GROUP_DETAILS, MESSAGE, MODULES, STACK } from "../../../constants";
import { splashScreenAssets } from "../../../../assets/images";
import I18n from "i18n-js";
import {
  NotificationListener,
  requestUserPermission,
} from "@app/utils/pushnotifications_helper";
import { resetUserCredential } from "@app/components/Biometric/biometric";

// import custom styling & utils
import {
  full,
  splashWrapper,
  bottomContainer,
  splashIconStyle,
  splashBottomStyle,
  logoContainer,
  JustTitle,
} from "./style";
import ShowImage from "@app/components/FastImage/ShowImage";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import useAppNavigation from "@app/navigation/navigation";
import { chat } from "@app/redux/reducer/chatReducer";
import { groups } from "@app/redux/reducer/groupsReducer";
import { tabStatus } from "@app/redux/reducer/activeTabReducer";
import { color } from "@app/theme";
import LottieView from "lottie-react-native";
import Foregroundhandler from "@app/utils/Foregroundhandler";

/**
 *  SplashScreen Component
 */
export const SplashScreen: React.FC = () => {
  const { login_detail, dispatches } = useRedux([
    content?.groups.dispatch,
    content?.groups.loginDetail,
  ]);

  const navigation = useAppNavigation();
  const route: any = useRoute();

  let initial = useMemo(() => {
    return route?.params?.initial;
  }, []);
  let notification = useMemo(() => {
    return route?.params?.notification;
  }, []);
  let initial2 = useMemo(() => {
    return route?.params?.initial2;
  }, []);

  const onScreenNotification = (notify: any) => {
    notify?.data && dispatches(chat(notify));
  };

  const groupsData = (data: any) => {
    data && dispatches(groups(data));
  };

  const getFromss = (from: string) => {
    if (from === "Activities") return "Activities";
    if (from === "issue") return "Issues";
    if (from === "Event") return "Events";
    return from;
  };

  const getIssueTabs = (tab: string) => {
    return tab === "GROUP_DETAILS.OpenIssue"
      ? GROUP_DETAILS.OpenIssue
      : GROUP_DETAILS.ClosedIssue;
  };

  const navigateToMessage = () => {
    navigation.navigate(MESSAGE.messageDetail, {
      imageUrl: notification?.data?.imageUrl,
      conversationid: notification?.data?.uniqueId,
      title: notification?.data?.title,
      message_id: notification?.data?.messageId,
      emoji_id: notification?.data?.emojiId,
      profileDetail: {
        country: notification?.data?.country,
        title: notification?.data?.title,
        email: notification?.data?.email,
        description: notification?.data?.description,
        mobile_no: notification?.data?.mobile_no,
      },
    });
  };

  const dispatchGroupData = () => {
    const from = getFromss(notification.data.fromss);

    dispatches(
      groups({
        uniqueId: notification?.data.uniqueId,
        canEditInfo: notification?.data.canEditInfo,
        privacyType: notification?.data.privacyType,
        title: notification?.data.title,
        imageUrl: notification?.data.image200Url,
        documentsCount: notification?.data.documentsCount,
        videosCount: notification?.data.videosCount,
        sensorsCount: notification?.data.sensorsCount,
        fromss: from,
        issueTabs: getIssueTabs(notification?.data.issueTabs),
        category: notification?.data.category,
      })
    );

    return from;
  };

  const resetToGroupDetails = (from: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: MODULES.GroupDetailsScreen,
            params: {
              uniqueId: notification?.data.uniqueId,
              canEditInfo: notification?.data.canEditInfo,
              privacyType: notification?.data.privacyType,
              title: notification?.data.title,
              imageUrl: notification?.data.image200Url,
              documentsCount: notification?.data.documentsCount,
              videosCount: notification?.data.videosCount,
              sensorsCount: notification?.data.sensorsCount,
              fromss: from,
              issueTabs: getIssueTabs(notification?.data.issueTabs),
              category:
                notification?.data?.category === "Care Teams"
                  ? "Careteams"
                  : "Groups",
            },
          },
        ],
      })
    );
  };

  const navigateToIssueDetails = () => {
    const issue = notification?.data?.issue
      ? JSON.parse(notification?.data?.issue)
      : "";

    navigation.navigate(MODULES.IssueDetailScreen, {
      item: issue,
      uniqueId: notification?.data?.uniqueId,
      imageUrls: notification?.data?.imageUrl,
      titles: notification?.data?.title,
      canEditInfo: notification?.data.canEditInfo,
      type: issue?.type,
    });
  };

  const checkLoginSession = async () => {
    const isLogin = login_detail?.isLogedIn;
    console.log("intial notification setup", login_detail);

    if (!isLogin) {
      return setTimeout(() => navigation.replace(MODULES.Login), 1200);
    }

    const fromType = notification?.data?.fromss;

    if (fromType === "Messages" || fromType === "MessagesReaction") {
      return setTimeout(() => navigateToMessage(), 1200);
    }

    setTimeout(() => {
      if (initial || initial2) {
        const from = dispatchGroupData();
        resetToGroupDetails(from);

        if (initial) {
          navigateToIssueDetails();
        }
      } else {
        navigation.replace(STACK.RootStack);
      }
    }, 1200);
  };

  useEffect(() => {
    checkLoginSession();
    // pictureAPIService();
  }, []);

  useEffect(() => {
    // requestUserPermission();
    resetKeychainDetail();
    NotificationListener(navigation, onScreenNotification, groupsData);
    // saveUser();
    dispatches(
      tabStatus({
        id: "groups",
        selected: false,
        title: I18n.t("AppDrawer.Home"),
        icon: "home",
      })
    );
    const isLogin = login_detail?.isLogedIn;

    if (isLogin) {
      requestUserPermission();
    }
    return () => {};
  }, []);

  const resetKeychainDetail = async () => {
    await resetUserCredential();
  };

  // const pictureAPIService = () => {
  //   if (login_detail?.userUniqueId) {
  //     getMyPicture(login_detail?.userUniqueId)
  //       .then(async (res) => {
  //         let newArray = res?.data;
  //         const updateLoginData = {
  //           ...login_detail,
  //           userImageUrl: newArray[0]?.objectList[0]?.imageUrl,
  //         };
  //         dispatches(loginDetail(updateLoginData));
  //       })
  //       .catch((err) => {
  //         console.log("err", err);
  //       });
  //   }
  // };

  return (
    <View testID="SplashScreen" style={full}>
      <Foregroundhandler />
      <View style={splashWrapper}>
        <View style={logoContainer}>
          <ShowImage
            imageStyle={splashIconStyle}
            source={splashScreenAssets.splashIconEpiOne}
            resizeMode="contain"
          />
        </View>

        <View>
          <Text style={JustTitle}>{I18n.t("AppDrawer.appName")}</Text>
        </View>
      </View>

      <View style={bottomContainer}>
        <ShowImage
          source={splashScreenAssets.splashBottomImage}
          imageStyle={splashBottomStyle}
        />
      </View>
    </View>
  );
};
