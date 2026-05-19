import React, { useEffect } from "react";
import { View, TouchableOpacity, Platform, UIManager } from "react-native";

// Icon Libraries
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Icon Libraries
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Constants, theme, utils
import { TABS } from "@app/constants";
import commonStyle from "../theme/commonStyle";
import { color, fontSize } from "@theme/index";
import { style } from "./CustomDrawer/CustomDrawerStyle";
import {
  MAIN_NAVIGATOR_SCREEN_MAP,
  TAB_ICON_CONFIG,
} from "@app/utils/NavigationConfigJson";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";

// Tab
const Tab = createBottomTabNavigator();

const ICON_LIBRARY = {
  Entypo,
  MaterialCommunityIcons: MaterialIcon,
  MaterialIcons,
};
const TabItem = ({ route, index, currentIndex, navigation }) => {
  const isFocused = currentIndex === index;
  
  const screenName = route.name.replace(/^tab_/, "");
  console.log("name of route", screenName);
  const config = TAB_ICON_CONFIG?.[screenName];
  if (!config) return null;

  const IconComponent = ICON_LIBRARY[config.library];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(isFocused ? 1.2 : 1, { duration: 300 }) }],
  }));

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
    <TouchableOpacity onPress={onPress} style={style.tab}>
      <View style={style.inner}>
        <Animated.View
          style={[
            {
              backgroundColor: isFocused
                ? color.secondaryTransprent
                : color.transparent,
              width: isFocused ? fontSize(45) : fontSize(40),
            },
            style.iconWrapper,
            animatedStyle,
          ]}
        >
          <IconComponent
            name={config.name}
            size={
              isFocused
                ? fontSize(config.focusedSize)
                : fontSize(config.defaultSize)
            }
            color={isFocused ? color.white : color.palette.lightGrey}
            style={commonStyle.iconCardStyle}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};
const CustomTabBar = ({ state, navigation }) => {
  const TAB_WIDTH = fontSize(45);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    translateX.value = withTiming(state.index * TAB_WIDTH, {
      duration: 400,
    });
  }, [state.index]);

  return (
    <View style={style.mainWrapper}>
      {state.routes.map((route, index) => (
        <TabItem
          key={route.key}
          route={route}
          index={index}
          currentIndex={state.index}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

const RenderCustomTabBar = (props: BottomTabBarProps) => {
  return <CustomTabBar {...props} />;
};

export function MainNavigator() {
  const { groups } = content;
  const { dynamic_tab } = useRedux([groups.dynamicTab]);
  const enabledTabs =
    dynamic_tab?.bottom_tab?.filter((tab) => tab.enable) || [];

  return (
    <View style={commonStyle.bottomMainStyle}>
      <Tab.Navigator
        id={"main-navigator"}
        tabBar={RenderCustomTabBar}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        {enabledTabs.map((tab) => {
          const ScreenComponent = MAIN_NAVIGATOR_SCREEN_MAP[tab.name];

          if (!ScreenComponent) return null;

          return (
            <Tab.Screen
              key={tab.name}
              name={`tab_${tab.name}`}
              component={ScreenComponent}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
}

const exitRoutes = [TABS.MyGroups];
export const canExit = (routeName: any) => exitRoutes.includes(routeName);
