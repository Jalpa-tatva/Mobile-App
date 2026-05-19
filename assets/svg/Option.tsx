import { color } from "@app/theme"
import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
export const Option = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"
      style={{
        fill: "none",
        stroke: color.white,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
    />
    <Circle
      cx={336}
      cy={128}
      r={32}
      style={{
        fill: "none",
        stroke: color.white,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
    />
    <Circle
      cx={176}
      cy={256}
      r={32}
      style={{
        fill: "none",
        stroke:color.white,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
    />
    <Circle
      cx={336}
      cy={384}
      r={32}
      style={{
        fill: "none",
        stroke: color.white,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 32,
      }}
    />
  </Svg>
)
