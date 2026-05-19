import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, BackHandler, Image } from "react-native";

// import external libraries
import { useRoute } from "@react-navigation/native";

// import custom function & component
import { Text } from "@components/index";
import { HeaderItem } from "./HeaderItem";
import { getUserDetail, PROFILE, USER_PROFILE } from "@app/constants";
import {
  getConnectionList,
  getFollowingList,
  getInvitationList,
} from "@app/services/api/profile";
import { ActivityScreen } from "./SubTabs/Activity/Activity";
import { Tabs } from "./Profile/CustomHeader";
import ShowImage from "@app/components/FastImage/ShowImage";
import { assets } from "../../../../assets/images";
import { useRedux } from "@app/redux/hooks";
import useAppNavigation from "@app/navigation/navigation";
import {
  FollowingScreen,
  ConnectionScreen,
  InvitationScreen,
} from "@app/screens/Auth/index";

// import custom styling & utils
import { FULL } from "./style";
import { color, fontSize } from "@app/theme";
import { styles } from "./Profile/style";
import { content } from "@app/utils/string";
import { FontAwesome } from "@app/utils/icons/VectorIcons";

const HEADER_HEIGHT = 250;

const Header = ({ navigation, userDetail }) => {
  const updateImg = userDetail?.imageUrl?.replace("0x0", "200x200");
  return (
    <View style={styles.customTabHeader}>
      <View style={styles.header}>
        <View style={styles.profileWrapper}>
          <Image
            source={assets.profileBackground}
            style={styles.profileBackImg}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageWrapper}>
          <ShowImage
            url={updateImg}
            imageStyle={styles.userImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.userDetail}>
          <Text style={styles.name}>{userDetail.userName}</Text>
          <Text style={styles.designation}>{userDetail.email}</Text>
          <View
            style={{
              ...styles.locationContainer,
              ...styles.spaceMapStart,
            }}
          >
            <FontAwesome
              name="map-marker"
              size={fontSize(22)}
              color={color.palette.blackSecondary}
            />
            <Text style={styles.designation}>{userDetail.location}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsSubContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {userDetail?.userFriends?.following}
              </Text>
              <Text style={styles.statLabel}>following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {userDetail?.userFriends?.followers}
              </Text>
              <Text style={styles.statLabel}>Connection</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {userDetail?.userFriends?.invites}
              </Text>
              <Text style={styles.statLabel}>Invite</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(PROFILE.EditProfile)}
          >
            <Text style={styles.buttonText}>Edit profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

type RouteParams = {
  params?: {
    initalScreen?: string;
  };
};

export const UserProfileScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const { groups } = content;
  const { login_detail, profile_detail } = useRedux([
    groups.loginDetail,
    groups.profileDetail,
  ]);
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });

  const userName = login_detail?.userName;
  const location = `${profile_detail?.city}, ${profile_detail?.country}`;
  const [userFriends, setUserFriend] = useState({
    following: 0,
    followers: 0,
    invites: 0,
  });
  const [reload, setReload] = useState(false);
  const route: RouteParams = useRoute();

  useEffect(() => {
    getUserData();
    const focus = navigation.addListener("focus", () => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    });

    return focus;
  }, []);

  useEffect(() => {
    followinglistApiCall();
  }, []);

  const getUserData = async () => {
    // const loginData: any = await getUserDetail();
    setLoginDetail({
      email: login_detail?.email,
      password: login_detail?.password,
    });
  };
  const followinglistApiCall = () => {
    getFollowingList(1)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setUserFriend((prevStats) => ({
              ...prevStats,
              following: Number(res?.data[0]?.objectList?.length),
            }));
          } else {
            setUserFriend((prevStats) => ({
              ...prevStats,
              following: 0,
            }));
          }
        } else {
          setUserFriend((prevStats) => ({
            ...prevStats,
            following: 0,
          }));
        }
      })
      .catch((err) => {
        setUserFriend((prevStats) => ({
          ...prevStats,
          following: 0,
        }));
      });

    getConnectionList(1, "mine", "")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              if (val.uniqueId !== login_detail?.userUniqueId) {
                cleanedArray.push(val);
              }
            });
            setUserFriend((prevStats) => ({
              ...prevStats,
              followers: Number(cleanedArray?.length),
            }));
          } else {
            setUserFriend((prevStats) => ({
              ...prevStats,
              followers: 0,
            }));
          }
        } else {
          setUserFriend((prevStats) => ({
            ...prevStats,
            followers: 0,
          }));
        }
      })
      .catch((err) => {
        setUserFriend((prevStats) => ({
          ...prevStats,
          followers: 0,
        }));
      });

    getInvitationList(1)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            console.log(
              "res.data[0].objectList.length",
              res.data[0].status.total,
              res.data[0].objectList.length
            );

            setUserFriend((prevStats) => ({
              ...prevStats,
              invites: Number(res?.data[0]?.objectList?.length),
            }));
          } else {
            setUserFriend((prevStats) => ({
              ...prevStats,
              invites: 0,
            }));
          }
        } else {
          setUserFriend((prevStats) => ({
            ...prevStats,
            invites: 0,
          }));
        }
      })
      .catch((err) => {
        setUserFriend((prevStats) => ({
          ...prevStats,
          invites: 0,
        }));
      });
  };

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  return (
    <View testID="UserProfileScreen" style={FULL}>
      <View style={styles.headerVisibility}>
        <HeaderItem
          operation="back"
          onPressLeft={() => {
            navigation.goBack();
          }}
          title={userName}
        />
      </View>

      <Tabs.Container
        initialTabName={
          route?.params?.initalScreen
            ? route?.params?.initalScreen
            : USER_PROFILE.Activity
        }
        renderHeader={() => (
          <Header
            navigation={navigation}
            userDetail={{
              userName: userName,
              email: loginDetail?.email,
              location: location,
              userFriends: userFriends,
              imageUrl: login_detail?.userImageUrl,
            }}
          />
        )}
        headerHeight={HEADER_HEIGHT}
      >
        <Tabs.Tab name={USER_PROFILE.Activity}>
          <Tabs.ScrollView>
            <ActivityScreen reload={reload} setReload={setReload} />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name={USER_PROFILE.following}>
          <Tabs.ScrollView>
            <FollowingScreen />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name={USER_PROFILE.Connection}>
          <Tabs.ScrollView>
            <ConnectionScreen />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name={USER_PROFILE.Invite}>
          <Tabs.ScrollView>
            <InvitationScreen />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
};
