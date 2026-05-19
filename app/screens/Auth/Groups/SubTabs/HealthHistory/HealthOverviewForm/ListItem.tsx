import React, { useState, useRef, Fragment, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  RefreshControl,
  Alert,
} from "react-native";

// import external libraries
import { pick, types } from "@react-native-documents/picker";
import RNFetchBlob from "rn-fetch-blob";
import FileViewer from "react-native-file-viewer";
import md5 from "md5";
import _ from "lodash";
import RNFS from "react-native-fs";
import { Formik } from "formik";
import * as yup from "yup";
import Snackbar from "react-native-snackbar";
import moment from "moment";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Config } from "react-native-config";
import I18n from "i18n-js";
import ReadMore from "react-native-read-more-text";

// import custom function
import { color, font, fontSize, verticalScale } from "@theme/index";
import {
  Button,
  EmptyView,
  Loader,
  Input,
  InputHealth,
  AlertBox,
} from "@app/components";
import { translate } from "@lang/index";
import { MyHealthItem } from "./MyHealthItem";
import { FamilyHealthItem } from "./FamilyHealthItem";
import {
  getPersonalHealthDetails,
  getfamilyHealthHistory,
  postFamilyHealthHistory,
  postPersonalHealthDetails,
  getHealthOverview,
  postHealthOverview,
  postPreviewReport,
  getSendMonitorReportHistory,
  getVaccineListInitial,
  getProgressNotes,
  deleteDPTask,
} from "@app/services/api/groups";
import {
  GROUP_DETAILS,
  MODULES,
  SafeOverlay,
  SafeRBSheet,
} from "@app/constants";
import { ReportHistoryItem } from "./ReportHistory/ReportHistoryItem";
import { RNCalendarPicker } from "@app/components/CalendarPicker/RNCalendarPicker";
import useAppNavigation from "@app/navigation/navigation";
import { useRedux } from "@app/redux/hooks";

// import custom styling & utils
import {
  FULL,
  BODY,
  RawContainerMain,
  RawContainerSendReport,
  loginButtonContainer1,
  BottonTitle1,
} from "./myHealthStyles";
import commonStyle from "@app/theme/commonStyle";
import { showErrorMessage } from "@app/utils/commonFunction";
import {
  ButtonSheetTitle,
  OverLayButtonContainerCencel,
  OverLayButtonText,
  OverLayTopButtonContainerCencel,
  OverLayTopButtonText,
  SheetWrapper,
  TextContainer,
  TitleSenReport,
  WrapperContainer,
} from "./familyHealthStyles";
import { styles } from "./ManualMonitoringStyle";
import { HoStyles } from "./healthStyle";
import {
  backdropStyle,
  MainOverLayContainer,
  overlay,
  OverLayButtonContainer1,
  OverLayRowContainer1,
  OverLayText,
} from "./vaccinestyle";
import {
  checkPermissionAbove33Version,
  checkPermissionBelow33Version,
} from "@app/utils/Permissions/Permission";
import {
  AntDesign,
  ElementIcon,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@app/utils/icons/VectorIcons";
import { content } from "@app/utils/string";
import { trackApiEvent } from "@app/utils/appReport/ActivityReport";
import { points } from "@app/utils/appReport/ReportPoint";
import { method } from "@app/services/api/Method";
import { CheckBox } from "../../../../../../../assets/svg/CheckBoxChecked";
import { CheckBoxUnCheck } from "../../../../../../../assets/svg/CheckBoxUnChecked";

/**
 Validations schemas
 */
const validationSchemaHOV = yup.object().shape({
  weightlbs: yup.string().required(translate("addManualHealthData.weightLb")),
  procedure: yup.array().of(
    yup.object().shape({
      procedureName: yup.string().required("Procedure Name is required"),
    })
  ),
  diagnosis: yup.array().of(
    yup.object().shape({
      diagnosisName: yup.string().required("Diagnosis Name is required"),
    })
  ),
});

const validationSchemaSendReport = yup.object().shape({
  emailFirst: yup
    .string()
    .label(I18n.t("signIn.email"))
    .email(I18n.t("signIn.enterEmailValid"))
    .required(I18n.t("sendReportPlaceholder.emailFirstRequired")),
  namefirst: yup
    .string()
    .required(I18n.t("sendReportPlaceholder.nameFirstRequired")),
  emailSecond: yup
    .string()
    .label(I18n.t("signIn.email"))
    .email(I18n.t("signIn.enterEmailValid")),
});

/**
 ListItem components types *
 */
export interface FitnessValues {
  weightLb: string;
  weightKg: string;
  heightCm: string;
  heightIn: string;
  age: string;
  bpm: string;
  bloodOx: string;
  glucose: string;
  tempF: string;
  tempC: string;
  bpSystolic: string;
  bpDiastolic: string;
}

export interface BackgroundValues {
  gender: string;
  race: string;
  zip: string;
  primaryName: string;
  primaryContact: string;
  primaryAlt: string;
  secondaryName: string;
  secondaryContact: string;
  secondaryAlt: string;
  emgName: string;
  emgRel: string;
  emgPhone: string;
  primaryCName: string;
  primaryCContact: string;
  primaryCAlt: string;
  secondaryCName: string;
  secondaryCContact: string;
  secondaryCAlt: string;
  policyIn: string;
  policy: string;
  policyPhone: string;
  dob: string;
}

export interface ListsProps {
  id: number;
  profile: string;
  title: string;
  arrowIcon: string;
  IsOpen: boolean;
  onPress: Function;
  setProfile: Function;
}

export interface HealthOverviewValues {
  allergicTo: string;
  race: string;
  medications: string;
  other: string;
  diagnosis?: Array<string>;
  procedure?: Array<string>;
  diagnosis1?: string;
  diagnosis2?: string;
  diagnosis3?: string;
  diagnosis4?: string;
  diagnosis5?: string;
  procedure1?: string;
  procedure2?: string;
  procedure3?: string;
  procedure4?: string;
  procedure5?: string;
  weightlbs: string;
  heightCm?: string;
}

export interface SendReportValues {
  healthInfoAbout: string;
  namefirst: string;
  emailFirst: string;
  nameSecond: string;
  emailSecond: string;
  subject: string;
  message: string;
  other: string;
}

export interface MyHealthProps {
  id: number;
  selected: string;
  title: string;
  onPress: Function;
}

export interface FamilyHealthProps {
  id: number;
  selected: boolean;
  changes: boolean;
  title: string;
  recordNumber: string;
  relation: string;
  onPress: Function;
  setChange: Function;
}

export interface ReportHistoryProps {
  reportTime: string;
  timeAgo: string;
  firstUsername: string;
  secondUsername: string;
  userName: string;
  userImageUrl: string;
  userEmailId: string;
  userRole: string;
}

let bdDate = "Select date";
let sdDate = "Select date";
let spDate = "Select date";

/**
 * ListItem components
 *
 */
export function ListItem(props: ListsProps) {
  const { title, profile, setProfile } = props;

  const getContentComponent = () => {
    switch (title) {
      case "Patient Profile":
        setProfile("");
        return <>{HealthOverviewForm(profile)}</>;

      case "Send Report":
        setProfile("");
        return <>{SendReportForm(profile)}</>;

      case "Health History":
        setProfile("Health History");
        return <>{MyHealth(profile)}</>;

      case "Family Health History":
        setProfile("Health History");
        return <>{FamilyHealth(profile)}</>;

      case "Report History":
        setProfile("");
        return <>{ReportHistory(profile)}</>;

      case "Vaccine History":
        setProfile("");
        return <>{VaccOverviewForm(profile)}</>;

      case "Progress Notes":
        setProfile("");
        return <>{ProgressNotes(profile)}</>;

      default:
        return null;
    }
  };

  const shouldWrapInKeyboardDismiss = [
    "Patient Profile",
    "Send Report",
    "Family Health History",
    "Progress Notes",
  ].includes(title);

  return (
    <View style={stylesMain.RawContainerMain}>
      <View style={stylesMain.RawContainer}>
        <FontAwesome
          style={stylesMain.iconOne}
          name="circle"
          size={fontSize(24)}
          color={
            props.IsOpen ? color.secondaryLight : color.palette.blackSecondary
          }
        />
        <Text style={props.IsOpen ? stylesMain.TitleOpen : stylesMain.Title}>
          {title}
        </Text>

        <TouchableOpacity onPress={() => props.onPress()}>
          <MaterialIcons
            name={props.arrowIcon}
            size={fontSize(28)}
            color={
              props.IsOpen ? color.secondary : color.palette.blackSecondary
            }
            style={{ marginRight: 14 }}
          />
        </TouchableOpacity>
      </View>

      {props.IsOpen && (
        <View style={stylesMain.RawSub1Container}>
          {shouldWrapInKeyboardDismiss ? (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{ backgroundColor: "pink", flex: 1 }}>
                {getContentComponent()}
              </View>
            </TouchableWithoutFeedback>
          ) : (
            getContentComponent()
          )}
        </View>
      )}
    </View>
  );
}

const stylesMain = StyleSheet.create({
  iconOne: {
    justifyContent: "center",
    marginVertical: 4,
    paddingLeft: 14,
  },
  RawContainerMain: {
    width: "96%",
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "#000000",
    borderColor: color.palette.lightGrey,

    shadowOffset: { width: 0, height: fontSize(2) },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: color.white,
  },

  RawContainerBottom: {
    flexDirection: "row",
  },

  RawContainerBottom1: {
    backgroundColor: color.palette.green,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10,
  },
  RawContainer: {
    backgroundColor: color.white,
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 6,
  },
  RawSubContainer: {
    backgroundColor: color.palette.white,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  RawSub1Container: {
    backgroundColor: color.palette.white,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
    flex: 1,
  },
  ImageContainer: {
    backgroundColor: color.palette.blackSecondary,
    width: fontSize(20),
    height: fontSize(20),
    borderRadius: fontSize(20),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  ImageWrapper: {
    width: fontSize(30),
    height: fontSize(30),
    marginLeft: 10,
    marginVertical: 4,
  },
  TextContainer: {
    backgroundColor: color.palette.darkGray,
    flex: 1,
    margin: 10,
  },
  Title: {
    fontSize: fontSize(16),
    color: color.palette.blackSecondary,
    flex: 1,
    fontFamily: font.Poppins_Medium,
    paddingLeft: 12,
  },
  TitleOpen: {
    fontSize: fontSize(16),
    color: color.secondaryLight,
    flex: 1,
    fontFamily: font.Poppins_Medium,
    paddingLeft: 12,
  },
  SUBTitle: {
    fontSize: fontSize(16),
    color: color.palette.blackSecondary,
    flex: 1,
    fontFamily: font.Poppins_Medium,
  },
  TitleLocation: {
    fontSize: fontSize(12),
    color: color.palette.darkGray,
    fontFamily: font.Poppins_Medium,
  },
  TitleNotes: {
    fontSize: fontSize(12),
    color: color.palette.white,
    fontFamily: font.Poppins_Medium,
  },
});
var sdDate1 = "";
const HealthOverviewForm = (profile) => {
  const [hovData, setHovData] = useState([]);
  const [bgTime, setBgTime] = useState("");
  const [bgUpdateBy, setBgUpdateBy] = useState("");
  const [gender, setGender] = useState(0);
  const [, setNumTextInputs] = useState(0);
  const [diagnosisList, setDiagnosisList] = useState([]);
  const [procedureList, setProcedureList] = useState([]);
  const [, setProcedureInput] = useState(0);
  const [initialize, setReinitalize] = useState(true);
  const [sdDates, setSdDates] = useState([]);
  const [spDates, setSpDates] = useState([]);
  const [mainSpData, setMainSpData] = useState([]);
  const [mainSdData, setMainSdData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [bWeight, setBWeight] = useState("");
  const [bmi, setBmi] = useState("0");
  const weightlbs = useRef(null);
  const allergicTo = useRef(null);
  const medications = useRef(null);
  const other = useRef(null);
  const race = useRef(null);
  const diagnosisRef = useRef([]);
  const procedureRef = useRef([]);
  const [bdDateVisible, setBdDateVisible] = useState(false);
  const [sdDateVisible, setSdDateVisible] = useState(false);
  const [spDateVisible, setSpDateVisible] = useState(false);
  const [sdIndex, setSdIndex] = useState(0);
  const [spIndex, setSpIndex] = useState(0);
  const [isLoaderForm, setIsLoaderFrom] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [inches, setInches] = useState(0);
  const [ft, setFt] = useState(1);

  const initialValue: HealthOverviewValues = {
    allergicTo: hovData[0]?.allergicTo ? hovData[0]?.allergicTo.trim() : "",
    race: hovData[0]?.race ? hovData[0]?.race.trim() : "",
    medications: hovData[0]?.medications ? hovData[0]?.medications.trim() : "",
    other: hovData[0]?.other ? hovData[0]?.other.trim() : "",

    diagnosis: diagnosisList.length > 0 ? diagnosisList : [],
    procedure: procedureList.length > 0 ? procedureList : [],
    weightlbs: hovData[0]?.weightLbs ? hovData[0]?.weightLbs.trim() : "",
  };

  useEffect(() => {
    let TodayDateMoment = moment();
    let localTodayDate = moment.utc(TodayDateMoment).local().format();
    bdDate = moment(localTodayDate).format("DD-MM-YYYY");
    sdDate1 = "Select date";
  }, []);

  useEffect(() => {
    getHealthOverviewApiCall();
  }, []);

  const getHealthOverviewApiCall = () => {
    setIsLoader(true);
    getHealthOverview(profile)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${MODULES.HealthOverview}_${I18n.t(
            "healthOverviewLabel.PatientProfile"
          )}`,
          endpoint: points.healthOverview,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setHovData(res.data[0].objectList);
            calculatedBmiToHeight(
              res?.data[0]?.objectList[0]?.weightLbs,
              res?.data[0]?.objectList[0]?.heightFeet,
              res?.data[0]?.objectList[0]?.heightInches
            );
            setBgUpdateBy(res.data[0].objectList[0].userName);

            setGender(res.data[0].objectList[0].gender == "Male" ? 0 : 1);

            if (res.data[0].objectList[0]?.birthdate !== "null") {
              bdDate = moment(
                res.data[0].objectList[0]?.birthdate,
                "YYYY-MM-DD"
              ).format("DD-MM-YYYY");
            }

            setBgTime(
              moment(res.data[0].objectList[0].modified).format(
                "MMM DD, YYYY,HH:mm a"
              )
            );

            const filteredArr = [
              ...new Set(JSON.parse(res.data[0].objectList[0]?.diagnoseList)),
            ];

            setSdDates(filteredArr);

            const filteredArr1 = [
              ...new Set(JSON.parse(res.data[0].objectList[0]?.procedureList)),
            ];
            setBWeight(res.data[0].objectList[0].weightLbs);
            setSpDates(filteredArr1);

            setMainSpData(JSON.parse(res.data[0].objectList[0]?.procedureList));
            setMainSdData(JSON.parse(res.data[0].objectList[0]?.diagnoseList));
            setDiagnosisList(
              JSON.parse(res.data[0].objectList[0]?.diagnoseList)
            );
            setNumTextInputs(
              JSON.parse(res.data[0].objectList[0]?.diagnoseList).length
            );
            setProcedureList(
              JSON.parse(res.data[0].objectList[0]?.procedureList)
            );
            setProcedureInput(
              JSON.parse(res.data[0].objectList[0]?.procedureList).length
            );

            setInches(parseInt(res.data[0].objectList[0].heightInches));
            setFt(parseInt(res.data[0].objectList[0].heightFeet));
            setIsLoader(false);
          } else {
            setHovData([]);
            setIsLoader(false);
          }
        } else {
          setHovData([]);
          setIsLoader(false);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${MODULES.HealthOverview}_${I18n.t(
            "healthOverviewLabel.PatientProfile"
          )}`,
          endpoint: points.healthOverview,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setHovData([]);
        setIsLoader(false);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const deleteDiagnosisItem = (ind, diagnosis, setFieldValue) => {
    setIsLoader(true);

    deleteDPTask("deleteDiagnosis", "diagnosisId", profile, ind)
      .then(async (res) => {
        setIsLoader(false);
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${I18n.t("healthOverviewLabel.PatientProfile")}_${I18n.t(
            "healthOverviewLabel.DeleteDiagnosis"
          )}`,
          endpoint: points.userFitnessRecord,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        if (res.data && res.data.length > 0) {
          setIsLoader(false);
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const updateList = diagnosisList.filter(
              (diagnosis) => diagnosis.id != ind
            );
            setFieldValue("diagnosis", updateList);
            setDiagnosisList(updateList);
            setSdDates(updateList);
            Snackbar.show({
              text: I18n.t("addTask.diagnosisDeleted"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,

              numberOfLines: 5,
            });
          } else {
            let diagnosisData = diagnosis ?? [];

            const updateList = diagnosisData.filter((data) => data.id != ind);
            setFieldValue("diagnosis", updateList);
            setDiagnosisList(updateList);
            setSdDates(updateList);
            setNumTextInputs(updateList?.length);
          }
        } else {
          setIsLoader(false);
          let diagnosisData = diagnosis ?? [];
          const updateList = diagnosisData.filter((data) => data.id != ind);
          setFieldValue("diagnosis", updateList);
          setDiagnosisList(updateList);
          setSdDates(updateList);
          setNumTextInputs(updateList?.length);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${I18n.t("healthOverviewLabel.PatientProfile")}_${I18n.t(
            "healthOverviewLabel.DeleteDiagnosis"
          )}`,
          endpoint: points.userFitnessRecord,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
      });
  };

  const deleteProcedureItem = (ind, procedure, setFieldValue) => {
    setIsLoader(true);

    deleteDPTask("deleteProcedure", "procedureId", profile, ind)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${I18n.t("healthOverviewLabel.PatientProfile")}_${I18n.t(
            "healthOverviewLabel.DeleteProcedure"
          )}`,
          endpoint: points.deleteProcedure,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        if (res.data && res.data.length > 0) {
          setIsLoader(false);
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const updateList = procedureList.filter(
              (procedure) => procedure.id != ind
            );
            setFieldValue("procedure", updateList);
            setProcedureInput(updateList.length);
            setProcedureList(updateList);
            setSpDates(updateList);
            Snackbar.show({
              text: I18n.t("addTask.procedureDeleted"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          } else {
            let procedureData = procedure ?? [];
            const updateList = procedureData.filter((data) => data.id != ind);
            setFieldValue("procedure", updateList);
            setProcedureList(updateList);
            setSpDates(updateList);
            setProcedureInput(updateList?.length);
          }
        } else {
          setIsLoader(false);
          let procedureData = procedure ?? [];
          const updateList = procedureData.filter((data) => data.id != ind);
          setFieldValue("procedure", updateList);
          setProcedureList(updateList);
          setSpDates(updateList);
          setProcedureInput(updateList?.length);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${I18n.t("healthOverviewLabel.PatientProfile")}_${I18n.t(
            "healthOverviewLabel.DeleteProcedure"
          )}`,
          endpoint: points.deleteProcedure,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);

        console.log("err", err);
      });
  };

  const onDiagnosisHandle = (e, i) => {
    const rowData = diagnosisList;
    rowData.map((row) => {
      if (row.id == i) {
        row.diagnosisName = e;
      }
      const filteredArr = [...new Set(rowData)];
      setSdDates(filteredArr);
    });
  };

  const onProcedureHandle = (e, i) => {
    const rowData = procedureList;
    rowData.map((row) => {
      if (row.id == i) {
        row.procedureName = e;
      }
      const filteredArr = [...new Set(rowData)];
      setSpDates(filteredArr);
    });
  };

  const handleSdDateConfirm = (date: moment.MomentInput) => {
    const dateList = diagnosisList;
    sdDate = moment(date).format("DD-MM-YYYY");
    Keyboard.dismiss();
    dateList[sdIndex].diagnosisDate = sdDate;
    setSdDates(dateList);
    hideSdDate1Picker();
    setReinitalize(false);
  };

  const handleSpDateConfirm = (date: moment.MomentInput) => {
    const dateList = procedureList;
    spDate = moment(date).format("DD-MM-YYYY");
    Keyboard.dismiss();
    dateList[spIndex].procedureDate = spDate;
    setSpDates(dateList);
    hideSdDate1Picker();
    setReinitalize(false);
  };

  const hideSdDate1Picker = () => {
    setSpDateVisible(false);
    setBdDateVisible(false);
    setSdDateVisible(false);
  };

  const handleBdDateConfirm = (date: moment.MomentInput) => {
    bdDate = moment(date).format("DD-MM-YYYY");
    Keyboard.dismiss();
    hideSdDate1Picker();
  };

  const callpostHovApi = async (data: any) => {
    const updateDList = [];
    sdDates.map((newObj) => {
      console.log("mainSdData.some", newObj.diagnosisDate);
      // let updateDate = moment(newObj.diagnosisDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
      if (mainSdData.some((oldObj) => oldObj.id === newObj.id)) {
        newObj.diagnosisDate =
          newObj.diagnosisDate == ""
            ? moment(Date.now()).format("DD-MM-YYYY")
            : newObj.diagnosisDate;
        updateDList.push(newObj);
      } else {
        newObj.id = 0;
        newObj.diagnosisDate =
          newObj.diagnosisDate == ""
            ? moment(Date.now()).format("DD-MM-YYYY")
            : newObj.diagnosisDate;
        updateDList.push(newObj);
      }
    });

    const updatePList = [];
    spDates.map((newObj) => {
      if (mainSpData.some((oldObj) => oldObj.id === newObj.id)) {
        newObj.procedureDate =
          newObj.diagnprocedureDateosisDate == ""
            ? moment(Date.now()).format("DD-MM-YYYY")
            : newObj.procedureDate;
        updatePList.push(newObj);
      } else {
        newObj.id = 0;
        newObj.procedureDate =
          newObj.procedureDate == ""
            ? moment(Date.now()).format("DD-MM-YYYY")
            : newObj.procedureDate;
        updatePList.push(newObj);
      }
    });
    const formData = new FormData();
    formData.append("profile", profile);
    formData.append("medications", data.medications);
    formData.append("allergicTo", data.allergicTo);
    formData.append("gender", data.gender == 0 ? "Male" : "Female");
    formData.append("race", data.race);
    formData.append("birthdate", data.bdDate == "null" ? "" : data.bdDate);
    formData.append("heightFeet", data.heightFeet.toString());
    formData.append("heightInches", data.heightInches.toString());
    formData.append("weightLbs", data.weightlbs);
    formData.append("bmi", bmi);
    formData.append("other", data.other);
    formData.append("diagnoseList", JSON.stringify(updateDList));
    formData.append("procedureList", JSON.stringify(updatePList));

    setIsLoaderFrom(true);

    postHealthOverview(formData)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${MODULES.HealthOverview}_${I18n.t(
            "healthOverviewLabel.PatientProfile"
          )}`,
          endpoint: points.healthOverview,
          method: method.POST,
          status: statusCode,
          response: res,
        });
        setIsLoaderFrom(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: "Patient Profile data added successfully",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
            setEditMode(false);
            getHealthOverviewApiCall();
          } else {
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        } else {
          Snackbar.show({
            text: res.data[0].status.errorText,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${MODULES.HealthOverview}_${I18n.t(
            "healthOverviewLabel.PatientProfile"
          )}`,
          endpoint: points.healthOverview,
          method: method.POST,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoaderFrom(false);
        console.log("err==", err);
      });
  };

  const calculatedBmiToHeight = (weight, feet, inch) => {
    const weightInPounds = weight ? parseFloat(weight) : 0;
    const height1 = feet ? parseFloat(feet) * 12 : 1;
    const height2 = inch ? parseFloat(inch) : 0;
    const heightInInches = height1 + height2;

    const bmi =
      weight == "" ||
      heightInInches.toString().length == 0 ||
      heightInInches == 0
        ? 0
        : (weightInPounds / Math.pow(heightInInches, 2)) * 703;

    setBmi(bmi.toFixed(2));
  };

  const handleMinusFeet = () => {
    if (ft > 1) {
      setFt(ft - 1);
      calculatedBmiToHeight(bWeight, ft - 1, inches);
    } else {
      Snackbar.show({
        text: I18n.t("addTask.MinNumber"),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.red,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  const handleMinusInch = () => {
    if (inches > 0) {
      setInches(inches - 1);
      calculatedBmiToHeight(bWeight, ft, inches - 1);
    } else {
      Snackbar.show({
        text: I18n.t("addTask.MinNumber"),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.red,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  const handlePlusInch = () => {
    if (inches < 11) {
      setInches(inches + 1);
      calculatedBmiToHeight(bWeight, ft, inches + 1);
    } else {
      Snackbar.show({
        text: I18n.t("addTask.MaxNumber"),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.red,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  const handlePlusFeet = () => {
    if (ft < 12) {
      setFt(ft + 1);
      calculatedBmiToHeight(bWeight, ft + 1, inches);
    } else {
      Snackbar.show({
        text: I18n.t("addTask.MaxNumber"),
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: color.palette.red,
        textColor: color.palette.white,
        numberOfLines: 5,
      });
    }
  };

  const onCencel = () => {
    let TodayDateMoment = moment();
    let localTodayDate = moment.utc(TodayDateMoment).local().format();
    bdDate = moment(localTodayDate).format("YYYY-MM-DD");
    sdDate = "Select date";
    spDate = "Select date";
    getHealthOverviewApiCall();
  };

  return (
    <View style={HoStyles.root}>
      <RNCalendarPicker
        isVisible={spDateVisible}
        onClose={hideSdDate1Picker}
        onDateSelect={handleSpDateConfirm}
        selectedDate={
          spDates[spIndex]?.procedureDate
            ? spDates[spIndex]?.procedureDate
            : moment(new Date()).format("DD-MM-YYYY")
        }
        mode={"future"}
      />
      <RNCalendarPicker
        isVisible={sdDateVisible}
        onClose={hideSdDate1Picker}
        onDateSelect={handleSdDateConfirm}
        selectedDate={
          sdDates[sdIndex]?.diagnosisDate
            ? sdDates[sdIndex]?.diagnosisDate
            : moment(new Date()).format("DD-MM-YYYY")
        }
        mode={"future"}
      />
      <RNCalendarPicker
        isVisible={bdDateVisible}
        onClose={hideSdDate1Picker}
        onDateSelect={handleBdDateConfirm}
        selectedDate={bdDate}
        mode={"past"}
      />

      <View style={HoStyles.container}>
        <Formik
          validationSchema={validationSchemaHOV}
          enableReinitialize={initialize}
          initialValues={initialValue}
          onSubmit={(values: any) => {
            Keyboard.dismiss();
            let updateBDate = moment(bdDate, "DD-MM-YYYY").format("YYYY-MM-DD");
            const backgroundData = {
              ...values,
              gender: gender,
              heightFeet: ft,
              heightInches: inches,
              bdDate: bdDate == "Select date" ? "" : updateBDate,
            };

            callpostHovApi(backgroundData);
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
            resetForm,
            setFieldValue,
          }) => (
            <Fragment>
              <View style={HoStyles.section}>
                {!isLoader ? (
                  <View style={styles.statusContainer}>
                    <View>
                      {editMode ? (
                        <Button
                          text="Save"
                          style={styles.button}
                          onPress={() => {
                            handleSubmit();
                          }}
                          textStyle={styles.buttonTitle}
                          isLoader={isLoaderForm}
                          disabled={isLoaderForm}
                        />
                      ) : (
                        <Button
                          text="Edit"
                          style={styles.buttonEdit}
                          onPress={() => {
                            setEditMode(true);
                          }}
                          textStyle={styles.buttonEditTitle}
                          isLoader={isLoaderForm}
                          disabled={isLoaderForm}
                        />
                      )}
                    </View>
                    {bgTime ? (
                      <View style={[styles.status, { flex: 1, marginLeft: 4 }]}>
                        <Text style={styles.statusText}>
                          Last Updated: {bgTime}
                        </Text>
                        <Text style={styles.statusText}>(by {bgUpdateBy})</Text>
                      </View>
                    ) : null}
                  </View>
                ) : null}
                <Text style={HoStyles.sectionTitle}>
                  {translate("healthOverviewLabel.Basicinfo")}
                </Text>

                <Text style={styles.subHeading}>
                  {" "}
                  {translate("backgroundLabel.gender")}
                </Text>
                <View style={styles.horizontalContainer}>
                  <View style={styles.radioButtonSection}>
                    <TouchableOpacity
                      style={styles.radioContainer}
                      disabled={!editMode}
                      onPress={() => setGender(0)}
                    >
                      <Text style={styles.radioLabel}>
                        {" "}
                        {translate("background.radio1")}
                      </Text>

                      {gender == 0 ? (
                        <CheckBox
                          width={fontSize(25)}
                          height={fontSize(25)}
                          fill={color.palette.black}
                        />
                      ) : (
                        <CheckBoxUnCheck
                          width={fontSize(25)}
                          height={fontSize(25)}
                          fill={color.palette.black}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={!editMode}
                      style={styles.radioContainer}
                      onPress={() => setGender(1)}
                    >
                      <Text style={styles.radioLabel}>
                        {" "}
                        {translate("background.radio2")}
                      </Text>

                      {gender == 1 ? (
                        <CheckBox
                          width={fontSize(25)}
                          height={fontSize(25)}
                          fill={color.palette.black}
                        />
                      ) : (
                        <CheckBoxUnCheck
                          width={fontSize(25)}
                          height={fontSize(25)}
                          fill={color.palette.black}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ ...HoStyles.horizontalContainer }}>
                  <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
                    <View style={HoStyles.inputContainer}>
                      <Text style={styles.heightFeet}>
                        {translate("healthOverviewLabel.HeightFeet")}
                      </Text>

                      <View
                        style={[
                          HoStyles.wrapper,
                          { borderColor: color.border },
                          {
                            flexDirection: "row",
                            backgroundColor: editMode
                              ? color.palette.lightGrey
                              : null,
                          },
                        ]}
                      >
                        <Text style={HoStyles.inchLbl}>{ft}</Text>

                        <TouchableOpacity
                          activeOpacity={1}
                          disabled={!editMode}
                          style={{ paddingHorizontal: 10 }}
                          onPress={() => {
                            setReinitalize(false);
                            handleMinusFeet();
                          }}
                        >
                          <AntDesign
                            name="minuscircle"
                            size={fontSize(20)}
                            color={color.palette.blackSecondary}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={1}
                          disabled={!editMode}
                          style={HoStyles.padBothTen}
                          onPress={() => {
                            setReinitalize(false);
                            handlePlusFeet();
                          }}
                        >
                          <AntDesign
                            name="pluscircle"
                            size={fontSize(20)}
                            color={color.palette.blackSecondary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={1} style={HoStyles.fullFlex}>
                    <View style={HoStyles.inputContainer}>
                      <Text style={styles.heightFeet}>
                        {translate("healthOverviewLabel.HeightInches")}
                      </Text>

                      <View
                        style={[
                          HoStyles.wrapper,
                          HoStyles.alignRow,
                          { borderColor: color.border },
                          {
                            backgroundColor: editMode
                              ? color.palette.lightGrey
                              : null,
                          },
                        ]}
                      >
                        <Text style={HoStyles.inchLbl}>{inches}</Text>

                        <TouchableOpacity
                          activeOpacity={1}
                          disabled={!editMode}
                          style={HoStyles.padBothTen}
                          onPress={() => {
                            setReinitalize(false);
                            handleMinusInch();
                          }}
                        >
                          <AntDesign
                            name="minuscircle"
                            size={fontSize(20)}
                            color={color.palette.blackSecondary}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={1}
                          disabled={!editMode}
                          style={HoStyles.padBothTen}
                          onPress={() => {
                            handlePlusInch();
                            setReinitalize(false);
                          }}
                        >
                          <AntDesign
                            name="pluscircle"
                            size={fontSize(20)}
                            color={color.palette.blackSecondary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={HoStyles.inputFull}>
                  <View style={HoStyles.directionRow}>
                    <View style={HoStyles.fullFlex}>
                      <InputHealth
                        editable={editMode}
                        label={translate("backgroundLabel.race")}
                        style={
                          editMode == true
                            ? HoStyles.darkInputHorizontal
                            : HoStyles.inputNew
                        }
                        value={values.race}
                        onChangeText={handleChange("race")}
                        onFocus={() => setReinitalize(false)}
                        onBlur={handleBlur("race")}
                        isReinitialize={true}
                        validation={() => {
                          setFieldTouched("race");
                        }}
                        ref={race}
                        onSubmitEditing={() => {
                          Keyboard.dismiss();
                          setTimeout(() => {
                            weightlbs.current.focus();
                          }, 100);
                        }}
                        blurOnSubmit={false}
                        returnKeyType="next"
                        placeholder={translate("backgroundPlaceholder.race")}
                      />
                    </View>

                    <TouchableOpacity
                      disabled={!editMode}
                      onPress={() => setBdDateVisible(!bdDateVisible)}
                      style={HoStyles.fullFlex}
                    >
                      <View style={HoStyles.inputContainer}>
                        <Text style={HoStyles.selectVDate}>
                          {translate("backgroundLabel.dob")}
                        </Text>

                        <View
                          style={[
                            HoStyles.wrapper,
                            { borderColor: color.border },
                            {
                              backgroundColor: editMode
                                ? color.palette.lightGrey
                                : null,
                            },
                            { height: 42 },
                          ]}
                        >
                          <Text
                            style={[
                              HoStyles.dobDate,
                              {
                                color:
                                  bdDate === "Select date"
                                    ? color.palette.lightGrey
                                    : color.palette.black,
                              },
                            ]}
                          >
                            {bdDate}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <InputHealth
                    label={translate("healthOverviewLabel.Weightlbs")}
                    editable={editMode}
                    value={values.weightlbs}
                    onChangeText={(e) => {
                      setBWeight(e);
                      setReinitalize(false);
                      calculatedBmiToHeight(e, ft, inches);
                      handleChange("weightlbs")(e);
                    }}
                    onBlur={handleBlur("weightlbs")}
                    validation={() => {
                      setFieldTouched("weightlbs");
                    }}
                    onFocus={() => setReinitalize(false)}
                    isReinitialize={true}
                    style={
                      editMode == true
                        ? HoStyles.darkInputFullHorizontal
                        : HoStyles.inputFull
                    }
                    error={touched.weightlbs && errors.weightlbs}
                    ref={weightlbs}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                      setTimeout(() => {
                        allergicTo.current.focus();
                      }, 100);
                    }}
                    blurOnSubmit={true}
                    returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                    keyboardType="numeric"
                    placeholder={translate("healthOverview.weightlbsHoder")}
                  />
                  <InputHealth
                    editable={false}
                    label={`${translate("healthOverviewLabel.BMI")}`}
                    value={bmi}
                    style={
                      editMode == true
                        ? HoStyles.darkInputFullHorizontal
                        : HoStyles.inputFull
                    }
                    placeholder={translate("healthOverviewLabel.BMI")}
                  />
                  <InputHealth
                    editable={editMode}
                    label={translate("healthOverviewLabel.AllergicTo")}
                    value={values.allergicTo}
                    style={
                      editMode == true
                        ? HoStyles.darkInputFullHorizontal
                        : HoStyles.inputFull
                    }
                    onFocus={() => setReinitalize(false)}
                    isReinitialize={true}
                    onChangeText={handleChange("allergicTo")}
                    onBlur={handleBlur("allergicTo")}
                    validation={() => {
                      setFieldTouched("allergicTo");
                    }}
                    error={touched.allergicTo && errors.allergicTo}
                    ref={allergicTo}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                      setTimeout(() => {
                        medications.current.focus();
                      }, 100);
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={translate("healthOverview.allergicHoder")}
                  />

                  <InputHealth
                    editable={editMode}
                    label={translate("healthOverviewLabel.Medications")}
                    value={values.medications}
                    onChangeText={handleChange("medications")}
                    onBlur={handleBlur("medications")}
                    validation={() => {
                      setFieldTouched("medications");
                    }}
                    onFocus={() => setReinitalize(false)}
                    isReinitialize={true}
                    error={touched.medications && errors.medications}
                    ref={medications}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                      setTimeout(() => {
                        other.current.focus();
                      }, 100);
                    }}
                    style={
                      editMode == true
                        ? HoStyles.darkInputFullHorizontal
                        : HoStyles.inputFull
                    }
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={translate("healthOverview.medicationsHoder")}
                  />
                  <InputHealth
                    editable={editMode}
                    label={translate("healthOverviewLabel.Other")}
                    value={values.other}
                    onChangeText={handleChange("other")}
                    onBlur={handleBlur("other")}
                    validation={() => {
                      setFieldTouched("other");
                    }}
                    onFocus={() => setReinitalize(false)}
                    isReinitialize={true}
                    style={
                      editMode == true
                        ? HoStyles.darkInputFullHorizontal
                        : HoStyles.inputFull
                    }
                    error={touched.other && errors.other}
                    ref={other}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                      setTimeout(() => {
                        if (diagnosisList.length > 0)
                          diagnosisRef.current[0].focus();
                        else if (procedureList.length > 0)
                          procedureRef.current[0].focus();
                        else Keyboard.dismiss();
                      }, 100);
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={translate("healthOverview.otherHoder")}
                  />
                </View>

                <View style={HoStyles.diagnosesCal}>
                  <Text style={HoStyles.sectionTitle}>
                    {translate("healthOverviewLabel.SignificantDiagnoses")}
                  </Text>
                  <TouchableOpacity
                    disabled={!editMode}
                    activeOpacity={1}
                    style={HoStyles.addCal}
                    onPress={() => {
                      const arr = {
                        diagnosisDate: "",
                        diagnosisName: "",
                        id: Date.now(),
                      };
                      const updatearr = diagnosisList;
                      updatearr.push(arr);
                      setNumTextInputs(updatearr.length);
                      setDiagnosisList(updatearr);
                      setReinitalize(false);
                    }}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={fontSize(20)}
                      color={color.palette.blackSecondary}
                    />
                  </TouchableOpacity>
                </View>
                <View style={HoStyles.inputFull}>
                  {diagnosisList.length == 0 ? (
                    <View style={HoStyles.baseView}>
                      <Text style={HoStyles.emptyTxt}>
                        {I18n.t("EmptyView.EpmtryDiagnosis")}
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={diagnosisList}
                      keyExtractor={(_item, index) => `message ${index}`}
                      renderItem={({ item, index }) => {
                        const valLength = values?.diagnosis[index]
                          ?.diagnosisName
                          ? Number(
                              values?.diagnosis[index]?.diagnosisName?.length /
                                30
                            )
                          : 0.5;

                        const updateNo =
                          valLength < 1
                            ? 38
                            : Number((40 * valLength).toFixed(0));
                        return (
                          <View style={[HoStyles.diagnosisCal3]}>
                            <View style={[HoStyles.fullFlex]}>
                              <InputHealth
                                multiline={true}
                                isType={"DP"}
                                editable={editMode}
                                label={`${translate(
                                  "healthOverviewLabel.Diagnosis"
                                )} :`}
                                style={
                                  editMode == true
                                    ? {
                                        ...HoStyles.updateDiagnoses,
                                        ...{
                                          maxHeight: verticalScale(updateNo),
                                        },
                                      }
                                    : {
                                        ...HoStyles.updateNewInput,
                                        ...{
                                          maxHeight: verticalScale(updateNo),
                                        },
                                      }
                                }
                                isReinitialize={true}
                                onFocus={() => setReinitalize(false)}
                                value={values?.diagnosis[index]?.diagnosisName}
                                onChangeText={async (e) => {
                                  onDiagnosisHandle(e, item.id);

                                  let tempary = values?.diagnosis ?? [];

                                  const testObj = tempary.findIndex(
                                    (value) => value.id === item.id
                                  );

                                  if (testObj === -1) {
                                    let newObj = {
                                      diagnosisName: item.diagnosisName,
                                      id: item.id,
                                    };
                                    tempary.push(newObj);
                                    setFieldValue("diagnosis", tempary);
                                  } else {
                                    tempary[testObj].diagnosisName =
                                      item.diagnosisName;
                                    tempary[testObj].id = item.id;
                                    setFieldValue("diagnosis", tempary);
                                  }
                                }}
                                onBlur={handleBlur(
                                  `diagnosis[${index}].diagnosisName`
                                )}
                                validation={() => {
                                  setFieldTouched(
                                    `diagnosis[${index}].diagnosisName`
                                  );
                                }}
                                error={
                                  touched?.diagnosis?.[index]?.diagnosisName &&
                                  errors?.diagnosis?.[index]?.diagnosisName
                                }
                                ref={(el) => (diagnosisRef.current[index] = el)}
                                onSubmitEditing={() => {
                                  Keyboard.dismiss();
                                  setTimeout(() => {
                                    procedureList.length <= 0 &&
                                    index == diagnosisList.length - 1
                                      ? Keyboard.dismiss()
                                      : index == diagnosisList.length - 1
                                      ? procedureRef.current[0].focus()
                                      : diagnosisRef.current[index + 1].focus();
                                  }, 100);
                                }}
                                blurOnSubmit={true}
                                returnKeyType="next"
                                placeholder={`${translate(
                                  "healthOverview.diagnosisHoder"
                                )}`}
                              />
                            </View>
                            <TouchableOpacity
                              disabled={!editMode}
                              onPress={() => {
                                setSdIndex(index);
                                setSdDateVisible(!sdDateVisible);
                              }}
                              style={{
                                width: fontSize(100),
                                marginBottom: errors?.diagnosis?.[index]
                                  ?.diagnosisName
                                  ? fontSize(12)
                                  : 0,
                                marginTop: 10,
                              }}
                            >
                              <View
                                style={{
                                  ...HoStyles.inputContainer,
                                  ...HoStyles.spaceBothH,
                                }}
                              >
                                <Text style={HoStyles.dateList}>
                                  {translate("healthOverviewLabel.Datemy")}
                                </Text>
                                <View
                                  style={[
                                    HoStyles.wrapper,
                                    { borderColor: color.border },
                                    {
                                      backgroundColor: editMode
                                        ? color.palette.lightGrey
                                        : null,
                                    },
                                    { height: 42 },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      {
                                        color:
                                          item.diagnosisDate == ""
                                            ? color.palette.darkGray
                                            : color.palette.black,
                                      },
                                      { fontSize: fontSize(13) },
                                    ]}
                                  >
                                    {sdDates[index]?.diagnosisDate
                                      ? sdDates[index]?.diagnosisDate
                                      : "Select date"}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                            {editMode && (
                              <TouchableOpacity
                                style={[
                                  HoStyles.deleteDIcon,
                                  {
                                    marginBottom: errors?.diagnosis?.[index]
                                      ?.diagnosisName
                                      ? fontSize(12)
                                      : 0,
                                    marginLeft: fontSize(5),
                                  },
                                ]}
                                onPress={() => {
                                  deleteDiagnosisItem(
                                    item.id,
                                    values.diagnosis,
                                    setFieldValue
                                  );
                                }}
                              >
                                <MaterialCommunityIcons
                                  name={"delete"}
                                  size={fontSize(22)}
                                  color={color.palette.black}
                                  style={HoStyles.deleteCalD}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        );
                      }}
                    />
                  )}
                </View>

                {/* New Design */}
                <View style={HoStyles.diagnosesCal}>
                  <Text style={HoStyles.sectionTitle}>
                    {translate("healthOverviewLabel.SignificantProcedures")}
                  </Text>
                  <View style={HoStyles.significantDP}>
                    <TouchableOpacity
                      disabled={!editMode}
                      activeOpacity={1}
                      style={HoStyles.addCal}
                      onPress={(e) => {
                        const arr = {
                          procedureDate: "",
                          procedureName: "",
                          id: Date.now(),
                        };
                        const updatearr = procedureList;
                        updatearr.push(arr);
                        setProcedureInput(updatearr.length);
                        setProcedureList(updatearr);
                        setReinitalize(false);
                      }}
                    >
                      <AntDesign
                        name="pluscircle"
                        size={fontSize(20)}
                        color={color.palette.blackSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={HoStyles.inputFull}>
                  {procedureList.length == 0 ? (
                    <View style={HoStyles.baseView}>
                      <Text style={HoStyles.emptyTxt}>
                        {I18n.t("EmptyView.EmptyProcedure")}
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={procedureList}
                      renderItem={({ item, index }) => {
                        const valLength = values?.procedure[index]
                          ?.procedureName
                          ? Number(
                              values?.procedure[index]?.procedureName?.length /
                                30
                            )
                          : 0.5;

                        const updateNo =
                          valLength < 1
                            ? verticalScale(40)
                            : Number((40 * valLength).toFixed(0));

                        return (
                          <View style={[HoStyles.diagnosisCal3]}>
                            <View style={HoStyles.fullFlex}>
                              <InputHealth
                                multiline={true}
                                isType={"DP"}
                                editable={editMode}
                                isReinitialize={true}
                                onFocus={() => setReinitalize(false)}
                                label={`${translate(
                                  "healthOverviewLabel.Procedure"
                                )} :`}
                                style={
                                  editMode == true
                                    ? {
                                        ...HoStyles.updateDiagnoses,
                                        ...{
                                          maxHeight: verticalScale(updateNo),
                                        },
                                      }
                                    : {
                                        ...HoStyles.updateNewInput,
                                        ...{
                                          maxHeight: verticalScale(updateNo),
                                        },
                                      }
                                }
                                value={values?.procedure[index]?.procedureName}
                                onChangeText={(e) => {
                                  onProcedureHandle(e, item.id);

                                  let tempary = values?.procedure ?? [];

                                  const testObj = tempary.findIndex(
                                    (value) => value.id === item.id
                                  );

                                  if (testObj === -1) {
                                    let newObj = {
                                      procedureName: item.procedureName,
                                      id: item.id,
                                    };
                                    tempary.push(newObj);
                                    setFieldValue("procedure", tempary);
                                  } else {
                                    tempary[testObj].procedureName =
                                      item.procedureName;
                                    tempary[testObj].id = item.id;
                                    setFieldValue("procedure", tempary);
                                  }
                                }}
                                onBlur={handleBlur(
                                  `procedure[${index}].procedureName`
                                )}
                                validation={() => {
                                  setFieldTouched(
                                    `procedure[${index}].procedureName`
                                  );
                                }}
                                error={
                                  touched?.procedure?.[index]?.procedureName &&
                                  errors?.procedure?.[index]?.procedureName
                                }
                                ref={(el) => (procedureRef.current[index] = el)}
                                onSubmitEditing={() =>
                                  index == procedureList.length - 1
                                    ? Keyboard.dismiss()
                                    : procedureRef.current[index + 1].focus()
                                }
                                blurOnSubmit={true}
                                returnKeyType="next"
                                placeholder={`${translate(
                                  "healthOverview.procedureHoder"
                                )}`}
                              />
                            </View>
                            <TouchableOpacity
                              disabled={!editMode}
                              onPress={() => {
                                setSpIndex(index);
                                setSpDateVisible(!spDateVisible);
                              }}
                              style={{
                                width: fontSize(100),
                                marginBottom: errors?.procedure?.[index]
                                  ?.procedureName
                                  ? fontSize(12)
                                  : 0,
                                marginTop: 10,
                              }}
                            >
                              <View
                                style={{
                                  ...HoStyles.inputContainer,
                                  ...HoStyles.spaceBothH,
                                }}
                              >
                                <Text style={HoStyles.dateList}>
                                  {translate("healthOverviewLabel.Datemy")}
                                </Text>
                                <View
                                  style={[
                                    HoStyles.wrapper,
                                    { borderColor: color.border },
                                    {
                                      backgroundColor: editMode
                                        ? color.palette.lightGrey
                                        : null,
                                    },
                                    { height: 42 },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      {
                                        color:
                                          item.procedureDate == ""
                                            ? color.palette.darkGray
                                            : color.palette.black,
                                      },
                                      { fontSize: fontSize(13) },
                                    ]}
                                  >
                                    {procedureList[index].procedureDate != ""
                                      ? procedureList[index].procedureDate
                                      : "Select date"}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                            {editMode && (
                              <TouchableOpacity
                                style={[
                                  HoStyles.deleteDIcon,
                                  {
                                    marginBottom: errors?.procedure?.[index]
                                      ?.procedureName
                                      ? fontSize(12)
                                      : 0,
                                    marginLeft: fontSize(5),
                                  },
                                ]}
                                onPress={() => {
                                  deleteProcedureItem(
                                    item.id,
                                    values.procedure,
                                    setFieldValue
                                  );
                                }}
                              >
                                <MaterialCommunityIcons
                                  name={"delete"}
                                  size={fontSize(22)}
                                  color={color.palette.black}
                                  style={HoStyles.deleteCalD}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        );
                      }}
                      keyExtractor={(_item, index) => `message ${index}`}
                    />
                  )}
                </View>

                {editMode == true ? (
                  <View style={styles.buttonContainer}>
                    <Button
                      text="Cancel"
                      style={styles.cancel}
                      onPress={() => {
                        setEditMode(false);
                        resetForm();
                        onCencel();
                      }}
                      textStyle={styles.buttonTitle}
                      isLoader={isLoaderForm}
                      disabled={isLoaderForm}
                    />
                  </View>
                ) : null}
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
    </View>
  );
};

const MyHealth = (profile) => {
  const [diseasesList, setDiseasesList] = useState([]);
  const [isLoaderForm, setIsLoaderFrom] = useState(false);
  const [myOtherDiseases, setMyOtherDiseases] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [refreshing] = useState(false);

  useEffect(() => {
    MyHealthApiCall();
  }, []);

  const MyHealthApiCall = () => {
    setIsLoader(true);
    getPersonalHealthDetails(profile)
      .then(async (res) => {
        setIsLoader(false);
        const cleanedArray = [];
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: GROUP_DETAILS.MyHealth,
          endpoint: points.personalHealthDetails,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            res.data[0].objectList.forEach((val) => {
              if (val.title !== "otherIssue") {
                cleanedArray.push(val);
              } else {
                setMyOtherDiseases(val.otherIssue);
              }
            });
            setDiseasesList(cleanedArray);
          }
        } else {
          setDiseasesList([]);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: GROUP_DETAILS.MyHealth,
          endpoint: points.personalHealthDetails,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setDiseasesList([]);
        setIsLoader(false);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const onRefresh = () => {
    MyHealthApiCall();
  };

  const callApi = () => {
    const cleanedArray = [];
    diseasesList.forEach((val) => {
      if (val.selected == "true") {
        cleanedArray.push(val.id);
      }
    });

    var str1 = cleanedArray.toString();

    const formData = new FormData();
    formData.append("values", str1);
    formData.append("profile", profile);
    formData.append("otherIssue", myOtherDiseases);

    setIsLoaderFrom(true);

    postPersonalHealthDetails(formData)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: GROUP_DETAILS.MyHealth,
          endpoint: points.personalHealthDetails,
          method: method.POST,
          status: statusCode,
          response: res,
        });
        setIsLoaderFrom(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: "Personal health details data added successfully",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
            HealthOverviewForm(profile);
          } else {
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        } else {
          Snackbar.show({
            text: res.data[0].status.errorText,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: GROUP_DETAILS.MyHealth,
          endpoint: points.personalHealthDetails,
          method: method.POST,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoaderFrom(false);
        console.log("err==", err);
      });
  };

  const renderRaw = (item: MyHealthProps, index: any) => {
    const handlePress = (index: number) => {
      const updatedData = diseasesList.map((object, i) => {
        if (i === index) {
          if (object.selected == "true") {
            object.selected = "false";
            return object;
          } else {
            object.selected = "true";
            return object;
          }
        } else {
          object.selected = object.selected;
          return object;
        }
      });

      setDiseasesList(updatedData);
    };

    return (
      <MyHealthItem
        id={item.id}
        selected={item.selected}
        title={item.title}
        onPress={() => handlePress(index)}
      />
    );
  };

  const goToset = (value1) => {
    setMyOtherDiseases(value1);
  };

  return (
    <View testID="MyHealthScreen" style={FULL}>
      <View style={BODY}>
        {isLoader ? <Loader /> : null}
        {!isLoader && diseasesList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyMyHealthHistory")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <KeyboardAwareScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            enableOnAndroid={true}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            viewIsInsideTabBar
          >
            <View style={HoStyles.myHealthListing}>
              <View style={{ ...RawContainerMain, ...HoStyles.subMyHealth }}>
                <FlatList
                  data={diseasesList}
                  renderItem={({ item, index }) => renderRaw(item, index)}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  style={HoStyles.fullFlex}
                  keyExtractor={(item) => item.id}
                  onEndReachedThreshold={0.1}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />

                {!isLoader ? (
                  <InputHealth
                    label={translate("healthOverviewLabel.Other")}
                    placeholder={translate("healthOverview.otherHoder")}
                    blurOnSubmit={false}
                    value={myOtherDiseases}
                    onChangeText={(e: any) => goToset(e)}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                  />
                ) : null}

                {!isLoader ? (
                  <View style={styles.buttonContainer}>
                    <Button
                      tx={"Userprofile.Save"}
                      style={styles.buttonSave}
                      onPress={() => callApi()}
                      textStyle={styles.buttonTitle}
                      isLoader={isLoaderForm}
                      disabled={isLoaderForm}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </View>
    </View>
  );
};

const VaccOverviewForm = (profile) => {
  var sdDate8 = "Select date";
  const [editVacc, setEditVacc] = useState(false);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      setTotalVaccineData(0);
      setVaccineInitial([]);
      getVaccineDataInitial();
    });
    return focus;
  }, []);

  const { groups } = content;
  const { login_detail } = useRedux([groups.loginDetail]);
  const userEmail = login_detail.email;
  const userPassword = login_detail.password;
  const navigation = useAppNavigation();
  const [showOverlayPost, setShowOverlayPost] = useState(false);
  const [bgTime, setBgTime] = useState("");
  const [bgUpdateBy, setBgUpdateBy] = useState("");
  const [vaccineInitial, setVaccineInitial] = useState([]);
  const [totalVaccineData, setTotalVaccineData] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  const vaccNameRef = useRef(null);
  const providerRef = useRef(null);

  const [sdDate8Visible, setSdDate8Visible] = useState(false);
  const [isLoaderForm] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [singleFile, setSingleFile] = useState(null);
  const [sd8val, setSdDate8] = useState("Select date");
  const [vaccineName, setVaccineName] = useState("");
  const [provider, setProvider] = useState("");
  const [dateTimestamp, setDateTimeStamp] = useState(
    moment(new Date()).format("DD-MM-YYYY")
  );

  useEffect(() => {
    let TodayDateMoment = moment();

    let localTodayDate = moment.utc(TodayDateMoment).local().format();
    bdDate = moment(localTodayDate).format("YYYY-MM-DD");
    sdDate1 = "Select date";
  }, []);

  useEffect(() => {
    getVaccineDataInitial();
  }, []);

  const getVaccineDataInitial = () => {
    setIsLoader(true);
    getVaccineListInitial(profile)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${GROUP_DETAILS.HealthOverview}_${MODULES.VaccineScreen}`,
          endpoint: points.vaccine,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        setTotalVaccineData(
          res.data[0].status.total == undefined ? 0 : res.data[0].status.total
        );

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              cleanedArray.push(val);
            });

            setBgTime(
              moment(cleanedArray[0].lastModifiedOn).format(
                "MMM DD, YYYY,HH:mm a"
              )
            );

            setBgUpdateBy(cleanedArray[0].lastModifiedBy);
            setVaccineInitial(cleanedArray);
            console.log("vaccineData", bgTime);
            setIsLoader(false);
          } else {
            setIsLoader(false);
          }
        } else {
          setIsLoader(false);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${GROUP_DETAILS.HealthOverview}_${MODULES.VaccineScreen}`,
          endpoint: points.vaccine,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const hideSdDate1Picker = () => {
    setSdDate8Visible(false);
  };

  const handleSdDate8Confirm = (date: moment.MomentInput) => {
    // console.log('date timestamp', setDateTimeStamp(moment(date)));
    sdDate8 = moment(date).format("DD-MM-YYYY");
    setSdDate8(sdDate8);
    console.log(sdDate8);
    Keyboard.dismiss();
    hideSdDate1Picker();
    setDateTimeStamp(sdDate8);
    setSdDate8(moment(date).format("MMMM DD , yyyy"));
    // setDateTimeStamp(moment(date));
    console.log("date timestamp", sdDate8);
  };

  const onCencel = () => {
    let TodayDateMoment = moment();

    let localTodayDate = moment.utc(TodayDateMoment).local().format();

    bdDate = moment(localTodayDate).format("YYYY-MM-DD");

    sdDate8 = "Select date";
  };

  const selectFiles = async () => {
    try {
      const result = await pick({
        type: [types.allFiles],

        allowMultiSelection: false,
      }); // result is always an array in new package

      if (result && result.length > 0) {
        setSingleFile(result[0]);
      }
    } catch (err) {
      setSingleFile(null);

      if (err?.code === "DOCUMENT_PICKER_CANCELED") {
        Alert.alert("You have not selected any file");
      } else {
        Alert.alert("Unknown Error");

        console.error("File picker error:", err);
      }
    }
  };

  const postVaccineData = () => {
    setIsLoader(true);
    const updateTimeStamp = moment(dateTimestamp, "DD-MM-YYYY", "MM-DD-YYYY");

    let uri =
      Platform.OS === "ios"
        ? decodeURIComponent(singleFile?.uri.replace("file://", ""))
        : singleFile?.uri;

    const now = new Date();
    const currentDate = `${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`;
    const ha1 = md5(`${userEmail}:${Config.REALM}:${userPassword}`);
    const ha2 = md5(`POST:` + "/api/vaccine?format=json");
    const responseAuth = md5(`${ha1}:${currentDate}:${ha2}`);

    const body = [
      { name: "profile", data: String(profile) },
      { name: "vaccineName", data: String(vaccineName) },
      { name: "physician", data: String(provider) },
      { name: "date", data: String(updateTimeStamp.unix() * 1000) },
      {
        name: "document",
        filename: singleFile ? singleFile.name : "",
        type: singleFile ? singleFile.type : "",
        data: singleFile ? RNFetchBlob.wrap(uri) : "",
      },
      { name: "updateDocument", data: singleFile ? "true" : "false" },
    ];

    const headers = {
      Accept: "application/json",
      "X-Concursive-Key": Config.AUTH_KEY ?? "",
      "X-Concursive-Platform": Platform.OS,
      "Content-Type": "multipart/form-data",
      Authorization: `Digest username="${userEmail}", realm="${Config.REALM}", nonce="${currentDate}", uri="/api/vaccine?format=json", algorithm="MD5", response="${responseAuth}"`,
    };

    RNFetchBlob.fetch(
      "POST",
      `${Config.BASE_URL}/api/vaccine?format=json`,
      headers,
      body
    )
      .then(async (res) => {
        setIsLoader(false);

        let tempObj = res?.data?.length > 0 ? JSON.parse(res?.data) : [];
        if (tempObj[0]?.status?.code === 0) {
          setTimeout(() => setShowOverlayPost(!showOverlayPost), 1000);

          Snackbar.show({
            text: "Vaccination data added successfully",
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
          });

          setEditVacc(false);
          setVaccineName("");
          setProvider("");
          setSingleFile(null);
          getVaccineDataInitial();
        } else {
          Snackbar.show({
            text: `Something went wrong`,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
          });
        }
      })
      .catch(async (err) => {
        console.log("err", err);
        Snackbar.show({
          text: String(err),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
        });
        setIsLoader(false);
      });
  };

  const updateVaccineData = () => {
    setIsLoader(true);
    const updateTimeStamp = moment(dateTimestamp, "DD-MM-YYYY", "MM-DD-YYYY");

    let uri =
      Platform.OS === "ios"
        ? decodeURIComponent(singleFile?.uri.replace("file://", ""))
        : singleFile?.uri;

    const now = new Date();
    const currentDate = `${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`;
    const ha1 = md5(`${userEmail}:${Config.REALM}:${userPassword}`);
    const ha2 = md5(`POST:` + "/api/vaccine?format=json");
    const responseAuth = md5(`${ha1}:${currentDate}:${ha2}`);

    const body = [
      { name: "profile", data: String(profile) },
      { name: "vaccineName", data: String(vaccineName) },
      { name: "physician", data: String(provider) },
      { name: "date", data: String(updateTimeStamp.unix() * 1000) },
      { name: "id", data: String(editId) },
      {
        name: "document",
        filename: singleFile ? singleFile.name : "",
        type: singleFile ? singleFile.type : "",
        data: singleFile ? RNFetchBlob.wrap(uri) : "",
      },
      { name: "updateDocument", data: singleFile ? "true" : "false" },
    ];

    const headers = {
      Accept: "application/json",
      "X-Concursive-Key": Config.AUTH_KEY ?? "",
      "X-Concursive-Platform": Platform.OS,
      "Content-Type": "multipart/form-data",
      Authorization: `Digest username="${userEmail}", realm="${Config.REALM}", nonce="${currentDate}", uri="/api/vaccine?format=json", algorithm="MD5", response="${responseAuth}"`,
    };

    RNFetchBlob.fetch(
      "POST",
      `${Config.BASE_URL}/api/vaccine?format=json`,
      headers,
      body
    )
      .then(async (res) => {
        setIsLoader(false);

        //     const statusCode = res?.data?.[0]?.status?.code || 200;
        //     await trackApiEvent({
        //       screen: `_update_${MODULES.VaccineScreen}`,
        //       endpoint: points.vaccine,
        //       method: method.POST,
        //       status: statusCode,
        //       response: res,
        //     });

        let tempObj = res?.data?.length > 0 ? JSON.parse(res?.data) : [];
        if (tempObj[0]?.status?.code === 0) {
          setTimeout(() => setShowOverlayPost(!showOverlayPost), 1000);

          Snackbar.show({
            text: "Vaccination data Updated successfully",
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
          });

          setEditVacc(false);
          setVaccineName("");
          setProvider("");
          setSingleFile(null);
          getVaccineDataInitial();
        } else {
          Snackbar.show({
            text: `Something went wrong`,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
          });
        }
      })
      .catch(async (err) => {
        // await trackApiEvent({
        //   screen: `_update_${MODULES.VaccineScreen}`,
        //   endpoint: points.vaccine,
        //   method: method.POST,
        //   status: err?.response?.status || 500,
        //   response: err,
        //   messageKey: I18n.t('EmptyView.somethingWentWrong'),
        // });
        console.log("err", err);
        Snackbar.show({
          text: String(err),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
        });
        setIsLoader(false);
      });
  };

  const checkPermission = async (documentUrl, subject) => {
    if (Platform.OS === "ios") {
      downloadIos(documentUrl, subject);
    } else {
      try {
        const granted =
          Number(Platform.Version) < 33
            ? await checkPermissionBelow33Version()
            : await checkPermissionAbove33Version();
        if (granted) {
          // Start downloading
          Download(documentUrl, subject);
        } else {
          // If permission denied then show alert
          Alert.alert("Error", I18n.t("groupDetails.StoragePermissionDenied"));
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
        Alert.alert("Error", err);
      }
    }
  };

  const Download = async (documentUrl, subject) => {
    var subjectName = subject;
    subjectName = subjectName.replace(/\..*/, "");

    var url = documentUrl;
    var ext: any = getFileExtention(url);
    ext = "." + ext[0];

    const localFile = `${RNFS.DocumentDirectoryPath}/${subject}.${ext}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        setIsLoader(false);
      })
      .catch((error) => {
        setIsLoader(false);

        Snackbar.show({
          text: error?.message,
          duration: Snackbar.LENGTH_SHORT,
        });
        // error
      })
      .catch((error) => {
        setIsLoader(false);
        console.log("error:", error);
      });
  };

  const downloadIos = async (documentUrl, subject) => {
    var subjectName = subject;
    subjectName = subjectName.replace(/\..*/, "");

    console.log("subjectName==", subjectName);

    let dirs = RNFetchBlob.fs.dirs.DocumentDir;

    var url = documentUrl;
    var ext: any = getFileExtention(url);
    ext = "." + ext[0];
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      path: dirs + "/File" + subjectName + ext,
    })
      .fetch("GET", documentUrl, {
        //some headers ..
      })
      .then((res) => {
        // console.log(resp);
        if (Platform.OS === "ios") {
          setIsLoader(false);

          RNFetchBlob.ios.openDocument(res.data);
        }
      });
  };

  const getFileExtention = (fileUrl) => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  return (
    <View style={HoStyles.root}>
      <SafeOverlay
        overlayStyle={overlay}
        backdropStyle={backdropStyle}
        isVisible={showOverlayPost}
        onBackdropPress={() => {
          // setShowOverlayPost(false);
        }}
      >
        <KeyboardAwareScrollView
          style={commonStyle.OverlayKeyboardStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <TouchableWithoutFeedback
            style={HoStyles.spaceTop}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={MainOverLayContainer}>
              <View style={OverLayRowContainer1}>
                <Entypo
                  name={"info-with-circle"}
                  size={fontSize(22)}
                  color={color.white}
                />
                <Text style={OverLayText}>
                  {!editVacc
                    ? "Add vaccination Details"
                    : "Edit vaccination Details"}
                </Text>
              </View>

              <View>
                <View style={HoStyles.fullWidth}>
                  <RNCalendarPicker
                    isVisible={sdDate8Visible}
                    onClose={hideSdDate1Picker}
                    onDateSelect={handleSdDate8Confirm}
                    selectedDate={moment(dateTimestamp, "DD-MM-YYYY").format(
                      "DD-MM-YYYY"
                    )}
                    mode={"future"}
                  />

                  <Input
                    label={"Name Of Vaccine/s"}
                    value={vaccineName}
                    onChangeText={(text) => {
                      setVaccineName(text);
                    }}
                    style={HoStyles.inputFull}
                    ref={vaccNameRef}
                    onSubmitEditing={() => {
                      providerRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={"Please enter name of Vaccine/s"}
                  />

                  <View style={HoStyles.significantDP}>
                    <Input
                      label={"Physician / Provider"}
                      style={HoStyles.inputNew}
                      value={provider}
                      onChangeText={(text) => {
                        setProvider(text);
                      }}
                      ref={providerRef}
                      onSubmitEditing={() => {
                        Keyboard.dismiss();
                      }}
                      blurOnSubmit={false}
                      returnKeyType="done"
                      placeholder={"Enter Physician"}
                    />

                    <TouchableOpacity
                      //   disabled={!editMode}
                      onPress={() => setSdDate8Visible(!sdDate8Visible)}
                      style={HoStyles.fullFlex}
                    >
                      <View style={HoStyles.inputContainer}>
                        <Text style={HoStyles.selectVDate}>{"Date"}</Text>

                        <View
                          style={[
                            HoStyles.wrapper,
                            { borderColor: color.border },
                            { height: 42 },
                          ]}
                        >
                          <Text
                            style={[
                              {
                                color:
                                  sd8val === "Select date"
                                    ? color.palette.darkGray
                                    : color.palette.black,
                              },
                            ]}
                          >
                            {sd8val}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => selectFiles()}
                    style={HoStyles.fileUpload}
                  >
                    <Text style={HoStyles.selectVDate}>Select File</Text>
                  </TouchableOpacity>
                  {singleFile != null ? (
                    <View style={HoStyles.fileView}>
                      <Text style={HoStyles.selectFileWrapper}>
                        {singleFile?.name
                          ? "File Name : " + singleFile?.name
                          : ""}
                      </Text>
                      <TouchableWithoutFeedback
                        onPress={() => setSingleFile(null)}
                      >
                        {singleFile?.name ? (
                          <MaterialIcons name="delete" size={25} />
                        ) : null}
                      </TouchableWithoutFeedback>
                    </View>
                  ) : null}
                </View>
              </View>

              <Button
                text="Save"
                isLoader={isLoader}
                disabled={isLoader}
                style={loginButtonContainer1}
                textStyle={BottonTitle1}
                onPress={() => {
                  vaccineName == "" ||
                  dateTimestamp == "" ||
                  sd8val == "Select date" ||
                  provider == ""
                    ? Snackbar.show({
                        text: "Fields can not be empty",
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: color.palette.red,
                        textColor: color.palette.white,
                        numberOfLines: 5,
                      })
                    : editVacc
                    ? updateVaccineData()
                    : postVaccineData();
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  setEditVacc(false);
                  setShowOverlayPost(!showOverlayPost);
                }}
                style={OverLayButtonContainer1}
              >
                <Text style={OverLayButtonText}>
                  {I18n.t("groupDetails.Cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </SafeOverlay>

      <View style={HoStyles.container}>
        <Formik
          validationSchema={validationSchemaHOV}
          enableReinitialize
          initialValues={{}}
          onSubmit={(values: any) => {
            Keyboard.dismiss();
          }}
        >
          {({ resetForm }) => (
            <Fragment>
              <ScrollView
                style={HoStyles.fullFlex}
                contentContainerStyle={HoStyles.vaccSpaceBottom}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={HoStyles.section}>
                  {!isLoader ? (
                    <View style={styles.statusContainer}>
                      <View>
                        {!editMode && totalVaccineData != 0 ? (
                          <Button
                            text="Edit"
                            style={styles.buttonEdit}
                            onPress={() => {
                              setEditMode(true);
                            }}
                            textStyle={styles.buttonEditTitle}
                            isLoader={isLoaderForm}
                            disabled={isLoaderForm}
                          />
                        ) : null}
                      </View>
                      {bgTime ? (
                        <View
                          style={{ ...styles.status, ...styles.vaccLastUpdate }}
                        >
                          <Text style={styles.statusText}>
                            Last Updated:{bgTime}
                          </Text>
                          <Text style={styles.statusText}>
                            (by {bgUpdateBy})
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  ) : null}

                  <View style={HoStyles.vaccSection}>
                    <Text style={HoStyles.sectionTitle}>Vaccines</Text>
                    <MaterialCommunityIcons
                      name="plus-circle-outline"
                      size={fontSize(25)}
                      style={HoStyles.plusIcon}
                      color={color.secondary}
                      onPress={() => {
                        [
                          setSingleFile(null),
                          setEditVacc(false),
                          setVaccineName(""),
                          setProvider(""),
                          setSdDate8("Select date"),
                          setShowOverlayPost(true),
                        ];
                      }}
                    />
                  </View>
                  {vaccineInitial.map((item) => {
                    return (
                      <View style={HoStyles.mainVaccView}>
                        <View style={HoStyles.vaccSubView}>
                          <View style={HoStyles.vaccDateView}>
                            <Text style={{ color: color.white }}>
                              {moment
                                .unix(item?.date / 1000)
                                .format("MMMM DD , YYYY")}
                            </Text>
                          </View>

                          <FontAwesome
                            name={"edit"}
                            size={fontSize(25)}
                            color={color.secondary}
                            onPress={() => {
                              editMode
                                ? [
                                    setSingleFile(null),
                                    setDateTimeStamp(
                                      moment
                                        .unix(Number(item?.date) / 1000)
                                        .format("DD-MM-YYYY")
                                    ),
                                    setEditId(item?.id),
                                    setVaccineName(item?.vaccineName),
                                    setProvider(item?.physician),
                                    setSdDate8(
                                      moment
                                        .unix(item?.date / 1000)
                                        .format("MMMM DD , YYYY")
                                    ),

                                    setShowOverlayPost(true),
                                    setEditVacc(true),
                                  ]
                                : null;
                            }}
                          />
                        </View>

                        <View style={HoStyles.vaccSubContainer}>
                          <Text style={HoStyles.vaccText}>Vaccine/s Name</Text>
                          <Text style={HoStyles.vaccName}>
                            {item?.vaccineName}
                          </Text>
                        </View>

                        <View style={HoStyles.vaccSubContainer}>
                          <Text style={HoStyles.providerText}>
                            Physician / Provider
                          </Text>
                          <Text style={HoStyles.providerName}>
                            {item?.physician}
                          </Text>
                        </View>
                        {item?.document != "" ? (
                          <>
                            <View style={HoStyles.documentRowContainer}>
                              <Text style={HoStyles.attachLabel}>
                                Attachments
                              </Text>
                              <Entypo
                                name="download"
                                size={20}
                                color={color.palette.darkGray}
                                style={HoStyles.vaccDownSpace}
                              />
                            </View>
                            <TouchableOpacity
                              onPress={async () => {
                                await checkPermission(
                                  item?.document,
                                  item?.documentName
                                );
                              }}
                              style={HoStyles.documentButtonText}
                            >
                              <Text style={HoStyles.docsLabel}>
                                {item?.documentName}
                              </Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <View style={HoStyles.vaccSubContainer}>
                            <Text style={HoStyles.noAttachText}>
                              No attachments found
                            </Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                  <View style={HoStyles.loaderContainer}>
                    {isLoader ? (
                      <Loader />
                    ) : totalVaccineData == 0 || undefined ? (
                      <Text style={HoStyles.noDataText}>No data found</Text>
                    ) : null}
                  </View>

                  {totalVaccineData > 3 ? (
                    <Button
                      text="View More..."
                      onPress={() => {
                        navigation.navigate(MODULES.VaccineScreen, {
                          enable: editMode,
                          profile: profile,
                        });
                      }}
                      style={HoStyles.viewMore}
                    />
                  ) : null}

                  <View style={HoStyles.vaccCancleSpace}></View>
                  {editMode == true && !isLoader ? (
                    <View style={styles.buttonContainer}>
                      <Button
                        text="Cancel"
                        style={styles.cancel}
                        onPress={() => {
                          setEditMode(false);
                          resetForm();
                          onCencel();
                        }}
                        textStyle={styles.buttonTitle}
                        isLoader={isLoaderForm}
                        disabled={isLoaderForm}
                      />
                    </View>
                  ) : null}
                </View>
              </ScrollView>
            </Fragment>
          )}
        </Formik>
      </View>
    </View>
  );
};

const ReportHistory = (profile) => {
  const [issueList, setIssueList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    myGroupApiCall(pageNo);
  }, []);

  const myGroupApiCall = (page) => {
    setIssueList([]);
    setIsLoader(true);
    getSendMonitorReportHistory(profile, page)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${I18n.t("sendReportPlaceholder.ReportInfo")}`,
          endpoint: points.monitorReportHistory,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            setIssueList(res.data[0].objectList);
          } else {
            setIssueList([]);
          }
        } else {
          setIssueList([]);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${I18n.t("sendReportPlaceholder.ReportInfo")}`,
          endpoint: points.monitorReportHistory,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
        setIssueList([]);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const renderRaw = (item: ReportHistoryProps) => {
    let time = moment(item.reportTime).format("MMM DD, YYYY,HH:mm a");
    return (
      <ReportHistoryItem
        reportTime={time}
        timeAgo={item.timeAgo}
        firstUsername={item.firstUsername}
        secondUsername={item.secondUsername}
        userName={item.userName}
        userImageUrl={item.userImageUrl}
        userEmailId={item.userEmailId}
        userRole={item.userRole}
      />
    );
  };

  return (
    <View testID="ReportHistory" style={FULL}>
      <View style={BODY}>
        {isLoader ? <Loader /> : null}
        {!isLoader && issueList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptySendReportHistory")}
            onPressRefresh={() => myGroupApiCall(1)} //onPressRefresh={() => onRefresh()}
          />
        ) : (
          <View style={HoStyles.reportMainWrapper}>
            <View style={[RawContainerMain, { flexDirection: "column" }]}>
              <FlatList
                data={issueList}
                renderItem={({ item }) => renderRaw(item)}
                showsVerticalScrollIndicator={false}
                style={HoStyles.fullFlex}
                contentContainerStyle={HoStyles.fullFlex}
                nestedScrollEnabled={true}
                keyExtractor={(item) => item.id}
                ListFooterComponent={() => {
                  return issueList.length > 0 ? (
                    <View style={HoStyles.fullWidth}>
                      <Text style={HoStyles.reportCurrentPage}>
                        Current Page : {pageNo}
                      </Text>
                      <View style={HoStyles.reportStyleOne}>
                        <View style={HoStyles.reportStyleSecond}>
                          {pageNo > 1 ? (
                            <MaterialIcons
                              name="navigate-before"
                              color={color.palette.black}
                              size={fontSize(28)}
                              onPress={() => {
                                setPageNo(pageNo - 1);
                                setIsLoader(false);
                                setIssueList([]);
                                myGroupApiCall(pageNo - 1);
                              }}
                            />
                          ) : null}
                        </View>

                        <View style={HoStyles.reportStyleSecond}>
                          {pageNo > 1 ? (
                            <MaterialCommunityIcons
                              name="lock-reset"
                              color={color.palette.black}
                              size={fontSize(28)}
                              onPress={() => {
                                setPageNo(1);
                                setIsLoader(false);
                                setIssueList([]);
                                myGroupApiCall(1);
                              }}
                            />
                          ) : null}
                        </View>

                        <View style={HoStyles.reportStyleSecond}>
                          {pageNo * 10 < totalRecords ? (
                            <MaterialIcons
                              name="navigate-next"
                              color={color.palette.black}
                              size={fontSize(28)}
                              onPress={() => {
                                setPageNo(pageNo + 1);
                                setIsLoader(false);
                                setIssueList([]);
                                myGroupApiCall(pageNo + 1);
                              }}
                            />
                          ) : null}
                        </View>
                      </View>
                    </View>
                  ) : null;
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const FamilyHealth = (profile) => {
  const [diseasesList, setDiseasesList] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);

  let od = "";
  const familyHealthApiCall = async () => {
    setIsLoader(true);
    await getfamilyHealthHistory(profile)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: GROUP_DETAILS.FamilyHealth,
          endpoint: points.familyHealthDetails,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        let cleanedArray = [];

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            res.data[0].objectList.forEach((val) => {
              if (val.title !== "otherIssue") {
                cleanedArray.push(val);
              } else {
                console.log("val", val.otherIssue);

                setFamilyOtherDiseases(val.otherIssue);
                setIsLoader(false);
              }
            });

            setDiseasesList(cleanedArray);
            setIsLoader(false);
          } else {
            setIsLoader(false);
          }
        } else {
          setIsLoader(false);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: GROUP_DETAILS.FamilyHealth,
          endpoint: points.familyHealthDetails,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
      });
    // });
  };
  let otherIssue = diseasesList.map((value) => value.otherIssue);
  od = otherIssue.filter((e) => e).toString();
  const [familyOtherDiseases, setFamilyOtherDiseases] = useState(od);
  const [isLoader, setIsLoader] = useState(false);
  const [refreshing] = useState(false);

  useEffect(() => {
    familyHealthApiCall();
  }, []);

  const onRefresh = () => {
    familyHealthApiCall();
  };

  const callApi = async () => {
    setButtonLoad(true);
    const cleanedArray = [];
    diseasesList.forEach((val) => {
      const key = Object.keys(val).filter((key) => val[key] == "true");
      cleanedArray.push(key);
    });

    let result = cleanedArray.filter((e) => e.length);
    let values = result.join(",");

    setButtonLoad(true);

    await postFamilyHealthHistory(values, familyOtherDiseases, profile)
      .then(async (response: any) => {
        const statusCode = response?.data?.[0]?.status?.code || 200;

        await trackApiEvent({
          screen: GROUP_DETAILS.FamilyHealth,
          endpoint: points.familyHealthDetails,
          method: method.POST,
          status: statusCode,
          response: response,
        });
        if (response.status == 200) {
          if (response.data[0] && response.data[0]?.status.code == 0) {
            setButtonLoad(false);
            setIsLoader(false);

            Snackbar.show({
              text: "Family health details data added successfully",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });

            familyHealthApiCall();
          } else {
            showErrorMessage(response.data[0]?.status?.errorText);
            setButtonLoad(false);
            setIsLoader(false);
          }
          setIsLoader(false);
          setButtonLoad(false);
        }
      })
      .catch(async (error) => {
        await trackApiEvent({
          screen: GROUP_DETAILS.FamilyHealth,
          endpoint: points.familyHealthDetails,
          method: method.POST,
          status: error?.response?.status || 500,
          response: error,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
        setButtonLoad(false);
      });
  };

  const renderRaw = (item: FamilyHealthProps, diseasesList: any) => {
    const data = [item];
    return (
      <FamilyHealthItem
        item={data}
        arrlenth={diseasesList.length}
        diseasesList={diseasesList}
      />
    );
  };

  return (
    <View testID="FamilyHealthScreen" style={FULL}>
      <View style={BODY}>
        {isLoader ? <Loader /> : null}
        {!isLoader && diseasesList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyFamilyHealthHistory")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <View style={HoStyles.reportMainWrapper}>
            <View style={{ ...RawContainerMain, ...HoStyles.subMyHealth }}>
              <FlatList
                data={diseasesList}
                renderItem={({ item, index }) => renderRaw(item, index)}
                showsVerticalScrollIndicator={false}
                style={HoStyles.fullFlex}
                keyExtractor={(item) => item.recordNumber.toString()}
                onEndReachedThreshold={0.1}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
              {!isLoader ? (
                <InputHealth
                  label={translate("healthOverviewLabel.Other")}
                  placeholder={translate("healthOverview.otherHoder")}
                  blurOnSubmit={false}
                  value={familyOtherDiseases}
                  onChangeText={(val) => setFamilyOtherDiseases(val)}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
              ) : null}

              {!isLoader ? (
                <View style={styles.buttonContainer}>
                  <Button
                    tx={"Userprofile.Save"}
                    style={styles.buttonSave}
                    onPress={() => callApi()}
                    textStyle={styles.buttonTitle}
                    isLoader={buttonLoad}
                    disabled={buttonLoad}
                  />
                </View>
              ) : null}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const SendReportForm = (profile) => {
  const navigation = useAppNavigation();
  const [isChecked, setIsChecked] = useState(true);

  const [editMode] = useState(true);

  let tempArr = [5];

  const InfoAboutRef = useRef(null);
  const FnameRef = useRef(null);
  const SnameRef = useRef(null);
  const FEmailRef = useRef(null);
  const SEmailRef = useRef(null);
  const SubjectRef = useRef(null);
  const MessageRef = useRef(null);
  const OtherRef = useRef(null);
  const elementsSelection = useRef(null);
  const [previewLoader, setPreviewLoader] = useState(false);
  const [isLoaderForm, setIsLoaderFrom] = useState(false);
  const [itemList, setItemList] = useState([
    {
      id: 0,
      selected: false,
      title: I18n.t("sendReportPlaceholder.BackgroundInformationLable"),
    },
    {
      id: 1,
      selected: false,
      title: I18n.t("sendReportPlaceholder.HealthOverviewLable"),
    },
    {
      id: 2,
      selected: false,
      title: I18n.t("sendReportPlaceholder.vaccHistory"),
    },

    {
      id: 3,
      selected: false,
      title: I18n.t("sendReportPlaceholder.PersonalHealthHistoryLable"),
    },

    {
      id: 4,
      selected: false,
      title: I18n.t("sendReportPlaceholder.FamilyHealthHistoryLable"),
    },
    {
      id: 5,
      selected: true,
      title: I18n.t("sendReportPlaceholder.ReadingsLable"),
    },
  ]);
  const [emptyPreview, setEmptyPreview] = useState(false);

  const initialValue: SendReportValues = {
    healthInfoAbout: "",
    namefirst: "",
    emailFirst: "",
    nameSecond: "",
    emailSecond: "",
    subject: "",
    message: "",
    other: "",
  };

  const callpostHovApi = async (data: any) => {
    const formData = new FormData();
    formData.append("profile", profile);
    formData.append("filter", "sendReport");
    formData.append("email1", data.emailFirst);
    formData.append("name1", data.namefirst);
    formData.append("email2", data.emailSecond);
    formData.append("name2", data.nameSecond);
    formData.append("subject", data.subject);
    formData.append("message", data.message);
    formData.append("respondBy", data.other);
    formData.append("healthInformationAbout", data.healthInfoAbout);
    formData.append(
      "backgroundInformationReport",
      data.backgroundInformationReport
    );
    formData.append(
      "familyHealthHistoryReport",
      data.familyHealthHistoryReport
    );
    formData.append("healthOverviewReport", data.healthOverviewReport);
    formData.append(
      "personalHealthHistoryReport",
      data.personalHealthHistoryReport
    );
    formData.append("readingsReport", data.readingsReport);
    formData.append("vaccineReport", data.vaccineReport);
    setIsLoaderFrom(true);

    postPreviewReport(formData)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: ` ${GROUP_DETAILS.HealthOverview}_${I18n.t(
            "sendReportPlaceholder.SendReportLable"
          )}`,
          endpoint: points.userFitnessRecord,
          method: method.POST,
          status: statusCode,
          response: res,
        });
        setIsLoaderFrom(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: "Health report sent successfully.",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          } else {
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        } else {
          console.log("2222222");

          Snackbar.show({
            text: res.data[0].status.errorText,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: ` ${GROUP_DETAILS.HealthOverview}_${I18n.t(
            "sendReportPlaceholder.SendReportLable"
          )}`,
          endpoint: points.userFitnessRecord,
          method: method.POST,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoaderFrom(false);
        console.log("err==", err);
      });
  };

  const handleReportElementsPress = (index) => {
    const updatedData = itemList.map((object, i) => {
      if (i === index) {
        object.selected = !object.selected;
        return object;
      } else {
        return object;
      }
    });

    setItemList(updatedData);

    tempArr = [];
    updatedData.forEach((val) => {
      if (val.selected == true) {
        tempArr.push(val.id);
      }
    });

    if (tempArr.length > 0) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const renderRollRaw = (item, index) => {
    return (
      <TouchableOpacity activeOpacity={1} style={WrapperContainer}>
        {item.selected == true ? (
          <View style={{ marginHorizontal: 4, justifyContent: "center" }}>
            <ElementIcon
              color={color.white}
              name="check-box"
              type="materialicons "
              size={fontSize(24)}
              onPress={() => {
                console.log("Test", item);
                handleReportElementsPress(index);
              }}
            />
          </View>
        ) : (
          <View style={{ marginHorizontal: 4, justifyContent: "center" }}>
            <ElementIcon
              color={color.placeholder}
              name="check-box-outline-blank"
              type="materialicons "
              size={fontSize(24)}
              onPress={() => {
                handleReportElementsPress(index);
              }}
            />
          </View>
        )}

        <Text style={[ButtonSheetTitle]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  const previewReportApi = (previewData: any) => {
    setPreviewLoader(true);

    const formData = new FormData();
    formData.append("profile", previewData?.profile);
    formData.append("filter", previewData?.filter);
    formData.append("email1", previewData.emailFirst);
    formData.append("name1", previewData.namefirst);
    formData.append("email2", previewData.emailSecond);
    formData.append("name2", previewData.nameSecond);
    formData.append("subject", previewData.subject);
    formData.append("message", previewData.message);
    formData.append("respondBy", previewData.other);
    formData.append("healthInformationAbout", previewData.healthInfoAbout);
    formData.append(
      "backgroundInformationReport",
      previewData.backgroundInformationReport
    );
    formData.append(
      "familyHealthHistoryReport",
      previewData.familyHealthHistoryReport
    );
    formData.append("healthOverviewReport", previewData.healthOverviewReport);
    formData.append(
      "personalHealthHistoryReport",
      previewData.personalHealthHistoryReport
    );
    formData.append("readingsReport", previewData.readingsReport);
    formData.append("vaccineReport", previewData.vaccineReport);

    postPreviewReport(formData)
      .then(async (res) => {
        setPreviewLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            if (
              !res.data[0].objectList[0].content ||
              res.data[0].objectList[0].content == ""
            ) {
              setEmptyPreview(true);
            } else {
              const path = `${RNFS.DocumentDirectoryPath}/previewReport.pdf`;
              await RNFS.writeFile(
                path,
                res.data[0].objectList[0].content,
                "base64"
              );
              FileViewer.open(path);
            }
          } else {
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
        } else {
          Snackbar.show({
            text: res.data[0].status.errorText,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        setPreviewLoader(false);
        console.log("err==", err);
      });
  };

  return (
    <View style={HoStyles.root}>
      <SafeRBSheet
        ref={elementsSelection}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={HoStyles.spaceTop}>
          <View style={commonStyle.subSheetContainer}>
            <Entypo
              name="circle-with-cross"
              size={25}
              onPress={() => {
                elementsSelection.current.close();
              }}
              color={color.palette.black}
            />
          </View>
          <View style={OverLayTopButtonContainerCencel}>
            <Text style={OverLayTopButtonText}>
              {I18n.t("sendReportPlaceholder.ReportElementsLable")}
            </Text>
          </View>
          <View style={SheetWrapper}>
            <FlatList
              data={itemList}
              contentContainerStyle={HoStyles.alignList}
              scrollEnabled={false}
              renderItem={({ item, index }) => renderRollRaw(item, index)}
              showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => elementsSelection.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>

      <View style={HoStyles.container}>
        <Formik
          validationSchema={validationSchemaSendReport}
          enableReinitialize
          initialValues={initialValue}
          onSubmit={(values: any, { resetForm }) => {
            console.log("values", values);

            if (values.emailFirst && values.namefirst) {
              Keyboard.dismiss();
              const backgroundData = {
                ...values,
                healthOverviewReport: itemList[1].selected,
                backgroundInformationReport: itemList[0].selected,
                personalHealthHistoryReport: itemList[3].selected,
                familyHealthHistoryReport: itemList[4].selected,
                vaccineReport: itemList[2].selected,
                readingsReport: itemList[5].selected,
                profile: profile,
              };
              callpostHovApi(backgroundData);
              resetForm({ values: "", errors: {} });
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
            <Fragment>
              <View style={HoStyles.section}>
                <Text style={HoStyles.sectionTitle}>
                  {translate("sendReportPlaceholder.ReportInfo")}
                </Text>

                <View style={HoStyles.inputFull}>
                  <Input
                    label={translate("sendReportPlaceholder.HealthInfoAbout")}
                    editable={editMode}
                    inputContainerStyle={{ marginHorizontal: 15 }}
                    value={values.healthInfoAbout}
                    onChangeText={handleChange("healthInfoAbout")}
                    onBlur={handleBlur("healthInfoAbout")}
                    validation={() => {
                      setFieldTouched("healthInfoAbout");
                    }}
                    style={
                      editMode == true
                        ? {
                            ...HoStyles.darkInputFullHorizontal,
                            ...commonStyle.textSubLabel,
                          }
                        : { ...HoStyles.inputFull, ...commonStyle.textSubLabel }
                    }
                    styleLable={commonStyle.textLabel}
                    placeholderTextColor={color.palette.blackSecondary}
                    error={touched.healthInfoAbout && errors.healthInfoAbout}
                    ref={InfoAboutRef}
                    onSubmitEditing={() => {
                      FnameRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    placeholder={translate(
                      "sendReportPlaceholder.enterHealthInfoAbout"
                    )}
                  />

                  <Input
                    label={translate("sendReportPlaceholder.FNameLable")}
                    editable={editMode}
                    inputContainerStyle={{ marginHorizontal: 15 }}
                    value={values.namefirst}
                    onChangeText={handleChange("namefirst")}
                    onBlur={handleBlur("namefirst")}
                    validation={() => {
                      setFieldTouched("namefirst");
                    }}
                    style={
                      editMode == true
                        ? {
                            ...HoStyles.darkInputFullHorizontal,
                            ...commonStyle.textSubLabel,
                          }
                        : { ...HoStyles.inputFull, ...commonStyle.textSubLabel }
                    }
                    styleLable={commonStyle.textLabel}
                    placeholderTextColor={color.palette.blackSecondary}
                    error={touched.namefirst && errors.namefirst}
                    ref={FnameRef}
                    onSubmitEditing={() => {
                      FEmailRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    placeholder={translate(
                      "sendReportPlaceholder.NamefirstPlaceholder"
                    )}
                  />
                  <Input
                    label={translate("sendReportPlaceholder.FEmailLable")}
                    editable={editMode}
                    inputContainerStyle={{ marginHorizontal: 15 }}
                    value={values.emailFirst}
                    onChangeText={handleChange("emailFirst")}
                    onBlur={handleBlur("emailFirst")}
                    validation={() => {
                      setFieldTouched("emailFirst");
                    }}
                    style={
                      editMode == true
                        ? {
                            ...HoStyles.darkInputFullHorizontal,
                            ...commonStyle.textSubLabel,
                          }
                        : { ...HoStyles.inputFull, ...commonStyle.textSubLabel }
                    }
                    styleLable={commonStyle.textLabel}
                    placeholderTextColor={color.palette.blackSecondary}
                    error={touched.emailFirst && errors.emailFirst}
                    ref={FEmailRef}
                    onSubmitEditing={() => {
                      SnameRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    placeholder={translate(
                      "sendReportPlaceholder.EmailFirstPlaceholder"
                    )}
                  />

                  <Input
                    label={translate("sendReportPlaceholder.SNameLable")}
                    editable={editMode}
                    inputContainerStyle={{ marginHorizontal: 15 }}
                    value={values.nameSecond}
                    onChangeText={handleChange("nameSecond")}
                    onBlur={handleBlur("nameSecond")}
                    validation={() => {
                      setFieldTouched("nameSecond");
                    }}
                    style={
                      editMode == true
                        ? {
                            ...HoStyles.darkInputFullHorizontal,
                            ...commonStyle.textSubLabel,
                          }
                        : { ...HoStyles.inputFull, ...commonStyle.textSubLabel }
                    }
                    styleLable={commonStyle.textLabel}
                    placeholderTextColor={color.palette.blackSecondary}
                    error={touched.nameSecond && errors.nameSecond}
                    ref={SnameRef}
                    onSubmitEditing={() => {
                      SEmailRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    placeholder={translate(
                      "sendReportPlaceholder.NamesecondPlaceholder"
                    )}
                  />

                  <Input
                    label={translate("sendReportPlaceholder.SEmailLable")}
                    editable={editMode}
                    inputContainerStyle={{ marginHorizontal: 15 }}
                    value={values.emailSecond}
                    onChangeText={handleChange("emailSecond")}
                    onBlur={handleBlur("emailSecond")}
                    validation={() => {
                      setFieldTouched("emailSecond");
                    }}
                    style={
                      editMode == true
                        ? {
                            ...HoStyles.darkInputFullHorizontal,
                            ...commonStyle.textSubLabel,
                          }
                        : { ...HoStyles.inputFull, ...commonStyle.textSubLabel }
                    }
                    styleLable={commonStyle.textLabel}
                    placeholderTextColor={color.palette.blackSecondary}
                    error={touched.emailSecond && errors.emailSecond}
                    ref={SEmailRef}
                    onSubmitEditing={() => {
                      SubjectRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    placeholder={translate(
                      "sendReportPlaceholder.EmailSecondPlaceholder"
                    )}
                  />

                  <Input
                    label={translate("sendReportPlaceholder.SubjectLable")}
                    editable={editMode}
                    inputContainerStyle={{ marginHorizontal: 15 }}
                    value={values.subject}
                    onChangeText={handleChange("subject")}
                    onBlur={handleBlur("subject")}
                    validation={() => {
                      setFieldTouched("subject");
                    }}
                    style={
                      editMode == true
                        ? {
                            ...HoStyles.darkInputFullHorizontal,
                            ...commonStyle.textSubLabel,
                          }
                        : { ...HoStyles.inputFull, ...commonStyle.textSubLabel }
                    }
                    styleLable={commonStyle.textLabel}
                    placeholderTextColor={color.palette.blackSecondary}
                    error={touched.subject && errors.subject}
                    ref={SubjectRef}
                    onSubmitEditing={() => {
                      MessageRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    placeholder={translate(
                      "sendReportPlaceholder.SubjectPlaceholder"
                    )}
                  />
                  <Input
                    label={translate("sendReportPlaceholder.MessageLable")}
                    editable={editMode}
                    inputContainerStyle={{ marginHorizontal: 15 }}
                    value={values.message}
                    onChangeText={handleChange("message")}
                    onBlur={handleBlur("message")}
                    validation={() => {
                      setFieldTouched("message");
                    }}
                    style={
                      editMode == true
                        ? {
                            ...HoStyles.darkInputFullHorizontal,
                            ...commonStyle.textSubLabel,
                          }
                        : { ...HoStyles.inputFull, ...commonStyle.textSubLabel }
                    }
                    styleLable={commonStyle.textLabel}
                    placeholderTextColor={color.palette.blackSecondary}
                    error={touched.message && errors.message}
                    ref={MessageRef}
                    onSubmitEditing={() => {
                      OtherRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    placeholder={translate(
                      "sendReportPlaceholder.MessagePlaceholder"
                    )}
                  />

                  <Input
                    label={translate("sendReportPlaceholder.OtherLable")}
                    editable={editMode}
                    inputContainerStyle={{ marginHorizontal: 15 }}
                    value={values.other}
                    onChangeText={handleChange("other")}
                    onBlur={handleBlur("other")}
                    validation={() => {
                      setFieldTouched("other");
                    }}
                    style={
                      editMode == true
                        ? {
                            ...HoStyles.darkInputFullHorizontal,
                            ...commonStyle.textSubLabel,
                          }
                        : { ...HoStyles.inputFull, ...commonStyle.textSubLabel }
                    }
                    styleLable={commonStyle.textLabel}
                    placeholderTextColor={color.palette.blackSecondary}
                    error={touched.other && errors.other}
                    ref={OtherRef}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    blurOnSubmit={false}
                    placeholder={translate(
                      "sendReportPlaceholder.OtherPlaceholder"
                    )}
                  />

                  <View style={RawContainerSendReport}>
                    <>
                      <View style={HoStyles.justifyCenter}>
                        {isChecked == true ? (
                          <View style={HoStyles.iconAreaFirst}>
                            <FontAwesome
                              color={color.palette.blackSecondary}
                              name="circle"
                              size={fontSize(24)}
                            />
                          </View>
                        ) : (
                          <View style={HoStyles.iconAreaFirst}>
                            <FontAwesome
                              color={color.palette.blackSecondary}
                              name="circle-thin"
                              size={fontSize(24)}
                            />
                          </View>
                        )}
                      </View>
                      <View style={TextContainer}>
                        <View style={HoStyles.alignContentStyle1}>
                          <Text numberOfLines={4} style={TitleSenReport}>
                            {translate(
                              "sendReportPlaceholder.ReportElementsLable"
                            )}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() => elementsSelection.current.open()}
                        style={HoStyles.iconAreaFirst}
                      >
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={fontSize(20)}
                          style={HoStyles.rightMargeTen}
                          color={color.palette.blackSecondary}
                        />
                      </TouchableOpacity>
                    </>
                  </View>
                </View>

                <View
                  style={{
                    ...styles.statusContainer,
                    ...HoStyles.spaceTopTwenty,
                  }}
                >
                  <Button
                    text="Send"
                    style={{
                      ...styles.buttonSRsave,
                      ...styles.buttonSRpreviewWidth,
                    }}
                    onPress={() => {
                      handleSubmit();
                    }}
                    textStyle={styles.buttonTitle}
                    isLoader={isLoaderForm}
                    disabled={isLoaderForm}
                  />

                  <Button
                    text="Preview"
                    style={{
                      ...styles.buttonSRpreview,
                      ...styles.buttonSRpreviewWidth,
                    }}
                    onPress={() => {
                      const previewData = {
                        ...values,
                        healthOverviewReport: itemList[1].selected,
                        backgroundInformationReport: itemList[0].selected,
                        personalHealthHistoryReport: itemList[3].selected,
                        familyHealthHistoryReport: itemList[4].selected,
                        readingsReport: itemList[5].selected,
                        vaccineReport: itemList[2].selected,
                        profile: profile,
                        filter: "previewReport",
                      };
                      previewReportApi(previewData);
                      // navigation.navigate(MODULES.PreviewReportScreen, {
                      //   profile: profile,
                      //   previewData: previewData,
                      // });
                    }}
                    textStyle={styles.buttonTitle}
                    isLoader={previewLoader}
                    disabled={previewLoader}
                  />
                </View>
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
      <AlertBox
        visible={emptyPreview}
        title={I18n.t("AppDrawer.appName")}
        message={I18n.t("EmptyView.EmptySendReportHistory")}
        messageStyle={styles.messageStyle}
        onTouchOutside={() => setEmptyPreview(false)}
        onYes={() => setEmptyPreview(false)}
        noCancel={true}
        onYesText={"Ok"}
        onClear={undefined}
      />
    </View>
  );
};

var Sound = require("react-native-sound");

Sound.setCategory("Playback");

const ProgressNotes = (profile) => {
  const navigation = useAppNavigation();
  const [notes, setNotes] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [totalNotes, setTotalNotes] = useState(0);

  useEffect(() => {
    getNotesData();
  }, []);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      setTotalNotes(0);
      setNotes([]);
      getNotesData();
    });

    return focus;
  }, []);

  const getNotesData = () => {
    setIsLoader(true);
    getProgressNotes(profile)
      .then(async (res) => {
        setTotalNotes(
          res.data[0].status.total == undefined ? 0 : res.data[0].status.total
        );
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: MODULES.ProgressNotes,
          endpoint: points.progressNotes,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              cleanedArray.push(val);
            });
            setNotes(cleanedArray);

            setIsLoader(false);
          } else {
            setIsLoader(false);
          }
        } else {
          setIsLoader(false);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: MODULES.ProgressNotes,
          endpoint: points.progressNotes,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={{ color: color.primary, marginTop: 5 }}
        onPress={handlePress}
      >
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={{ color: color.primary, marginTop: 5 }}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };

  const _handleTextReady = () => {
    // ...
  };

  return (
    <View style={HoStyles.root}>
      <View style={HoStyles.container}>
        <View style={HoStyles.section}>
          <View style={styles.statusContainer}>
            <View></View>
          </View>

          <View style={HoStyles.vaccSection}>
            <Text style={HoStyles.sectionTitle}>Progress Notes</Text>

            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={fontSize(25)}
              style={HoStyles.plusIcon}
              color={color.secondary}
              onPress={() =>
                navigation.navigate("notes", {
                  uniqueId: profile,
                  canEditInfo: false,
                })
              }
            />
          </View>
          {notes.map((item, index) => {
            return (
              <TouchableOpacity activeOpacity={1} style={HoStyles.mainVaccView}>
                <View style={HoStyles.vaccSubView}>
                  <View style={HoStyles.vaccDateView}>
                    <Text style={{ color: color.white }}>
                      {moment.unix(item?.date / 1000).format("MMMM DD , YYYY")}
                    </Text>
                  </View>
                  <FontAwesome
                    name={"edit"}
                    size={fontSize(25)}
                    color={color.secondary}
                    onPress={() =>
                      navigation.navigate("notes", {
                        uniqueId: profile,
                        item: item,
                        canEditInfo: true,
                      })
                    }
                  />
                </View>

                <View style={HoStyles.vaccSubContainer}>
                  <Text style={HoStyles.vaccText}>Added By</Text>
                  <Text style={HoStyles.vaccName}>{item?.createdBy}</Text>
                </View>

                {item?.physicianClinician != "" ? (
                  <View style={HoStyles.vaccSubContainer}>
                    <Text style={HoStyles.vaccText}>Physician / Clinician</Text>
                    <Text style={HoStyles.vaccName}>
                      {item?.physicianClinician}
                    </Text>
                  </View>
                ) : null}

                <View style={HoStyles.vaccSubContainer}>
                  <Text style={HoStyles.vaccText}>Next Appointment</Text>
                  <Text style={HoStyles.vaccName}>
                    {item?.nextAppointmentStartDate != ""
                      ? moment
                          .unix(item?.nextAppointmentStartDate / 1000)
                          .format("MMMM DD , YYYY HH:mm:ss")
                      : null}{" "}
                    -{" "}
                    {item?.nextAppointmentEndDate != ""
                      ? moment
                          .unix(item?.nextAppointmentEndDate / 1000)
                          .format("MMMM DD , YYYY HH:mm:ss")
                      : null}
                  </Text>
                </View>

                <View style={HoStyles.vaccSubContainer}>
                  <Text style={HoStyles.vaccText}>Assessment</Text>
                  <View>
                    <ReadMore
                      numberOfLines={3}
                      renderTruncatedFooter={_renderTruncatedFooter}
                      renderRevealedFooter={_renderRevealedFooter}
                      onReady={_handleTextReady}
                    >
                      <Text style={HoStyles.vaccName}>
                        {item?.assessment == ""
                          ? "No details found"
                          : item?.assessment}
                      </Text>
                    </ReadMore>
                  </View>
                </View>

                <View style={HoStyles.vaccSubContainer}>
                  <Text style={HoStyles.vaccText}>Plan</Text>
                  <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={_renderTruncatedFooter}
                    renderRevealedFooter={_renderRevealedFooter}
                    onReady={_handleTextReady}
                  >
                    <Text style={HoStyles.vaccName}>
                      {item?.plan == "" ? "No details found" : item?.plan}
                    </Text>
                  </ReadMore>
                </View>
              </TouchableOpacity>
            );
          })}

          <View style={HoStyles.loaderContainer}>
            {isLoader ? (
              <Loader />
            ) : totalNotes == 0 || undefined ? (
              <Text style={HoStyles.noDataText}>No data found</Text>
            ) : null}
          </View>

          {totalNotes > 3 ? (
            <Button
              text="View More..."
              onPress={() => {
                navigation.navigate("progressnotes", {
                  profile: profile,
                });
              }}
              style={HoStyles.viewMore}
            />
          ) : null}

          <View style={HoStyles.margeBottomTen}></View>
        </View>
      </View>
    </View>
  );
};
