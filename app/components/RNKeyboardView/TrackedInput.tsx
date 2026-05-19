import React, { useRef } from "react";
import { View, findNodeHandle } from "react-native";
import useSmartKeyboard from "./RNKeyboardView";

interface TrackedInputProps {
  field: string;
  children: React.ReactNode;
}

export const TrackedInput: React.FC<TrackedInputProps> = ({
  field,
  children,
}) => {
  const { registerPosition } = useSmartKeyboard();
  const viewRef = useRef(null);

  const onLayout = () => {
    const parentHandle = findNodeHandle(viewRef.current?.parent);
    if (!parentHandle) return;

    viewRef.current?.measureLayout(
      parentHandle,
      (x, y) => registerPosition(field, y),
      () => {}
    );
  };

  return (
    <View ref={viewRef} onLayout={onLayout}>
      {children}
    </View>
  );
};
