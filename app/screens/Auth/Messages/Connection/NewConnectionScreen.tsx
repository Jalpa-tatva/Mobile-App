import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Keyboard,
  TextInput,
} from "react-native";

// import external libraries
import { debounce } from "lodash";
import Entypo from "react-native-vector-icons/Entypo";
import I18n from "i18n-js";

// import custom function & component
import { Loader, EmptyView, Header, LoadMore } from "@components/index";
import { getConnectionList } from "@app/services/api/profile";
import { ConnectionItem } from "./ConnectionItem";
import { color, fontSize } from "@theme/index";
import { MESSAGE } from "@app/constants";
import useAppNavigation from "@app/navigation/navigation";
import { useRedux } from "@app/redux/hooks";

// import custom styling & utils
import { FULL, BODY, SearchWrapper, TextInputStyle, HEADERTOP } from "./Style";
import { content } from "@app/utils/string";

/**
 * NewConnectionScreen Props
 */
export interface ConnectionProps {
  id: string;
  uniqueId: string;
  title: string;
  category: string;
  imageUrl: string;
  location: string;
  isActiveMember: string;
  canRequestToJoin: string;
  isPendingMember: string;
  onPressAddFriend: Function;
  onPressRemoveFriend: Function;
  onPressCancelFriend: Function;
  onPress: Function;
}

// Declare variables
let SearchValue = "";
let listType = "mine";

/**
 * NewConnectionScreen component
 */
const NewConnectionScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const { groups } = content;
  const { login_detail } = useRedux([groups.loginDetail]);
  const [connectionList, setConnectionList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [isMoreLoader, setIsMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      myActivitiesApiCall();
    });

    return focus;
  }, []);

  const debouncedCall = useCallback(
    debounce(() => myActivitiesApiCall(), 1000),
    []
  );

  /**
   * Connection list api call
   */
  const myActivitiesApiCall = () => {
    setConnectionList([]);
    setIsLoader(true);

    getConnectionList(1, listType, SearchValue)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);

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

  const loadMoreData = (page: number) => {
    console.log("Page", page);
    setIsMoreLoader(true);
    setEndReach(false);
    getConnectionList(page, listType, SearchValue)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              if (val.uniqueId !== login_detail?.userUniqueId) {
                cleanedArray.push(val);
              }
            });

            setConnectionList(
              page === 1 ? cleanedArray : [...connectionList, ...cleanedArray]
            );

            setIsMoreLoader(false);
          } else {
            setIsMoreLoader(false);
            setEndReach(true);
          }
        } else {
          setIsMoreLoader(false);
          setEndReach(true);
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > connectionList.length) {
      const pageData = page + 1;
      setPage(pageData);
      setIsMoreLoader(true);
      setEndReach(false);
      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };

  const onRefresh = () => {
    setPage(1);
    listType = "mine";
    SearchValue = "";
    setSearchText("");
    setTotalRecords(0);
    setConnectionList([]);
    setEndReach(false);
    setIsMoreLoader(false);
    setEndReachedMomentum(false);
    myActivitiesApiCall();
  };

  const renderRaw = (item: ConnectionProps) => {
    return (
      <ConnectionItem
        title={item.title}
        image200Url={item.imageUrl}
        onPress={() => {
          navigation.navigate(MESSAGE.messageDetail, {
            conversationid: item.uniqueId,
            title: item.title,
          });
        }}
      />
    );
  };

  const onListFooterCompo = () => {
    if (isMoreLoader) {
      return <LoadMore animating={isMoreLoader} />;
    } else {
      return null;
    }
  };
  const onEndReach = () => {
    if (!endReach) {
      loadMorePage();
    }
  };
  return (
    <View testID="ConnectionScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={"My Connections"}
          icon="chevron-left"
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={BODY}>
        <View style={SearchWrapper}>
          <TextInput
            placeholder={I18n.t("Userprofile.searchname")}
            placeholderTextColor={color.white}
            returnKeyType="default"
            style={TextInputStyle}
            selectionColor={color.palette.white}
            onChangeText={(text) => {
              SearchValue = text;
              setSearchText(text);
              if (SearchValue.length > 0) {
                listType = "all";
              } else {
                listType = "mine";
              }
              SearchValue.length > 0 ? debouncedCall() : myActivitiesApiCall();
            }}
            value={searchText}
            autoCorrect={false}
            autoCapitalize="none"
          />

          {SearchValue != "" ? (
            <Entypo
              name={"circle-with-cross"}
              size={fontSize(20)}
              style={{ marginRight: 10 }}
              color={color.white}
              onPress={() => {
                let temp = "";
                SearchValue = temp;
                setSearchText("");
                listType = "mine";
                Keyboard.dismiss();
                myActivitiesApiCall();
              }}
            />
          ) : null}
        </View>

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
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.1}
            onEndReached={onEndReach}
            onMomentumScrollBegin={() => setEndReachedMomentum(false)}
            ListFooterComponent={onListFooterCompo}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

export default NewConnectionScreen;
