import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  Text,
  Alert,
  Linking,
} from 'react-native';

// Import the external lib.
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonActions, useRoute } from '@react-navigation/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Formik } from 'formik';
import Snackbar from 'react-native-snackbar';

// Import the custom function,styles and common components.
import { Header, Button, Input } from '@components/index';
import I18n from '@app/i18n/i18n';
import { editDrug, deleteRxDrug } from '@app/services/api/groups';
import { assets } from '../../../../../../../assets/images';
import {
  FULL,
  HEADERTOP,
  BODY,
  RawContainerMain,
  ButtonWrapperMain1,
  ImageWrapper2,
  DrugTitle,
  ButtonContainer,
  BottonTitle,
  IsEditTextInputView,
  TitleLabel,
  styleWrapper,
  LabelStyle,
  addPhoto,
  listLabel,
  SelectMedication,
  DrugHeader,
  Style,
} from './Style';

import { color } from '@app/theme';
import { GROUP_DETAILS, MODULES } from '@app/constants';
import { translate } from '@app/i18n/translate';
import ShowImage from '@app/components/FastImage/ShowImage';
import useAppNavigation from '@app/navigation/navigation';
import CommonDropdown from '@app/components/DropDown/CommonDropDown';

const validationSchema = yup.object().shape({
  dosage: yup
    .string()
    .trim()
    .label(I18n.t('rxDrug.enterDosage'))
    .required(I18n.t('rxDrug.dosageRequired')),

  quantity: yup
    .string()
    .trim()
    .label(I18n.t('rxDrug.enterDosageTime'))
    .required(I18n.t('rxDrug.dosageTimeRequired')),
});

export interface drugValues {
  dosage: string;
  quantity: string;
  note: string;
}

export const ViewDrugScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route: any = useRoute();
  const formTypeInput = useRef(null);

  const item = route.params.item;

  const uniqueId = route.params.uniqueId;
  const imageUrls = route.params.imageUrls;
  const titles = route.params.titles;
  const canEditInfo = route.params.canEditInfo;
  const dosageRef = useRef(null);
  const quantityRef = useRef(null);
  const noteRef = useRef(null);

  const [category, setCategory] = useState(
    item.customDataMedicationForm != '' ? item.customDataMedicationForm : '',
  );
  const [open, setOpen] = useState(false);
  const [isLoader, setIsloader] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const initialValues: drugValues = {
    dosage: item.customDataDosage != '' ? item.customDataDosage : '',
    quantity: item.customDataFrequency != '' ? item.customDataFrequency : '',
    note: item.notes != '' ? item.notes : '',
  };

  useEffect(() => {
    const subscibe = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => subscibe.remove();
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const addDrugApiService = (dosage, quantity, category, note) => {
    setIsloader(true);
    editDrug(
      item.bookmarkId,
      uniqueId,
      item.uniqueId,
      dosage,
      quantity,
      category,
      note,
    )
      .then((response: any) => {
        console.log('response:', JSON.stringify(response));

        setIsloader(false);
        if (response.status == 200) {
          if (response.data[0] && response.data[0]?.status.code == 0) {
            Snackbar.show({
              text: I18n.t('rxDrug.drugsUpdated'),
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
                      imageUrl: imageUrls,
                      title: titles,
                      uniqueId: uniqueId,
                      fromss: GROUP_DETAILS.Rx,
                      canEditInfo: canEditInfo,
                    },
                  },
                ],
              }),
            });

            //navigation.goBack(null);
          } else {
          }
        }
      })
      .catch(error => {
        setIsloader(false);
        console.log('error:', error);
      });
  };

  const handleViewDrugInfo = useCallback(() => {
    ViewDrugWebInfo(item?.webPage);
  }, [item?.webPage]);

  const ViewDrugWebInfo = async (webPage: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.open(webPage).then((response: any) => {
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else {
        Linking.openURL(webPage);
      }
    } catch (error) {
      // showErrorMessage(error?.message);
    }
  };

  const deleteDialog = useCallback(() => {
    Alert.alert(`${item.description}`, I18n.t('rxDrug.sureDrugDelete'), [
      {
        text: 'Yes',
        onPress: () => {
          console.log('evd');
          deleteServiceApicall();
          {
          }
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  }, [!isEdit && canEditInfo === 'true']);

  const deleteServiceApicall = () => {
    setIsloader(true);
    deleteRxDrug(item.bookmarkId, uniqueId)
      .then(res => {
        console.log('myRxDrugApiCall', JSON.stringify(res));
        setIsloader(false);

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: I18n.t('rxDrug.drugsDeleted'),
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
                      imageUrl: imageUrls,
                      title: titles,
                      canEditInfo: canEditInfo,
                      uniqueId: uniqueId,
                      fromss: 'Rx',
                    },
                  },
                ],
              }),
            });

            //navigation.goBack(null);
          }
        }
      })
      .catch(err => {
        setIsloader(false);

        console.log('err', err);
      });
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onRightPress = useCallback(() => {
    if (canEditInfo === 'true') {
      setIsEdit(!isEdit);
    } else {
      Snackbar.show({
        text: I18n.t('rxDrug.NoPermission'),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.lightGreen,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  }, [canEditInfo]);

  return (
    <View testID="ViewDrugScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={I18n.t('rxDrug.DrugsDetails')}
          icon="chevron-left"
          iconRight={isEdit ? 'cross' : 'edit'}
          onPressLeft={goBack}
          onPressRight={onRightPress}
        />
      </View>

      <TouchableWithoutFeedback
        style={{ marginTop: -24 }}
        onPress={() => {
          Keyboard.dismiss();
          formTypeInput.current.close();
        }}
      >
        <View style={BODY}>
          <KeyboardAwareScrollView
            style={{ width: undefined, height: undefined }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <View style={RawContainerMain}>
              <View style={DrugHeader}>
                <ShowImage
                  source={assets.rxdrugs}
                  imageStyle={ImageWrapper2}
                  resizeMode="stretch"
                />
                <Text style={DrugTitle}>{item.description}</Text>
              </View>

              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={values => {
                  if (values.dosage && values.quantity) {
                    Keyboard.dismiss();
                    addDrugApiService(
                      values.dosage,
                      values.quantity,
                      category,
                      values.note,
                    );
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  touched,
                  values,
                  errors,
                  setFieldTouched,
                }) => (
                  <>
                    {/* <FloatingTextField
                      placeholderTx={'rxDrug.enterDosage'}
                      value={values.dosage}
                      onChangeText={handleChange('dosage')}
                      onBlur={handleBlur('dosage')}
                      editable={isEdit}
                      error={touched.dosage && errors.dosage}
                      autoCorrect={false}
                      autoCapitalize="none"
                      titlefontSize={fontSize(14)}
                      selectionColor={color.palette.black}
                    />
                    <FloatingTextField
                      placeholderTx={'rxDrug.enterDosageTime'}
                      value={values.quantity}
                      onChangeText={handleChange('quantity')}
                      onBlur={handleBlur('quantity')}
                      returnKeyType="done"
                      editable={isEdit}
                      error={touched.quantity && errors.quantity}
                      autoCorrect={false}
                      autoCapitalize="none"
                      titlefontSize={fontSize(14)}
                      selectionColor={color.palette.black}
                    /> */}

                    <Input
                      styleLable={TitleLabel}
                      styleWrapper={styleWrapper}
                      label={translate('rxDrug.dosageLbl')}
                      style={
                        isEdit == true
                          ? { ...LabelStyle, ...IsEditTextInputView }
                          : LabelStyle
                      }
                      mandatory={false}
                      editable={isEdit}
                      value={values.dosage}
                      onChangeText={handleChange('dosage')}
                      onBlur={handleBlur('dosage')}
                      validation={() => {
                        setFieldTouched('dosage');
                      }}
                      error={touched.dosage && errors.dosage}
                      ref={dosageRef}
                      onSubmitEditing={() => {
                        quantityRef.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      placeholder={translate('rxDrug.enterDosage')}
                    />

                    <Input
                      styleLable={TitleLabel}
                      style={
                        isEdit == true
                          ? { ...LabelStyle, ...IsEditTextInputView }
                          : LabelStyle
                      }
                      styleWrapper={styleWrapper}
                      label={translate('rxDrug.TimeLbl')}
                      mandatory={false}
                      editable={isEdit}
                      // style={isEdit == true ? IsEditTextInputView : null}
                      value={values.quantity}
                      onChangeText={handleChange('quantity')}
                      onBlur={handleBlur('quantity')}
                      validation={() => {
                        setFieldTouched('quantity');
                      }}
                      error={touched.quantity && errors.quantity}
                      ref={quantityRef}
                      onSubmitEditing={() => {
                        noteRef.current.focus();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="next"
                      placeholder={translate('rxDrug.enterDosageTime')}
                    />
                    <View style={SelectMedication}>
                      <Text style={TitleLabel}>{'Select medication'}</Text>
                    </View>

                    <CommonDropdown
                      open={open}
                      setOpen={setOpen}
                      dropdownStyle={
                        isEdit == true
                          ? { ...addPhoto, ...IsEditTextInputView }
                          : addPhoto
                      }
                      disabled={!isEdit}
                      containerStyle={Style.fullwidth}
                      labelStyle={listLabel}
                      formTypeInput={formTypeInput}
                      placeholderStyle={listLabel}
                      itemStyle={Style.contentSelf}
                      value={category}
                      setValue={setCategory}
                      placeholder="Select form of medication"
                      items={[
                        { label: 'Unset', value: 'Unset' },
                        { label: 'Tablet', value: 'Tablet' },
                        { label: 'Capsule', value: 'Capsule' },
                        { label: 'Aerosol', value: 'Aerosol' },
                        { label: 'Bar', value: 'Bar' },
                        { label: 'Cream', value: 'Cream' },
                        { label: 'Injection', value: 'Injection' },
                        { label: 'Suppository', value: 'Suppository' },
                        {
                          label: 'Transdermal patch',
                          value: 'Transdermal patch',
                        },
                        { label: 'Other', value: 'Other' },
                      ]}
                      onChangeItem={item => {
                        setCategory(item.value);
                      }}
                    />

                    {/* <FloatingTextField
                      placeholderTx={'rxDrug.enterNote'}
                      value={values.note}
                      onChangeText={handleChange('note')}
                      onBlur={handleBlur('note')}
                      returnKeyType="done"
                      editable={isEdit}
                      autoCorrect={false}
                      autoCapitalize="none"
                      titlefontSize={fontSize(14)}
                      selectionColor={color.palette.black}
                    /> */}

                    <Input
                      styleLable={TitleLabel}
                      style={
                        isEdit == true
                          ? { ...LabelStyle, ...IsEditTextInputView }
                          : LabelStyle
                      }
                      styleWrapper={styleWrapper}
                      label={translate('rxDrug.notesLbl')}
                      mandatory={false}
                      editable={isEdit}
                      value={values.note}
                      onChangeText={handleChange('note')}
                      onBlur={handleBlur('note')}
                      validation={() => {
                        setFieldTouched('note');
                      }}
                      error={touched.note && errors.note}
                      ref={noteRef}
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="done"
                      placeholder={translate('rxDrug.enterNote')}
                    />

                    {isEdit ? (
                      <View style={ButtonWrapperMain1}>
                        <Button
                          tx={'rxDrug.Update'}
                          style={ButtonContainer}
                          isLoader={isLoader}
                          textStyle={BottonTitle}
                          onPress={() => handleSubmit()}
                        />
                      </View>
                    ) : null}

                    {item?.webPage && !isEdit ? (
                      <View style={ButtonWrapperMain1}>
                        <Button
                          tx={'rxDrug.viewDrugInfo'}
                          style={ButtonContainer}
                          textStyle={BottonTitle}
                          onPress={() => handleViewDrugInfo()}
                        />
                      </View>
                    ) : null}

                    {!isEdit && canEditInfo === 'true' ? (
                      <View style={ButtonWrapperMain1}>
                        <Button
                          tx={'rxDrug.removeDrugs'}
                          style={ButtonContainer}
                          isLoader={isLoader}
                          textStyle={BottonTitle}
                          onPress={() => deleteDialog()}
                        />
                      </View>
                    ) : null}
                  </>
                )}
              </Formik>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
