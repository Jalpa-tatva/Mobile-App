import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  BackHandler,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";

// import external libraries
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// import custom function
import { PROFILE } from "@app/constants";
import { HeaderItem } from "../HeaderItem";
import { assets } from "../../../../../assets/images";
import ShowImage from "@app/components/FastImage/ShowImage";
import { Tabs } from "./CustomHeader";
import {
  getConnectionList,
  getFollowingList,
  getInvitationList,
} from "@app/services/api/profile";
import { useRedux } from "@app/redux/hooks";

// import custom styling & utils
import { color, fontSize } from "@app/theme";
import { styles } from "./style";
import { content } from "@app/utils/string";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { PROFILE_SCREEN_MAP } from "@app/utils/NavigationConfigJson";
import { translate } from "@app/i18n";

const HEADER_HEIGHT = 250;

/**
 *  Header Components
 */
const Header = ({ navigation, userDetail }) => {
  const navigateToScreen = useCallback(() => {
    navigation.navigate(PROFILE.EditProfile);
  }, [navigation]);

  return (
    <View style={styles.customTabHeader}>
      <View style={styles.header}>
        <View style={styles.profileWrapper}>
          <ShowImage
            source={assets.profileBackground}
            imageStyle={styles.profileBackImg}
            resizeMode="cover"
          />
        </View>
        <View style={styles.imageWrapper}>
          <ShowImage
            url={userDetail?.imageUrl}
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
              size={fontSize(18)}
              color={color.palette.black}
            />
            <Text style={styles.designation}>{userDetail.location}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsSubContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {userDetail?.userFriends?.following ?? 0}
              </Text>
              <Text style={styles.statLabel}>
                {translate("common.following")}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {userDetail?.userFriends?.connection ?? 0}
              </Text>
              <Text style={styles.statLabel}>
                {translate("common.connection")}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {userDetail?.userFriends?.invites ?? 0}
              </Text>
              <Text style={styles.statLabel}>{translate("common.invite")}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={navigateToScreen}>
            <Text style={styles.buttonText}>
              {translate("AppDrawer.viewProfile")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

/**
 *  Profile Components
 */
const Profile: React.FC = () => {
  const [reload, setReload] = useState(false);
  const [userFriends, setUserFriends] = useState({
    following: 0,
    connection: 0,
    invites: 0,
  });
  const navigation = useNavigation<any>();
  const { groups } = content;
  const { drawer_status, login_detail, profile_detail, dynamic_tab } = useRedux(
    [
      groups.drawerStatus,
      groups.loginDetail,
      groups.profileDetail,
      groups.dynamicTab,
    ]
  );
  const profile_tabs =
    dynamic_tab?.profile_tab?.filter((tab) => tab.enable) || [];
  console.log("name of the login user", login_detail);

  const [tab, setTab] = useState(profile_tabs[0]?.name);
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });
  const userName = login_detail.user_name;
  const location = `${profile_detail?.city} ${profile_detail?.country}`;

  useEffect(() => {
    getUserData();
    followinglistApiCall();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBack
      );

      return () => {
        backHandler.remove();
      };
    }, [navigation])
  );

  const getUserData = async () => {
    setLoginDetail({
      email: login_detail?.email,
      password: login_detail?.password,
    });
  };

  useEffect(() => {
    followinglistApiCall();
  }, [reload]);

  const followingList = async () => {
    getFollowingList(1)
      .then(async (res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setUserFriends((prevStats) => ({
              ...prevStats,
              following: Number(res?.data[0]?.objectList?.length),
            }));
          } else {
            setUserFriends((prevStats) => ({
              ...prevStats,
              following: 0,
            }));
          }
        } else {
          setUserFriends((prevStats) => ({
            ...prevStats,
            following: 0,
          }));
        }
      })
      .catch(async (err) => {
        setUserFriends((prevStats) => ({
          ...prevStats,
          following: 0,
        }));
      });
  };

  const connectionList = async () => {
    getConnectionList(1, "mine", "")
      .then(async (res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              if (val.uniqueId !== login_detail?.userUniqueId) {
                cleanedArray.push(val);
              }
            });
            setUserFriends((prevStats) => ({
              ...prevStats,
              connection: Number(cleanedArray?.length),
            }));
          } else {
            setUserFriends((prevStats) => ({
              ...prevStats,
              connection: 0,
            }));
          }
        } else {
          setUserFriends((prevStats) => ({
            ...prevStats,
            connection: 0,
          }));
        }
      })
      .catch(async (err) => {
        setUserFriends((prevStats) => ({
          ...prevStats,
          connection: 0,
        }));
      });
  };

  const invitationList = async () => {
    getInvitationList(1)
      .then(async (res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setUserFriends((prevStats) => ({
              ...prevStats,
              invites: Number(res?.data[0]?.objectList?.length),
            }));
          } else {
            setUserFriends((prevStats) => ({
              ...prevStats,
              invites: 0,
            }));
          }
        } else {
          setUserFriends((prevStats) => ({
            ...prevStats,
            invites: 0,
          }));
        }
      })
      .catch(async (err) => {
        setUserFriends((prevStats) => ({
          ...prevStats,
          invites: 0,
        }));
      });
  };

  const followinglistApiCall = async () => {
    await followingList();
    await connectionList();
    await invitationList();
  };

  const handleBack = () => {
    navigation.goBack();
    return true;
  };

  const navigateBack = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={styles.fullFlex}
    >
      <View style={styles.fullFlex}>
        <View style={styles.headerVisibility}>
          <HeaderItem
            operation={
              drawer_status?.isDrawerOpen ? "circle-with-cross" : "menu"
            }
            title={userName}
            onPressLeft={navigateBack}
          />
        </View>
        <Tabs.Container
          initialTabName={profile_tabs[0]?.name}
          onTabChange={(newTab) => {
            setTab(newTab?.tabName);
          }}
          onIndexChange={(index) => console.log("index are rendering", index)}
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
          {profile_tabs?.map((item) => {
            const ScreenComponent = PROFILE_SCREEN_MAP[item.name];

            if (!ScreenComponent) return null;

            return (
              <Tabs.Tab key={item.name} name={item.name}>
                <Tabs.ScrollView>
                  <ScreenComponent reload={reload} setReload={setReload} />
                </Tabs.ScrollView>
              </Tabs.Tab>
            );
          })}
        </Tabs.Container>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Profile;
