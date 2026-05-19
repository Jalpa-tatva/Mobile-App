import React, { memo, useCallback } from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import { color, fontSize } from "@theme/index";
import { bleDevices } from "../../../../../../assets/images/index";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
  RawContainerMainItem,
  RawContainer,
  ImageWrapper,
  TextContainer,
  Title,
  TitleLocation,
  TitleUpdate,
  BottomContainer,
  DetailContainer,
  SubDetails,
  TitleLocationOther,
  bottomWrapper,
  addWidth,
  TimeCount,
  TimeLabel,
  TimeFixPos,
  detailIcon,
  blackTxt,
  addWidthBlood,
} from "./Style";
import I18n from "i18n-js";

export interface MonitoringProps {
  id: string;
  deviceName: string;
  userName: string;
  StartText: string;
  data: [];
  onPress: () => void;
}

export const MonitoringItem = memo((props: MonitoringProps) => {
  const getData = (data) => {
    const keyName = (key) => {
      if (key == "weightInKg") {
        return "Weight(Kg)";
      } else if (key == "weightLb") return "Weight(Lb)";
      else if (key == "heightInFeet") {
        return "Height(Feet)";
      } else if (key == "heightInInches") {
        return "Height(Inch)";
      } else if (key == "systolicBp") {
        return `${I18n.t("monitoring.SystolicBp")}`;
      } else if (key == "diastolicBp") {
        return `${I18n.t("monitoring.DiastolicBp")}`;
      } else if (key == "spo") {
        return `${I18n.t("monitoring.Spo2")}`;
      } else if (key == "bpm") {
        return `${I18n.t("monitoring.BPM")}`;
      } else if (key == "sugarLevel") {
        return "Sugar Level";
      } else if (key == "celsius") {
        return "Celsius";
      } else if (key == "fahrenheit") {
        return "Fahrenheit";
      } else if (key == "gender") {
        return "Gender";
      } else if (key == "age") {
        return "Age";
      } else {
        return key.toString();
      }
    };

    const valueName = (key, val) => {
      console.log("val is getting", key, val);
      if (key == "systolicBp" || key == "diastolicBp") {
        return `${val} ${I18n.t("monitoring.mmHg")}`;
      } else if (key == "sugarLevel") {
        return `${val} ${I18n.t("monitoring.mgdL")}`;
      } else if (key == "fahrenheit") {
        return `${Number(val).toFixed(2)}°F`;
      } else if (key == "celsius") {
        return `${Number(val).toFixed(2)}°C`;
      } else if (key == "spo") {
        return `${Number(val)}%`;
      } else if (key == "bpm") {
        return `${val} ${I18n.t("monitoring.beatsPerMinute")}`;
      } else {
        return `${val}`;
      }
    };

    return (
      <View style={DetailContainer}>
        <FlatList
          data={data}
          numColumns={3}
          renderItem={({ item }) => {
            const gender =
              item.gender == 0
                ? I18n.t("monitoring.Female")
                : I18n.t("monitoring.Male");

            const key = Object?.keys(item)[0];
            const val = item?.gender ? gender : Object?.values(item)[0];

            return (
              <View style={bottomWrapper}>
                <Text
                  style={
                    key == "sugarLevel"
                      ? { ...SubDetails, ...addWidthBlood }
                      : { ...SubDetails, ...addWidth }
                  }
                  numberOfLines={1}
                >
                  {keyName(key)}
                </Text>
                <Text
                  style={
                    key == "bpm" || key == "spo"
                      ? {
                          ...TitleLocation,
                          ...TitleLocationOther,
                          ...addWidthBlood,
                        }
                      : {
                          ...TitleLocation,
                          ...TitleLocationOther,
                          ...addWidth,
                        }
                  }
                >
                  {valueName(key, val)}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  const getIcon = useCallback(() => {
    if (props.deviceName === "Spo2") {
      return bleDevices.spoMachine;
    }
    if (props.deviceName === "Bp") {
      return bleDevices.bpMachine;
    }
    if (props.deviceName === "EarTemperature") {
      return bleDevices.tempMachine;
    }
    if (props.deviceName === "WeightScale") {
      return bleDevices.wsMachine;
    }
    if (props.deviceName === "BloodSugar") {
      return bleDevices.bgMachine;
    }
  }, [props.deviceName]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={RawContainerMainItem}
    >
      <View style={RawContainer}>
        <Image source={getIcon()} style={ImageWrapper} />
        <View style={TextContainer}>
          <Text style={Title}>{props.deviceName}</Text>

          <Text style={TitleUpdate}>
            {I18n.t("monitoring.LastUpdateBy")}{" "}
            <Text style={blackTxt}>{props.userName}</Text>
          </Text>
        </View>

        <View style={detailIcon}>
          <MaterialIcons
            name="keyboard-arrow-right"
            color={color.secondaryLight}
            size={fontSize(28)}
          />
        </View>
      </View>
      <View style={BottomContainer}>{getData(props.data)}</View>
      <View
        style={
          props.data.length > 5 ? TimeCount : { ...TimeCount, ...TimeFixPos }
        }
      >
        <Text style={TimeLabel}>{props.StartText}</Text>
      </View>
    </TouchableOpacity>
  );
});
