import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { emojiList } from "@app/constants";
import { color, fontSize } from "@app/theme";
import { FontAwesome } from "@app/utils/icons/VectorIcons";

type emojiProps = {
  loginData: any;
  setVisible: any;
  items: any;
  emojies: any;
  reactMessage: any;
};
const ShowEmoji = (props: emojiProps) => {
  return (
    <View style={styles.modelWrapper}>
      <View style={styles.closeEmojis}>
        <FontAwesome
          name={`times-circle`}
          size={fontSize(16)}
          onPress={() => props?.setVisible(false)}
          color={color.palette.blackSecondary}
        />
      </View>
      <FlatList
        data={emojiList}
        style={styles.modelStyle}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.spaceBothPad}
              onPress={() => {
                console.log("item selected", item, props?.items?.activtyId);
                // saveEmojis(item);
                props?.reactMessage(
                  item?.id,
                  props?.items?.activtyId,
                  props?.items?.userId,
                  []
                );
                // props?.reactMessage(
                //   item,
                //   commentId,
                //   loginData?.userName,
                //   props?.originalImageUrl,
                //   props?.emoji,
                // );
              }}
            >
              <Text style={styles.emojiFont}>{item.emoji}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ShowEmoji;
