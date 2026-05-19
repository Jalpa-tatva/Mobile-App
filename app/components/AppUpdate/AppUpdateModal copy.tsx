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
  const [visible] = useState(props?.modalOpen);

  useEffect(() => {
    const subscibe = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => subscibe.remove();
  }, []);

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          props.closeModal();
          backAction();
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {translate("appUpdation.updateRequired")}
              </Text>
              {props?.softUpdate && (
                <Icon
                  name="circle-with-cross"
                  size={fontSize(24)}
                  color={color.palette.white}
                  onPress={props?.skipNow}
                />
              )}
            </View>
            <View style={styles.paragraphContent}>
              <Text style={styles.modalSubTitle}>
                {translate("appUpdation.updateApp")}
              </Text>
            </View>
            {props?.softUpdate && (
              <View style={styles.skipForNow}>
                <TouchableOpacity onPress={props?.skipNow}>
                  <Text style={styles.skipNowTxt}>
                    {translate("appUpdation.skipForNow")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.updateNow}>
              <TouchableOpacity
                style={styles.updateNowBtn}
                onPress={props?.update}
              >
                <Text style={styles.UpdateNowTxt}>
                  {translate("appUpdation.updateNow")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppUpdateModal;
