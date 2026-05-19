import { View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { styles } from "./MarkerStyles";
import RightIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { fontSize } from "../../theme";
import { MODULES } from "@app/constants";
import { maps } from "@app/redux/reducer/mapReducer";
import { useRedux } from "@app/redux/hooks";
import { content } from "@app/utils/string";

interface RegionDetailsWrapper {
  item: any;
  visible: boolean;
  onClick: any;
  setReload?: any;
  type?: any;
}

const { groups } = content;
const RegionDetailsWrapper = (props: RegionDetailsWrapper) => {
  const navigation = useNavigation<any>();
  const { item, visible, onClick, setReload, type } = props;

  const { dispatches } = useRedux([groups.dispatch]);
  const navigationHandler = () => {

    dispatches(maps(item));
    navigation.navigate(MODULES.OrgDetailScreen, {
      uniqueId: item?.uniqueId,
      canEditInfo: item?.canEditInfo,
      privacyType: item?.privacyType,
      title: item?.title,
      item: item,
      imageUrl: item?.imageUrl,
      isActiveMember: item?.isActiveMember,
      fromss: type,
      setReload: setReload,
    });
  };

  const addressSaved = (): string => {
    return item?.description.length > 20
      ? item?.description.slice(0, 20) + "..."
      : item?.description;
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalTroubleView}>
          <View style={styles.callOutContainer}>
            <View style={styles.subWrapper}>
              <TouchableOpacity
                style={styles.contentWrapper}
                onPress={() => {
                  navigationHandler();
                  onClick();
                }}
              >
                <Text style={styles.labelText} numberOfLines={2}>
                  {item?.title}
                </Text>
                {item?.description && (
                  <Text style={styles.addressLbl}>{addressSaved()}</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.arrowIcon}
                onPress={() => onClick()}
              >
                <RightIcon name="close" size={fontSize(25)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RegionDetailsWrapper;
