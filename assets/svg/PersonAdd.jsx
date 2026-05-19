import { color } from "@app/theme";
import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={props?.width ?? 20}
      height={props.height ?? 20}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fill={color.white}
      {...props}
    >
      <Path d="M106 304L106 250 160 250 160 214 106 214 106 160 70 160 70 214 16 214 16 250 70 250 70 304 106 304z" />
      <Circle cx={288} cy={144} r={112} />
      <Path d="M288 288c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128z" />
    </Svg>
  );
}

export default SvgComponent;
