import React, { useState, useEffect, memo, useCallback } from "react";
import { View, Dimensions, TouchableOpacity, BackHandler } from "react-native";

// import external libraries
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import I18n from "i18n-js";

// import custom function
import { Text, Header } from "@components/index";
import { ROLLUP } from "@app/constants";

// import custom styling & utils
import commonStyle from "@app/theme/commonStyle";
import { Full, HeaderTop, Body } from "@theme/index";

// import render screen
import { UpcomingScreen, PreviousScreen } from "@app/screens/Auth/index";
import useAppNavigation from "@app/navigation/navigation";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import { useFocusEffect } from "@react-navigation/native";

// declare tab variable
const GroupDetailsTab = createMaterialTopTabNavigator();

/**
 * RollUpsScreen component
 */
export const RollUpsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const { groups } = content;
  const { drawer_status } = useRedux([groups.drawerStatus]);

  useFocusEffect(
    useCallback(() => {
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

  return (
    <View testID="RollUpsScreen" style={Full}>
      <View style={HeaderTop}>
        <Header
          title={I18n.t("TabTitle.Rollup")}
          icon={drawer_status?.isDrawerOpen ? "circle-with-cross" : "menu"}
          onPressLeft={() => {
            navigation.openDrawer();
          }}
        />
      </View>
      <View style={Body}>
        <TabStack />
      </View>
    </View>
  );
};
interface RenderTabProps {
  type?: string;
  label?: string;
  navigation?: Object;
  route?: Object;
  isFocused?: boolean;
  onPress?: (arg1: any, arg2: any, arg3: boolean) => void;
}

const RenderTab = memo((props: RenderTabProps) => {
  const { type, label, navigation, route, isFocused, onPress } = props;

  const labelStyle =
    type === "active"
      ? commonStyle.rollUpTabActiveLable
      : commonStyle.rollUpTabUnactiveLable;

  const lineStyle =
    type === "active"
      ? commonStyle.rollUpTabActiveLine
      : commonStyle.rollUpTabUnactiveLine;

  return (
    <TouchableOpacity
      onPress={() => onPress(navigation, route, isFocused)}
      style={commonStyle.rollUpTabWrapper}
    >
      {label === ROLLUP.Upcoming ? (
        <Text style={labelStyle}>{label}</Text>
      ) : null}
      {label === ROLLUP.Previous ? (
        <Text
          style={
            type === "active"
              ? commonStyle.rollUpTabActiveLable
              : commonStyle.rollUpTabUnactiveLable
          }
        >
          {label}
        </Text>
      ) : null}

      <View style={lineStyle}></View>
    </TouchableOpacity>
  );
});
const storeLabel = (options, route) => {
  switch (options) {
    case options.tabBarLabel !== undefined:
      return options.tabBarLabel;

    case options.title !== undefined:
      return options.title;

    default:
      return route.name;
  }
};
const CustomeTabBar = ({ state, navigation, descriptors }) => {
  return (
    <View style={commonStyle.rollUpMain}>
      {state.routes.map(
        (route: { key: string | number; name: any }, index: any) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label = storeLabel(options, route);

          const onPressCall = (navigation, route, isFocused) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View style={commonStyle.rollUpSub} key={index?.toString()}>
              <RenderTab
                type={!isFocused ? "unactive" : "active"}
                label={label}
                navigation={navigation}
                route={route}
                isFocused={isFocused}
                onPress={onPressCall}
              />
            </View>
          );
        }
      )}
    </View>
  );
};
const RenderGroupDetailsTabBar = (props: MaterialTopTabBarProps) => {
  return <CustomeTabBar {...props} />;
};
const TabStack = () => {
  const [init] = useState({ width: Dimensions.get("window").width });

  return (
    <GroupDetailsTab.Navigator
      id="GroupDetailsTab"
      initialLayout={init}
      tabBar={RenderGroupDetailsTabBar}
    >
      <GroupDetailsTab.Screen
        name={ROLLUP.Upcoming}
        component={UpcomingScreen}
      />
      <GroupDetailsTab.Screen
        name={ROLLUP.Previous}
        component={PreviousScreen}
      />
    </GroupDetailsTab.Navigator>
  );
};
