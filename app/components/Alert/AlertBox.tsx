import { Dialog } from "react-native-simple-dialogs";
import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleProp,
  TextStyle,
} from "react-native";
import { styles } from "./AlertBoxStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { color } from "@app/theme";

export interface AlertBoxProps {
  title?: string;
  message?: string;
  visible?: boolean;
  onTouchOutside?: () => void;
  onYes?: Function;
  onCancel?: Function;
  onNext?: Function;
  onYesText?: string;
  onCancelText?: string;
  onNextText?: string;
  next?: boolean;
  noCancel?: boolean;
  onClear?: Function;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

export const AlertBox: React.FC<AlertBoxProps> = (props: AlertBoxProps) => {
  return (
    <Dialog
      visible={props.visible}
      onTouchOutside={props.onTouchOutside}
      dialogStyle={styles.dialogStyle}
      contentStyle={styles.contentStyle}
      onRequestClose={props.onTouchOutside}
      contentInsetAdjustmentBehavior="always"
    >
      <View>
        <View style={styles.dialogWrapper}>
          {props.title && (
            <Text style={[props.titleStyle, styles.titleStyle]}>
              {props.title}
            </Text>
          )}
          <View>
            <Entypo
              name="circle-with-cross"
              size={25}
              onPress={props.onTouchOutside}
              color={color.palette.blackSecondary}
            />
          </View>
        </View>

        <Text style={styles.messgaeText}>{props.message}</Text>
        <View style={styles.buttonContainer}>
          {props.noCancel == true ? null : (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.cancelButton}
              onPress={() => {
                props.onCancel();
              }}
            >
              <Text style={styles.cancelText}>{props.onCancelText}</Text>
            </TouchableOpacity>
          )}
          {props.next ? (
            <TouchableOpacity
              style={styles.clearButton}
              activeOpacity={1}
              onPress={() => {
                props.onNext();
              }}
            >
              <Text style={styles.clearText}>{props.onNextText}</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            activeOpacity={1}
            style={styles.okayButton}
            onPress={() => {
              props.onYes();
            }}
          >
            <Text style={styles.okayText}>{props.onYesText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog>
  );
};
