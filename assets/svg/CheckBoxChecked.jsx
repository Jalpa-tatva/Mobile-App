import { color } from "@app/theme";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const CheckBox = (props) => {
  return (
    <Svg
      width={props?.width ?? 25}
      height={props?.height ?? 25}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M18 3a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h12zm-1.53 4.97L10 14.44l-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l7-7a.75.75 0 00-1.06-1.06z"
        fill={props?.fill ?? color.secondary}
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
      />
    </Svg>
  );
};
