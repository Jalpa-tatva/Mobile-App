import {fontSize} from '@app/theme/fontSize';
import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const CustomSVG = props => {
  console.log('props', props);

  width = props?.width ?? fontSize(40);
  height = props?.height ?? fontSize(40);
  fill = props?.fill ?? '#000000';
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 512 843"
      preserveAspectRatio="xMidYMid meet">
      <G transform="translate(0,843) scale(0.1,-0.1)" fill={fill} stroke="none">
        <Path d="M2285 8339 c-454 -55 -903 -242 -1255 -525 -105 -84 -285 -263 -369 -367 -279 -345 -467 -786 -526 -1232 -19 -150 -20 -420 -1 -545 120 -781 689 -2186 1697 -4190 331 -658 715 -1390 730 -1390 16 0 493 916 848 1630 995 2000 1535 3384 1590 4075 10 127 -1 347 -24 491 -95 595 -411 1143 -878 1523 -207 168 -502 330 -752 414 -280 93 -426 117 -740 122 -132 2 -276 -1 -320 -6z m593 -533 c202 -37 379 -98 551 -187 542 -283 912 -808 997 -1416 22 -163 15 -454 -16 -607 -162 -810 -811 -1414 -1630 -1516 -46 -5 -149 -10 -228 -10 -933 0 -1727 693 -1856 1619 -20 140 -20 384 -1 520 58 410 244 782 536 1072 299 298 668 479 1099 539 97 13 450 4 548 -14z" />
      </G>
    </Svg>
  );
};

export default CustomSVG;
