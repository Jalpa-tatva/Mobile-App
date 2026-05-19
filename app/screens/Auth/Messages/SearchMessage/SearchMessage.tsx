import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState } from "react";

// import external libraries
import Ionicons from "react-native-vector-icons/Ionicons";

// import custom styling & component
import { GroupMessageList, IndividualUserMessageList } from "../messagesData";
import { GroupItem } from "../GroupItem";
import { style } from "./Style";
import { color, fontSize } from "@app/theme";
import { MESSAGE } from "@app/constants";
import useAppNavigation from "@app/navigation/navigation";

export interface GroupsProps {
  profileImageUrl?: string;
  lastMessage?: string;
  lastMessageDate?: string;
  title?: string;
  message?: string;
  profile?: string;
  enteredDate?: string;
  email?: string;
  id?: string;
}
const SearchMessage = (props) => {
  const activeTab = props?.route?.params?.activeTab;
  const [data] = useState(
    activeTab === "Group" ? GroupMessageList : IndividualUserMessageList
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState(null);
  const [filteredData, setFilteredData] = useState(
    activeTab === "Group" ? GroupMessageList : IndividualUserMessageList
  );
  const navigation = useAppNavigation();

  const renderRaw = (item: GroupsProps) => {
    return (
      <GroupItem
        imageUrl={item?.profileImageUrl}
        title={activeTab === "Group" ? item?.title : item.profile}
        description={item?.message}
        dateTime={item?.enteredDate}
        onPress={() => {
          navigation.navigate(MESSAGE.messageDetail, {
            conversationid: item.profile,
            title: item.title,
            email: item?.email,
          });
        }}
      />
    );
  };

  const handleSearch = (message) => {
    if (message) {
      setSearchMessage(message);
      setSearchQuery(message);
      const newData = data.filter(
        (item) =>
          item?.message?.toLowerCase()?.includes(message?.toLowerCase()) ||
          item?.title?.toLowerCase()?.includes(message?.toLowerCase()) ||
          item?.profile?.toLowerCase()?.includes(message?.toLowerCase())
      );

      setFilteredData(newData);
    } else {
      setSearchMessage("");
      setSearchQuery("");
      setFilteredData(data);
    }
  };

  const onSearchClear = () => {
    if (searchMessage != "" && searchQuery != "") {
      setSearchQuery("");
      setSearchMessage("");
      setFilteredData(data);
    }
  };

  return (
    <View style={style.mainView}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={style.body}>
          <View style={style.subSearchCal}>
            <View style={style.searchCal}>
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
                style={style.inputStyle}
              />
              <Ionicons
                name={searchQuery == "" ? "search-circle" : "close-circle"}
                color={color.darkSearch}
                size={fontSize(29)}
                onPress={onSearchClear}
              />
            </View>
          </View>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => renderRaw(item)}
            showsVerticalScrollIndicator={false}
            style={style.listing}
            keyExtractor={(item: { id: any }) => item.id}
            onEndReachedThreshold={0.1}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SearchMessage;
