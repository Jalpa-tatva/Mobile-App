import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import moment, { Moment } from "moment";
import Icon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { color, fontSize } from "@app/theme";
import { styles } from "./style";

interface CalendarModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDateSelect: (date: Moment) => void;
  selectedDate?: any;
  currentDate?: any;
  mode: "past" | "future" | "both";
}

export const RNCalendarPicker: React.FC<CalendarModalProps> = ({
  isVisible,
  onClose,
  onDateSelect,
  selectedDate,
  mode,
  currentDate,
}) => {
  const currentYearValue = moment().year();
  const currentMonthValue = moment().month();
  const today = moment();

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonthValue);
  const [selectedYear, setSelectedYear] = useState<number>(currentYearValue);
  const [daysData, setDaysData] = useState<moment.Moment[]>([]);
  const [yearList, setYearList] = useState<any>([]);
  const [viewWidth, setViewWidth] = useState(0);
  const [selectedDateValue, setSelectedDateValue] = useState<any>("");
  const [selectedDates, setSelectedDates] = useState<any>("");

  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState<boolean>(
    false
  );
  const [isYearPickerVisible, setIsYearPickerVisible] = useState<boolean>(
    false
  );

  const monthScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    selectedDate != undefined && selectedDate != ""
      ? setSelectedDates(selectedDate)
      : setSelectedDates(moment().format("DD-MM-YYYY"));
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate != "") {
      console.log("selectedDate1111", selectedDate);
      let [day, month, year] = selectedDate.split("-");

      setSelectedDateValue(`${year}-${month}-${day}`);

      const monthPass = parseInt(moment(month).format("MM"), 10) - 1;
      const yearPass = parseInt(moment(year).format("YYYY"), 10);
      setSelectedMonth(monthPass);
      setSelectedYear(yearPass);
    } else {
      console.log("selectedDate2222", selectedDate);
      const currentYear = moment().year();
      const currentMonth = moment().month();
      setSelectedMonth(currentMonth);
      setSelectedYear(currentYear);
      setSelectedDateValue("");
    }
  }, [selectedDateValue, selectedDate]);

  useEffect(() => {
    if (selectedDateValue) {
      const selectedMoment = moment(selectedDateValue, "YYYY-MM-DD");
      setSelectedMonth(selectedMoment.month());
      setSelectedYear(selectedMoment.year());
    }
  }, [selectedDateValue]);

  useEffect(() => {
    if (mode === "past") {
      setYearList(Array.from({ length: 50 }, (_, i) => currentYearValue - i));
    } else if (mode === "future") {
      console.log("enter here");

      setYearList(Array.from({ length: 50 }, (_, i) => currentYearValue + i));
    } else if (mode === "both") {
      // Combine past and future years
      const pastYears = Array.from(
        { length: 50 },
        (_, i) => currentYearValue - i
      );
      const futureYears = Array.from(
        { length: 50 },
        (_, i) => currentYearValue + i + 1
      );
      setYearList([...pastYears.reverse(), ...futureYears]); // Combine and sort ascending
    }

    const generateDaysData = (month: number, year: number): moment.Moment[] => {
      const startDate = moment({ year, month, day: 1 });
      const daysInMonth = startDate.daysInMonth();
      const daysArray: moment.Moment[] = [];
      const firstDayOfMonth = startDate.day();
      const prevMonthEndDate = startDate
        .clone()
        .subtract(1, "month")
        .endOf("month");

      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        daysArray.push(
          prevMonthEndDate
            .clone()
            .subtract(i, "days")
            .set("month", month - 1)
        );
      }

      for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(moment({ year, month, day: i }));
      }

      const remainingDays = 7 - (daysArray.length % 7);
      if (remainingDays < 7) {
        const nextMonthStartDate = startDate.clone().add(1, "month");
        for (let i = 0; i < remainingDays; i++) {
          daysArray.push(nextMonthStartDate.clone().add(i, "days"));
        }
      }

      return daysArray;
    };

    setDaysData(generateDaysData(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear]);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };

  useEffect(() => {
    if (isMonthPickerVisible && monthScrollRef.current) {
      monthScrollRef.current.scrollTo({
        y: selectedMonth * 45,
        animated: true,
      });
    }

    if (isYearPickerVisible && yearScrollRef.current) {
      const selectedYearIndex = yearList.findIndex(
        (item: any) => item === selectedYear
      );
      yearScrollRef.current.scrollTo({
        y: selectedYearIndex * 43,
        animated: true,
      });
    }
  }, [isMonthPickerVisible, isYearPickerVisible]);
  console.log("selectes date val", selectedDateValue);

  const isToday = (date: Moment): boolean => date.isSame(today, "day");
  const isSelectedDate = (date: Moment): boolean =>
    selectedDateValue !== null && date.isSame(selectedDateValue, "day");

  const isDateDisabled = (date: Moment): boolean => {
    const firstDayOfMonth = moment({
      year: selectedYear,
      month: selectedMonth,
      day: 1,
    });
    const lastDayOfMonth = firstDayOfMonth.clone().endOf("month");

    if (mode === "future") {
      return (
        date.isBefore(today, "day") ||
        date.isBefore(firstDayOfMonth, "day") ||
        date.isAfter(lastDayOfMonth, "day")
      );
    } else if (mode === "past") {
      return (
        date.isBefore(firstDayOfMonth, "day") ||
        date.isAfter(lastDayOfMonth, "day") ||
        date.isAfter(today, "day")
      );
    } else if (mode === "both") {
      return (
        date.isBefore(firstDayOfMonth, "day") ||
        date.isAfter(lastDayOfMonth, "day")
      );
    } else {
      return (
        date.isBefore(firstDayOfMonth, "day") ||
        date.isAfter(lastDayOfMonth, "day") ||
        date.isAfter(today, "day")
      );
    }
  };

  const handleMonthPickerToggle = () => {
    setIsMonthPickerVisible((prev) => !prev);
    if (!isMonthPickerVisible) {
      setIsYearPickerVisible(false);
    }
  };

  const handleYearPickerToggle = () => {
    setIsYearPickerVisible((prev) => !prev);
    if (!isYearPickerVisible) {
      setIsMonthPickerVisible(false);
    }
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setIsMonthPickerVisible(false);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setIsYearPickerVisible(false);
  };
  const closeOtherModal = () => {
    setIsMonthPickerVisible(false);
    setIsYearPickerVisible(false);
  };
  const closeAll = () => {
    closeOtherModal();
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={closeAll}
    >
      <TouchableWithoutFeedback onPress={closeAll}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View onLayout={handleLayout} style={styles.calendarModal}>
              <View style={styles.dateWrapper}>
                <View style={styles.header}>
                  <Text style={styles.selectDateTxt}>Select Date</Text>
                  <TouchableOpacity
                    onPress={() => {
                      closeOtherModal();
                      onClose();
                    }}
                  >
                    <Entypo name="cross" size={26} color={color.white} />
                  </TouchableOpacity>
                </View>
                <View style={styles.selectedDate}>
                  <Text style={styles.selectDateTxt}>
                    {moment(selectedDates, "DD-MM-YYYY").format(
                      "ddd DD MMM, YYYY"
                    )}
                  </Text>
                </View>

                <View style={styles.pickerRow}>
                  <TouchableOpacity
                    style={{ ...styles.picker, ...styles.padEnd }}
                    onPress={handleMonthPickerToggle}
                  >
                    <Text style={styles.pickerText}>
                      {moment.months()[selectedMonth]}
                    </Text>
                    <Icon
                      name={
                        isMonthPickerVisible
                          ? "keyboard-arrow-up"
                          : "keyboard-arrow-down"
                      }
                      size={fontSize(20)}
                      color={color.white}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ ...styles.picker, ...styles.padStart }}
                    onPress={handleYearPickerToggle}
                  >
                    <Text style={styles.pickerText}>{selectedYear}</Text>
                    <Icon
                      name={
                        isYearPickerVisible
                          ? "keyboard-arrow-up"
                          : "keyboard-arrow-down"
                      }
                      size={fontSize(20)}
                      color={color.white}
                    />
                  </TouchableOpacity>
                </View>

                {isMonthPickerVisible && (
                  <ScrollView
                    ref={monthScrollRef}
                    style={[styles.dropdown, { width: viewWidth }]}
                  >
                    {moment.months().map((month, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleMonthChange(index)}
                        style={[
                          styles.option,
                          selectedMonth === index && styles.selectedOption,
                        ]}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedMonth === index &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {month}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                {isYearPickerVisible && (
                  <ScrollView
                    ref={yearScrollRef}
                    style={[styles.dropdown, { width: viewWidth }]}
                  >
                    {yearList.map((year: any) => (
                      <TouchableOpacity
                        key={year}
                        onPress={() => handleYearChange(year)}
                        style={[
                          styles.option,
                          selectedYear === year && styles.selectedOption,
                        ]}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedYear === year && styles.selectedOptionText,
                          ]}
                        >
                          {year}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>
              <View style={styles.calendar}>
                <View style={styles.weekDays}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <View style={styles.weekDayContainer} key={day}>
                        <Text style={styles.weekDayText}>{day}</Text>
                      </View>
                    )
                  )}
                </View>
                <FlatList
                  data={daysData}
                  numColumns={7}
                  keyExtractor={(item) => item.format("YYYY-MM-DD")}
                  renderItem={({ item }) => {
                    const isCurrentDate = isToday(item);

                    return (
                      <TouchableOpacity
                        style={[
                          styles.dateBox,
                          // isDateDisabled(item) && styles.disabledDateBox,
                          isCurrentDate && styles.currentDateHighlight,
                          isSelectedDate(item) == true &&
                            styles.selectedDateBox,
                        ]}
                        onPress={() => {
                          if (!isDateDisabled(item)) {
                            onDateSelect(item);
                            setIsMonthPickerVisible(false);
                            setIsYearPickerVisible(false);
                            onClose();
                          }
                        }}
                        disabled={isDateDisabled(item)}
                      >
                        <Text
                          style={[
                            styles.dateText,
                            isSelectedDate(item) && styles.selectedDateText,
                            isDateDisabled(item) && styles.disabledDateText,
                          ]}
                        >
                          {item.date()}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
