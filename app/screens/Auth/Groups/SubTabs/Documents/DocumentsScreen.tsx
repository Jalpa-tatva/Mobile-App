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

// import external libraries
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";

// import custom function & component
import { Loader, EmptyView, Header, AlertBox } from "@components/index";
import { getDocuments, getMyGroupDocument } from "@app/services/api/groups";
import { DocumentsItem } from "./DocumentsItem";
import { color } from "@theme/index";
import useAppNavigation from "@app/navigation/navigation";
import { useRedux } from "@app/redux/hooks";

// import custom styling & utils
import commonStyle from "@app/theme/commonStyle";
import { FULL, HEADERTOP, BODY, styles } from "./Style";
import {
  checkPermissionAbove33Version,
  checkPermissionBelow33Version,
} from "@app/utils/Permissions/Permission";
import {
  showErrorMessage,
  showSuccessDocuments,
} from "@app/utils/commonFunction";
import { content } from "@app/utils/string";

/**
 *  DocProps
 */
export interface DocProps {
  clientFileName?: string;
  contactText?: string;
  documentUrl?: string;
  documentId?: string;
  subject?: string;
  onViewPress?: Function;
  isFile?: any;
  FileDetails?: any;
  FolderContent?: any;
}

/**
 *  DocumentsScreen component
 */
export const DocumentsScreen: React.FC = () => {
  const { groups } = content;
  const { group_detail } = useRedux([groups.groupsDetail]);
  const navigation = useAppNavigation();
  const uniqueId = group_detail.uniqueId;
  const [documentList, setDocumentList] = useState([]);
  const [page, setPage] = useState(1);
  const [alert, setAlert] = useState(false);
  const [DocsDetail, setDocsDetails] = useState({});
  const [isLoader, setIsLoader] = useState(false);
  const [isDownload, setIsDownload] = useState({
    loader: false,
    selectedID: 0,
  });
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lastDownloadComplete, setLastDownloadComplete] = useState(Date.now());
  const [progress, setProgress] = useState(0);
  const folderPath = RNFS.DocumentDirectoryPath + "/assets";

  useEffect(() => {
    const subscription = AppState.addEventListener("change", () => {
      setLastDownloadComplete(Date.now());
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const backHandler = () => {
      navigation.goBack();
      return true;
    };
    const unsubscribeFocus = navigation.addListener("focus", () => {
      onRefresh();
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backHandler
      );
      return () => subscibe.remove();
    });
    return unsubscribeFocus;
  }, [navigation]);

  const myDocumentApiCall = useCallback(() => {
    let arr = [];
    setDocumentList([]);
    setIsLoader(true);
    getDocuments(uniqueId)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0]?.status?.total);
            res.data[0].objectList?.map((item) => {
              arr.push(item);
            });
            setDocumentList(arr);
            setIsLoader(false);
          } else {
            setIsLoader(false);
            setDocumentList([]);
          }
        } else {
          setIsLoader(false);
          setDocumentList([]);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setDocumentList([]);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  }, [uniqueId]);

  const loadMoreData = useCallback(
    (page: number) => {
      // setMoreLoader(true);
      getMyGroupDocument(page, uniqueId)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            if (res.data[0].objectList && res.data[0].objectList.length > 0) {
              let groupObjectList = res.data[0].objectList;
              setDocumentList(
                page === 1
                  ? groupObjectList
                  : [...documentList, ...groupObjectList]
              );
              // setMoreLoader(false);
            } else {
              // setMoreLoader(false);
            }
          } else {
            // setMoreLoader(false);
          }
        })
        .catch((err) => {
          setIsLoader(false);
        });
    },
    [uniqueId]
  );

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > documentList.length) {
      const pageData = page + 1;
      setPage(pageData);
      // setMoreLoader(true);

      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };

  const onRefresh = useCallback(() => {
    setPage(1);
    setTotalRecords(0);
    setDocumentList([]);
    // setMoreLoader(false);
    setEndReachedMomentum(false);
    myDocumentApiCall();
  }, [uniqueId]);

  const checkPermission = useCallback(
    async (documentUrl, subject, selectedId, downloadStatus) => {
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
            Alert.alert(
              "Error",
              I18n.t("groupDetails.StoragePermissionDenied")
            );
          }
        } catch (err) {
          Alert.alert("Error", err);
        }
      }
    },
    []
  );

  const makeDirectory = async (folderPath) => {
    await RNFS.mkdir(folderPath); //create a new folder on folderPath
  };

  useEffect(() => {
    makeDirectory(folderPath); //execute this function on first mount
  }, []);

  const downloadStatus = async (documentUrl, subject) => {
    let subjectName = subject.replace(/\..*/, "");
    const fileExtension = getFileExtention(documentUrl)[0];
    const ext = `.${fileExtension}`;
    const folderPath = storeFiled(fileExtension);
    const filePath = `${folderPath}/${subjectName}${ext}`;
    const fileExists = await RNFS.exists(filePath);
    return fileExists;
  };

  const openFile = async (path) => {
    try {
      setIsDownload({ loader: false, selectedID: 0 });
      await FileViewer.open(path);
      setIsLoader(false);
    } catch {
      setIsDownload({ loader: false, selectedID: 0 });
      setIsLoader(false);
    }
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
          setIsDownload({ loader: false, selectedID: 0 });
          setIsLoader(false);
          openFile(filePath);
          setLastDownloadComplete(Date.now());
        }, 2000);
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

  const storeFiled = (fileExtension) => {
    if (Platform.OS === "android" && fileExtension !== "wav") {
      return `${RNFS.DownloadDirectoryPath}/Charlottesville Connected`;
    } else if (Platform.OS === "ios" || fileExtension === "wav") {
      return `${RNFS.DocumentDirectoryPath}/Charlottesville Connected`;
    }
    return `${RNFS.DocumentDirectoryPath}/Charlottesville Connected`; // Fallback for unexpected cases
  };

  const Download = async (documentUrl, subject, selectedId, downloadStatus) => {
    setProgress(0);
    try {
      // Extract subject name and remove extension
      let subjectName = subject.replace(/\..*/, "");
      const fileExtension = getFileExtention(documentUrl)[0];
      const ext = `.${fileExtension}`;

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

  const getFileExtention = (fileUrl) => {
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };
  const handleNavigation = useCallback(
    (item) => {
      navigation.push("SubDocuments", item);
    },
    [navigation]
  );
  const saveDialogDetail = (details) => {
    setDocsDetails(details);
    setAlert(true);
  };
  const renderRaw = (item: DocProps) => {
    const updateItem =
      item?.isFile === "false"
        ? JSON.parse(item?.FolderContent || "{}")
        : JSON.parse(item?.FileDetails || "{}");

    return (
      <DocumentsItem
        clientFileName={
          item?.isFile === "false"
            ? updateItem?.folderName
            : updateItem?.clientFileName
        }
        loader={isDownload}
        contactText={updateItem?.contactText}
        documentUrl={updateItem?.documentUrl}
        createdText={updateItem?.createdText}
        isFile={updateItem?.isFile}
        type={updateItem?.type}
        subject={updateItem?.subject}
        progress={progress}
        downloadStatus={downloadStatus}
        documentId={updateItem?.documentId}
        openDialog={saveDialogDetail}
        onViewPress={(downloadStatus) =>
          item?.isFile == "false"
            ? handleNavigation(updateItem)
            : checkPermission(
                updateItem.documentUrl,
                updateItem.subject,
                updateItem?.documentId,
                downloadStatus
              )
        }
        lastDownloadComplete={lastDownloadComplete}
      />
    );
  };

  const navigateToBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => console.log("dissmiss")}>
      <View testID="DocumentsScreen" style={FULL}>
        <View style={HEADERTOP}>
          <Header
            title={I18n.t("groupDetails.Documents")}
            icon="chevron-left"
            onPressLeft={navigateToBack}
          />
        </View>

        <View style={BODY}>
          {isLoader ? <Loader /> : null}
          {!isLoader && documentList.length == 0 ? (
            <EmptyView
              title={I18n.t("EmptyView.EmptyDocument")}
              onPressRefresh={() => onRefresh()}
            />
          ) : (
            <FlatList
              data={documentList}
              renderItem={({ item }) => renderRaw(item)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={commonStyle.flatBottomSpace}
              style={commonStyle.flatRadiousStyle}
              keyExtractor={(item) => item.id}
              // onEndReachedThreshold={0.1}
              // onEndReached={() => (endReach == false ? loadMorePage() : null)}
              // onMomentumScrollBegin={() => setEndReachedMomentum(false)}
              // ListFooterComponent={() => {
              //   return isMoreLoader ? (
              //     <LoadMore animating={isMoreLoader} />
              //   ) : null;
              // }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>

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
