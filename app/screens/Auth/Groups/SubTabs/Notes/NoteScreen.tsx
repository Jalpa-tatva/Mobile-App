import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";

// import external libraries
import { useRoute, RouteProp } from "@react-navigation/native";
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";

// import custom function, component & styles
import { Loader, EmptyView } from "@components/index";
import { getTaskFolderList } from "@app/services/api/groups";
import { NoteItem } from "./NoteItem";
import { FULL, BODY } from "./Style";
import { color } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";
import { MODULES } from "@app/constants";
import useAppNavigation from "@app/navigation/navigation";

/***
 * NoteProps
 */

export interface NoteProps {
  uniqueId: string;
  recordName: string;
  folderId: string;
  description: string;
  taskCount: any;
  recordNumber: number;
  arrowIcon: string;
  onPress: Function;
  onPressDetails: Function;
  IsOpen: boolean;
}

type RouteParam = {
  NoteScreen: {
    uniqueIds: string;
    imageUrls: string;
    titles: string;
    canEditInfo: string;
  };
};

/***
 * NoteScreen
 */
export const NoteScreen: React.FC<{
  activeTab?: string;
  setActiveTab: any;
}> = ({ activeTab, setActiveTab }) => {
  const route = useRoute<RouteProp<RouteParam, "NoteScreen">>();

  const navigation = useAppNavigation();

  const uniqueId = route.params.uniqueIds;
  const { imageUrls, titles, canEditInfo } = route.params;

  const [taskFolderList, setTaskFolderList] = useState([]);

  const [isLoader, setIsLoader] = useState(false);

  const [refreshing] = useState(false);
  let commonArray = [];

  useEffect(() => {
    setActiveTab(activeTab);
    myTaskFolderApiCall();
  }, []);

  const myTaskFolderApiCall = async () => {
    console.log("myGroupApiCalluniqueId", uniqueId);

    setIsLoader(true);
    await getTaskFolderList(uniqueId)
      .then((res) => {
        console.log("getMyActivityList", JSON.stringify(res.data));

        if (res.data && res.data.length > 0) {
          if (res.data[0].status.code == 0) {
            if (res.data[0].objectList && res.data[0].objectList.length > 0) {
              setIsLoader(false);

              res.data[0].objectList.forEach(async (val) => {
                if (val.description != "Medications") {
                  commonArray.push({
                    recordNumber: val.recordNumber,
                    recordName: val.recordName,
                    folderId: val.folderId,
                    description: val.description,
                    taskCount: val.taskCount,
                    IsOpen: false,
                  });
                }

                setTaskFolderList(JSON.parse(JSON.stringify(commonArray)));
              });
            } else {
              setTaskFolderList([]);
            }
          } else {
            setTaskFolderList([]);
            setIsLoader(false);
          }
        } else {
          setIsLoader(false);

          setTaskFolderList([]);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setTaskFolderList([]);
      });
  };

  const onRefresh = () => {
    setTaskFolderList([]);

    myTaskFolderApiCall();
  };

  const handlePress = (item, index) => {
    const updatedData = taskFolderList.map((object, i) => {
      if (i === index) {
        object.IsOpen = !object.IsOpen;
        return object;
      } else {
        object.IsOpen = false;
        return object;
      }
    });

    setTaskFolderList(updatedData);
  };
  const handleNoData = () => {
    Snackbar.show({
      text: I18n.t("EmptyView.EmptyItem"),
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color.palette.red,
      textColor: color.palette.white,
      numberOfLines: 5,
    });
  };

  const renderRaw = (item: NoteProps, index: number) => {
    return (
      <NoteItem
        uniqueId={uniqueId}
        description={item.description}
        folderId={item.folderId}
        //taskCount={item.taskCount}
        taskCount={parseInt(item.taskCount)}
        IsOpen={item.IsOpen}
        arrowIcon={item.IsOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
        onPress={() => {
          console.log("onPress");
          parseInt(item.taskCount) > 0
            ? handlePress(item, index)
            : handleNoData();
        }}
        onPressDetails={(taskId) => {
          navigation.navigate(MODULES.NotesDetailsScreen, {
            taskId: taskId,
            folderId: item.folderId,
            uniqueId: uniqueId,
            imageUrls: imageUrls,
            titles: titles,
            fromss: "Notes",
            canEditInfo: canEditInfo,
          });
        }}
      />
    );
  };

  return (
    <View testID="NoteScreen" style={FULL}>
      <View style={BODY}>
        {isLoader ? <Loader /> : null}
        {!isLoader && taskFolderList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyTask")}
            onPressRefresh={() => onRefresh()}
          />
        ) : (
          <FlatList
            data={taskFolderList}
            renderItem={({ item, index }) => renderRaw(item, index)}
            showsVerticalScrollIndicator={false}
            //contentContainerStyle={commonStyle.flatBottomSpace}
            style={commonStyle.flexStyle}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};
