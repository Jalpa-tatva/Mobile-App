import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Switch,
  FlatList,
  BackHandler,
  Platform,
} from 'react-native';

// import external libraries
import { CommonActions, useRoute, RouteProp } from '@react-navigation/native';

import Entypo from 'react-native-vector-icons/Entypo';
import { Formik } from 'formik';
import Snackbar from 'react-native-snackbar';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import custom function
import { Button, Header, Text, Input } from '@app/components';
import I18n from '@app/i18n/i18n';
import {
  addTask,
  editTask,
  getMineMemberList,
  getTaskFolderList,
} from '@app/services/api/groups';
import { translate } from '@app/i18n';
import { MODULES, SafeRBSheet } from '@app/constants';

// import custom styling & utils
import {
  Full,
  HeaderTop,
  Body,
  ButtonWrapper1,
  ExtraTItle,
  DetailsWrapper,
  taskFolderLblWrapper,
  taskFolderWrapper,
  lableTitle,
  BottonTitle,
  signUpButtonContainer,
  SeverityTitle,
  AssignToWrapperIos,
  AssignToWrapperAndroid,
  OverLayButtonContainerCencel,
  OverLayButtonText,
  SheetWrapper,
  WrapperContainer,
  ButtonSheetTitle,
  OverLayTopButtonContainerCencel,
  OverLayTopButtonText,
} from './Style';
import { fontSize, color } from '@app/theme/index';
import commonStyle from '@app/theme/commonStyle';
import useAppNavigation from '@app/navigation/navigation';
import CommonDropdown from '@app/components/DropDown/CommonDropDown';

/**
 * Declare validation schema
 */
const validationSchema = yup.object().shape({
  description: yup
    .string()
    .label(I18n.t('addTask.description'))
    .required(I18n.t('addTask.enterDescriptionPlease')),
});

/**
 *  AddNotes Props
 */
export interface AddNotesProps {
  description: string;
  notes: string;
}
interface MonitoringRouteProps {
  uniqueId: string;
  title: string;
  fromEdit: string;
  imageUrl: string;
  froms: string;
  canEditInfo: string;
  item: {
    priority: string;
    completeDate: string;
    assignedToUniqueId: string;
    assignedTo: string;
    description: string;
    notes: string;
  };
  taskId: string;
  folderId: string;
}
type AddNotesType = RouteProp<
  { AddNotesScreen: MonitoringRouteProps },
  'AddNotesScreen'
>;

/**
 * AddNotesScreen component
 */
export const AddNotesScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<AddNotesType>();

  const uniqueId = route.params?.uniqueId;
  const title = route.params?.title;
  const fromEdit = route.params?.fromEdit;
  const imageUrl = route.params?.imageUrl;
  const froms = route.params?.froms;
  const canEditInfo = route.params?.canEditInfo;
  const item = route.params?.item;
  const taskId = route.params?.taskId;
  const folderId = route.params?.folderId;
  const refRBSheetAlbum = useRef<RBSheet>(null);
  const [open, setOpen] = useState(false);
  const [memberList, setMemberList] = useState([
    {
      name: I18n.t('addTask.NotAssign'),
      assignId: '',
    },
  ]);

  const [taskFolderList, setTaskFolderList] = useState([]);

  const [isLoader, setIsloader] = useState(false);
  const [assignUser, setAssignUser] = useState('');
  const [assignUserId, setAssignUserId] = useState('');
  const [taskFolder, setTaskFolder] = useState('');
  const [taskFolderId, setTaskFolderId] = useState('');
  const [priority, setPriority] = useState(
    item?.priority ? parseInt(item?.priority) : 1,
  );
  const [completed, setCompleted] = useState('No');
  const [isEnabled, setIsEnabled] = useState(false);

  const inputComment = useRef(null);
  const inputDescription = useRef(null);
  const formTypeInput = useRef(null);

  useEffect(() => {
    checkOldValue();
    myTaskFolderApiCall();
    myMemberListApiCall();
  }, []);
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      const subscibe = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => subscibe.remove();
    });

    return focus;
  }, []);

  const checkOldValue = () => {
    if (item?.completeDate) {
      console.log('item?.completeDate', item?.completeDate);

      setIsEnabled(true);
      setCompleted('Yes');
    }
  };

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const myTaskFolderApiCall = async () => {
    console.log('myGroupApiCalluniqueId', uniqueId);

    setIsloader(true);
    await getTaskFolderList(uniqueId)
      .then(res => {
        //console.log('getMyActivityList', JSON.stringify(res.data));

        if (res.data && res.data.length > 0) {
          if (res.data[0].status.code == 0) {
            if (res.data[0].objectList && res.data[0].objectList.length > 0) {
              console.log(
                'description11',
                res.data[0].objectList[0].description,
              );
              console.log('folderId11', res.data[0].objectList[0].folderId);
              const cleanedArray = [];
              res.data[0].objectList.forEach(val => {
                if (val.description != 'Medications') {
                  cleanedArray.push(val);
                }
              });
              setTaskFolderList(cleanedArray);
              setTaskFolder(cleanedArray[0].description);
              setTaskFolderId(cleanedArray[0].folderId);
            } else {
              setTaskFolderList([]);
            }
          } else {
            setTaskFolderList([]);
            setIsloader(false);
          }
        } else {
          setIsloader(false);

          setTaskFolderList([]);
        }
      })
      .catch(err => {
        setIsloader(false);
        setTaskFolderList([]);
        Snackbar.show({
          text: I18n.t('EmptyView.somethingWentWrong'),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const myMemberListApiCall = () => {
    setMemberList([]);
    // setIsloader(true);
    getMineMemberList(uniqueId)
      .then(res => {
        console.log('getMyGroupPhotoList', JSON.stringify(res));

        setIsloader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setMemberList([...memberList, ...res.data[0].objectList]);
            if (item?.assignedToUniqueId) {
              setAssignUser(item?.assignedTo);
              setAssignUserId(item.assignedToUniqueId);
            }
          } else {
            setMemberList([]);
          }
        } else {
          setMemberList([]);
        }
      })
      .catch(err => {
        setIsloader(false);
        setMemberList([]);
        Snackbar.show({
          text: I18n.t('EmptyView.somethingWentWrong'),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const toggleSwitch = val => {
    setIsEnabled(val);
    if (val) {
      setCompleted('Yes');
    } else {
      setCompleted('No');
    }
  };

  const handlePlusPriority = () => {
    if (priority < 5) {
      setPriority(priority + 1);
    } else {
      Snackbar.show({
        text: I18n.t('addTask.MaxPriority'),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.red,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  const handleMinusPriority = () => {
    if (priority > 1) {
      setPriority(priority - 1);
    } else {
      Snackbar.show({
        text: I18n.t('addTask.MinPriority'),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.red,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  const initialValues: AddNotesProps = {
    description: item?.description ? item.description : '',
    notes: item?.notes ? item.notes : '',
  };

  const addTaskApiService = values => {
    setIsloader(true);

    console.log('description', values.description);
    console.log('notes', values.notes);

    addTask(
      uniqueId,
      taskFolderId,
      values.description,
      values.notes,
      assignUserId,
      priority,
      completed,
    )
      .then((response: any) => {
        setIsloader(false);
        if (response.status == 200) {
          if (response.data[0] && response.data[0]?.status.code == 0) {
            Snackbar.show({
              text: I18n.t('addTask.TaskSuccessfully'),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });

            navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: MODULES.GroupDetailsScreen,
                    params: {
                      imageUrl: imageUrl,
                      title: title,
                      uniqueId: uniqueId,
                      fromss: froms,
                      canEditInfo: canEditInfo,
                    },
                  },
                ],
              }),
            });

            //navigation.goBack(null);
          } else {
            Snackbar.show({
              text: response.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        }
      })
      .catch(error => {
        setIsloader(false);
        console.log('error:', error);
        Snackbar.show({
          text: I18n.t('EmptyView.somethingWentWrong'),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const editTaskApiService = values => {
    setIsloader(true);

    console.log('description', values.description);
    console.log('notes', values.notes);

    editTask(
      uniqueId,
      folderId,
      taskId,
      values.description,
      values.notes,
      assignUserId,
      priority,
      completed,
    )
      .then((response: any) => {
        console.log('response:', JSON.stringify(response));

        setIsloader(false);
        if (response.status == 200) {
          if (response.data[0] && response.data[0]?.status.code == 0) {
            Snackbar.show({
              text: I18n.t('addTask.TaskUpdated'),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });

            navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: MODULES.GroupDetailsScreen,
                    params: {
                      imageUrl: imageUrl,
                      title: title,
                      canEditInfo: canEditInfo,
                      uniqueId: uniqueId,
                      fromss: 'Notes',
                    },
                  },
                ],
              }),
            });

            //navigation.goBack(null);
          } else {
            Snackbar.show({
              text: response.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        }
      })
      .catch(error => {
        setIsloader(false);
        console.log('error:', error);
      });
  };

  const renderRollRaw = (item, index) => {
    return (
      <TouchableOpacity
        style={WrapperContainer}
        onPress={() => {
          refRBSheetAlbum.current.close();
          setTaskFolderId(item.folderId);
          setTaskFolder(item.description);
        }}
      >
        <Text style={[ButtonSheetTitle]}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View testID="AddTaksScreen" style={Full}>
      <SafeRBSheet
        ref={refRBSheetAlbum}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={{ marginTop: -24 }}>
          <View style={commonStyle.subSheetContainer}>
            <Entypo
              name="circle-with-cross"
              size={25}
              onPress={() => {
                refRBSheetAlbum.current.close();
              }}
              color={color.palette.black}
            />
          </View>
          <View style={OverLayTopButtonContainerCencel}>
            <Text style={[OverLayTopButtonText, { marginBottom: 10 }]}>
              {I18n.t('addTask.SelectTaskFolder')}
            </Text>
          </View>
          <View style={SheetWrapper}>
            <FlatList
              data={taskFolderList}
              contentContainerStyle={{ alignItems: 'center' }}
              scrollEnabled={false}
              renderItem={({ item, index }) => renderRollRaw(item, index)}
              showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
              onPress={() => refRBSheetAlbum.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>{I18n.t('addTask.Cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>

      <View style={HeaderTop}>
        <Header
          title={
            !fromEdit ? I18n.t('addTask.AddTask') : I18n.t('addTask.EditTask')
          }
          //title={I18n.t('addTask.AddTask')}
          icon="chevron-left"
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>

      <View style={Body}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <KeyboardAwareScrollView
            style={commonStyle.KeyboardAwareScrollViewStyle}
            showsVerticalScrollIndicator={false}
          >
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values: any) => {
                if (values.description) {
                  Keyboard.dismiss();
                  if (!fromEdit) {
                    addTaskApiService(values);
                  } else {
                    editTaskApiService(values);
                  }
                }
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldTouched,
                touched,
                values,
                errors,
              }) => (
                <>
                  <View style={ButtonWrapper1}>
                    <Text style={ExtraTItle}>
                      {I18n.t('Userprofile.BasicInfo')}
                    </Text>
                  </View>

                  <View style={DetailsWrapper}>
                    <Input
                      label={translate('addGroup.descriptionLbl')}
                      value={values.description}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      validation={() => {
                        setFieldTouched('description');
                      }}
                      onSubmitEditing={() => {
                        inputComment.current.focus();
                      }}
                      error={touched.description && errors.description}
                      returnKeyType="next"
                      textarea
                      multiline
                      numberOfLines={10}
                      textAlignVertical={'top'}
                      ref={inputDescription}
                      blurOnSubmit={false}
                      placeholder={translate('addTask.description')}
                    />

                    <Input
                      label={translate('addTask.notesLbl')}
                      value={values.notes}
                      onChangeText={handleChange('notes')}
                      onBlur={handleBlur('notes')}
                      validation={() => {
                        setFieldTouched('notes');
                      }}
                      error={touched.notes && errors.notes}
                      returnKeyType="next"
                      textarea
                      multiline
                      numberOfLines={10}
                      textAlignVertical={'top'}
                      ref={inputComment}
                      blurOnSubmit={false}
                      placeholder={translate('addTask.notes')}
                    />

                    {!fromEdit ? (
                      <View style={taskFolderLblWrapper}>
                        <View style={{ width: '90%' }}>
                          <Text>{translate('addTask.taskFolderLbl')}</Text>
                        </View>

                        <View style={taskFolderWrapper}>
                          <Text style={lableTitle}>{taskFolder}</Text>

                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => refRBSheetAlbum.current.open()}
                          >
                            <MaterialIcons
                              name="keyboard-arrow-down"
                              size={fontSize(20)}
                              color={color.palette.blackSecondary}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}
                    <View style={taskFolderLblWrapper}>
                      <View style={{ width: '100%' }}>
                        <Text>{translate('addTask.priorityLbl')}</Text>
                      </View>

                      <View style={taskFolderWrapper}>
                        <Text style={lableTitle}>{priority}</Text>

                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => handleMinusPriority()}
                        >
                          <AntDesign
                            name="minuscircle"
                            size={fontSize(20)}
                            style={{ marginRight: 50 }}
                            color={color.palette.blackSecondary}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => handlePlusPriority()}
                        >
                          <AntDesign
                            name="pluscircle"
                            size={fontSize(20)}
                            color={color.palette.blackSecondary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={
                        Platform.OS == 'ios'
                          ? AssignToWrapperIos
                          : AssignToWrapperAndroid
                      }
                    >
                      <Text style={SeverityTitle}>
                        {translate('addTask.AssignTo')}
                      </Text>

                      <CommonDropdown
                        open={open}
                        setOpen={setOpen}
                        dropdownStyle={commonStyle.DropDownPickerStyle}
                        containerStyle={{
                          width: '100%',
                        }}
                        formTypeInput={formTypeInput}
                        labelStyle={{
                          fontSize: fontSize(14),
                        }}
                        itemStyle={{ justifyContent: 'flex-start' }}
                        value={assignUser}
                        setValue={setAssignUser}
                        placeholder={translate(
                          'addTask.SelectMemberToAssignTask',
                        )}
                        items={memberList.map((item: any) => ({
                          label: item.name,
                          value: item.name,
                          assignId: item.uniqueId,
                        }))}
                        onChangeItem={item => {
                          setAssignUser(item.value);
                          setAssignUserId(item.assignId);
                        }}
                      />
                    </View>

                    <View style={taskFolderLblWrapper}>
                      <View style={{ width: '100%' }}>
                        <Text>{translate('addTask.completedLbl')}</Text>
                      </View>

                      <View style={taskFolderWrapper}>
                        <Text style={lableTitle}>{completed}</Text>

                        <Switch
                          onValueChange={val => toggleSwitch(val)}
                          value={isEnabled}
                        />
                      </View>
                    </View>
                  </View>

                  {!fromEdit ? (
                    <Button
                      tx={'Userprofile.submit'}
                      style={signUpButtonContainer}
                      isLoader={isLoader}
                      disabled={isLoader}
                      textStyle={BottonTitle}
                      onPress={() => handleSubmit()}
                    />
                  ) : (
                    <Button
                      tx={'Userprofile.Update'}
                      style={signUpButtonContainer}
                      isLoader={isLoader}
                      disabled={isLoader}
                      textStyle={BottonTitle}
                      onPress={() => handleSubmit()}
                    />
                  )}
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
