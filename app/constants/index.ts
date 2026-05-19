import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Overlay } from "react-native-elements";
import { Agenda } from "react-native-calendars";
import CountryPicker from "react-native-country-picker-modal";
import { Formik } from "formik";
import DeviceInfo from "react-native-device-info";
import * as Keychain from "react-native-keychain";
import Config from "react-native-config";
import DropDownPicker from "react-native-dropdown-picker";

export const emojiList = [
  { id: 1, emoji: "👍" },
  { id: 2, emoji: "👎" },
  { id: 3, emoji: "❤️" },
  { id: 4, emoji: "❓" },
  { id: 5, emoji: "❗" },
];
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE";
export type RBSheetRef = {
  open: () => void;
  close: () => void;
};

export const matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

export const useRBSheetRef = () => {
  return useRef<RBSheet & RBSheetRef>(null);
};

export const getUserDetail = async () => {
  try {
    const res: any = await Keychain.getInternetCredentials(Config.BASE_URL);
    return res;
  } catch (error) {
    console.log("Error are retrived", error);
  }
};
export const SafeDropDown =
  DropDownPicker as unknown as React.ComponentType<any>;
export const SafeOverlay = Overlay as unknown as React.ComponentType<any>;
export const SafeRBSheet = RBSheet as unknown as React.ComponentType<any>;
export const SafeAgenda = Agenda as unknown as React.ComponentType<any>;
export const SafeCountryPicker =
  CountryPicker as unknown as React.ComponentType<any>;
export const SafeFormik = Formik as unknown as React.ComponentType<any>;

export const MODULES = {
  Login: "Login",
  SignUp: "SignUp",
  Splash: "Spalsh",
  HelpsScreen: "HelpsScreen",
  UserProfileScreen: "UserProfileScreen",
  CommentScreen: "CommentScreen",
  AddBlogScreen: "AddBlogScreen",
  BlogDetailScreen: "BlogDetailScreen",
  ChangePasswordScreen: "ChangePasswordScreen",
  FriendDetailScreen: "FriendDetailScreen",
  RollUpDetailsScreen: "RollUpDetailsScreen",
  EditEventScreen: "EditEventScreen",
  EditTaksScreen: "EditTaksScreen",
  EditGroupScreen: "EditGroupScreen",
  EditIssueScreen: "EditIssueScreen",
  AddGroupScreen: "AddGroupScreen",
  AddOrganizationScreen: "AddOrganizationScreen",
  AddResourceScreen: "AddResourceScreen",
  GroupDetailsScreen: "GroupDetailsScreen",
  VideosScreen: "VideosScreen",
  ProgressNotes: "progressnotes",
  ViewVideoScreen: "ViewVideoScreen",
  DocumentsScreen: "DocumentsScreen",
  Documents: "Documents",
  SubDocuments: "SubDocuments",
  YoutubeVideoScreen: "YoutubeVideoScreen",
  GroupInvitationScreen: "GroupInvitationScreen",
  MonitoringScreen: "MonitoringScreen",
  MonitoringChartScreen: "MonitoringChartScreen",
  MonitoringBleScanScreen: "MonitoringBleScanScreen",
  MonitoringProcessSpoScreen: "MonitoringProcessSpoScreen",
  MonitoringProcessBpScreen: "MonitoringProcessBpScreen",
  MonitoringProcessThermometerScreen: "MonitoringProcessThermometerScreen",
  MonitoringProcesWScreen: "MonitoringProcesWScreen",
  MonitoringProcessSugarScreen: "MonitoringProcessSugarScreen",
  AddTaksScreen: "AddTaksScreen",
  ListDetailsScreen: "ListDetailsScreen",
  AddIssueScreen: "AddIssueScreen",
  IssueDetailScreen: "IssueDetailScreen",
  SearchDrugsScreen: "SearchDrugsScreen",
  AddDrugsScreen: "AddDrugsScreen",
  ViewDrugScreen: "ViewDrugScreen",
  AddEventScreen: "AddEventScreen",
  Voice: "voice",
  Notes: "notes",
  PreviewReportScreen: "PreviewReportScreen",
  PlacesDetailScreen: "PlacesDetailScreen",
  AddHealthHistoryScreen: "AddHealthHistoryScreen",
  OrgDetailScreen: "OrgDetailsScreen",
  OrgDocumentScreen: "OrgDocumentScreen",
  OrgPhotosScreen: "OrgPhotosScreen",
  OrgAddEventScreen: "OrgAddEventScreen",
  ForumDetailsScreen: "ForumDetailsScreen",
  TopicScreen: "TopicScreen",
  ConfigureModerator: "ConfigureModerator",
  TopicReplyScreen: "TopicReplyScreen",
  NotesDetailsScreen: "NotesDetailsScreen",
  AddNotesScreen: "AddNotesScreen",
  ConfigureModeratorScreen: "ConfigureModeratorScreen",
  VaccineScreen: "VaccineScreen",
  HealthHistory: "Health History",
  Profile: "Profile",
  TermsScreen: "TermsScreen",
} as any;

export const STACK = {
  MainTab: "MainTab",
  RootStack: "RootStack",
} as const;

export const DRAWER = {
  Drawer_Navigation: "Drawer_Navigation",
} as const;

export const appName = DeviceInfo.getApplicationName();
export const TABS = {
  CareTeams: "Care Teams",
  Home: "Updates",
  MyGroups: "My Teams",
  Organizations: "Orgs",
  Forum: "Forum",
  Places: "Places",
  Monitoring: "Monitoring",
  Support: "Support",
  Rollup: "Rollup",
  Messages: "Message",
  MapDirection: "Map",
  Resources: "Resources",
  Tools: "Tools",
  Setup: "Configuration",
  Biometric: "Biometric",
} as const;
export const GROUP_DETAILS = {
  Activities: "Activities",
  Documents: "Documents",
  Articles: "Articles",
  Notes: "Notes",
  Issues: "Issues",
  HealthHistory: "Health History",
  Videos: "Videos",
  Rx: "Rx",
  Calanders: "Calanders",
  Photos: "Photos",
  Groups: "Groups",
  Discussion: "Discussion",
  OpenIssue: "Open Issue",
  ClosedIssue: "Closed Issue",
  Background: "Background",
  HealthOverview: "Health Overview",
  MyHealth: "My Health",
  FamilyHealth: "Family Health",
  ManualMonitoring: "Manual Entry",
  OrgHome: "Org Home",
  Comment: "Comment",
  TopicList: "TopicList",
} as const;

export const DRAWER_ICONS = {
  Home: "Home",
  Help: "Help",
  Terms: "Terms",
};

export const MESSAGE = {
  individualMessage: "Individual",
  groupMessage: "Group",
  messageDetail: "messageDetail",
  searchMessage: "searchMessage",
  userSelection: "userSelection",
} as const;

export const PROFILE = {
  Following: "Following",
  Messages: "Messages",
  Connections: "Connections",
  Settings: "Settings",
  EditProfile: "EditProfile",
  Invites: "Invites",
  Activity: "Activity",
  MemberListing: "Members",
} as const;

export const ROLLUP = {
  Upcoming: "Upcoming",
  Previous: "Previous",
};
export const Symboll = {
  CelSys: "&deg;C",
  fahSys: "&deg;F",
};

export const endPoint = {
  site: "/api/site?format=json",
  aboutSite:
    "/api/wiki?profile=main-profile&subject=Site+Benefits+Slideshow&format=json",
  Help: "/api/wiki?profile=main-profile&subject=Support&format=json",
  supportSite: "/api/wiki?profile=main-profile&subject=Support&format=json",
  monitoringHelp:
    "/api/wiki?profile=main-profile&subject=MonitoringHelp&format=json",
  registerUser: "/api/registration?format=json",
  deviceToken: "/api/deviceToken?format=json",
  terms: "/api/wiki?subject=EULA&profile=main-profile",
};

export const USER_PROFILE = {
  following: "Following",
  Activity: "Activity",
  Connection: "Connection",
  Invite: "Invite",
};
