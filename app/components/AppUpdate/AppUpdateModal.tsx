import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View, BackHandler } from "react-native";
import { translate } from "../../i18n";
import { color, fontSize } from "../../theme";
import Icon from "react-native-vector-icons/Entypo";
import { styles } from "./Style";

export interface ModalProps {
  modalOpen: boolean;
  update?: () => void;
  softUpdate: boolean;
  skipNow?: () => void;
  closeModal?: () => void;
}

const AppUpdateModal = (props: ModalProps) => {
  const [visible, setVisible] = useState(props.modalOpen);

  useEffect(() => {
    setVisible(props.modalOpen);
  }, [props.modalOpen]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
      return true;
    });
    return () => sub.remove();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => {
        props.closeModal?.();
        BackHandler.exitApp();
      }}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>
              {translate("appUpdation.updateRequired")}
            </Text>

            {props.softUpdate && (
              <Icon
                name="circle-with-cross"
                size={25}
                color={color.darkSearch}
                onPress={props.skipNow}
              />
            )}
          </View>

          {/* Description */}
          <Text style={styles.subtitle}>
            {translate("appUpdation.updateApp")}
          </Text>

          {/* Update Button */}
          <TouchableOpacity style={styles.buttonPrimary} onPress={props.update}>
            <Text style={styles.buttonPrimaryText}>
              {translate("appUpdation.updateNow")}
            </Text>
          </TouchableOpacity>

          {/* Skip Button */}
          {props.softUpdate && (
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={props.skipNow}
            >
              <Text style={styles.buttonSecondaryText}>
                {translate("appUpdation.skipForNow")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AppUpdateModal;
