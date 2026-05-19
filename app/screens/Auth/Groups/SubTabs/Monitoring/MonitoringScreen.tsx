import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, RefreshControl, BackHandler} from 'react-native';

// import external libraries
import I18n from 'i18n-js';
import {useRoute} from '@react-navigation/native';

// import custom function
import {Loader, EmptyView, Header} from '@components/index';
import {MonitoringItem} from './MonitoringItem';
import {getUserFitnessData} from '@app/services/api/groups';
import {MODULES} from '@app/constants';
import useAppNavigation from '@app/navigation/navigation';
import {method} from '@app/services/api/Method';

// import custom styling & utils
import {FULL, HEADERTOP, BODY, styles} from './Style';
import commonStyle from '@app/theme/commonStyle';
import {trackApiEvent} from '@app/utils/appReport/ActivityReport';
import {points} from '@app/utils/appReport/ReportPoint';

/**
 * MonitoringProps
 *
 */
export interface MonitoringProps {
  id: string;
  deviceName: string;
  userName: string;
  profile: string;
  userId: string;
  StartText: string;
  data: any;
  onPress: Function;
}

/**
 * MonitoringScreen Component
 *
 */
export const MonitoringScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route: any = useRoute();
  const uniqueId = route?.params?.uniqueId;
  const [isLoader, setIsLoader] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [refreshing] = useState(false);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    });

    return focus;
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  // useEffect(() => {
  //   BleManager.start({showAlert: false}).then(() => {
  //     BleManager.checkState();
  //     console.log('Module initialized');
  //   });
  // }, []);

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      testHex();
      getUserFitnessDataApiCall();
    });

    return focus;
  }, []);

  const testHex = () => {
    let sourceCmd = [81, 38, 0, 0, 0, 0, 163];

    let sourceCmdLength = sourceCmd.length - 1;

    let checkSum = calculateOneByteCheckSum(sourceCmd, 0, sourceCmdLength);

    let arrTest = [];
    arrTest.length = sourceCmd.length + 1;

    for (let i = 0; i < sourceCmd.length; i++) {
      arrTest[i] = sourceCmd[i];
    }
    arrTest[sourceCmd.length] = checkSum;

    console.log('arrTest', arrTest);

    return arrTest;
  };

  const calculateOneByteCheckSum = (cmd, startIndex, endIndex) => {
    let checkSum = 0;

    for (let i = startIndex; i <= endIndex; ++i) {
      checkSum = checkSum + cmd[i];
    }

    return checkSum & 255;
  };

  const onRefresh = () => {
    setDataList([]);
    getUserFitnessDataApiCall();
  };

  const getUserFitnessDataApiCall = () => {
    setDataList([]);
    setIsLoader(true);
    getUserFitnessData(uniqueId)
      .then(async res => {
        setDataList(res.data[0].objectList);
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: MODULES.MonitoringScreen,
          endpoint: points.userFitnessRecord,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setDataList(res.data[0].objectList);
          } else {
            setDataList([]);
          }
        } else {
          setDataList([]);
        }
      })
      .catch(async err => {
        await trackApiEvent({
          screen: MODULES.MonitoringScreen,
          endpoint: points.userFitnessRecord,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t('EmptyView.somethingWentWrong'),
        });
        setIsLoader(false);
        setDataList([]);
      });
  };

  const navigateToScreen = useCallback(
    item => {
      navigation.navigate(MODULES.MonitoringChartScreen, {
        deviceName: item.deviceName,
        profile: item.profile,
        userId: item.userId,
        userName: item.userName,
      });
    },
    [navigation],
  );

  const renderRaw = (item: MonitoringProps) => {
    const updateData = JSON.parse(item.data);
    return (
      <MonitoringItem
        key={item.id}
        deviceName={item.deviceName}
        id={item.id}
        userName={item.userName}
        StartText={item.StartText}
        data={updateData}
        onPress={() => navigateToScreen(item)}
      />
    );
  };

  // const requestPermissions = async () => {
  //   if (Platform.OS === 'android' && Platform.Version >= 23) {
  //     const apiLevel = await DeviceInfo.getApiLevel();

  //     if (apiLevel < 31) {
  //       PermissionsAndroid.check(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       ).then(result => {
  //         if (result) {
  //           console.log('Permission is OK');

  //           navigation.navigate(MODULES.MonitoringBleScanScreen, {
  //             uniqueId: uniqueId,
  //           });
  //         } else {
  //           PermissionsAndroid.request(
  //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           ).then(result => {
  //             if (result) {
  //               console.log('User accept');

  //               navigation.navigate(MODULES.MonitoringBleScanScreen, {
  //                 uniqueId: uniqueId,
  //               });
  //             } else {
  //               console.log('User refuse');
  //             }
  //           });
  //         }
  //       });
  //     } else {
  //       const result = await requestMultiple([
  //         PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
  //         PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  //         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //       ]);

  //       const isGranted =
  //         result['android.permission.BLUETOOTH_CONNECT'] ===
  //           PermissionsAndroid.RESULTS.GRANTED &&
  //         result['android.permission.BLUETOOTH_SCAN'] ===
  //           PermissionsAndroid.RESULTS.GRANTED &&
  //         result['android.permission.ACCESS_FINE_LOCATION'] ===
  //           PermissionsAndroid.RESULTS.GRANTED;
  //       if (isGranted) {
  //         console.log('User accept');

  //         navigation.navigate(MODULES.MonitoringBleScanScreen, {
  //           uniqueId: uniqueId,
  //         });
  //       } else {
  //         console.log('User refuse');
  //         Alert.alert(
  //           `Turn on Location Services & Nearby devices permissions to allow LynchBurg App to find bluetooth devices.`,
  //           '',
  //           [
  //             {
  //               text: 'Go to Settings',
  //               onPress: openSettings,
  //             },
  //             {text: 'Cancel', onPress: () => {}},
  //           ],
  //         );
  //       }
  //     }
  //   } else {
  //     navigation.navigate(MODULES.MonitoringBleScanScreen, {
  //       uniqueId: uniqueId,
  //     });
  //   }
  // };

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View testID="MonitoringScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={I18n.t('monitoring.Monitoring')}
          icon="chevron-left"
          onPressLeft={navigateBack}
        />
      </View>

      <View style={BODY}>
        {isLoader ? <Loader /> : null}
        <View style={styles.mainWrapper}>
          {/* <Button
            tx={'monitoring.findBluetooth'}
            //onPress={handleSubmit}
            // isLoader={isLoader}
            onPress={async () => {
              console.log('findBluetooth222', isBleOn);
              if (isBleOn === 'off') {
                Snackbar.show({
                  text: I18n.t('monitoring.PleasEnableBleBluetooth'),
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: color.palette.red,
                  textColor: color.white,
                  numberOfLines: 5,
                });
              }
              if (isBleOn === 'unauthorized') {
                Snackbar.show({
                  text: I18n.t('monitoring.PleasEnableBleBluetoothSetting'),
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: color.palette.red,
                  textColor: color.white,
                  numberOfLines: 5,
                });
              }
              if (isBleOn === 'on') {
                console.log('333', isBleOn);

                await requestPermissions();

                navigation.navigate(MODULES.MonitoringBleScanScreen, {
                  uniqueId: uniqueId,
                });
              }
            }}
            style={loginButtonContainer}
            textStyle={BottonTitle}
          /> */}
        </View>

        {!isLoader && dataList.length == 0 ? (
          <EmptyView
            title={I18n.t('EmptyView.EmptyHealthRecord')}
            onPressRefresh={() => getUserFitnessDataApiCall()}
          />
        ) : (
          <FlatList
            data={dataList}
            renderItem={({item}) => renderRaw(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={commonStyle.flatBottomSpace}
            style={commonStyle.flatRadiousStyle}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};
