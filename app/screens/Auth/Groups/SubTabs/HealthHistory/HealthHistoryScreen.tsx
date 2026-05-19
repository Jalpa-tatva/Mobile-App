import React, {JSX, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
  InteractionManager,
} from 'react-native';

// import external libraries
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// import custom styling & utils
import commonStyle from '@app/theme/commonStyle';
import {Full, Body, HEADERTOP} from './styles';

// import custom function
import {GROUP_DETAILS} from '@app/constants';

// import render screen
import {
  ManualMonitoringScreen,
  BackgroundFormScreen,
  HealthOverviewFormScreen,
} from '@app/screens/Auth/index';
import {Header} from '@app/components';
import I18n from 'i18n-js';
import {content} from '@app/utils/string';
import {useRedux} from '@app/redux/hooks';

const GroupDetailsTab = createMaterialTopTabNavigator();

export const HealthHistoryScreen: React.FC<{
  activeTab?: any;
}> = () => {
  const navigation = useNavigation();
  const {groups} = content;
  const {group_detail} = useRedux([groups.groupsDetail]);
  const [activeTab, setActiveTab] = useState(GROUP_DETAILS.Activities);

  const {
    uniqueId: uniqueIds,
    imageUrl: imageUrls,
    title: titles,
  } = group_detail;

  return (
    <View testID="HealthHistoryScreen" style={Full}>
      <View style={HEADERTOP}>
        <Header
          title={I18n.t('groupDetails.EHR')}
          icon="chevron-left"
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={Body}>
        <TabStack
          imageUrls={imageUrls}
          titles={titles}
          uniqueIds={uniqueIds}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>
    </View>
  );
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const TabStack = ({imageUrls, titles, uniqueIds, activeTab, setActiveTab}) => {
  const [init] = useState({width: Dimensions.get('window').width});
  let animatedRef = useRef(new Animated.Value(0)).current;
  const [proStatus, setProStatus] = useState(0);

  useEffect(() => {
    loadAnimation();
  }, []);

  const loadAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    InteractionManager.runAfterInteractions(() => {
      if (proStatus === 0) {
        animatedRef.addListener(({value}) => {
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

        animatedRef.addListener(({value}) => {
          setProStatus(parseInt(value.toString(), 10));
        });

        Animated.timing(animatedRef, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  };

  const CustomeTabBar = ({state, descriptors, navigation}) => {
    return (
      <View style={commonStyle.healthView}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            loadAnimation();
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              setActiveTab(route.name);
              navigation.navigate(route.name);
            }
          };

          const isValidLabel = [
            GROUP_DETAILS.Background,
            GROUP_DETAILS.HealthOverview,
            GROUP_DETAILS.ManualMonitoring,
          ].includes(label);

          if (!isValidLabel) return null;

          return (
            <View key={route.key} style={commonStyle.healthViewGroup}>
              <TouchableOpacity
                onPress={onPress}
                style={
                  isFocused
                    ? commonStyle.healthSubTouch
                    : commonStyle.healthUnactiveSubTouch
                }>
                <Animated.View
                  style={
                    isFocused
                      ? [commonStyle.healthTabActive, {width: `${proStatus}%`}]
                      : commonStyle.healthTabUnactive
                  }>
                  <Text
                    style={
                      isFocused
                        ? commonStyle.healthlabelStyle
                        : commonStyle.healthlabeUnablelStyle
                    }>
                    {label}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <GroupDetailsTab.Navigator
      initialLayout={init}
      lazy
      tabBar={(
        props: JSX.IntrinsicAttributes & {
          state: any;
          descriptors: any;
          navigation: any;
        },
      ) => <CustomeTabBar {...props} />}>
      <GroupDetailsTab.Screen
        name={GROUP_DETAILS.Background}
        children={props => (
          <BackgroundFormScreen
            uniqueIds={uniqueIds}
            titles={titles}
            imageUrls={imageUrls}
            activeTab={GROUP_DETAILS.Background}
            setActiveTab={setActiveTab}
            {...props}
          />
        )}
      />
      <GroupDetailsTab.Screen
        name={GROUP_DETAILS.HealthOverview}
        children={props => (
          // <BlankScreen />
          <HealthOverviewFormScreen
            uniqueIds={uniqueIds}
            titles={titles}
            imageUrls={imageUrls}
            activeTab={GROUP_DETAILS.HealthOverview}
            setActiveTab={setActiveTab}
            {...props}
          />
        )}
      />

      <GroupDetailsTab.Screen
        name={GROUP_DETAILS.ManualMonitoring}
        children={props => (
          <ManualMonitoringScreen
            uniqueIds={uniqueIds}
            titles={titles}
            imageUrls={imageUrls}
            activeTab={GROUP_DETAILS.HealthOverview}
            setActiveTab={setActiveTab}
            {...props}
          />
        )}
      />
    </GroupDetailsTab.Navigator>
  );
};
