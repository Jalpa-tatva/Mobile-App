import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  // Animated,
} from "react-native";
import { styles } from "./style";
import { color } from "@app/theme";
import moment from "moment";

import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface TimePickerProps {
  currentTimeStamp?: any;
  onConfirm: any;
  onClose: any;
  isVisible: any;
}
const { width } = Dimensions.get("window");
const CLOCK_SIZE = width * 0.8;
const CLOCK_RADIUS = CLOCK_SIZE / 2;
const POINTER_LENGTH = CLOCK_RADIUS * 0.6;

const HOURS = [...Array(12).keys()].map((i) => i + 1);
const MINUTE = [...Array(61).keys()];

const TimePickerClock = ({
  isVisible,
  onClose,
  onConfirm,
  currentTimeStamp,
}: TimePickerProps) => {
  const [selectedHour, setSelectedHour] = useState(10); // Default to 10
  const [selectedMinute, setSelectedMinute] = useState(20); // Default to 10
  const [selectedPeriod, setSelectedPeriod] = useState(""); // Default to 10
  const [isAM, setIsAM] = useState(true);
  const [isHourOpen, setHourOpen] = useState(true);
  const [isMinuteOpen, setMinuteOpen] = useState(false);
  const pointerX = useSharedValue(0);
  const pointerY = useSharedValue(0);
  const handleHourSelection = (hour: number) => setSelectedHour(hour);
  const handleMinuteSelection = (hour: number) => setSelectedMinute(hour);
  // 2024-12-17T13:10:13.333Z
  const currentTime = currentTimeStamp
    ? moment(currentTimeStamp.slice(0, -3) * 1000)
    : moment();
  let currentHour = currentTime.hours();
  const currentPeriod = currentHour >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  if (currentHour > 12) currentHour -= 12;
  if (currentHour === 0) currentHour = 12;

  const isDisabledHour = (hour) => {
    if (selectedPeriod !== currentPeriod) return false;
    return hour < currentHour;
  };

  // Position calculation for hour numbers
  const getPositionHour = (index: number) => {
    const angle = (index * 30 - 90) * (Math.PI / 180);
    const x = CLOCK_RADIUS + CLOCK_RADIUS * 0.72 * Math.cos(angle);
    const y = CLOCK_RADIUS + CLOCK_RADIUS * 0.72 * Math.sin(angle);
    return { top: y - 40, left: x - 35 };
  };
  const getPositionMin = (index: number) => {
    const angle = (index * 6 - 90) * (Math.PI / 180); // Adjust for 60 minutes
    const x = CLOCK_RADIUS + CLOCK_RADIUS * 0.71 * Math.cos(angle);
    const y = CLOCK_RADIUS + CLOCK_RADIUS * 0.71 * Math.sin(angle);
    return { top: y - 42, left: x - 38 };
  };
  const closeAll = () => {
    onClose();
    closeOtherAll();
  };

  const closeOtherAll = () => {
    setHourOpen(false);
    setMinuteOpen(false);
  };
  useEffect(() => {
    console.log("called the useeffect function");
    setHourOpen(isVisible);
  }, [isVisible]);

  useEffect(() => {
    isDisabledHour(selectedHour);
    let hour = currentTime.hours();
    const minute = currentTime.minutes();
    const period = hour >= 12 ? "PM" : "AM";

    if (hour > 12) hour -= 12; // Convert to 12-hour format
    if (hour === 0) hour = 12;
    const nextMultipleOfFive = Math.ceil(minute / 5) * 5;

    // Handle cases where snapping would roll over to the next hour

    // Set the initial selected values
    setSelectedHour(nextMultipleOfFive === 60 ? (hour % 12) + 1 : hour);
    setSelectedMinute(minute);
    setSelectedPeriod(period);
  }, []);

  const handleLayout = (event: any) => {
    /* const { width } = event.nativeEvent.layout;
     setViewWidth(width); */
  };
  const toggleAMPM = (val: any, period: string) => {
    setIsAM(val);
    setSelectedPeriod(period);
  };
  const calculateSelection = (angle: number) => {
    const number = Math.round(angle / 6) % 60; // Divide by 6 degrees (since there are 60 minute/second positions)
    if (MINUTE.includes(number)) {
      setSelectedMinute(number); // Select the closest valid minute
    }
  };
  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(pointerX.value) },
        { translateY: withSpring(pointerY.value) },
      ],
    };
  });
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
            {/* Header Digital Clock */}
            <View onLayout={handleLayout} style={styles.calendarModal}>
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.hrWrapper}
                  onPress={() => {
                    setHourOpen(true);
                    setMinuteOpen(false);
                  }}
                >
                  <Text style={styles.timeText}>{`Hour : `}</Text>
                  <View
                    style={[
                      styles.timeSelection,
                      {
                        borderColor: isHourOpen
                          ? color.palette.darkGray
                          : color.secondary,
                      },
                    ]}
                  >
                    <Text
                      style={{ ...styles.timeText, ...styles.selectedWrap }}
                    >
                      {selectedHour.toString().padStart(2, "0")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.hrWrapper, ...styles.minuteWrap }}
                  onPress={() => {
                    setHourOpen(false);
                    setMinuteOpen(true);
                  }}
                >
                  <Text style={styles.timeText}>{`Min : `}</Text>
                  <View
                    style={[
                      styles.timeSelection,
                      {
                        borderColor: isMinuteOpen
                          ? color.palette.darkGray
                          : color.secondary,
                      },
                    ]}
                  >
                    <Text
                      style={{ ...styles.timeText, ...styles.selectedWrap }}
                    >
                      {selectedMinute.toString().padStart(2, "0")}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.hrWrapper}>
                  <TouchableOpacity onPress={() => toggleAMPM(true, "AM")}>
                    <Text
                      style={[
                        styles.amPm,
                        selectedPeriod === "AM" && styles.activeAmPm,
                      ]}
                    >
                      {"AM"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleAMPM(false, "PM")}>
                    <Text
                      style={[
                        styles.amPm,
                        selectedPeriod === "PM" && styles.activeAmPm,
                      ]}
                    >
                      PM
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <Text style={[styles.timeText, {color: '#007BFF'}]}>54</Text> */}
              </View>
              <View style={styles.selectTimeWrap}>
                <Text style={styles.selectTimeTxt}>{`Please select ${
                  isHourOpen ? "hour" : "minute"
                }`}</Text>
              </View>
              {/* Clock Face */}
              <PanGestureHandler
                onGestureEvent={(event) => {
                  const { translationX, translationY } = event.nativeEvent;
                  const angle =
                    Math.atan2(translationY, translationX) * (180 / Math.PI); // Angle in degrees
                  pointerX.value = translationX; // Update pointer X
                  pointerY.value = translationY; // Update pointer Y
                  calculateSelection(angle); // Update selected minute based on angle
                }}
              >
                <Animated.View style={[styles.clockFace, panStyle]}>
                  {/* Hours */}
                  {isHourOpen && (
                    <>
                      {HOURS.map((hour, index) => {
                        const position = getPositionHour(index + 1);
                        const isSelected = hour === selectedHour;
                        const isDisabled = isDisabledHour(hour);
                        return (
                          <TouchableOpacity
                            key={hour}
                            style={[
                              styles.hourContainer,
                              { top: position.top, left: position.left },
                              isSelected && styles.selectedHour,
                              isDisabled && { opacity: 0.5 },
                            ]}
                            onPress={() => {
                              if (!isDisabled) {
                                handleHourSelection(hour);
                                setHourOpen(false);
                                setMinuteOpen(true);
                              }
                            }}
                            disabled={isDisabled}
                          >
                            <Text
                              style={[
                                styles.hourText,
                                isSelected && styles.selectedActionTxt,
                              ]}
                            >
                              {hour}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                      <View
                        style={[
                          styles.pointer,
                          {
                            transform: [
                              // {translateX: POINTER_LENGTH /15},
                              { translateY: POINTER_LENGTH / 1.25 }, // Center the pointer
                              { rotate: `${(selectedHour % 12) * 30}deg` }, // Calculate angle
                            ],
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.pointerChild,
                            {
                              backgroundColor: color.secondary,
                            },
                          ]}
                        />
                        <View style={styles.pointerChild}>
                          <View style={styles.circleTime} />
                        </View>
                      </View>
                    </>
                  )}
                  {/* Minutes */}
                  {isMinuteOpen && (
                    <>
                      {MINUTE.map((minute, index) => {
                        const updateMinute =
                          minute.toString().length === 1
                            ? `0${minute}`
                            : minute;
                        const position = getPositionMin(index);
                        const isSelected = minute === selectedMinute;

                        const visibleMin = Number(minute) % 5 == 0;
                        return (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.hourContainer,
                              { top: position.top, left: position.left },
                              isSelected && styles.selectedHour,
                            ]}
                            onPress={() => {
                              handleMinuteSelection(minute);
                            }}
                          >
                            <Text
                              style={[
                                styles.hourText,
                                isSelected && styles.selectedActionTxt,
                              ]}
                            >
                              {visibleMin && updateMinute != 60 && updateMinute}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}

                      <View
                        style={[
                          styles.pointer,
                          {
                            transform: [
                              // {translateX: POINTER_LENGTH /15},
                              { translateY: POINTER_LENGTH / 1.3 }, // Center the pointer
                              {
                                rotate: `${selectedMinute * 6}deg`,
                              }, // Calculate angle
                            ],
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.pointerChild,
                            {
                              backgroundColor: color.secondary,
                            },
                          ]}
                        />
                        <View style={styles.pointerChild}>
                          <View style={styles.circleTime} />
                        </View>
                      </View>
                    </>
                  )}
                  {/* Pointer */}
                </Animated.View>
              </PanGestureHandler>

              {/* Footer Buttons */}
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={() => {
                    closeAll();
                  }}
                >
                  <Text style={styles.footerText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // onConfirm({selectedHour, selectedMinute, selectedPeriod});
                    onConfirm({ selectedHour, selectedMinute, selectedPeriod });
                    closeOtherAll();
                  }}
                >
                  <Text style={styles.footerText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TimePickerClock;
