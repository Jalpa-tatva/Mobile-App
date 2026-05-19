import React, { useState, useEffect, useCallback } from "react";
import {
  TouchableOpacity,
  BackHandler,
  Dimensions,
  Keyboard,
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";

// import external libraries
import { LineChart } from "react-native-chart-kit";
import { Dialog } from "react-native-simple-dialogs";
import Entypo from "react-native-vector-icons/Entypo";
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";
import momentZone from "moment-timezone";
import moment from "moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { assets } from "../../../../../../../assets/images";
// import custom function & components
import {
  EmptyView,
  Loader,
  Header,
  Input,
  InputHealth,
} from "@components/index";
import { color, fontSize } from "@app/theme";
import {
  getUserFitnessHistoryData,
  getUserFitnessHistoryDataPage,
} from "@app/services/api/groups";
import { MonitoringItem } from "./MonitoringItem";
import { RNCalendarPicker } from "@app/components/CalendarPicker/RNCalendarPicker";
import Icon from "react-native-vector-icons/AntDesign";
// import custom styling & utils
import commonStyle from "@app/theme/commonStyle";
import {
  FULL,
  HEADERTOP,
  BODY,
  DialogViewWraper,
  childView,
  mainView,
  styles,
} from "./Style";
import { translate } from "@app/i18n";

var pageNo;
var p = 1;

/**
 * MonitoringChartScreen
 */
export const MonitoringChartScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const deviceName = route?.params?.deviceName;
  const userName = route?.params?.userName;
  const profile = route?.params?.profile;
  const userId = route?.params?.userId;
  const [isLoader, setIsLoader] = useState(false);
  const [dataSpo, setDataSpo] = useState([]);
  const [dataBpm, setDataBpm] = useState([]);
  const [lablesource, setLablesource] = useState([]);
  const [legendsource, setLegendsource] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [diaValue, setDiaValue] = useState(0);
  const [diaValueType, setDiaValueType] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [sDate, setSDate] = useState("");
  let time = [];
  let data1 = [];
  let data2 = [];

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      p = 1;
      Keyboard.dismiss();
      hideDatePicker();

      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return focus;
  }, []);

  const backAction = () => {
    navigation.goBack(null);
    return true;
  };

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      Keyboard.dismiss();
      // pageNo = 1;
      time = [];
      data1 = [];
      data2 = [];

      getUserFitnessDataApiCallPage(sDate, "reset", "reset");
    });

    return focus;
  }, [sDate, pageNo]);

  const getUserFitnessDataApiCallPage = async (date, type, userFitnessType) => {
    setDataSpo([]);
    setDataBpm([]);
    setLablesource([]);
    setLegendsource([]);

    setIsLoader(true);
    await getUserFitnessHistoryDataPage(
      profile,
      deviceName,
      userId,
      // pageNo,
      date ?? "",
      date ? date : "",
      "asc"
    )
      .then((res) => {
        if (res?.data && res?.data?.length > 0) {
          if (
            res?.data[0]?.objectList &&
            res?.data[0]?.objectList?.length > 0
          ) {
            // let val = res.data[0].status.total / 4;
            // pageNo = Math.ceil(val);
            pageNo = 1;
            setTotalPage(pageNo);
            getUserFitnessDataApiCall(date, userFitnessType);
          } else {
            // pageNo = 0;
            setIsLoader(false);
            setDataSpo([]);
            setDataBpm([]);
            setLablesource([]);
            setLegendsource([]);
            setSDate("");
          }
        } else {
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setDataSpo([]);
        setDataBpm([]);
        setLablesource([]);
        setLegendsource([]);
        setSDate("");
      });
  };

  //10 1
  const getUserFitnessDataApiCall = async (date, type) => {
    resetChartStates();
    setIsLoader(true);

    try {
      const fromDate = date && type !== "reset" ? date : "";
      const res = await getUserFitnessHistoryData(
        profile,
        deviceName,
        userId,
        p,
        fromDate,
        fromDate,
        "asc"
      );

      const isPagination = pageNo > 1;
      const list = res?.data?.[0]?.objectList ?? [];

      if (!res?.data?.length || !list.length) return handleNoData(isPagination);

      setTotalRecords(res.data[0].status?.total);

      processFitnessList(list);
      applyLegendByDevice();

      setIsLoader(false);
    } catch {
      handleError();
    }
  };

  const resetChartStates = () => {
    setDataSpo([]);
    setDataBpm([]);
    setLablesource([]);
    setLegendsource([]);
  };

  const handleNoData = (isPagination: boolean) => {
    setIsLoader(false);

    if (isPagination) {
      pageNo -= 1;
      p += 1;
      getUserFitnessDataApiCall(sDate, "reset");

      Snackbar.show({
        text: "No more data available...",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.red,
        textColor: color.white,
        numberOfLines: 5,
      });
      return;
    }

    resetChartStates();
    setSDate("");
  };

  const sanitizeData = (str: string) =>
    str
      .replace(/[\[\]'(){}"]/g, "")
      .replace(/\s+/g, "")
      .replace(/[a-z]/gi, "")
      .replace(/:\s*/g, "");

  const convertToNumberArray = (csv: string): number[] =>
    csv.split(",").map((val) => Number(parseFloat(val).toFixed(2)));

  const pushDatasetByDevice = (arr: number[]) => {
    if (deviceName === "BloodSugar") data1.push(arr[0]);
    if (deviceName === "WeightScale") {
      data1.push(arr[1]);
      data2.push(arr[3]);
    }
    if (["Spo2", "Bp", "EarTemperature"].includes(deviceName)) {
      data1.push(arr[0]);
      data2.push(arr[1]);
    }
  };

  const processFitnessList = (list: any[]) => {
    list.forEach((val) => {
      const timeCut = momentZone(Number(val.reportTime))
        .tz("America/New_York")
        .format("DD-MM-YYYY HH:mm");

      const myArray = convertToNumberArray(sanitizeData(val.data));

      time.push(timeCut);
      pushDatasetByDevice(myArray);
    });
  };

  const applyLegendByDevice = () => {
    const legendMap = {
      Spo2: ["SpO2", "BPM"],
      Bp: ["Sys.Bp", "Dia.Bp"],
      EarTemperature: ["Celsius", "Fahrenheit"],
      WeightScale: ["WeightInKg", "WeightLb"],
      BloodSugar: ["Blood Sugar"],
    };

    setLegendsource(legendMap[deviceName] ?? []);
    setDataSpo(data1);
    if (data2.length) setDataBpm(data2);
    setLablesource(time);
  };

  const handleError = () => {
    setIsLoader(false);
    resetChartStates();
    setSDate("");
  };

  const showDatePicker = (date) => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = useCallback(
    (date) => {
      p = 1;
      let dates = moment(date).format("YYYY-MM-DD");
      setSDate(dates);

      getUserFitnessDataApiCallPage(dates, "reset", "");

      Keyboard.dismiss();
      hideDatePicker();
    },
    [isDatePickerVisible]
  );

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const clearState = () => {
    p = 1;
    setRefreshing(false);

    setIsLoader(true);
    setDataSpo([]);
    setDataBpm([]);
    setLablesource([]);
    setLegendsource([]);
    setSDate("");
    // setRefreshing(true);
    getUserFitnessDataApiCallPage("", "reset", "reset");
    // setTimeout(async () => {
    //   getUserFitnessDataApiCall('', 'reset');
    // }, 1000);
  };

  const LineChart_Dynamic = () => {
    if (dataSpo.length > 0) {
      return (
        <ScrollView
          style={styles.contentSelf}
          contentContainerStyle={styles.crossAlign}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={clearState} />
          }
        >
          <View style={mainView}>
            <View style={childView}>
              <TouchableOpacity
                onPress={showDatePicker}
                style={styles.dateWrapper}
              >
                <Input
                  value={sDate}
                  placeholderTextColor={color.grayOne}
                  style={styles.selectDate}
                  leftIcon={assets.calendar}
                  onFocus={showDatePicker}
                  onChangeText={() => {}}
                  returnKeyType="next"
                  editable={false}
                  blurOnSubmit={false}
                  leftIconTintColor={color.grayOne}
                  placeholder={translate("common.datePlaceholder")}
                />
              </TouchableOpacity>

              {sDate ? (
                <View style={styles.crossAlignWrapper}>
                  <Entypo
                    name="cross"
                    color={color.white}
                    size={fontSize(28)}
                    onPress={() => {
                      p = 1;
                      setSDate("");
                      setSDate("");
                      setIsLoader(false);
                      setDataSpo([]);
                      setDataBpm([]);
                      setLablesource([]);
                      setLegendsource([]);
                      getUserFitnessDataApiCallPage("", "reset", "reset");
                    }}
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.legendContainer}>
              {legendsource.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendDot,
                      {
                        backgroundColor:
                          index === 0
                            ? color.chartColorOne
                            : color.chartColorSecond,
                      },
                    ]}
                  />
                  <Text style={styles.legendText}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.chartWraper}>
              {deviceName === "BloodSugar" ? (
                <LineChart
                  data={{
                    labels: lablesource.map((item) => {
                      return item;
                    }),
                    datasets: [
                      {
                        data: dataSpo.map((item) => {
                          return item;
                        }),
                        color: (opacity = 1) => color.chartColorOne,
                        strokeWidth: 2,
                      },
                    ],
                    // legend: legendsource.map((item) => {
                    //   return item;
                    // }),
                  }}
                  verticalLabelRotation={12}
                  onDataPointClick={(data) => {
                    diaLogValue(data);
                  }}
                  width={Dimensions.get("window").width * 0.96} // from react-native
                  height={350}
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    verticalLabelsHeightPercentage: 100,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (_opacity = 1) => color.white,
                    style: styles.borderChart,
                    propsForDots: {
                      r: "7",
                      strokeWidth: "2",
                      stroke: color.white,
                    },
                    propsForVerticalLabels: styles.chartOne,
                  }}
                  bezier
                  style={styles.chartSecond}
                />
              ) : (
                <LineChart
                  data={{
                    labels: lablesource.map((item) => {
                      return item;
                    }),
                    datasets: [
                      {
                        data: dataSpo.map((item) => {
                          return item;
                        }),
                        color: (opacity = 1) => color.chartColorOne,
                        strokeWidth: 2,
                      },
                      {
                        data: dataBpm.map((item) => {
                          return item;
                        }),
                        color: (opacity = 1) => color.chartColorSecond,
                        strokeWidth: 2.1,
                      },
                    ],
                    // legend: legendsource.map((item) => {
                    //   return item;
                    // }),
                  }}
                  verticalLabelRotation={15}
                  onDataPointClick={(data) => {
                    diaLogValue(data);
                  }}
                  width={Dimensions.get("window").width * 0.96}
                  height={350}
                  yAxisInterval={1}
                  chartConfig={{
                    verticalLabelsHeightPercentage: 100,
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (_opacity = 1) => color.white,
                    style: styles.borderChart,
                    propsForDots: {
                      r: "7",
                      strokeWidth: "2",
                      stroke: color.white,
                    },

                    propsForVerticalLabels: styles.chartOne,
                    propsForHorizontalLabels: {
                      wordSpacing: 0,
                    },
                  }}
                  bezier
                  style={styles.chartSecond}
                />
              )}
            </View>
            <View style={styles.chartParentPage}>
              <View style={styles.chartPageView}>
                <Text style={styles.chartPage}>Current Page : {pageNo}</Text>
              </View>
              <View style={styles.chartThird}>
                <View style={styles.chartFourth}>
                  {pageNo > 1 ? (
                    <MaterialIcons
                      name="navigate-before"
                      color={color.secondaryLight}
                      size={fontSize(28)}
                      onPress={() => {
                        pageNo = pageNo - 1;
                        p = p - 1;
                        // p = p + 1;
                        setIsLoader(false);
                        setDataSpo([]);
                        setDataBpm([]);
                        setLablesource([]);
                        setLegendsource([]);

                        getUserFitnessDataApiCall(sDate, "previous");
                      }}
                    />
                  ) : null}
                </View>

                <View style={styles.chartFourth}>
                  {pageNo != totalPage ? (
                    <MaterialCommunityIcons
                      name="lock-reset"
                      color={color.secondaryLight}
                      size={fontSize(28)}
                      onPress={() => {
                        pageNo = totalPage;
                        p = 1;
                        setIsLoader(false);
                        setDataSpo([]);
                        setDataBpm([]);
                        setLablesource([]);
                        setLegendsource([]);
                        if (sDate == "") {
                          getUserFitnessDataApiCall("", "reset");
                        } else {
                          getUserFitnessDataApiCall(sDate, "");
                        }
                      }}
                    />
                  ) : null}
                </View>

                <View style={styles.chartFourth}>
                  {pageNo * 4 < totalRecords && dataSpo.length == 4
                    ? (console.log("toal records", pageNo, totalRecords, p),
                      (
                        <MaterialIcons
                          name="navigate-next"
                          color={color.secondaryLight}
                          size={fontSize(28)}
                          onPress={() => {
                            console.log(
                              "Next Pressed11",
                              p * 4 < totalRecords,
                              totalRecords,
                              p,
                              pageNo
                            );

                            pageNo = pageNo + 1;
                            if (p * 4 < totalRecords) {
                              p = p + 1;
                              // p = p - 1;
                            }
                            setIsLoader(false);
                            setDataSpo([]);
                            setDataBpm([]);
                            setLablesource([]);
                            setLegendsource([]);
                            getUserFitnessDataApiCall(sDate, "next");
                          }}
                        />
                      ))
                    : null}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <EmptyView
          title={I18n.t("EmptyView.EmptyData")}
          onPressRefresh={() => clearState()}
        />
      );
    }
  };

  const diaLogValue = (data) => {
    const stroke = data?.dataset?.strokeWidth;
    const value = data?.value;

    const deviceTypeMap = {
      Spo2: {
        2: "SpO2",
        2.1: "BPM",
      },
      Bp: {
        2: "SystolicBp",
        2.1: "DiastolicBp",
      },
      WeightScale: {
        2: "WeightInKg",
        2.1: "WeightLb",
      },
      EarTemperature: {
        2: "Celsius",
        2.1: "Fahrenheit",
      },
      BloodSugar: "SugarLevel",
    };

    const typeConfig = deviceTypeMap[deviceName];

    if (!typeConfig) return;

    // BloodSugar has no stroke switch
    const type =
      typeof typeConfig === "string" ? typeConfig : typeConfig[stroke];

    if (!type) return;

    setDiaValueType(type);
    setDiaValue(value);
    setDialogVisible(true);
  };

  return (
    <View testID="MonitoringChartScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={I18n.t("monitoring.MonitoringChart")}
          icon="chevron-left"
          onPressLeft={() => {
            navigation.goBack(null);
          }}
        />
      </View>

      <View style={BODY}>
        <RNCalendarPicker
          isVisible={isDatePickerVisible}
          onClose={hideDatePicker}
          onDateSelect={handleConfirm}
          selectedDate={
            sDate == "" ? "" : moment(sDate, "YYYY-MM-DD").format("DD-MM-YYYY")
          }
          mode={"both"}
        />
        <Dialog
          visible={dialogVisible}
          contentStyle={commonStyle.DialogChartStyle}
          dialogStyle={commonStyle.contentStyleChart}
          onTouchOutside={() => {
            setDialogVisible(false);
          }}
          onRequestClose={() => {
            setDialogVisible(false);
          }}
          contentInsetAdjustmentBehavior="always"
        >
          <View style={DialogViewWraper}>
            <View style={styles.crossStyle}>
              <Entypo
                name="circle-with-cross"
                size={25}
                onPress={() => setDialogVisible(false)}
                color={color.palette.blackSecondary}
              />
            </View>

            <MonitoringItem
              title={deviceName}
              userName={userName}
              id={1}
              value={`${diaValueType} : ${diaValue}`}
            />
          </View>
        </Dialog>

        {isLoader ? <Loader /> : LineChart_Dynamic()}
      </View>
    </View>
  );
};
