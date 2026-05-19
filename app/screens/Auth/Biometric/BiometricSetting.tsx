import { View, Text, Switch, Platform } from "react-native";
import React, { useEffect, useState } from "react";

// Import the external lib.
import Icon from "react-native-vector-icons/Entypo";
import DeviceInfo from "react-native-device-info";

// Import the styles, components and theme.
import { styles } from "./styles";
import I18n from "@app/i18n/i18n";
import { Header } from "@app/components";
import useAppNavigation from "@app/navigation/navigation";
import { useRedux } from "@app/redux/hooks";
import { content } from "@app/utils/string";
import { translate } from "@app/i18n";
import { color, fontSize } from "@app/theme";
import {
  biometricPermission,
  checkBiometricAvailability,
  getUserCredentials,
  removeBiometric,
  setBiometricPromptShown,
} from "@app/components/Biometric/biometric";

const BiometricSetting = () => {
  const navigation = useAppNavigation();
  const deviceId = DeviceInfo.getDeviceId();
  const { groups } = content;
  const { drawer_status } = useRedux([groups.drawerStatus]);
  const [isEnabled, setIsEnabled] = useState(false);
  const { login_detail } = useRedux([groups.loginDetail]);

  const toggleSwitch = () => {
    if (isEnabled) {
      removeBiometric(login_detail?.email);
      setIsEnabled((previous) => !previous);
    } else {
      setIsEnabled((previous) => !previous);
      enableBiometric();
    }
  };

  const enableBiometric = async () => {
    await setBiometricPromptShown(login_detail?.email);
    const { user } = await getUserCredentials(login_detail?.email);
    console.log("user login", user);

    const { available } = await checkBiometricAvailability();
    await biometricPermission(
      available,
      login_detail?.email,
      login_detail?.password,
      login_detail?.user_name,
      login_detail?.userUniqueId,
      deviceId,
      Platform?.OS
    );
  };

  useEffect(() => {
    getKeyValue();
  }, []);

  const getKeyValue = async () => {
    const { user } = await getUserCredentials(login_detail?.email);
    setIsEnabled(user?.biometric?.enabled);
  };

  return (
    <View style={styles.full}>
      <View style={styles.HeaderTop}>
        <Header
          title={I18n.t("AppDrawer.Biometric")}
          icon={drawer_status?.isDrawerOpen ? "circle-with-cross" : "menu"}
          onPressLeft={() => {
            navigation.openDrawer();
          }}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.contentWrapper}>
          <Text style={styles.generalLabel}>
            {translate("AppDrawer.General")}
          </Text>
          <View style={styles.contents}>
            <View style={styles.fingerprintWrapper}>
              <View style={styles.iconWrapper}>
                <Icon
                  name="fingerprint"
                  size={fontSize(22)}
                  color={color.secondary}
                />
              </View>
              <Text>{`${translate("AppDrawer.Biometric")} ${translate(
                "AppDrawer.Authentication"
              )}`}</Text>
            </View>
            <View style={styles.switchWrapper}>
              <Switch
                value={isEnabled}
                trackColor={{
                  false: color.trackColor,
                  true: color.trackColorOne,
                }}
                thumbColor={isEnabled ? color.secondary : color.thumbColor}
                onValueChange={toggleSwitch}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BiometricSetting;
