import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";

// import external libraries
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// import custom function, styles and theme
import commonStyle from "@app/theme/commonStyle";
import { FULL, BODY } from "./Style";
import { GROUP_DETAILS } from "@app/constants";
import { OpenIssuesList, ClosedIssuesList } from "@app/screens/Auth/index";

const GroupDetailsTab = createMaterialTopTabNavigator();
let issueTabs = "";
type IssuesRouteProps = {
  IssuesScreen: {
    setActiveTab?: (string) => void;
    profile?: any;
    activeTab?: string;
    reload: boolean;
    setReload: (boolean) => void;
    screen?: string;
    issueTab?: string;
  };
};
type RxDrugScreenType = RouteProp<IssuesRouteProps, "IssuesScreen">;

/**
 *  IssuesScreen Props
 */
export const IssuesScreen: React.FC = () => {
  const route = useRoute<RxDrugScreenType>();
  const { issueTab, setActiveTab, activeTab } = route?.params;

  issueTabs = issueTab;
  const navigation = useNavigation();

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      console.log("issueTab", issueTab);

      setActiveTab(activeTab);
    });
    return focus;
  }, []);

  return (
    <View testID="IssuesListScreen" style={FULL}>
      <View style={BODY}>
        <TabStack setActiveTab={setActiveTab} />
      </View>
    </View>
  );
};

/**
 *  TabStack
 */
const TabStack = ({ setActiveTab }) => {
  const [init] = useState({ width: Dimensions.get("window").width });
  let animatedRef = useRef(new Animated.Value(0)).current;
  const [proStatus, setProStatus] = useState(0);

  useEffect(() => {
    loadAnimation();
  }, []);

  const loadAnimation = () => {
    if (proStatus == 0) {
      animatedRef.addListener(({ value }) => {
        setProStatus(parseInt(value.toString(), 10));
      });
      Animated.timing(animatedRef, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setProStatus(0);
      animatedRef.resetAnimation();
      animatedRef.addListener(({ value }: { value: any }) => {
        setProStatus(parseInt(value, 10));
      });
      Animated.timing(animatedRef, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderLabel = (label, isFocused) => {
    if (
      label !== GROUP_DETAILS.OpenIssue &&
      label !== GROUP_DETAILS.ClosedIssue
    ) {
      return null;
    }

    const labelStyle = isFocused
      ? commonStyle.healthlabelStyle
      : commonStyle.healthlabeUnablelStyle;

    return <Text style={labelStyle}>{label}</Text>;
  };
  const setLabel = (options, route) => {
    if (options.tabBarLabel !== undefined) {
      return options.tabBarLabel;
    } else if (options.title !== undefined) {
      return options.title;
    } else {
      return route.name;
    }
  };
  const CustomeTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={commonStyle.healthView}>
        {state.routes.map(
          (route: { key: string | number; name: any }, index: any) => {
            const { options } = descriptors[route.key];
            const label = setLabel(options, route);
            const isFocused = state.index === index;

            const onPress = () => {
              loadAnimation();
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
              <View style={commonStyle.healthViewGroup} key={index?.toString()}>
                <TouchableOpacity
                  onPress={onPress}
                  style={
                    isFocused
                      ? commonStyle.healthSubTouch
                      : commonStyle.healthUnactiveSubTouch
                  }
                >
                  <Animated.View
                    style={
                      isFocused
                        ? [
                            commonStyle.healthTabActive,
                            { width: `${proStatus}%` },
                          ]
                        : commonStyle.healthTabUnactive
                    }
                  >
                    {isFocused ? (
                      <View>{renderLabel(label, isFocused)}</View>
                    ) : (
                      renderLabel(label, isFocused)
                    )}
                  </Animated.View>
                </TouchableOpacity>
              </View>
            );
          }
        )}
      </View>
    );
  };
  const renderOpenIssues = (props: any) => (
    <OpenIssuesList
      activeTab={GROUP_DETAILS.Issues}
      setActiveTab={setActiveTab}
      {...props}
    />
  );

  const renderClosedIssues = (props: any) => (
    <ClosedIssuesList
      activeTab={GROUP_DETAILS.Issues}
      setActiveTab={setActiveTab}
      {...props}
    />
  );

  const renderTabBar = (props: any) => <CustomeTabBar {...props} />;

  return (
    <GroupDetailsTab.Navigator
      initialLayout={init}
      initialRouteName={
        issueTabs === GROUP_DETAILS.OpenIssue
          ? GROUP_DETAILS.OpenIssue
          : GROUP_DETAILS.ClosedIssue
      }
      tabBar={renderTabBar}
    >
      <GroupDetailsTab.Screen name={GROUP_DETAILS.OpenIssue}>
        {(props) => renderOpenIssues(props)}
      </GroupDetailsTab.Screen>

      <GroupDetailsTab.Screen name={GROUP_DETAILS.ClosedIssue}>
        {(props) => renderClosedIssues(props)}
      </GroupDetailsTab.Screen>
    </GroupDetailsTab.Navigator>
  );
};
