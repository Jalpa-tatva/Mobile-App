import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Alert,
  Platform,
  BackHandler,
  TouchableWithoutFeedback,
  AppState,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Loader, EmptyView, Header, AlertBox } from "@components/index";
import { DocumentsItem } from "./DocumentsItem";
import { FULL, HEADERTOP, BODY, styles } from "./Style";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";
import {
  checkPermissionAbove33Version,
  checkPermissionBelow33Version,
} from "@app/utils/Permissions/Permission";
import {
  showErrorMessage,
  showSuccessDocuments,
} from "@app/utils/commonFunction";
import useAppNavigation from "@app/navigation/navigation";

export interface DocProps {
  clientFileName: string;
  contactText: string;
  documentUrl: string;
  documentId: string;
  subject: string;
  createdText: string;
  isFile: string;
  type: string;
}
type RouteParam = {
  SubDocuments: {
    uniqueId: string | undefined;
    folderName: string | undefined;
  };
};

export const SubDocuments: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<RouteParam, "SubDocuments">>();
  const [documentList, setDocumentList] = useState<any>();
  const [, setProgress] = useState(0);
  const [, setPage] = useState(1);
  const [, setMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [alert, setAlert] = useState(false);
  const [DocsDetail, setDocsDetails] = useState({});
  const [isDownload, setIsDownload] = useState({
    loader: false,
    selectedID: 0,
  });
  const [, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [, setEndReachedMomentum] = useState(true);
  const [, setTotalRecords] = useState(0);
  const [lastDownloadComplete, setLastDownloadComplete] = useState(Date.now());

  useEffect(() => {
    const subscription = AppState.addEventListener("change", () => {
      setLastDownloadComplete(Date.now());
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
  }, [navigation]);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  // const loadMoreData = (page: number) => {
  //   setMoreLoader(true);
  //   setEndReach(false);
  //   getMyGroupDocument(page, uniqueId)
  //     .then(res => {
  //       if (res.data && res.data.length > 0) {
  //         if (res.data[0].objectList && res.data[0].objectList.length > 0) {
  //           setMoreLoader(false);
  //         } else {
  //           setMoreLoader(false);
  //           setEndReach(true);
  //         }
  //       } else {
  //         setMoreLoader(false);
  //         setEndReach(true);
  //       }
  //     })
  //     .catch(err => {
  //       setIsLoader(false);
  //     });
  // };

  // const loadMorePage = () => {
  //   if (!endReachedMomentum && totalRecords > documentList.length) {
  //     const pageData = page + 1;
  //     setPage(pageData);
  //     setMoreLoader(true);
  //     setEndReach(false);
  //     loadMoreData(pageData);
  //     setEndReachedMomentum(true);
  //   }
  // };

  const onRefresh = () => {
    setPage(1);
    setTotalRecords(0);
    setDocumentList({ files: [], folders: [] });
    setDocumentList(route?.params);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
  };

  const folderPath = RNFS.DocumentDirectoryPath + "/assets";

  const makeDirectory = async (folderPath) => {
    await RNFS.mkdir(folderPath); //create a new folder on folderPath
  };

  useEffect(() => {
    makeDirectory(folderPath); //execute this function on first mount
  }, []);

  const checkPermission = async (
    documentUrl,
    subject,
    selectedId,
    downloadStatus
  ) => {
    if (Platform.OS === "ios") {
      Download(documentUrl, subject, selectedId, downloadStatus);
    } else {
      try {
        const granted =
          Number(Platform.Version) < 33
            ? await checkPermissionBelow33Version()
            : await checkPermissionAbove33Version();

        if (granted) {
          Download(documentUrl, subject, selectedId, downloadStatus);
        } else {
          Alert.alert("Error", I18n.t("groupDetails.StoragePermissionDenied"));
        }
      } catch (err) {
        Alert.alert("Error", err);
      }
    }
  };

  const storeFiled = (fileExtension) => {
    if (Platform.OS === "android" && fileExtension !== "wav") {
      return `${RNFS.DownloadDirectoryPath}/Charlottesville Connected`;
    } else if (Platform.OS === "ios" || fileExtension === "wav") {
      return `${RNFS.DocumentDirectoryPath}/Charlottesville Connected`;
    }
    return `${RNFS.DocumentDirectoryPath}/Charlottesville Connected`;
  };

  const downloadFile = async (url, filePath, selectedId, subject) => {
    try {
      const downloadResult = await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        background: true,
        discretionary: true,
        progressDivider: 1,
        begin: (res) => console.log("Download started:", res),
        progress: (res) => {
          const progressPercent = (res.bytesWritten / res.contentLength) * 100;
          console.log(`Download Progress: ${progressPercent.toFixed(2)}%`);
        },
      }).promise;

      if (downloadResult.statusCode === 200) {
        showSuccessDocuments("File downloaded succesfully");
        setTimeout(() => {
          setLastDownloadComplete(Date.now());
          setIsDownload({ loader: false, selectedID: 0 });
          setIsLoader(false);
          openFile(filePath);
        }, 2000);

        console.log("download complted here...");
      } else {
        setProgress(0);
        setIsLoader(false);
        showErrorMessage(`'Error', 'Failed to download the file.'`);
      }
    } catch (error) {
      setIsLoader(false);
      setIsDownload({ loader: false, selectedID: 0 });
      showErrorMessage(`'Error--->', ${error}`);
      console.log("Error", error, filePath);
    }
  };
  const openFileWithoutDownload = async (documentUrl, subject, selectedId) => {
    try {
      let ext: any = getFileExtention(documentUrl);
      ext = "." + ext[0];
      setIsDownload({ loader: true, selectedID: selectedId });
      const tempFilePath = `${RNFS.DocumentDirectoryPath}/${subject}${ext}`;
      RNFS.downloadFile({ fromUrl: documentUrl, toFile: tempFilePath })
        .promise.then(() => FileViewer.open(tempFilePath))
        .then(() => {
          setIsDownload({ loader: false, selectedID: 0 });
          // success
          console.log("success!@3444", documentUrl, subject, selectedId);
        })
        .catch((error) => {
          setIsDownload({ loader: false, selectedID: 0 });

          Snackbar.show({
            text: error?.message,
            duration: Snackbar.LENGTH_SHORT,
          });
          // error
        });
    } catch {
      console.log("error:");
    }
  };
  const openFile = async (path) => {
    try {
      setIsDownload({ loader: false, selectedID: 0 });
      await FileViewer.open(path);
      setIsLoader(false);
    } catch (error) {
      setIsDownload({ loader: false, selectedID: 0 });
      setIsLoader(false);
    }
  };

  const Download = async (documentUrl, subject, selectedId, downloadStatus) => {
    setProgress(0);
    try {
      // Extract subject name and remove extension
      let subjectName = subject.replace(/\..*/, "");
      const fileExtension = getFileExtention(documentUrl)[0];
      const ext = `.${fileExtension}`;
      const localFile = `${RNFS.DocumentDirectoryPath}/${subject}`;
      console.log("sdasjdlsjd", localFile);

      // Determine file paths
      const folderPath = storeFiled(fileExtension);
      const filePath = `${folderPath}/${subjectName}${ext}`;

      // Ensure the folder exists
      const folderExists = await RNFS.exists(folderPath);
      if (!folderExists) {
        await RNFS.mkdir(folderPath);
      }

      // Check if the file already exists
      const fileExists = await RNFS.exists(filePath);
      if (downloadStatus) {
        setIsDownload({ loader: true, selectedID: selectedId });
        await downloadFile(documentUrl, filePath, selectedId, subject);
      } else if (fileExists) {
        openFile(filePath);
      } else {
        openFileWithoutDownload(documentUrl, subject, selectedId);
      }
    } catch (error) {
      console.error("Error in Download function:", error);
    }
  };

  const getFileExtention = (fileUrl) => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  const handleNavigation = useCallback(
    (item) => {
      navigation.push("SubDocuments", item);
    },
    [navigation]
  );

  const downloadStatus = async (documentUrl, subject) => {
    let subjectName = subject.replace(/\..*/, "");
    const fileExtension = getFileExtention(documentUrl)[0];
    const ext = `.${fileExtension}`;
    const folderPath = storeFiled(fileExtension);
    const filePath = `${folderPath}/${subjectName}${ext}`;
    const fileExists = await RNFS.exists(filePath);
    return fileExists;
  };

  const saveDialogDetail = (details) => {
    setDocsDetails(details);
    setAlert(true);
  };

  const renderRawOne = (item: DocProps) => {
    return (
      <DocumentsItem
        clientFileName={item.clientFileName}
        contactText={item.contactText}
        documentUrl={item.documentUrl}
        loader={isDownload}
        subject={item?.subject}
        createdText={item?.createdText}
        documentId={item?.documentId}
        isFile={item?.isFile}
        type={item?.type}
        openDialog={saveDialogDetail}
        downloadStatus={downloadStatus}
        onViewPress={(status) => {
          item?.isFile == "false"
            ? handleNavigation(item)
            : checkPermission(
                item?.documentUrl,
                item?.subject,
                item?.documentId,
                status
              );
        }}
        lastDownloadComplete={lastDownloadComplete}
      />
    );
  };

  const renderRawSecond = (item) => {
    return (
      <DocumentsItem
        clientFileName={
          item?.isFile === "false" ? item?.folderName : item?.clientFileName
        }
        contactText={item?.contactText}
        documentUrl={item?.documentUrl}
        loader={isDownload}
        openDialog={saveDialogDetail}
        subject={item?.subject}
        createdText={item?.createdText}
        documentId={item?.documentId}
        isFile={item?.isFile}
        type={item?.type}
        downloadStatus={downloadStatus}
        onViewPress={(status) => {
          item?.isFile == "false"
            ? handleNavigation(item)
            : checkPermission(
                item?.documentUrl,
                item?.subject,
                item?.documentId,
                status
              );
        }}
        lastDownloadComplete={lastDownloadComplete}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => console.log("dissmiss")}>
      <View testID="DocumentsScreen" style={FULL}>
        <View style={HEADERTOP}>
          <Header
            title={route?.params?.folderName}
            icon="chevron-left"
            onPressLeft={() => {
              navigation.goBack();
            }}
          />
        </View>

        <View style={BODY}>
          {isLoader ? <Loader /> : null}
          {!isLoader &&
          documentList?.files?.length == 0 &&
          documentList?.folders?.length == 0 ? (
            <EmptyView
              title={I18n.t("EmptyView.EmptyDocument")}
              onPressRefresh={() => onRefresh()}
            />
          ) : (
            <View style={{ flex: 1 }}>
              <View>
                <FlatList
                  data={documentList?.files}
                  renderItem={({ item }: any) => renderRawOne(item)}
                  showsVerticalScrollIndicator={false}
                  style={{}}
                  keyExtractor={(item: any) => item.id}
                  // onEndReachedThreshold={0.1}
                  // onEndReached={() =>
                  //   endReach == false ? loadMorePage() : null
                  // }
                  // onMomentumScrollBegin={() => setEndReachedMomentum(false)}
                  // ListFooterComponent={() => {
                  //   return isMoreLoader ? (
                  //     <LoadMore animating={isMoreLoader} />
                  //   ) : null;
                  // }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
              </View>
              <View>
                <FlatList
                  data={documentList?.folders}
                  renderItem={({ item }) => renderRawSecond(item)}
                  showsVerticalScrollIndicator={false}
                  // contentContainerStyle={commonStyle.flatBottomSpace}
                  // style={commonStyle.flatRadiousStyle}
                  keyExtractor={(item: any) => item.id}
                  // onEndReachedThreshold={0.1}
                  // onEndReached={() =>
                  //   endReach == false ? loadMorePage() : null
                  // }
                  // onMomentumScrollBegin={() => setEndReachedMomentum(false)}
                  // ListFooterComponent={() => {
                  //   return isMoreLoader ? (
                  //     <LoadMore animating={isMoreLoader} />
                  //   ) : null;
                  // }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
              </View>
            </View>
          )}
        </View>

        {/* {alert ? (
        <AlertMessage
          visible={alert}
          title={'Not available'}
          message={
            'This features is not available in the subcription package for this care team'
          }
          titleStyle={TitleStyle}
          messageStyle={AlertMessageStyle}
          onTouchOutside={() => setAlert(false)}
          buttomButton={false}
          noCancel={false}
          onClear={undefined}>
          <Text style={AlertText1}>
            This features is not available in the subcription package for this
            care Team
          </Text>
          <Text style={AlertText2}>Package upgrade</Text>
          <Text style={AlertTextt3}>
            Your care Team package can be upgraded at anytime by visiting{' '}
            <Text
              onPress={() => openTermsInappBrowser()}
              style={{textDecorationLine: 'underline'}}>
              www.Myhealth.Group/
            </Text>
            supports
          </Text>
        </AlertMessage>
      ) : null} */}
        {alert ? (
          <AlertBox
            visible={alert}
            title={I18n.t("AppDrawer.confirmation")}
            message={I18n.t("AppDrawer.confirmDialog")}
            titleStyle={styles.titleStyle}
            messageStyle={styles.messageStyle}
            onTouchOutside={() => setAlert(false)}
            onYes={async () => {
              setAlert(false);
              const documentRecord: any = DocsDetail;
              checkPermission(
                documentRecord?.data?.documentUrl,
                documentRecord?.data.subject,
                documentRecord?.data?.documentId,
                documentRecord?.downloadStatus
              );
            }}
            onCancel={() => setAlert(false)}
            onYesText={"Yes"}
            onCancelText={"No"}
            onClear={undefined}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};
