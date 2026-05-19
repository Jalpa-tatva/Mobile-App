import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { color, fontSize } from "@app/theme";

type Props = {
  active: SharedValue<boolean>;
};

const Overlay = ({ active }: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      display: active.value ? "flex" : "none",
    };
  });
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable
        style={styles.container}
        onPress={() => {
          active.value = false;
        }}
      />
    </Animated.View>
  );
};

export default Overlay;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    bottom: fontSize(60),
    top: fontSize(-40),
    flex: 1,
    borderWidth: fontSize(0.8),
    borderColor: color.palette.lightGrey,
    borderRadius: fontSize(10),
  },
});
