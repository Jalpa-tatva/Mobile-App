import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  BackHandler,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
} from "react-native";

// import external libraries
import moment, { Moment } from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
import { Config } from "react-native-config";
import md5 from "md5";
import { RouteProp, useRoute } from "@react-navigation/native";
import FileViewer from "react-native-file-viewer";
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import custom function
import {
  Loader,
  EmptyView,
  Header,
  LoadMore,
  Button,
  Input,
} from "@components/index";
import { getVaccineList, postHealthOverview } from "@app/services/api/groups";
import {
  checkPermissionAbove33Version,
  checkPermissionBelow33Version,
} from "@app/utils/Permissions/Permission";
import useAppNavigation from "@app/navigation/navigation";
import {
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@app/utils/icons/VectorIcons";
import { getUserDetail, SafeOverlay } from "@app/constants";

// import custom styling & utils
import { color, font, fontSize } from "@theme/index";
import commonStyle from "@app/theme/commonStyle";
import { FULL, HEADERTOP, BODY } from "./Style";
import {
  overlay,
  backdropStyle,
  MainOverLayContainer,
  OverLayText,
  OverLayRowContainer1,
  OverLayButtonText,
  OverLayButtonContainer1,
  loginButtonContainer,
  BottonTitle,
  Style,
} from "./vaccinestyle";
import { HoStyles } from "./healthStyle";
import { translate } from "@app/i18n";
import { pick, types } from "@react-native-documents/picker";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";

/***
 * VideosProps
 */
export interface VideosProps {
  title: string;
  publishedText: string;
  thumbnail: string;
  onPress: Function;
  link: string;
}

/***
 * RouteParam
 */
type RouteParam = {
  VaccineScreen: {
    enable: string;
    profile: string;
    backgroundData: string;
  };
};
/***
 * VaccineScreen
 */
export const VaccineScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<RouteParam, "VaccineScreen">>();
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });
  const [showOverlayPost, setShowOverlayPost] = useState(false);

  const [videoList] = useState([0]);
  const [page, setPage] = useState(1);
  const [isMoreLoader, setMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  let sdDate1 = "Select date";
  const [request, setRequest] = useState("Select date");
  const [sdDate1Visible, setSdDate1Visible] = useState(false);
  const { enable, profile, backgroundData } = route.params;
  const [vaccineInitial, setVaccineInitial] = useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const [vaccineName, setVaccineName] = useState("");
  const [provider, setProvider] = useState("");
  const [dateTimestamp, setDateTimeStamp] = useState<Moment | any>(null);
  const [editVacc, setEditVacc] = useState(false);
  const [editId, setEditId] = useState("");
  const { groups } = content;
  const { login_detail } = useRedux([groups.loginDetail]);

  const vaccNameRef = useRef<any>(null);
  const providerRef = useRef<any>(null);

  useEffect(() => {
    sdDate1 = "Select date";
    getData();
  }, []);

  const getData = async () => {
    // const loginData: any = await getUserDetail();
    setLoginDetail({
      email: login_detail?.email,
      password: login_detail?.password,
    });
  };

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      onRefresh();
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return focus;
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const saveEdit = (item) => {
    if (enable) {
      setSingleFile(null);
      setDateTimeStamp(moment.unix(item?.date / 1000));
      setEditId(item?.id);
      setVaccineName(item?.vaccineName);
      setProvider(item?.physician);
      setRequest(moment.unix(item?.date / 1000).format("MMMM DD , YYYY"));
      moment.unix(item?.date / 1000);
      setShowOverlayPost(true);
      setEditVacc(true);
    } else {
      return null;
    }
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
          // Alert.alert(I18n.t('groupDetails.StoragePermissionGranted'));
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
    let subjectName = subject;
    subjectName = subjectName.replace(/\..*/, "");

    var url = documentUrl;
    var ext: any = getFileExtention(url);
    ext = "." + ext[0];

    const localFile = `${RNFS.DocumentDirectoryPath}/${subject}.${ext}`;
    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    setIsLoader(true);
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
      })
      .catch((error) => {
        setIsLoader(false);
        console.log("error:", error);
      });
  };

  const downloadIos = async (documentUrl, subject) => {
    setIsLoader(true);

    let subjectName = subject;
    subjectName = subjectName.replace(/\..*/, "");

    let dirs = RNFetchBlob.fs.dirs.DocumentDir;

    let url = documentUrl;
    let ext: any = getFileExtention(url);
    ext = "." + ext[0];
    RNFetchBlob.config({
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
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  const callpostHovApi = async (data: any) => {
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
    formData.append("other", data.other);
    formData.append("diagnosis1", data.diagnosis1);
    formData.append("diagnosisDate1", data.sdDate1);
    formData.append("diagnosis2", data.diagnosis2);
    formData.append("diagnosisDate2", data.sdDate2);
    formData.append("diagnosis3", data.diagnosis3);
    formData.append("diagnosisDate3", data.sdDate3);
    formData.append("diagnosis4", data.diagnosis4);
    formData.append("diagnosisDate4", data.sdDate4);
    formData.append("diagnosis5", data.diagnosis5);
    formData.append("diagnosisDate5", data.sdDate5);
    formData.append("procedures1", data.procedure1);
    formData.append("proceduresDate1", data.spDate1);
    formData.append("procedures2", data.procedure2);
    formData.append("proceduresDate2", data.spDate2);
    formData.append("procedures3", data.procedure3);
    formData.append("proceduresDate3", data.spDate3);
    formData.append("procedures4", data.procedure4);
    formData.append("proceduresDate4", data.spDate4);
    formData.append("procedures5", data.procedure5);
    formData.append("proceduresDate5", data.spDate5);

    console.log("formdata:", formData);

    // setIsLoaderFrom(true);

    postHealthOverview(formData)
      .then((res) => {
        // setIsLoaderFrom(false);
        console.log("postHealthOverview", JSON.stringify(res));
        //   console.log('addNewGroup', JSON.stringify(res));
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            // Snackbar.show({
            //   text: 'Patient Profile data added successfully',
            //   duration: Snackbar.LENGTH_LONG,
            //   backgroundColor: color.palette.lightGreen,
            //   textColor: color.palette.white,
            //   numberOfLines: 5,
            // });
            // setEditMode(false);
            // getHealthOverviewApiCall();
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
        console.log("err==", err);
      });
  };

  const postVaccineData = () => {
    setIsLoader(true);

    const uri =
      Platform.OS === "ios"
        ? singleFile?.uri.replace("file://", "")
        : singleFile?.uri;

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = date + "/" + month + "/" + year;
    const ha1 = md5(
      `${loginDetail?.email}:${Config.REALM}:${loginDetail?.password}`
    );
    const ha2 = md5(`POST:` + "/api/vaccine?format=json");
    const responseAuth = md5(ha1 + ":" + currentDate + ":" + ha2);

    RNFetchBlob.fetch(
      "POST",
      `${Config.BASE_URL}/api/vaccine?format=json`,
      {
        Accept: "application/json",
        "X-Concursive-Key": Config.AUTH_KEY,
        "X-Concursive-Platform": "android",
        "Content-Type": "multipart/form-data",
        Authorization: `Digest username="${loginDetail?.email}", Config.REALM="${Config.REALM}", nonce="${currentDate}", uri="/api/vaccine?format=json", algorithm="MD5", response="${responseAuth}"`,
      },
      [
        {
          name: "document",
          filename: singleFile != null ? singleFile?.name : "",
          type: singleFile != null ? singleFile.type : "",
          data: singleFile != null ? RNFetchBlob.wrap(uri) : "",
        },
        { name: "profile", data: profile },
        { name: "vaccineName", data: vaccineName },
        { name: "physician", data: provider },
        { name: "date", data: (dateTimestamp.unix() * 1000).toString() },
        { name: "updateDocument", data: singleFile != null ? "true" : "false" },
      ]
    )
      .then((res) => {
        setIsLoader(false);
        // console.log('Res Vaccine Add', JSON.stringify(res));

        let tempObj = JSON.parse(res.data);
        console.log("temp object", tempObj);
        if (tempObj[0].status.code === 0) {
          setTimeout(() => {
            setShowOverlayPost(!showOverlayPost);
          }, 1000);
          Snackbar.show({
            text: "Vaccination data added successfully",
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          // setShowOverlayPost(!showOverlayPost);
          setEditVacc(false);
          // setReload(true);
          setVaccineName("");
          setProvider("");
          setSingleFile(null);
          getVaccineDataInitial();
          callpostHovApi(backgroundData);
        } else {
          Snackbar.show({
            text: `Something went wrong`,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
        Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
        setIsLoader(false);

        //showErrorMessage(I18n.t('apiError'));
      });
  };

  const updateVaccineData = () => {
    setIsLoader(true);

    const uri =
      Platform.OS === "ios"
        ? singleFile?.uri.replace("file://", "")
        : singleFile?.uri;

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate = date + "/" + month + "/" + year;

    const ha1 = md5(
      `${loginDetail?.email}:${Config.REALM}:${loginDetail?.password}`
    );
    const ha2 = md5(`POST:` + "/api/vaccine?format=json");
    const responseAuth = md5(ha1 + ":" + currentDate + ":" + ha2);

    RNFetchBlob.fetch(
      "POST",
      `${Config.BASE_URL}/api/vaccine?format=json`,
      {
        Accept: "application/json",
        "X-Concursive-Key": Config.AUTH_KEY,
        "X-Concursive-Platform": "android",
        "Content-Type": "multipart/form-data",
        Authorization: `Digest username="${loginDetail?.email}", Config.REALM="${Config.REALM}", nonce="${currentDate}", uri="/api/vaccine?format=json", algorithm="MD5", response="${responseAuth}"`,
      },
      [
        { name: "profile", data: profile },
        { name: "vaccineName", data: vaccineName },
        { name: "physician", data: provider },
        // {name: 'date', data: dateTimestamp.toString()},
        { name: "date", data: (dateTimestamp.unix() * 1000).toString() },
        { name: "id", data: editId },
        {
          name: "document",
          filename: singleFile != null ? singleFile?.name : "",
          type: singleFile != null ? singleFile.type : "",
          data: singleFile != null ? RNFetchBlob.wrap(uri) : "",
        },
        { name: "updateDocument", data: singleFile != null ? "true" : "false" },
      ]
    )
      .then((res) => {
        setIsLoader(false);
        console.log("Res Vaccine Add", JSON.stringify(res));

        let tempObj = JSON.parse(res.data);
        console.log("temp object", tempObj);
        if (tempObj[0].status.code === 0) {
          setTimeout(() => {
            setShowOverlayPost(!showOverlayPost);
          }, 1000);
          Snackbar.show({
            text: "Vaccination data Updated successfully",
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setEditVacc(false);
          // setShowOverlayPost(!showOverlayPost);
          // setReload(true);
          setVaccineName("");
          setProvider("");
          setSingleFile(null);
          // HealthOverviewForm(profile);
          // getHealthOverviewApiCall();
          getVaccineDataInitial();
          // callpostHovApi(backgroundData);
        } else {
          Snackbar.show({
            text: `Something went wrong`,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
        Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
        setIsLoader(false);

        //showErrorMessage(I18n.t('apiError'));
      });
  };

  const hideSdDate1Picker = () => {
    setSdDate1Visible(false);
  };

  const handleSdDate1Confirm = (date: moment.MomentInput) => {
    sdDate1 = moment(date).format("MMMM DD , yyyy");
    setRequest(sdDate1);
    setDateTimeStamp(moment(date));
    console.log(sdDate1);
    Keyboard.dismiss();
    setDateTimeStamp(moment(date));
    hideSdDate1Picker();
  };

  useEffect(() => {
    // myGroupVideoListApiCall();
    getVaccineDataInitial();
  }, []);

  const getVaccineDataInitial = () => {
    setIsLoader(true);
    getVaccineList(profile, 1)
      .then((res) => {
        console.log("getVaccineInitial", JSON.stringify(res));
        setTotalRecords(res.data[0].status.total);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              cleanedArray.push(val);
            });
            setVaccineInitial(cleanedArray);
            console.log("vaccineData", vaccineInitial);
            setIsLoader(false);
          } else {
            // setHovData([]);
            setIsLoader(false);
          }
        } else {
          // setHovData([]);
          setIsLoader(false);
        }
      })
      .catch((err) => {
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
  const loadMoreData = (page: number) => {
    console.log("Page", page);
    setMoreLoader(true);
    setEndReach(false);
    getVaccineList(profile, page)
      .then((res) => {
        console.log("res2", JSON.stringify(res));

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              // cleanedArray.push(val);

              cleanedArray.push(val);
            });

            //setGroupList(cleanedArray);

            setVaccineInitial(
              page === 1 ? cleanedArray : [...vaccineInitial, ...cleanedArray]
            );

            // let groupObjectList = res.data[0].objectList;
            // setGroupList(
            //   page === 1 ? groupObjectList : [...groupList, ...groupObjectList],
            // );
            setMoreLoader(false);
          } else {
            setMoreLoader(false);
            setEndReach(true);
          }
        } else {
          setMoreLoader(false);
          setEndReach(true);
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > vaccineInitial.length) {
      const pageData = page + 1;
      setPage(pageData);
      setMoreLoader(true);
      setEndReach(false);
      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };

  const onRefresh = () => {
    setPage(1);
    setTotalRecords(0);
    setVaccineInitial([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    getVaccineDataInitial();
  };

  const selectFiles = async () => {
    try {
      const result = await pick({
        type: [types.allFiles],
        allowMultiSelection: false,
      });

      // result is always an array in new package
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

  const renderRaw = (item) => {
    return (
      <View
        style={{
          backgroundColor: color.white,
          width: "94%",
          //padding: 10,
          borderRadius: 6,
          marginHorizontal: 2,
          marginTop: 10,
          alignSelf: "center",
          borderWidth: 0.5,
          borderColor: color.palette.lighterGrey,
          //   flexDirection: 'row',
          justifyContent: "center",
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 0,
            height: fontSize(2),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: fontSize(8),
            marginTop: fontSize(2),
            paddingHorizontal: fontSize(4),
            marginBottom: fontSize(11),
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: color.secondary,
              padding: fontSize(2),
              borderRadius: fontSize(4),
            }}
          >
            <Text style={{ color: color.white }}>
              {moment.unix(item?.date / 1000).format("MMMM DD , YYYY")}
            </Text>
          </View>
          <FontAwesome
            name={"edit"}
            size={fontSize(25)}
            color={color.secondary}
            onPress={() => {
              saveEdit(item);
            }}
          />
        </View>

        <View
          style={{ marginBottom: fontSize(8), marginHorizontal: fontSize(8) }}
        >
          <Text
            style={{
              fontFamily: font.Poppins_SemiBold,
              color: color.palette.darkGray,
            }}
          >
            Vaccine/s Name
          </Text>
          <Text
            style={{ fontFamily: font.Poppins_Medium, fontSize: fontSize(12) }}
          >
            {item?.vaccineName}
          </Text>
        </View>

        <View
          style={{ marginBottom: fontSize(8), marginHorizontal: fontSize(8) }}
        >
          <Text
            style={{
              fontFamily: font.Poppins_SemiBold,
              color: color.palette.darkGray,
            }}
          >
            Physician / Provider
          </Text>
          <Text
            style={{ fontFamily: font.Poppins_Medium, fontSize: fontSize(12) }}
          >
            {item?.physician}
          </Text>
        </View>
        {item?.document != "" ? (
          <>
            <View
              style={{
                marginHorizontal: fontSize(8),
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font.Poppins_SemiBold,
                  color: color.palette.darkGray,
                  paddingRight: 4,
                }}
              >
                Attachments
              </Text>
              <Entypo
                name="download"
                size={20}
                color={color.palette.darkGray}
                style={{ marginBottom: fontSize(3) }}
              />
            </View>
            <TouchableOpacity
              onPress={async () => {
                await checkPermission(item?.document, item?.documentName);
              }}
              style={{
                marginBottom: fontSize(8),
                marginHorizontal: fontSize(8),
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                // flexGrow: 1,
                flex: 1,
                // marginHorizontal: fontSize(22),
              }}
            >
              <Text
                style={{
                  fontFamily: font.Poppins_SemiBold,
                  color: color.palette.black,
                  // paddingLeft: fontSize(8),
                  // flexWrap: 'wrap',
                }}
              >
                {item?.documentName}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              marginBottom: fontSize(8),
              marginHorizontal: fontSize(8),
            }}
          >
            <Text
              style={{
                fontFamily: font.Poppins_SemiBold,
                color: color.palette.darkGray,
              }}
            >
              No attachments found
            </Text>
          </View>
        )}
      </View>
    );
  };

  const onPressRight = () => {
    setSingleFile(null);
    setEditVacc(false);
    setVaccineName("");
    setProvider("");
    setRequest("Select date");
    setShowOverlayPost(true);
  };

  return (
    <View testID="VideosScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={"Vaccines"}
          icon="chevron-left"
          onPressLeft={() => {
            navigation.goBack();
          }}
          iconRight="plus"
          onPressRight={onPressRight}
        />
      </View>

      <View style={BODY}>
        {isLoader ? <Loader /> : null}
        {!isLoader && videoList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyVideo")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <FlatList
            data={vaccineInitial}
            renderItem={({ item }) => renderRaw(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={commonStyle.flatBottomSpace}
            style={commonStyle.flatRadiousStyle}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.1}
            onEndReached={() => (endReach == false ? loadMorePage() : null)}
            onMomentumScrollBegin={() => setEndReachedMomentum(false)}
            ListFooterComponent={() => {
              return isMoreLoader ? (
                <LoadMore animating={isMoreLoader} />
              ) : null;
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
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
            style={Style.spaceTopCommon}
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
                <View style={Style.fullWidth}>
                  <DateTimePickerModal
                    isVisible={sdDate1Visible}
                    mode="date"
                    // maximumDate={new Date()}
                    onConfirm={handleSdDate1Confirm}
                    onCancel={hideSdDate1Picker}
                  />
                  <Input
                    // editable={editMode}
                    label={"Name Of Vaccine/s"}
                    value={vaccineName}
                    onChangeText={(text) => {
                      setVaccineName(text);
                    }}
                    // onBlur={handleBlur('other')}
                    // validation={() => {
                    //   setFieldTouched('other');
                    // }}
                    style={HoStyles.inputFull}
                    // error={touched.other && errors.other}
                    ref={vaccNameRef}
                    onSubmitEditing={() => {
                      providerRef.current.focus();
                    }}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    placeholder={"Please enter name of Vaccine/s"}
                  />

                  <View style={Style.directionRow}>
                    <Input
                      //   editable={editMode}
                      label={"Physician / Provider"}
                      style={HoStyles.inputNew}
                      value={provider}
                      onChangeText={(text) => {
                        setProvider(text);
                      }}
                      //   onBlur={handleBlur('diagnosis1')}
                      //   validation={() => {
                      //     setFieldTouched('diagnosis1');
                      //   }}
                      //   error={touched.diagnosis1 && errors.diagnosis1}
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
                      onPress={() => setSdDate1Visible(!sdDate1Visible)}
                      style={Style.fullFlex}
                    >
                      <View style={HoStyles.inputContainer}>
                        <Text style={Style.dateLbl}>
                          {translate("addEvent.date")}
                        </Text>

                        <View
                          style={{
                            ...HoStyles.wrapper,
                            ...Style.selectDataWrapper,
                          }}
                        >
                          <Text
                            style={[
                              {
                                color:
                                  request === "Select date"
                                    ? color.palette.darkGray
                                    : color.palette.black,
                              },
                            ]}
                          >
                            {request}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* {!editVacc ? ( */}
                  <TouchableOpacity
                    onPress={() => selectFiles()}
                    style={Style.selectFileWrapper}
                  >
                    <Text style={Style.vaccineLbl}>
                      {"groupDetails.SelectFile"}
                    </Text>
                  </TouchableOpacity>
                  {/* ) : null} */}
                  {singleFile != null ? (
                    <View style={Style.fileWrapper}>
                      <Text style={Style.fileWrapperLbl}>
                        {singleFile?.name
                          ? `${translate("groupDetails.FileName")}` +
                            singleFile?.name
                          : ""}
                      </Text>
                      <View>
                        {singleFile?.name ? (
                          <MaterialIcons
                            name="delete"
                            size={25}
                            onPress={() => setSingleFile(null)}
                          />
                        ) : null}
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>

              <Button
                text="Save"
                isLoader={isLoader}
                disabled={isLoader}
                style={loginButtonContainer}
                textStyle={BottonTitle}
                onPress={() => {
                  vaccineName == "" ||
                  dateTimestamp == "" ||
                  sdDate1 == "Select date" ||
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
                  setRequest("Select date");
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
        <DateTimePickerModal
          isVisible={sdDate1Visible}
          mode="date"
          //maximumDate={new Date()}
          onConfirm={handleSdDate1Confirm}
          onCancel={hideSdDate1Picker}
        />
      </SafeOverlay>
    </View>
  );
};
