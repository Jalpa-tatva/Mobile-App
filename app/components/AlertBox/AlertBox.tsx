import { Dialog } from "react-native-simple-dialogs";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./AlertBoxStyle";
import { translate } from "@app/i18n";

export interface AlertBoxProps {
  title: string;
  message: any;
  visible: boolean;
  onTouchOutside?: Function;
  onYes: Function;
  onCancel: Function;
  onClear?: Function;
  onYesText: string;
  onCancelText: string;
  clear?: boolean;
  noCancel?: boolean;
}

const AlertShow: React.FC<AlertBoxProps> = (props: AlertBoxProps) => {
  return (
    <Dialog
      title={props.title}
      titleStyle={styles.titleStyle}
      message={props.message}
      messageStyle={styles.messageStyle}
      visible={props.visible}
      onTouchOutside={() => props.onTouchOutside()}
      dialogStyle={styles.dialogStyle}
      contentInsetAdjustmentBehavior="always"
      onRequestClose={() => props.onTouchOutside()}
      contentStyle={styles.contentStyle}
    >
      <View>
        <Text style={styles.messgaeText}>{props.message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.okayButton}
            onPress={() => {
              props.onYes();
            }}
          >
            <Text style={styles.okayText}>{props.onYesText}</Text>
          </TouchableOpacity>
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
          {props.clear ? (
            <TouchableOpacity
              style={styles.clearButton}
              activeOpacity={1}
              onPress={() => {
                props.onClear();
              }}
            >
              <Text style={styles.clearText}>
                {translate("groupDetails.ClearLocation")}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Dialog>
  );
};

export default AlertShow;
