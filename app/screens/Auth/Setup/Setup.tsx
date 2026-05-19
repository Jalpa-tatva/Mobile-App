import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Switch,
  FlatList,
  BackHandler,
  LayoutAnimation,
  InteractionManager,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

// Import the libraries
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// styles,theme & utils
import { Style } from "./style";
import { Header } from "@app/components";
import I18n from "@app/i18n/i18n";
import useAppNavigation from "@app/navigation/navigation";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import { translate } from "@app/i18n";
import { color } from "@app/theme";
import { dynamicTab } from "@app/redux/reducer/dynamicTabsReducer";
import { TABS } from "@app/constants";
import commonStyle from "@app/theme/commonStyle";
import { TAB_TITLE_MAP } from "@app/utils/NavigationConfigJson";

const TopTab = createMaterialTopTabNavigator();

export const Setup: React.FC = () => {
  const navigation = useAppNavigation();
  const { groups } = content;

  const scrollRef = useRef<ScrollView>(null);

  // store tab positions
  const tabPositions = useRef<{ x: number; width: number }[]>([]);

  let animatedRef = useRef(new Animated.Value(0)).current;

  const { drawer_status, dynamic_tab, dispatches } = useRedux([
    groups.drawerStatus,
    groups.dynamicTab,
    groups.dispatch,
  ]);

  const screenWidth = Dimensions.get("window").width;

  /**
   * Toggle Switch
   */
  const toggleSwitch = (id: string) => {
    dispatches(dynamicTab(id));
  };

  /**
   * Back Handler
   */
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

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  /**
   * Render Item
   */
  const renderItem = (item: SetupProps) => {
    if (item?.name === TABS.MyGroups) return null;

    const tabLabels = {
      [TABS.Organizations]: translate("TabTitle.Clinical"),
      [TABS.Resources]: translate("TabTitle.Resource"),
    };

    return (
      <View style={Style.contents}>
        <View style={Style.fingerprintWrapper}>
          <Text style={Style.tabsLabel}>
            {tabLabels[item?.name] || item?.name}
          </Text>
        </View>

        <Switch
          value={item.enable}
          trackColor={{
            false: color.trackColor,
            true: color.secondary,
          }}
          thumbColor={item.enable ? color.secondary : color.thumbColor}
          onValueChange={() => toggleSwitch(item.id)}
        />
      </View>
    );
  };

  /**
   * Tab Sections
   */
  const TAB_SECTIONS = Object.keys(dynamic_tab || {}).map((key) => ({
    key,
    title: TAB_TITLE_MAP[key] || key,
    data: dynamic_tab[key],
  }));

  const FILTERED_TABS = TAB_SECTIONS.filter(
    (tab) => tab.data && tab.data.length > 0
  );
  /**
   * Common Screen
   */
  const CommonTabScreen = ({ data }) => {
    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        style={Style.listingStyle}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={Style.fullGrow}
      />
    );
  };

  /**
   * Animation
   */
  useEffect(() => {
    loadAnimation();
  }, []);

  const loadAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    InteractionManager.runAfterInteractions(() => {
      animatedRef.addListener(({ value }) => {});

      Animated.timing(animatedRef, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const scrollToCenter = (index: number) => {
    if (index === 0 || index === 1) {
      scrollRef.current?.scrollTo({
        x: 0,
        animated: true,
      });
      return;
    }

    const layout = tabPositions.current[index];

    if (!layout || !scrollRef.current) return;

    const { x, width } = layout;

    const offset = x + width / 2 - screenWidth / 2;

    scrollRef.current.scrollTo({
      x: offset > 0 ? offset : 0,
      animated: true,
    });
  };

  /**
   * Custom Tab Bar
   */
  const CustomeTabBar = ({ state, descriptors, navigation }) => {
    useEffect(() => {
      // small delay ensures layout is ready
      setTimeout(() => {
        scrollToCenter(state.index);
      }, 50);
    }, [state.index]);

    return (
      <View style={Style.scrollWrapper}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={Style.listAlignment}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              loadAnimation();

              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <View
                key={route.key}
                style={Style.healthViewGroup}
                onLayout={(e) => {
                  const { x, width } = e.nativeEvent.layout;
                  tabPositions.current[index] = { x, width };
                }}
              >
                <TouchableOpacity
                  onPress={onPress}
                  style={
                    isFocused
                      ? Style.healthSubTouch
                      : Style.healthUnactiveSubTouch
                  }
                >
                  <Animated.View
                    style={
                      isFocused
                        ? [commonStyle.healthTabActive, Style.addSpace]
                        : [commonStyle.healthTabUnactive, Style.addSpace]
                    }
                  >
                    <Text
                      style={
                        isFocused
                          ? commonStyle.healthlabelStyle
                          : commonStyle.healthlabeUnablelStyle
                      }
                    >
                      {label}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={Style.main}>
      <View style={Style.headerTop}>
        <Header
          title={I18n.t("AppDrawer.Configuration")}
          icon={drawer_status?.isDrawerOpen ? "circle-with-cross" : "menu"}
          onPressLeft={() => navigation.openDrawer()}
        />
      </View>

      <View style={Style.body}>
        <TopTab.Navigator
          id={"dynamic-tab"}
          screenOptions={{
            tabBarScrollEnabled: true,
          }}
          tabBar={(props) => <CustomeTabBar {...props} />}
        >
          {FILTERED_TABS.map((tab) => {
            if (!tab.data || tab.data.length === 0) return null;

            return (
              <TopTab.Screen key={tab.key} name={tab.title}>
                {() => <CommonTabScreen data={tab.data} />}
              </TopTab.Screen>
            );
          })}
        </TopTab.Navigator>
      </View>
    </View>
  );
};

/**
 * Types
 */
interface SetupProps {
  name: string;
  enable: boolean;
  id: string;
}
