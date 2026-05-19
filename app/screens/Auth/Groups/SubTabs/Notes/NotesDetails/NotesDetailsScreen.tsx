import React, { useEffect, useState, useRef } from "react";
import { View, BackHandler, Image, Text, TouchableOpacity } from "react-native";

// import external libraries
import { CommonActions, useRoute } from "@react-navigation/native";
import Snackbar from "react-native-snackbar";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import RBSheet from "react-native-raw-bottom-sheet";
import I18n from "i18n-js";

// import custom function
import { Loader, Header } from "@components/index";
import { MODULES, SafeRBSheet } from "@app/constants";
import { getTaskFolderDetailsData, deleteTask } from "@app/services/api/groups";
import { assets } from "../../../../../../../assets/images/index";

// import custom styling & utils
import {
  FULL,
  HEADERTOP,
  BODY,
  DetailsContainer,
  profileStyle,
  sub1ContainerStyle,
  titleStyle,
  text1Style,
  textStyle,
  OverLayButtonText,
  SheetWrapper,
  WrapperContainer,
  ButtonSheetTitle,
  OverLayButtonContainerCencel,
  BottomlWrapperMain,
  Title,
  TitleLocation,
} from "./Style";
import { color } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";
import useAppNavigation from "@app/navigation/navigation";

interface ListDetailProp {
  description?: string;
  taskCategory?: string;
  priority?: string;
  notes?: string | boolean;
  assignedTo?: string | boolean;
  completeDate?: any;
}
/**
 * NotesDetailsScreen component
 */
export const NotesDetailsScreen: React.FC = () => {
  //const navigation = useNavigation();
  const navigation = useAppNavigation();
  const route = useRoute<any>();

  const taskId = route.params.taskId;
  const folderId = route.params.folderId;
  const uniqueId = route.params.uniqueId;
  const imageUrls = route.params.imageUrls;
  const titles = route.params.titles;
  const fromss = route.params.fromss;
  const canEditInfo = route.params.canEditInfo;

  const [isLoader, setIsLoader] = useState(false);
  const [listDetails, setListDetails] = useState<ListDetailProp>(null);

  const refRBSheet = useRef<RBSheet>(null);

  useEffect(() => {
    const subscibe = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => subscibe.remove();
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const deleteServiceApicall = () => {
    setIsLoader(true);
    deleteTask(uniqueId, taskId)
      .then((res) => {
        console.log("deleteTask", JSON.stringify(res));
        setIsLoader(false);

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            Snackbar.show({
              text: I18n.t("addTask.TaskDeleted"),
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
                      fromss: fromss,
                    },
                  },
                ],
              }),
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
          Snackbar.show({
            text: res.message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.red,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
        setIsLoader(false);

        console.log("err", err);
      });
  };

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      detailsApiCall();
    });

    // return unsubscribe, focus;
    return focus;
  }, []);

  const detailsApiCall = async () => {
    setIsLoader(true);
    await getTaskFolderDetailsData(uniqueId, folderId, taskId)
      .then((res) => {
        console.log("getEventDetails", JSON.stringify(res.data));
        setIsLoader(false);

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length != 0) {
            setListDetails(res.data[0].objectList[0]);
          } else {
          }
        }
      })
      .catch((err) => {
        console.log("err==", err);
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

  return (
    <View testID="ListDetailsScreen" style={FULL}>
      <SafeRBSheet
        ref={refRBSheet}
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
                refRBSheet.current.close();
              }}
              color={color.palette.blackSecondary}
            />
          </View>

          <View style={SheetWrapper}>
            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => {
                //setIsLine(true)
                navigation.navigate(MODULES.AddNotesScreen, {
                  item: listDetails,
                  taskId: taskId,
                  folderId: folderId,
                  imageUrl: imageUrls,
                  title: titles,
                  uniqueId: uniqueId,
                  fromss: fromss,
                  fromEdit: true,
                  canEditInfo: canEditInfo,
                });

                refRBSheet.current.close();
              }}
            >
              <FontAwesome5
                name="edit"
                size={25}
                color={color.palette.white}
                style={{ paddingLeft: 30 }}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("addTask.EditNotes")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => {
                //setIsLine(false);
                refRBSheet.current.close();
                deleteServiceApicall();
              }}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={25}
                color={color.palette.white}
                style={{ paddingLeft: 30 }}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("addTask.DeleteNotes")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>{I18n.t("addTask.Cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>

      <View style={HEADERTOP}>
        <Header
          title={I18n.t("addTask.TaskDetails")}
          icon="chevron-left"
          iconRight={canEditInfo === "true" ? "dots-three-vertical" : null}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            refRBSheet.current.open();
          }}
        />
      </View>

      <View style={BODY}>
        <View style={DetailsContainer}>
          {isLoader == true ? (
            <Loader />
          ) : (
            <View>
              <View style={sub1ContainerStyle}>
                <Image
                  source={assets.noteIcon}
                  style={profileStyle}
                  resizeMode="cover"
                />

                <View style={titleStyle}>
                  <View style={{ flexDirection: "row", paddingRight: 5 }}>
                    <Text numberOfLines={1} style={textStyle}>
                      {listDetails.description}
                    </Text>
                  </View>

                  <Text numberOfLines={2} style={text1Style}>
                    {listDetails.taskCategory}
                  </Text>
                </View>
              </View>

              {listDetails?.notes ? (
                <View style={BottomlWrapperMain}>
                  <View>
                    <Text style={Title}>{I18n.t("addTask.Notes")}</Text>
                  </View>
                  <Text style={TitleLocation}>{listDetails.notes}</Text>
                </View>
              ) : null}

              <View style={BottomlWrapperMain}>
                <View>
                  <Text style={Title}>{I18n.t("addTask.Priority")}</Text>
                </View>
                <Text style={TitleLocation}>{listDetails.priority}</Text>
              </View>

              <View style={BottomlWrapperMain}>
                <View>
                  <Text style={Title}>{I18n.t("addTask.assignedTo")}</Text>
                </View>
                <Text style={TitleLocation}>
                  {listDetails.assignedTo
                    ? listDetails.assignedTo
                    : "Not Assigned"}
                </Text>
              </View>

              <View style={BottomlWrapperMain}>
                <View>
                  <Text style={Title}>{I18n.t("addTask.CompleteDate")}</Text>
                </View>
                <Text style={TitleLocation}>
                  {listDetails.completeDate
                    ? moment(
                        listDetails.completeDate.slice(0, -3) * 1000
                      ).format("MMM DD, YYYY, HH:mm a")
                    : I18n.t("addTask.NotComplete")}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
