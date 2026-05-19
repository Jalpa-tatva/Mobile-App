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
  BackHandler,
  RefreshControl,
  TouchableOpacity,
  Platform,
  AppState,
  Linking,
  PermissionsAndroid,
} from "react-native";

// import external libraries
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";
import {
  check,
  checkNotifications,
  PERMISSIONS,
} from "react-native-permissions";
import DeviceInfo from "react-native-device-info";

// import custom function
import { Loader, EmptyView, Header, LoadMore } from "@components/index";
import {
  getMyGroupList,
  versionCheck,
  versionSkip,
} from "@app/services/api/careTeam";
import { getMyPicture, getMySettings } from "@app/services/api/profile";
import { GroupItem } from "./GroupItem";
import { GROUP_DETAILS, MODULES, PROFILE } from "@app/constants";

// import custom styling & utils
import commonStyle from "@app/theme/commonStyle";
import { Full, HeaderTop, Body, color, fontSize } from "@theme/index";
import { ActionButtonWrapper, AddButton, Style } from "./style";
import AppUpdateModal from "@app/components/AppUpdate/AppUpdateModal";
import useAppNavigation from "@app/navigation/navigation";
import { Fontisto } from "@app/utils/icons/VectorIcons";
import { useRedux } from "@app/redux/hooks";
import { content } from "@app/utils/string";
import { groups } from "@app/redux/reducer/groupsReducer";
import { profileDetail } from "@app/redux/reducer/profileReducer";
import { loginDetail } from "@app/redux/reducer/loginReducer";
import { useFocusEffect } from "@react-navigation/native";

/**
 *  Groups Props
 */
export interface GroupsProps {
  title: string;
  description: string;
  openTicketsCount: number;
  imageUrl: string;
  onPress: Function;
  uniqueId: string;
  privacyType: string;
  documentsCount: string;
  videosCount: string;
  sensorsCount: string;
  location: string;
}

/**
 * GroupsScreen component
 */
export const GroupsScreen: React.FC = () => {
  const { groups } = content;
  const { login_detail, drawer_status, dispatches } = useRedux([
    groups.drawerStatus,
    groups.dispatch,
    groups.loginDetail,
  ]);

  const appState = useRef(AppState.currentState);
  const navigation = useAppNavigation();
  const [groupList, setGroupList] = useState([]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setIsMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [modal, setModal] = useState(false);
  const [appUpdateDetail, setAppUpdateDetail]: any = useState({});

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      onRefresh();
    }
    appState.current = nextAppState;
  };

  const pictureAPIService = () => {
    getMyPicture(login_detail?.userUniqueId)
      .then(async (res) => {
        let newArray = res?.data;

        const updateLoginData = {
          ...login_detail,
          userImageUrl: newArray[0]?.objectList[0]?.imageUrl,
        };
        dispatches(loginDetail(updateLoginData));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const deviceInfo = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    let appName = DeviceInfo.getApplicationName();
    const version_name = DeviceInfo.getVersion();

    return {
      deviceId: deviceId,
      appName: appName,
      version_name: version_name,
    };
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh();
      pictureAPIService();

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => {
        backHandler.remove();
      };
    }, [navigation])
  );

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  const settingAPIService = () => {
    getMySettings()
      .then(async (res) => {
        let newArray = res.data;

        let data = {
          firstName: newArray[0].objectList[0].firstName,
          lastName: newArray[0].objectList[0].lastName,
          city: newArray[0].objectList[0].city,
          state: newArray[0].objectList[0].state,
          country: newArray[0].objectList[0].country,
          mobileno: newArray[0].objectList[0].mobileno,
          postalCode: newArray[0].objectList[0].postalCode,
          description: newArray[0].objectList[0].description,
          privacy: newArray[0].objectList[0].privacy,
          emailOptIn: newArray[0].objectList[0].emailOptIn,
          emailDigest: newArray[0].objectList[0].emailDigest,
        };
        console.log("12345--------->", login_detail, data);

        dispatches(profileDetail(data));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const myGroupApiCall = () => {
    setGroupList([]);
    setIsLoader(true);
    getMyGroupList(1)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);

            const cleanedArray = [];
            res.data[0].objectList.map((val) => {
              if (val.isActiveMember == "true") {
                cleanedArray.push(val);
              }
            });

            setGroupList(cleanedArray);
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

  const versionCheckApiCall = async () => {
    const { deviceId, appName, version_name } = await deviceInfo();
    const type = Platform.OS;
    setAppUpdateDetail({});
    await versionCheck(version_name, deviceId, type, appName)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setAppUpdateDetail(res?.data[0]?.objectList[0]);
            setModal(
              JSON.parse(res?.data[0]?.objectList[0]?.showDialog.toLowerCase())
            );
          } else {
            setAppUpdateDetail({});
          }
        } else {
          setAppUpdateDetail({});
        }
      })
      .catch((err) => {
        console.log("error listing", err);

        setAppUpdateDetail({});
      });
  };

  const loadMoreData = (page: number) => {
    setIsMoreLoader(true);
    setEndReach(false);
    getMyGroupList(page)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              if (val.isActiveMember == "true") {
                cleanedArray.push(val);
              }
            });

            setGroupList(
              page === 1 ? cleanedArray : [...groupList, ...cleanedArray]
            );

            setIsMoreLoader(false);
          } else {
            setIsMoreLoader(false);
            setEndReach(true);
          }
        } else {
          setIsMoreLoader(false);
          setEndReach(true);
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > groupList.length) {
      const pageData = page + 1;
      setPage(pageData);
      setIsMoreLoader(true);
      setEndReach(false);
      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };

  const onRefresh = () => {
    setModal(false);
    setPage(1);
    setTotalRecords(0);
    setGroupList([]);
    setEndReach(false);
    setIsMoreLoader(false);
    setEndReachedMomentum(false);
    settingAPIService();
    versionCheckApiCall();
    myGroupApiCall();
  };

  useEffect(() => {
    setTimeout(() => {
      notificationPermission();
    }, 1000);
  }, []);

  const notificationPermission = async () => {
    try {
      const { status }: any = await checkNotifications();

      if (status === "denied") {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      }
    } catch (e) {
      console.log("Notification_E", e);
    }
  };

  const skipNowUpdate = useCallback(async () => {
    const { deviceId, appName } = await deviceInfo();

    setIsLoader(true);
    await versionSkip(deviceId, appName)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res?.data[0]?.objectList[0]?.status == "ok") {
            setModal(false);
          }
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  }, []);

  const updateApp = useCallback(() => {
    Linking.openURL(appUpdateDetail.url);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const navigateToAddCareteam = useCallback(() => {
    navigation.navigate(MODULES.AddGroupScreen);
  }, [navigation]);

  const softUpdate = useMemo(
    () => appUpdateDetail?.showSkip == "true",
    [appUpdateDetail]
  );

  const onPressLeft = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <View testID="GroupsScreen" style={Full}>
      <View style={HeaderTop}>
        <Header
          title={I18n.t("TabTitle.careTeam")}
          icon={drawer_status?.isDrawerOpen ? "circle-with-cross" : "menu"}
          onPressLeft={onPressLeft}
          iconRight={""}
          iconRightother={""}
          onPressRight={undefined}
          onPressRightOther={undefined}
        />
      </View>

      <View style={{ ...Body, ...Style.listing }}>
        {isLoader && groupList?.length === 0 ? (
          <Loader type={"bottom"} />
        ) : (
          <RenderList
            isLoader={isLoader}
            groupList={groupList}
            onRefresh={onRefresh}
            endReach={endReach}
            loadMorePage={loadMorePage}
            setEndReachedMomentum={setEndReachedMomentum}
            isMoreLoader={isMoreLoader}
            refreshing={refreshing}
            navigation={navigation}
            dispatches={dispatches}
          />
        )}
      </View>

      {!isLoader ? (
        <View style={ActionButtonWrapper}>
          <TouchableOpacity
            style={AddButton}
            activeOpacity={1}
            onPress={navigateToAddCareteam}
          >
            <Fontisto name="plus-a" size={fontSize(20)} color={color.white} />
          </TouchableOpacity>
        </View>
      ) : null}

      {modal && (
        <AppUpdateModal
          modalOpen={modal}
          softUpdate={softUpdate}
          closeModal={closeModal}
          skipNow={skipNowUpdate}
          update={updateApp}
        />
      )}
    </View>
  );
};

const RenderList = (props: any) => {
  const {
    isLoader,
    groupList,
    onRefresh,
    endReach,
    loadMorePage,
    setEndReachedMomentum,
    isMoreLoader,
    refreshing,
    navigation,
    dispatches,
  } = props;

  const navigateToScreen = (item) => {
    dispatches(groups(item));
    navigation.navigate(MODULES.GroupDetailsScreen, {
      issueTabs: GROUP_DETAILS.OpenIssue,
      fromss: PROFILE?.Activity,
    });
  };

  const renderRaw = (item: GroupsProps) => {
    return (
      <GroupItem
        imageUrl={item.imageUrl}
        title={item.title}
        openTicketsCount={item.openTicketsCount}
        description={item.description}
        location={item.location}
        id={item?.uniqueId}
        onPress={() => navigateToScreen(item)}
      />
    );
  };

  const onEndReach = () => {
    if (!endReach) {
      loadMorePage();
    }
  };

  const onActionEndReachedMomentum = (status) => {
    setEndReachedMomentum(status);
  };

  const onListFooterCompo = () => {
    if (isMoreLoader) {
      return <LoadMore animating={isMoreLoader} />;
    } else {
      return null;
    }
  };

  if (!isLoader && groupList && groupList.length == 0) {
    return (
      <EmptyView
        title={I18n.t("EmptyView.EmptyCare")}
        onPressRefresh={onRefresh}
        type={"bottom"}
      />
    );
  } else {
    return (
      <FlatList
        data={groupList}
        renderItem={({ item }) => renderRaw(item)}
        showsVerticalScrollIndicator={false}
        style={{ ...commonStyle.flatBottomListingSpace }}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReach}
        onMomentumScrollBegin={() => onActionEndReachedMomentum(false)}
        ListFooterComponent={onListFooterCompo}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  }
};
