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
import { color } from "@app/theme";
export interface AlertMessageProps {
  title: string;
  message: string;
  visible: boolean;
  onTouchOutside: () => void;
  onYes?: () => void;
  onCancel?: () => void;
  onClear?: () => void;
  onNext?: () => void;
  onYesText?: string;
  onCancelText?: string;
  onNextText?: string;
  next?: boolean;
  children?: any;
  noCancel?: boolean;
  buttomButton?: boolean;
  titleStyle?: StyleProp<TextStyle>;
}

export const AlertMessage: React.FC<AlertMessageProps> = (
  props: AlertMessageProps
) => {
  return (
    <Dialog
      overlayStyle={{ backgroundColor: color.transparent }}
      visible={props.visible}
      onTouchOutside={props.onTouchOutside}
      dialogStyle={styles.dialogStyle}
      contentStyle={styles.contentStyle}
      onRequestClose={() => props.onTouchOutside()}
      contentInsetAdjustmentBehavior="always"
    >
      <View>
        <View style={styles.widthNighty}>
          <Text style={[props.titleStyle, styles.titleStyle]}>
            {props.title}
          </Text>
        </View>
        {props.children}
        {props.buttomButton && (
          <View
            style={{ ...styles.buttonContainer, ...styles.dialogBorderOne }}
          >
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
        )}
      </View>
    </Dialog>
  );
};
