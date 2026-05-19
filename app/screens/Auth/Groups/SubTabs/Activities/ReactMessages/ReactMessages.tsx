import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./style";
import ShowImage from "@app/components/FastImage/ShowImage";
import { FlatList } from "react-native-gesture-handler";
import moment from "moment";

const ReactMessages = (props: any) => {
  const convertToIST = (utcDateString: string) => {
    return moment(utcDateString)
      .utcOffset("+05:30")
      .format("ddd DD MMM YYYY, hh:mm A");
  };

  const renderItem = ({ item }: any) => {
    const updateUser = item?.name === props?.loginUser ? "You" : item?.name;
    return (
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() => (updateUser === "You" ? props?.reactMessage(item) : {})}
      >
        <View style={styles.userLeftView}>
          <ShowImage
            url={item?.profileImageUrl}
            imageStyle={styles.userImage}
          />
          <View style={styles.nameCal}>
            <Text style={styles.userName}>{updateUser}</Text>
            {updateUser === "You" && (
              <View>
                <Text style={styles.removeTxt}>{"Tap to remove"}</Text>
              </View>
            )}
            {item?.enteredTime && (
              <View>
                <Text
                  style={{
                    ...styles.removeTxt,
                    ...styles.dateBlack,
                  }}
                >{`${convertToIST(item?.enteredTime)} IST`}</Text>
              </View>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.emojiCal}>{item?.emoji?.emoji}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={props?.data}
        // contentContainerStyle={{flexGrow: 1}}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ReactMessages;
/*
  /* <RBSheet
  ref={props?.refRBSheetAlbum}
  openDuration={250}
  onOpen={props?.emojiUser}
  closeOnDragDown={true}
  customStyles={{
    container: commonStyle.mainSheetContainer,
  }}>
  <View style={styles.container}>
    <FlatList
      data={props?.data}
      contentContainerStyle={{flexGrow: 1}}
      renderItem={({item}) => {
        console.log('item 888', item);
        let emoji = emojiList[item?.emoji - 1]?.emoji;
        return (
          <View style={styles.userContainer}>
            <View style={styles.userLeftView}>
              <ShowImage
                url={item?.profileImage}
                imageStyle={styles.userImage}
              />
              <View style={styles.nameCal}>
                <Text style={styles.userName}>{item.name}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.emojiCal}>{emoji}</Text>
            </View>
          </View>
        );
      }}
    />
  </View>
</RBSheet>; */
