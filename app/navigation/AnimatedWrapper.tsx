import { color } from "@app/theme";
import { useDrawerProgress } from "@react-navigation/drawer";
import { ReactNode, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface AnimatedWrapperProps {
  children: ReactNode;
}

export function AnimatedWrapper({ children }: AnimatedWrapperProps) {
  const isDrawerProgress = useDrawerProgress();

  const entryProgress = useSharedValue(0);

  // Trigger entry animation on mount
  useEffect(() => {
    entryProgress.value = withTiming(1, { duration: 500 });
  }, []);
  const destScale = 0.85;
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      isDrawerProgress.value,
      [0, 1],
      [1, destScale],
      "clamp"
    );
    // const translate = withSpring(-80);
    const translateX = interpolate(
      isDrawerProgress.value,
      [0, 1],
      [0, -22],
      "clamp"
    );
    const borderRadius = interpolate(
      isDrawerProgress.value,
      [0, 1],
      [1, 10],
      "clamp"
    );
    const borderWidth = interpolate(
      isDrawerProgress.value,
      [0, 1],
      [0, 2],
      "clamp"
    );

    return {
      transform: [
        // {perspective: 1000},
        { scale },
        { translateX: translateX },
        // {rotateY: `${interpolatedRotation}deg`},
      ],
      borderRadius,
      borderWidth,
    };
    ``;
  });
  return (
    <Animated.View style={[styles.animatedViewStyle, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedViewStyle: {
    flex: 1,
    borderColor: color.palette.lightGrey,
    overflow: "hidden",
  },
});
