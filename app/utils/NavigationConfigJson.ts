import {
  DRAWER,
  DRAWER_ICONS,
  GROUP_DETAILS,
  MODULES,
  PROFILE,
  STACK,
  TABS,
} from "@app/constants";
import { translate } from "@app/i18n";
import I18n from "@app/i18n/i18n";
import { MainNavigator } from "@app/navigation";
import {
  ActivitiesScreen,
  ConnectionScreen,
  EventsScreen,
  FollowingScreen,
  GroupsScreen,
  HelpsScreen,
  InvitationScreen,
  IssuesScreen,
  MembersScreen,
  MessageScreen,
  PhotosScreen,
  RollUpsScreen,
  RxDrugsScreen,
  SettingsScreen,
  SupportScreen,
  VideosScreen,
} from "@app/screens/Auth";
import { Setup } from "@app/screens/Auth/Setup/Setup";
import { TermsScreen } from "@app/screens/Auth/Terms/TermsScreen";
import Profile from "@app/screens/Auth/UserProfile/Profile/Profile";

export const TAB_TITLE_MAP = {
  bottom_tab: translate("AppDrawer.healthcareBottomTabs"),
  drawer_menu: translate("AppDrawer.healthcareDrawerTabs"),
  profile_tab: translate("AppDrawer.healthcareProfileTabs"),
  group_details_header_tab: translate(
    "AppDrawer.healthcareGroupDetailsHeaderTabs"
  ),
  group_detail_tab: translate("AppDrawer.healthcareGroupDetailsTabs"),
  organization_detail_tab: translate("AppDrawer.healthcareOrgDetailsTabs"),
};

export const menuConfig = {
  bottom_tab: [
    { id: "groups", name: TABS.MyGroups, enable: true },
    { id: "rollup", name: TABS.Rollup, enable: true },
    { id: "support", name: TABS.Support, enable: true },
    // { id: "organizations", name: TABS.Organizations, enable: true },
    // { id: "resources", name: TABS.Resources, enable: true },
    { id: "messages", name: TABS.Messages, enable: true },
  ],
  drawer_menu: [
    {
      id: "groups",
      name: TABS.MyGroups,
      enable: true,
      title: DRAWER_ICONS.Home,
    },
    {
      id: "profile",
      name: MODULES.Profile,
      enable: true,
      title: MODULES.Profile,
    },
    {
      id: "help",
      name: MODULES.HelpsScreen,
      enable: true,
      title: DRAWER_ICONS.Help,
    },
    {
      id: "terms",
      name: MODULES.TermsScreen,
      enable: true,
      title: DRAWER_ICONS.Terms,
    },
    {
      id: "settings",
      name: PROFILE.Settings,
      enable: true,
      title: PROFILE.Settings,
    },
    // { id: "tools", name: TABS.Tools, enable: false, title: TABS.Tools },
    { id: "setup", name: TABS.Setup, enable: true, title: TABS.Setup },
  ],
  profile_tab: [
    { id: "profile_activity", name: GROUP_DETAILS.Activities, enable: true },
    { id: "following", name: PROFILE.Following, enable: true },
    { id: "Connection", name: PROFILE.Connections, enable: true },
    { id: "invites", name: PROFILE.Invites, enable: true },
  ],
  group_details_header_tab: [
    {
      id: "Docs",
      key: "Docs",
      name: "Docs",
      enable: true,
    },
    {
      id: "EHR",
      key: "EHR",
      name: I18n.t("groupDetails.EHR"),
      enable: true,
    },
    {
      id: "Monitoring",
      key: "Monitoring",
      name: I18n.t("groupDetails.Monitoring"),
      enable: true,
    },
    {
      id: "Meetup",
      key: "Meetup",
      name: I18n.t("groupDetails.Meetup"),
      enable: true,
    },
  ],
 
  group_detail_tab: [
    {
      id: "group_activity",
      name: GROUP_DETAILS.Activities,
      enable: true,
    },
    {
      id: "video",
      name: GROUP_DETAILS.Videos,
      enable: true,
    },
    {
      id: "issues",
      name: GROUP_DETAILS.Issues,
      enable: true,
    },
    {
      id: "drugs",
      name: GROUP_DETAILS.Rx,
      enable: true,
    },
    {
      id: "calander",
      name: GROUP_DETAILS.Calanders,
      enable: true,
    },
    { id: "photos", name: GROUP_DETAILS.Photos, enable: true },
    { id: "member", name: GROUP_DETAILS.Groups, enable: true },
  ],
  // organization_detail_tab: [
  //   {
  //     id: "org_home",
  //     name: GROUP_DETAILS.OrgHome,
  //     enable: true,
  //   },
  //   {
  //     id: "org_activity",
  //     name: GROUP_DETAILS.Activities,
  //     enable: true,
  //   },
  //   { id: "org_photos", name: GROUP_DETAILS.Photos, enable: true },
  //   {
  //     id: "org_video",
  //     name: GROUP_DETAILS.Videos,
  //     enable: true,
  //   },
  //   {
  //     id: "org_documents",
  //     name: GROUP_DETAILS.Documents,
  //     enable: true,
  //   },
  //   {
  //     id: "org_member",
  //     name: GROUP_DETAILS.Groups,
  //     enable: true,
  //   },
  // ],
};

export const TAB_ICON_CONFIG = {
  [TABS.MyGroups]: {
    library: "MaterialCommunityIcons",
    name: "account-group",
    focusedSize: 19,
    defaultSize: 22,
  },

  [TABS.Rollup]: {
    library: "MaterialIcons",
    name: "event-note",
    focusedSize: 19,
    defaultSize: 25,
  },

  [TABS.Support]: {
    library: "MaterialIcons",
    name: "support",
    focusedSize: 19,
    defaultSize: 25,
  },

  [TABS.Organizations]: {
    library: "MaterialCommunityIcons",
    name: "map-marker-distance",
    focusedSize: 18,
    defaultSize: 23,
  },

  [TABS.Resources]: {
    library: "Entypo",
    name: "network",
    focusedSize: 18,
    defaultSize: 22,
  },

  [TABS.Messages]: {
    library: "MaterialIcons",
    name: "chat",
    focusedSize: 20,
    defaultSize: 22,
  },
};

export const drawer_icons = {
  Home: "home",
  Profile: "user-circle",
  Help: "wechat",
  Terms: "carryout",
  Settings: "setting",
  Tools: "camera",
  Configuration: "profile",
};

export const DRAWER_SCREEN_MAP = {
  [TABS.MyGroups]: MainNavigator,
  [MODULES.Profile]: Profile,
  [MODULES.HelpsScreen]: HelpsScreen,
  [MODULES.TermsScreen]: TermsScreen,
  [PROFILE.Settings]: SettingsScreen,
  [TABS.Setup]: Setup,
};

export const MAIN_NAVIGATOR_SCREEN_MAP = {
  [TABS.MyGroups]: GroupsScreen,
  [TABS.Rollup]: RollUpsScreen,
  [TABS.Support]: SupportScreen,
  // [TABS.Organizations]: OrganizationScreen,
  // [TABS.Resources]: ResourceScreen,
  [TABS.Messages]: MessageScreen,
};

export const GROUP_DETAILS_HEADER_SCREEN_MAP = {
  [TABS.MyGroups]: GroupsScreen,
  [TABS.Rollup]: RollUpsScreen,
  [TABS.Support]: SupportScreen,
  // [TABS.Organizations]: OrganizationScreen,
  // [TABS.Resources]: ResourceScreen,
  [TABS.Messages]: MessageScreen,
};

export const PROFILE_SCREEN_MAP = {
  [PROFILE.Following]: FollowingScreen,
  [GROUP_DETAILS.Activities]: ActivitiesScreen,
  [PROFILE.Connections]: ConnectionScreen,
  [PROFILE.Invites]: InvitationScreen,
};

export const GROUP_DETAILS_SCREEN_MAP = {
  [GROUP_DETAILS.Activities]: ActivitiesScreen,
  [GROUP_DETAILS.Videos]: VideosScreen,
  [GROUP_DETAILS.Issues]: IssuesScreen,
  [GROUP_DETAILS.Rx]: RxDrugsScreen,
  [GROUP_DETAILS.Calanders]: EventsScreen,
  [GROUP_DETAILS.Photos]: PhotosScreen,
  [GROUP_DETAILS.Groups]: MembersScreen,
};

export const DRAWER_NAVIGATION_CONFIG = {
  [DRAWER_ICONS.Home]: {
    type: "replace",
    route: STACK.RootStack,
  },
  [MODULES.Profile]: {
    type: "navigate",
    parent: DRAWER.Drawer_Navigation,
    screen: MODULES.Profile,
  },
  [DRAWER_ICONS.Help]: {
    type: "navigate",
    parent: DRAWER.Drawer_Navigation,
    screen: MODULES.HelpsScreen,
  },
  [DRAWER_ICONS.Terms]: {
    type: "navigate",
    parent: DRAWER.Drawer_Navigation,
    screen: MODULES.TermsScreen,
  },
  [PROFILE.Settings]: {
    type: "navigate",
    parent: DRAWER.Drawer_Navigation,
    screen: PROFILE.Settings,
  },

  [TABS.Setup]: {
    type: "navigate",
    parent: DRAWER.Drawer_Navigation,
    screen: TABS.Setup,
  },
};
