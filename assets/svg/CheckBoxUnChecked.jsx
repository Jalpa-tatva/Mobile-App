import { color } from "@app/theme";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const CheckBoxUnCheck = (props) => {
  return (
    <Svg
      width={props?.width ?? 25}
      height={props?.height ?? 25}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.75 3h12.5A2.75 2.75 0 0121 5.75v12.5A2.75 2.75 0 0118.25 21H5.75A2.75 2.75 0 013 18.25V5.75A2.75 2.75 0 015.75 3zm0 1.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25H5.75z"
        fill={props?.fill ?? color.secondary}
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
      />
    </Svg>
  );
};
