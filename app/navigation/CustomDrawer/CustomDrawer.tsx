import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

// Import external libraries
import { observer } from "mobx-react-lite";
import * as Keychain from "react-native-keychain";
import AsyncStorage from "@react-native-async-storage/async-storage";
import I18n from "i18n-js";
import { useDrawerStatus } from "@react-navigation/drawer";
import Config from "react-native-config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DeviceInfo from "react-native-device-info";
import messaging from "@react-native-firebase/messaging";

// import custom function
import { CustomDrawerItem } from "./CustomDrawerItem";
import { AlertBox } from "@app/components";
import { MODULES } from "@app/constants";
import ShowImage from "@app/components/FastImage/ShowImage";
import { useRedux } from "@app/redux/hooks";
import { content } from "@app/utils/string";
import { drawerStatus } from "@app/redux/reducer/drawerStatusReducer";
import { tabStatus } from "@app/redux/reducer/activeTabReducer";
import useAppNavigation from "../navigation";
import store, { persistor } from "@app/redux/store/store";

// import custom styling & utils
import styleConfig from "@app/theme/styleConfig";
import { color, fontSize } from "@app/theme";
import { styles } from "@app/components/loader/styles";
import {
  FULL,
  CONTAINER,
  TOP_CONTAINER,
  ICON_CONTAINER,
  DETAILS_CONTAINER,
  NAME_TEXT,
  EMAIL_TEXT,
  LIST_CONTAINER,
  LIST_WRAPPER,
  ProfileDrawerImage,
  style,
} from "./CustomDrawerStyle";
import { AntDesign } from "@app/utils/icons/VectorIcons";
import {
  drawer_icons,
  DRAWER_NAVIGATION_CONFIG,
} from "@app/utils/NavigationConfigJson";
import TextTicker from "react-native-text-ticker";

/**
 *  CustomDrawer
 */
export const CustomDrawer = observer(function CustomDrawer() {
  const isDrawerOpen = useDrawerStatus() === "open";
  const appVersion = DeviceInfo?.getVersion();
  const { groups } = content;
  const { dispatches, login_detail, profile_detail, tab_status, dynamic_tab } =
    useRedux([
      groups.dispatch,
      groups.loginDetail,
      groups.profileDetail,
      groups.tabStatus,
      groups.dynamicTab,
    ]);
  const navigation = useAppNavigation();
  const userName = `${profile_detail?.firstName} ${profile_detail?.lastName}`;
  const [alert, setAlert] = useState(false);
  const enabledDrawerMenus = dynamic_tab?.drawer_menu?.filter(
    (tab) => tab.enable
  );
  const [list, setList] = useState(
    enabledDrawerMenus.map((item) => ({
      id: item.id,
      selected: false,
      title: item.title,
      icon: drawer_icons[item.title],
    }))
  );

  useEffect(() => {
    const enabledDrawerMenus = dynamic_tab?.drawer_menu?.filter(
      (tab) => tab.enable
    );

    const updatedList = enabledDrawerMenus?.map((item, index) => ({
      id: item?.id,
      selected: false,
      title: item.title,
      icon: drawer_icons[item.title],
    }));

    setList(updatedList || []);
  }, [dynamic_tab?.drawer_menu]);

  useEffect(() => {
    dispatches(drawerStatus({ isDrawerOpen: isDrawerOpen }));
    const updateData = list?.map((listTab) => {
      const activeId = tab_status.id;
      if (activeId !== undefined && activeId !== null) {
        return { ...listTab, selected: listTab.id === activeId };
      }
      return { ...listTab, selected: listTab.id === 0 };
    });

    setList(updateData);
  }, [isDrawerOpen]);

  useEffect(() => {
    setList((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === tab_status?.id,
      }))
    );
  }, [tab_status]);

  const handleDrawerPress = (title: any) => {
    // Logout handled separately
    if (title === "Logout") {
      setAlert(true);
      return;
    }

    const config = DRAWER_NAVIGATION_CONFIG[title];

    if (!config) return;

    if (config.type === "replace") {
      navigation.replace(config.route);
      return;
    }

    if (config.type === "navigate") {
      navigation.navigate(config.parent, {
        screen: `drawer_${config.screen}`,
      });
    }
  };
  const renderRaw = (item, index) => {
    return (
      <CustomDrawerItem
        key={index}
        title={item?.title}
        selected={item?.selected}
        icon={item?.icon}
        onPress={() => {
          saveSelected(item?.id);
          handleDrawerPress(item?.title);
        }}
      />
    );
  };

  const saveSelected = (id) => {
    const updateData = list?.map((item) => {
      const selected = item.id === id;

      if (selected) {
        dispatches(tabStatus({ id }));
      }

      return {
        ...item,
        selected,
      };
    });

    setList(updateData);
  };
  const removeToken = async () => {
    await messaging().deleteToken();
  };
  const logOut = () => {
    setAlert(false);
    setTimeout(() => {
      store.dispatch({ type: I18n.t("profile.resetApp") }); // clears Redux store
      persistor.purge();
      removeToken();
      AsyncStorage.multiRemove(["@LoginUser", "fcmtoken"]);
      navigation.replace(MODULES.Splash);
    }, 1000);
  };

  const resetPassword = async () => {
    await Keychain.resetInternetCredentials(Config.BASE_URL as any);
  };

  const insets = useSafeAreaInsets();
  const iphoneTopSpace = insets?.top >= 50 ? fontSize(34) : fontSize(28);
  const spaceTop = styleConfig?.isAndroid ? 0 : iphoneTopSpace;

  return (
    <View style={FULL}>
      <View style={CONTAINER}>
        <View style={[TOP_CONTAINER, { paddingTop: spaceTop }]}>
          <View style={ICON_CONTAINER}>
            <ShowImage
              url={login_detail.userImageUrl}
              imageStyle={ProfileDrawerImage}
            />
          </View>

          <View style={DETAILS_CONTAINER}>
            <Text style={NAME_TEXT}>
              {userName !== "undefined undefined" ? userName : "No userName"}
            </Text>

            <TextTicker
              style={EMAIL_TEXT}
              duration={5000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}
            >
              {login_detail?.email !== "undefined"
                ? login_detail?.email
                : "No userEmail"}
            </TextTicker>
          </View>
        </View>

        <View style={LIST_CONTAINER}>
          <FlatList
            data={list}
            scrollEnabled={false}
            renderItem={({ item, index }) => renderRaw(item, index)}
            showsVerticalScrollIndicator={false}
            style={LIST_WRAPPER}
          />
        </View>
        {/* Logout section */}
        <View style={style.logoutWrapper}>
          <TouchableOpacity
            style={style.logoutSubWrapper}
            onPress={() => setAlert(true)}
          >
            <AntDesign
              name={"logout"}
              color={color.white}
              size={fontSize(21)}
              style={style.contentAlign}
            />

            <Text numberOfLines={1} style={styles.logoutLabel}>
              {I18n.t("AppDrawer.Logout")}
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={{ ...styles.logoutLabel, ...style.increaseFont }}>
              {appVersion}
            </Text>
          </View>
        </View>
      </View>

      {alert ? (
        <AlertBox
          visible={alert}
          title={I18n.t("AppDrawer.appName")}
          message={I18n.t("AppDrawer.logOutAlert")}
          titleStyle={styles.titleStyle}
          messageStyle={styles.messageStyle}
          onTouchOutside={() => setAlert(false)}
          onYes={logOut}
          onCancel={() => setAlert(false)}
          onYesText={"Yes"}
          onCancelText={"No"}
          onClear={undefined}
        />
      ) : null}
    </View>
  );
});
