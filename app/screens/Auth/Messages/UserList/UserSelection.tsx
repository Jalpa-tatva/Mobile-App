import {
  View,
  FlatList,
  TextInput,
  RefreshControl,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";

// External libraries
import I18n from "i18n-js";
import { RouteProp, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Components, Services & Context
import { EmptyView, Header, Loader } from "@app/components";
import { GroupItem } from "../GroupItem";
import { MESSAGE } from "@app/constants";
import { getConnectionList } from "@app/services/api/profile";
import { useRedux } from "@app/redux/hooks";

// Theme & Utils
import { style } from "./style";
import { color, fontSize } from "@app/theme";
import { groupStyle } from "../GroupStyle";
import { content } from "@app/utils/string";
import useAppNavigation from "@app/navigation/navigation";

/*
  GroupsProps
*/
export interface GroupsProps {
  profileImageUrl?: string;
  lastMessage?: string;
  lastMessageDate?: string;
  title?: string;
  hideCount?: string;
  imageUrl?: string;
  description?: string;
  uniqueId?: string;
  email?: string;
}
interface UserSelectionRouteParam {
  type: string;
}

type UserSelectionRouteProp = RouteProp<
  { UserSelection: UserSelectionRouteParam },
  "UserSelection"
>;
/*
UserSelection Component
*/
const UserSelection = () => {
  const route = useRoute<UserSelectionRouteProp>();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [connectionList, setConnectionList] = useState([]);
  const [refreshing] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const navigation = useAppNavigation();
  const { groups } = content;
  const { login_detail } = useRedux([groups.loginDetail]);

  useEffect(() => {
    myActivitiesApiCall();
  }, []);

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
  const myActivitiesApiCall = () => {
    setConnectionList([]);
    setIsLoader(true);

    getConnectionList(1, "mine", "")
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              if (val.uniqueId !== login_detail?.userUniqueId) {
                cleanedArray.push(val);
              }
            });

            setConnectionList(cleanedArray);
          } else {
            setConnectionList([]);
          }
        } else {
          setConnectionList([]);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setConnectionList([]);
      });
  };

  const renderRaw = (item: GroupsProps) => {
    let upateImage = item?.imageUrl;
    return (
      <GroupItem
        imageUrl={upateImage}
        title={item?.title}
        description={item?.lastMessage}
        dateTime={item?.lastMessageDate}
        status={item?.description}
        onPress={() => {
          navigation.navigate(MESSAGE.messageDetail, {
            conversationid: item.uniqueId,
            imageUrl: upateImage,
            title: item.title,
            email: item?.email,
          });
        }}
      />
    );
  };

  const onRefresh = () => {
    setConnectionList([]);
    myActivitiesApiCall();
  };

  const handleSearch = (message) => {
    setSearchQuery(message);
  };

  const onSearchClear = () => {
    if (searchQuery != "") {
      setSearchQuery("");
      setSearchVisible(false);
    }
  };

  return (
    <View style={style.mainView}>
      {searchVisible ? (
        <View style={groupStyle.subSearchCal}>
          <View style={groupStyle.searchCal}>
            <Ionicons
              name={"arrow-back"}
              color={color.darkSearch}
              size={fontSize(28)}
              onPress={() => navigation.goBack()}
            />
            <TextInput
              value={searchQuery}
              onChangeText={(value) => handleSearch(value)}
              placeholder="Search"
              style={groupStyle.inputStyle}
            />
            <Ionicons
              name={searchQuery == "" ? "search-circle" : "close-circle"}
              color={color.darkSearch}
              size={fontSize(29)}
              onPress={onSearchClear}
            />
          </View>
        </View>
      ) : (
        <View style={style.headerTop}>
          <Header
            title={I18n.t(
              route.params.type == "Group"
                ? "TabTitle.SelectTeam"
                : "TabTitle.SelectUser"
            )}
            icon="chevron-left"
            onPressLeft={() => {
              navigation.goBack();
            }}
            // other={true}
            iconRightother="search-circle"
            onPressRightOther={
              () => setSearchVisible(true)
              // navigation.navigate(MESSAGE.searchMessage, {activeTab: screenTab})
            }
          />
        </View>
      )}
      <View style={style.body}>
        {isLoader ? <Loader /> : null}
        {!isLoader && connectionList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyConnectiont")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <FlatList
            data={connectionList}
            renderItem={({ item }) => renderRaw(item)}
            showsVerticalScrollIndicator={false}
            style={{ ...style.listing, ...style.spaceTop }}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.1}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default UserSelection;
