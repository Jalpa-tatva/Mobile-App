import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  BackHandler,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";

// import external libraries
import I18n from "i18n-js";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "@components/index";

// import custom function & component
import { MESSAGE } from "@app/constants";
import GroupMessageScreen from "./GroupsMessageScreen";
import IndividualMessageScreen from "./IndividualMessageScreen";
import { useStore } from "@app/context/store/store";

// import custom styling & utils
import commonStyle from "@app/theme/commonStyle";
import { FULL, HEADERTOP, BODY, BORDER_STYLE } from "./GroupStyle";
import useAppNavigation from "@app/navigation/navigation";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";

/**
 * Create Material Top Tab Navigator
 */
const MessageTab = createMaterialTopTabNavigator();

// props types
interface RouteProps {
  name?: string;
}
interface OptionProps {
  tabBarLabel?: string;
  title?: string;
}

/**
 * MessageScreen component
 */
export const MessageScreen: React.FC = () => {
  const [screenTab, setScreenTab] = useState("");
  const [dispatch] = useStore();
  const navigation = useAppNavigation();
  const { groups } = content;
  const { drawer_status } = useRedux([groups.drawerStatus]);

  useEffect(() => {
    const focus = navigation.addListener("focus", async () => {
      dispatch({
        type: "TAB",
        payload: { tab: "Other" },
      });
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return focus;
  }, []);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      global.screenName = screenTab === "Group" ? "Group" : "Individual";
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return focus;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      global.screenName = "";
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return unsubscribe;
  }, []);

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };
  const getTab = (tab) => {
    setScreenTab(tab);
  };

  const onPressLeft = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <View testID="GroupsScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={I18n.t("TabTitle.Messages")}
          icon={drawer_status?.isDrawerOpen ? "circle-with-cross" : "menu"}
          onPressLeft={onPressLeft}
        />
      </View>

      <View style={{ ...BODY, ...BORDER_STYLE }}>
        <TabStack getTab={getTab} setScreenTab={setScreenTab} />
      </View>
    </View>
  );
};

const saveLabel = (options: OptionProps, route: RouteProps) => {
  if (options?.tabBarLabel !== undefined) {
    return options.tabBarLabel;
  } else if (options.title !== undefined) {
    return options.title;
  } else {
    return route.name;
  }
};

/***
 * Create Custom tabbar component
 */
const CustomeTabBar = ({ state, descriptors, navigation, setActiveTab }) => {
  return (
    <View style={commonStyle.rollUpMain}>
      {state.routes.map(
        (route: { key: string | number; name: any }, index: any) => {
          const { options } = descriptors[route.key];
          const label = saveLabel(options, route);

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              setActiveTab(route.name);
              navigation.navigate(route.name);
            }
          };

          return (
            <View style={commonStyle.rollUpSub} key={index?.toString()}>
              {!isFocused ? (
                <TouchableOpacity
                  onPress={onPress}
                  style={commonStyle.rollUpTabWrapper}
                >
                  {label === MESSAGE.groupMessage ? (
                    <Text style={commonStyle.rollUpTabUnactiveLable}>
                      {label}
                    </Text>
                  ) : null}
                  {label === MESSAGE.individualMessage ? (
                    <Text style={commonStyle.rollUpTabUnactiveLable}>
                      {label}
                    </Text>
                  ) : null}

                  <View style={commonStyle.rollUpTabUnactiveLine}></View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={onPress}
                  style={commonStyle.rollUpTabWrapper}
                >
                  {label === MESSAGE.groupMessage ? (
                    <View>
                      <Text style={commonStyle.rollUpTabActiveLable}>
                        {label}
                      </Text>
                    </View>
                  ) : null}
                  {label === MESSAGE.individualMessage ? (
                    <View>
                      <Text style={commonStyle.rollUpTabActiveLable}>
                        {label}
                      </Text>
                    </View>
                  ) : null}

                  <View style={commonStyle.rollUpTabActiveLine}></View>
                </TouchableOpacity>
              )}
            </View>
          );
        }
      )}
    </View>
  );
};

const renderCustomTabBar = (
  tabProps: any,
  extraProps: { setActiveTab: (v: string) => void }
) => {
  return <CustomeTabBar {...tabProps} {...extraProps} />;
};

/**
 * Create custom tab stack
 */

const TabStack = (props) => {
  const [init] = useState({ width: Dimensions.get("window").width });
  let groupTabs = "";

  const [activeTab, setActiveTab] = useState("");
  props?.getTab(activeTab);

  return (
    <MessageTab.Navigator
      initialLayout={init}
      initialRouteName={
        groupTabs === MESSAGE.individualMessage
          ? MESSAGE.individualMessage
          : MESSAGE.groupMessage
      }
      tabBar={(tabProps) => renderCustomTabBar(tabProps, { setActiveTab })}
    >
      <MessageTab.Screen
        name={MESSAGE.groupMessage}
        component={GroupMessageScreen}
      />
      <MessageTab.Screen
        name={MESSAGE.individualMessage}
        component={IndividualMessageScreen}
      />
    </MessageTab.Navigator>
  );
};
