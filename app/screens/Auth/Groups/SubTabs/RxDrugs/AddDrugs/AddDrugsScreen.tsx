import React, { useState, useRef } from 'react';
import { View, Keyboard, Image, Text } from 'react-native';

// Import the external lib.
import {
  CommonActions,
  RouteProp,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { Formik } from 'formik';
import Snackbar from 'react-native-snackbar';
import * as yup from 'yup';

// Import the custom function and common components.
import { Header, Button, Input } from '@components/index';
import I18n from '@app/i18n/i18n';
import { addDrug } from '@app/services/api/groups';
import { assets } from '../../../../../../../assets/images';
import { GROUP_DETAILS, MODULES } from '@app/constants';
import { translate } from '@app/i18n/translate';

// Import the style and utils
import {
  FULL,
  HEADERTOP,
  BODY,
  RawContainerMain,
  loginButtonContainer,
  BottonTitle,
  ImageWrapper2,
  DrugTitle,
  TitleLabel,
  LabelStyle,
  styleWrapper,
  SelectMedication,
  addPhoto,
  listLabel,
  DrugHeader,
  Style,
} from './AddDrugsStyle';
import { color, fontSize } from '@app/theme';
import { showErrorMessage } from '@app/utils/commonFunction';
import RNKeyboardView from '@app/components/RNKeyboardView/RNKeyboardView';
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

export interface Values {
  dosage: string;
  quantity: string;
  note: string;
}
type RouteProps = {
  AddDrug: {
    profileUniqueId: string;
    uniqueId: string;
    title: string;
    imageUrls: string;
    grptitle: string;
    canEditInfo: boolean;
  };
};
type AddDrugsScreenProp = RouteProp<RouteProps, 'AddDrug'>;

export const AddDrugsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<AddDrugsScreenProp>();
  const [open, setOpen] = useState(false);
  const formTypeInput = useRef(null);

  const profileUniqueId = route.params.profileUniqueId;
  const uniqueId = route.params.uniqueId;
  const title = route.params.title;
  const imageUrls = route.params.imageUrls;
  const grptitle = route.params.grptitle;
  const canEditInfo = route.params.canEditInfo;

  const [category, setCategory] = useState('');
  const [isLoader, setIsloader] = useState(false);

  const dosageRef = useRef(null);
  const quantityRef = useRef(null);
  const noteRef = useRef(null);

  const initialValues: Values = {
    dosage: '',
    quantity: '',
    note: '',
  };

  const addDrugApiService = (
    dosage: string,
    quantity: string,
    category: string,
    note: string,
  ) => {
    addDrug(profileUniqueId, uniqueId, dosage, quantity, category, note)
      .then((response: any) => {
        if (response.status == 200) {
          if (response.data[0] && response.data[0]?.status.code == 0) {
            setIsloader(false);
            Snackbar.show({
              text: I18n.t('rxDrug.drugsAdded'),
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
                      title: grptitle,
                      canEditInfo: canEditInfo,
                      uniqueId: profileUniqueId,
                      fromss: GROUP_DETAILS.Rx,
                    },
                  },
                ],
              }),
            });

            //navigation.goBack(null);
          } else {
            showErrorMessage(response.data[0]?.status?.errorText);
            setIsloader(false);
          }
        }
      })
      .catch(error => {
        setIsloader(false);
        console.log('error:', error);
      });
  };

  return (
    <View testID="AddDrugsScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={I18n.t('rxDrug.addDrugs')}
          icon="chevron-left"
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>

      <View style={BODY}>
        <RNKeyboardView
          keyboardVerticalOffset={fontSize(95)}
          containerStyle={Style.root}
        >
          <View style={RawContainerMain}>
            <View style={DrugHeader}>
              <Image
                source={assets.rxdrugs}
                style={ImageWrapper2}
                resizeMode="stretch"
              />
              <Text style={DrugTitle}>{title}</Text>
            </View>

            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={values => {
                if (values.dosage && values.quantity) {
                  Keyboard.dismiss();
                  setIsloader(true);

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
                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate('rxDrug.dosageLbl')}
                    mandatory={false}
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
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate('rxDrug.TimeLbl')}
                    mandatory={false}
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
                    dropdownStyle={addPhoto}
                    dropDownContainerStyle={{
                      width: '100%',
                    }}
                    formTypeInput={formTypeInput}
                    setValue={setCategory}
                    labelStyle={listLabel}
                    value={category}
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

                  <Input
                    styleLable={TitleLabel}
                    style={LabelStyle}
                    styleWrapper={styleWrapper}
                    label={translate('rxDrug.notesLbl')}
                    mandatory={false}
                    value={values.note}
                    onChangeText={handleChange('note')}
                    onBlur={handleBlur('note')}
                    validation={() => {
                      setFieldTouched('note');
                    }}
                    error={touched.note && errors.note}
                    ref={noteRef}
                    onSubmitEditing={() => {
                      //noteRef.current.focus();
                      Keyboard.dismiss();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="done"
                    placeholder={translate('rxDrug.enterNote')}
                  />

                  <Button
                    tx={'Userprofile.submit'}
                    onPress={() => handleSubmit()}
                    isLoader={isLoader}
                    disabled={isLoader}
                    style={loginButtonContainer}
                    textStyle={BottonTitle}
                  />
                </>
              )}
            </Formik>
          </View>
        </RNKeyboardView>
      </View>
    </View>
  );
};
