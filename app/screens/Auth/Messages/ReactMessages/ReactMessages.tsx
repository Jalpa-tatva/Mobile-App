import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

// import external libraries
import { FlatList } from "react-native-gesture-handler";

// import custom styling & component
import { styles } from "./style";
import ShowImage from "@app/components/FastImage/ShowImage";

/**
 * ReactMessages Props
 */
const ReactMessages = (props) => {
  const renderItem = ({ item }) => {
    const updateUser = item?.name === props?.loginUser ? "You" : item?.name;
console.log("item",item);

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
        keyExtractor={(item) => item.id}
        data={props?.data}
        scrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ReactMessages;
