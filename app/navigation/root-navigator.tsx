/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React, { useEffect } from "react";
import notifee, { AndroidImportance } from "@notifee/react-native";

// import external libraries
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import messaging from "@react-native-firebase/messaging";

// import custom function & component
import { MainNavigator } from "./main-navigator";
import { DrawerNavigator } from "./main-navigator-drawer";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import { chat } from "@app/redux/reducer/chatReducer";

// import app screens
import {
  SplashScreen,
  LoginScreen,
  SignUpScreen,
} from "@app/screens/Unauth/index";
import {
  AddGroupScreen,
  GroupDetailsScreen,
  NotesDetailsScreen,
  AddNotesScreen,
  IssueDetailScreen,
  AddIssueScreen,
  SearchDrugsScreen,
  AddDrugsScreen,
  ViewDrugScreen,
  AddEventScreen,
  GroupInvitationScreen,
  DocumentsScreen,
  VideosScreen,
  YoutubeVideoScreen,
  ViewVideoScreen,
  PreviewReportScreen,
  MonitoringChartScreen,
  RollUpDetailsScreen,
  EditEventScreen,
  ChangePasswordScreen,
  FriendDetailScreen,
  EditGroupScreen,
  HealthHistoryScreen,
  FollowingScreen,
  PreviousScreen,
} from "@app/screens/Auth";
import {
  STACK,
  MODULES,
  DRAWER,
  MESSAGE,
  PROFILE,
  USER_PROFILE,
  ROLLUP,
  GROUP_DETAILS,
} from "@app/constants";
import { VaccineScreen } from "@app/screens/Auth/Groups/SubTabs/HealthHistory/HealthOverviewForm/VaccineScreen";
import AddNotes from "@app/screens/Auth/Groups/SubTabs/HealthHistory/HealthOverviewForm/AddNotes";
import { NotesScreen } from "@app/screens/Auth/Groups/SubTabs/HealthHistory/HealthOverviewForm/NotesScreen";
import MessageDetailScreen from "@app/screens/Auth/Messages/MessageDetailScreen";
import { SubDocuments } from "@app/screens/Auth/Groups/SubTabs/Documents/SubDocuments";
import { ActivityScreen } from "@app/screens/Auth/UserProfile/SubTabs/Activity/Activity";
import MemberListing from "@app/screens/Auth/RollUps/RollUpDetails/MemberListing";
import { EditProfile } from "@app/screens/Auth/UserProfile/Profile/EditProfile";
import UserSelection from "@app/screens/Auth/Messages/UserList/UserSelection";
import { MonitoringScreen } from "@app/screens/Auth/Groups/SubTabs/Monitoring/MonitoringScreen";
import { Comment } from "@app/screens/Auth/Groups/SubTabs/Activities/Comments/Comment";

const Stack = createStackNavigator();

/**
 * SplashStack
 */
const SplashStack = () => {
  return (
    <Stack.Navigator
      id={"splash_satck"}
      initialRouteName={MODULES.Splash}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        detachPreviousScreen: false,
      }}
    >
      <Stack.Screen name={STACK.RootStack} component={RootStack} />
      <Stack.Screen name={MODULES.Splash} component={SplashScreen} />
      <Stack.Screen name={MODULES.Login} component={LoginScreen} />
      <Stack.Screen name={MODULES.SignUp} component={SignUpScreen} />

      <Stack.Screen name={MODULES.AddGroupScreen} component={AddGroupScreen} />
      <Stack.Screen name={MESSAGE.userSelection} component={UserSelection} />
      <Stack.Screen
        name={MESSAGE.messageDetail}
        component={MessageDetailScreen}
      />
      <Stack.Screen
        name={MODULES.GroupDetailsScreen}
        component={GroupDetailsScreen}
      />
      <Stack.Screen
        name={MODULES.NotesDetailsScreen}
        component={NotesDetailsScreen}
      />
      <Stack.Screen name={MODULES.AddNotesScreen} component={AddNotesScreen} />
      <Stack.Screen
        name={MODULES.IssueDetailScreen}
        component={IssueDetailScreen}
      />
      <Stack.Screen name={MODULES.AddIssueScreen} component={AddIssueScreen} />
      <Stack.Screen
        name={MODULES.SearchDrugsScreen}
        component={SearchDrugsScreen}
      />
      <Stack.Screen name={MODULES.AddDrugsScreen} component={AddDrugsScreen} />
      <Stack.Screen name={MODULES.ViewDrugScreen} component={ViewDrugScreen} />
      <Stack.Screen name={MODULES.AddEventScreen} component={AddEventScreen} />
      <Stack.Screen
        name={MODULES.GroupInvitationScreen}
        component={GroupInvitationScreen}
      />
      <Stack.Screen name={MODULES.SubDocuments} component={SubDocuments} />
      <Stack.Screen name={ROLLUP.Previous} component={PreviousScreen} />

      <Stack.Screen
        name={MODULES.DocumentsScreen}
        component={DocumentsScreen}
      />
      <Stack.Screen name={MODULES.VideosScreen} component={VideosScreen} />
      <Stack.Screen
        name={MODULES.HealthHistory}
        component={HealthHistoryScreen}
      />
      <Stack.Screen
        name={MODULES.YoutubeVideoScreen}
        component={YoutubeVideoScreen}
      />
      <Stack.Screen
        name={MODULES.ViewVideoScreen}
        component={ViewVideoScreen}
      />
      <Stack.Screen
        name={MODULES.MonitoringScreen}
        component={MonitoringScreen}
      />
      <Stack.Screen
        name={MODULES.PreviewReportScreen}
        component={PreviewReportScreen}
      />
      <Stack.Screen name={GROUP_DETAILS.Comment} component={Comment} />
      <Stack.Screen
        name={MODULES.MonitoringChartScreen}
        component={MonitoringChartScreen}
      />

      <Stack.Screen name={MODULES.Notes} component={AddNotes} />
      <Stack.Screen name={MODULES.ProgressNotes} component={NotesScreen} />

      <Stack.Screen
        name={MODULES.RollUpDetailsScreen}
        component={RollUpDetailsScreen}
      />
      <Stack.Screen
        name={MODULES.EditEventScreen}
        component={EditEventScreen}
      />

      <Stack.Screen
        name={MODULES.ChangePasswordScreen}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name={MODULES.FriendDetailScreen}
        component={FriendDetailScreen}
      />
      <Stack.Screen
        name={MODULES.EditGroupScreen}
        component={EditGroupScreen}
      />

      <Stack.Screen name={MODULES.VaccineScreen} component={VaccineScreen} />
      <Stack.Screen name={PROFILE.EditProfile} component={EditProfile} />
      <Stack.Screen name={USER_PROFILE.following} component={FollowingScreen} />
      <Stack.Screen name={PROFILE.Activity} component={ActivityScreen} />
      <Stack.Screen name={PROFILE.MemberListing} component={MemberListing} />
    </Stack.Navigator>
  );
};

/**
 * RootStack
 */
const RootStack = () => {
  return (
    <Stack.Navigator
      id={"stack_navigation"}
      initialRouteName={DRAWER.Drawer_Navigation}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={DRAWER.Drawer_Navigation}
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={STACK.MainTab}
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * RootNavigator
 */
export const RootNavigator = React.forwardRef<
  NavigationContainerRef<any>,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const { groups } = content;
  const { dispatches } = useRedux([groups.dispatch]);

  const onScreenNotification = (notify) => {
    notify?.messageId && dispatches(chat(notify));
  };

  const silentNotification = (fromss) => {
    return (
      fromss === global.screenName ||
      (fromss === "Activity" && global.screenName === "Activity") ||
      (fromss === "Messages" && global.screenName === "MessageDetail") ||
      (fromss === "MessagesReaction" && global.screenName === "MessageDetail")
    );
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const { notification, messageId, data } = remoteMessage;
      const fromss = data?.fromss;

      const foreground = silentNotification(fromss);
      onScreenNotification(remoteMessage);

      if (!foreground) {
        await notifee.displayNotification({
          id: messageId,
          title: notification?.title,
          body: notification?.body,
          data: data,
          ios: {
            sound: "default",
          },
          android: {
            channelId: "default",
            importance: AndroidImportance.HIGH,
            sound: "default",
          },
        });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer {...props} ref={ref}>
      <SplashStack />
    </NavigationContainer>
  );
});

RootNavigator.displayName = "RootNavigator";
