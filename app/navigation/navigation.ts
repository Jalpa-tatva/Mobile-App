import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  RootStack: undefined;
  Login: undefined;
  AddGroupScreen: undefined;
  OrgDetailScreen: {
    uniqueId: string;
    canEditInfo: string;
    privacyType: string;
    title: string;
    item: any;
    imageUrl: string;
    isActiveMember: any;
    fromss: string;
    setReload?: any;
  };
  Rollup: {
    screen: string;
    params?: any;
  };
  YoutubeVideoScreen: {
    link: string;
    title: string;
  };
  ViewVideoScreen: {
    link: string;
    title: string;
  };
  Comment: { id: string };
  SubDocuments: { id: string; title: string };
  RollUpDetailsScreen: {
    eventId: string;
    item: object;
    From: string;
    screen?: string;
  };

  VaccineScreen: {
    enable: boolean;
    profile: string;
  };
  PreviewReportScreen: {
    profile: string;
    previewData: any;
  };
  notes: {
    uniqueId?: string;
    canEditInfo?: boolean;
    item?: any;
  };
  progressnotes: {
    profile?: string;
  };
  GroupDetailsScreen: {
    imageUrl: string;
    title: string;
    uniqueId: string;
    canEditInfo: any;
    fromss: string;
    issueTabs: string;
    screen: string;
  };
  messageDetail: {
    imageUrl?: string;
    email?: string;
    conversationid?: string;
    title?: string;
    message_id?: string;
    emoji_id?: string;
    profileDetail?: {
      country?: string;
      title?: string;
      email?: string;
      description?: string;
      mobile_no?: string;
    };
  };
  IssueDetailScreen: {
    item?: any;
    uniqueId?: string;
    imageUrls?: string;
    titles?: string;
    canEditInfo?: string;
    type?: string;
  };
  Settings: any;
  Tools: any;
  Drawer_Navigation: {
    screen: any;
  };
};

export type RootDrawerParamList = {};

type StackProp = StackNavigationProp<RootStackParamList>;
type DrawerNav = DrawerNavigationProp<RootDrawerParamList>;
type NavigationProp = CompositeNavigationProp<DrawerNav, StackProp>;

const useAppNavigation = () => {
  return useNavigation<NavigationProp>();
};

export default useAppNavigation;
