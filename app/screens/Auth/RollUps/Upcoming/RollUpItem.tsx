import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

// import custom styling utils
import { styles } from "./styles";
import moment from "moment";
import { color, fontSize } from "@app/theme";
import Animated from "react-native-reanimated";
import { translate } from "@app/i18n";
import FontAwesome from "react-native-vector-icons/FontAwesome";

/**
 *  Rollup Props
 */
type RollupsProps = Readonly<{
  profile: string | boolean;
  title: string | boolean;
  startDateNew: string;
  endDateNew: string;
  startDateHead: string;
  startDate: string;
  endDate: any;
  address: string | boolean;
  onPress: () => void;
}>;

/**
 * RollUpItem component
 */

export function RollUpItem(props: RollupsProps) {
  const startDate = moment(props?.startDate, "MM/DD/YYYY").format(
    "DD, MMM YYYY"
  );
  const endDate = moment(props?.endDate, "MM/DD/YYYY").format("DD, MMM YYYY");
  let parts = props.startDateHead.split("/");

  const getTime = (date) => {
    const timeMatch = date?.split(",");
    const time = timeMatch ? timeMatch[2] : "";
    return time;
  };
  /*
  // const r1Style = useListingAnimationStyle({
  //   viewableItems: props?.viewableItems,
  //   id: props.id,
  // });
  */
  return (
    // <Animated.View style={[styles.RawContainerMain1, r1Style]}>
    <Animated.View style={[styles.RawContainerMain1]}>
      <TouchableOpacity
        // style={styles.RawContainerMain1}
        onPress={props.onPress}
      >
        {/* date information view */}
        <View style={styles.container}>
          <View style={styles.mainView}>
            <View
              style={{ ...styles.WeekDayContainer, ...styles.wrapperTopBorder }}
            >
              <Text numberOfLines={3} style={styles.MonthTitle}>
                {parts[3].substring(0, 3)}
              </Text>
            </View>
            <View style={styles.dateMonthCal}>
              <Text style={styles.DateTitle}>{`${parts[1]}, ${parts[0]}`}</Text>
            </View>
            <View
              style={{
                ...styles.WeekDayContainer,
                ...styles.wrapperBottomBorder,
              }}
            >
              <Text style={styles.MonthTitle}>{parts[2]}</Text>
            </View>
          </View>
          <View style={styles.midView}>
            {props.title && (
              <Text numberOfLines={2} style={styles.eventTitle}>
                {props.title}
              </Text>
            )}
            {props.profile && (
              <Text
                numberOfLines={2}
                style={styles.authorLbl}
              >{`By ${props.profile}`}</Text>
            )}
            {props?.address && (
              <View style={styles.timeWrapper}>
                <View style={styles.location}>
                  <FontAwesome
                    name="map-marker"
                    size={fontSize(15)}
                    color={color.palette.blackSecondary}
                  />
                </View>
                <Text
                  numberOfLines={2}
                  style={{
                    ...styles.authorLbl,
                    ...styles.addGreyLbl,
                  }}
                >
                  {props?.address}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.dateWrapper}>
          {getTime(props?.startDateNew) != "" && (
            <Text style={styles.abbreviation} numberOfLines={1}>
              {translate("groupDetails.Start")}
              <Text
                numberOfLines={1}
                style={styles.dateVal}
              >{`${startDate} ${getTime(props?.startDateNew)}`}</Text>
            </Text>
          )}

          {props?.endDate && (
            <Text
              style={{ ...styles.abbreviation, ...styles.alignRightContent }}
              numberOfLines={1}
            >
              {translate("groupDetails.End")}
              <Text
                numberOfLines={1}
                style={{ ...styles.dateVal }}
              >{`${endDate} ${getTime(props?.endDateNew)}`}</Text>
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
    // <TouchableOpacity onPress={props.onPress} style={styles.RawContainerMain1}>
    //   <View style={styles.ApprovalWrapper}>
    //     <Text style={styles.TitleApproval}> {parts[4]}</Text>
    //   </View>

    //   <View style={styles.RawContainer}>
    //     <View style={styles.CalContainer}>
    //       <View style={styles.DateContainer}>
    //         <Text numberOfLines={3} style={styles.MonthTitle}>
    //           {parts[2]}
    //         </Text>
    //       </View>
    //       <Text style={styles.DateTitle}>
    //         {parts[0]}.{parts[1]}
    //       </Text>
    //       <View style={styles.WeekDayContainer}>
    //         <Text style={styles.MonthTitle}>{parts[3].substring(0, 3)}</Text>
    //       </View>
    //     </View>

    //     <View style={styles.TextContainer}>
    //       <View style={commonStyle.flexStyle}>
    //         <Text numberOfLines={3} style={styles.Title}>
    //           {props.title}
    //         </Text>
    //       </View>
    //       <Text style={styles.TitleLocation}>By {props.profile}</Text>

    //       <View style={styles.BottomlWrapper}>
    //         <View style={styles.BottomlWrapperMain}>
    //           <View>
    //             <Text style={styles.Title}>Start</Text>
    //           </View>
    //           <Text style={styles.TitleLocation}>{props.startDate}</Text>
    //         </View>

    //         <View style={styles.BottomlWrapperMain2}>
    //           <View>
    //             <Text style={styles.Title}>End</Text>
    //           </View>
    //           <Text style={styles.TitleLocation}>{props.endDate}</Text>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // </TouchableOpacity>
  );
}
