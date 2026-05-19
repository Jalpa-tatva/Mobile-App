import React from "react";
import { View } from "react-native";

import { FULL } from "./Style";

export const BlankScreen: React.FC = () => {
  return <View testID="BlankScreen" style={FULL}></View>;
};
