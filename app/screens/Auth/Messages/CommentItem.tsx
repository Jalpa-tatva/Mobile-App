import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AppState,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

// External libraries
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import * as Progress from "react-native-progress";

// Components & Context, Services & Utils
import ShowImage from "@app/components/FastImage/ShowImage";
import { useRedux } from "@app/redux/hooks";
import { content } from "@app/utils/string";
import { file } from "../../../../assets/images/index";
import { emojiList } from "@app/constants";

// Styles & Theme
import styleConfig from "@app/theme/styleConfig";
import { profileStyle } from "../UserProfile/ProfileStyle";
import {
  RawContainerMain,
  Title,
  RawContainer,
  TextContainer,
  ModalStyle,
  emojiModal,
  LoginEmojiCal,
  unKnownEmojiCal,
  DateStyle,
  EmojiTitle,
  DocText,
  TextContainerDocs,
  TextArea,
  UpdateTextArea,
  IconsView,
  DocIcon,
  FileImageWrapper,
  VideoPreview,
  ProgressUpdate,
  MainView,
  styles,
} from "./Styles";
import { color, fontSize } from "@theme/index";

export type CommentProps = Readonly<{
  comment: any;
  closeBottomSheet: any;
  from: string;
  time: string;
  loginUser: string;
  id?: any;
  visible?: boolean;
  commentId?: string;
  setVisible?: Function;
  setCommentId?: Function;
  setDocsVisible?: Function;
  emoji: Array<Record<string, any>>;
  isGroup?: boolean | string;
  bottomSheetRef?: any;
  isLoader?: boolean;
  item?: any;
  reactMessage: Function;
  originalImageUrl?: string;
}>;

const folderName = "Charlottesville Connected";
const picturesDirPath = styleConfig.isIphone
  ? RNFS.DocumentDirectoryPath
  : RNFS.DownloadDirectoryPath;
const imageFolderPath = styleConfig.isIphone
  ? `${picturesDirPath}/Photos`
  : `${picturesDirPath}/${folderName}/Photos`;
const videoFolderPath = styleConfig.isIphone
  ? `${picturesDirPath}/Videos`
  : `${picturesDirPath}/${folderName}/Videos`;
const docsFolderPath = styleConfig.isIphone
  ? `${picturesDirPath}/Documents`
  : `${picturesDirPath}/${folderName}/Documents`;

const Loader = (props: { isLoader: boolean }) => {
  return (
    <ActivityIndicator
      animating={props?.isLoader}
      style={styles.loaderCal}
      color={color.white}
    />
  );
};

const { groups } = content;

const checkExtensionRandor = (documentUrl) => {
  if (
    documentUrl.match("png") ||
    documentUrl.match("gif") ||
    documentUrl.match("jpeg") ||
    documentUrl.match("PNG") ||
    documentUrl.match("jpg") ||
    documentUrl.match("JPEG")
  ) {
    console.log("match");
    return (
      <ShowImage
        source={file.imageIcon}
        imageStyle={FileImageWrapper}
        resizeMode="cover"
      />
    );
  }

  if (documentUrl.match("doc") || documentUrl.match("docx")) {
    return (
      <ShowImage
        source={file.docIcon}
        imageStyle={FileImageWrapper}
        resizeMode="contain"
      />
    );
  }

  if (documentUrl.match("pdf")) {
    return (
      <ShowImage
        source={file.pdfIcon}
        imageStyle={FileImageWrapper}
        resizeMode="contain"
      />
    );
  }

  if (documentUrl.match("txt") || documentUrl.match("text")) {
    return (
      <ShowImage
        source={file.textIcon}
        imageStyle={FileImageWrapper}
        resizeMode="contain"
      />
    );
  } else {
    return (
      <ShowImage
        source={file.fileIcon}
        imageStyle={FileImageWrapper}
        resizeMode="contain"
      />
    );
  }
};

const fileType = (message?: { name?: string }) => {
  const ext = message?.name?.split(".").pop()?.toLowerCase();
  if (!ext) return undefined;

  const documentExts = ["docx", "pdf", "doc", "txt"];
  const imageExts = ["png", "jpg", "jpeg"];

  if (documentExts.includes(ext)) {
    return "document-text-sharp";
  }

  if (imageExts.includes(ext)) {
    return "images-sharp";
  }

  if (ext === "mp4") {
    return "play-circle-sharp";
  }

  return undefined;
};
export function CommentItem(props: CommentProps) {
  const { setVisible, visible, commentId, setCommentId } = props;
  const appState = useRef(AppState.currentState);
  const [messageTime, setMessageTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDownload, setIsDownload] = useState(false);
  const [localImagePath, setLocalImagePath] = useState(null);
  const { login_detail } = useRedux([groups.loginDetail]);

  let loginData = login_detail;

  useEffect(() => {
    props?.item?.message.type?.toLowerCase()?.includes("video") &&
      createVideoThumbnail();
    let todayTime = moment(Number(props.time)).format("h:mm a");
    setMessageTime(todayTime);
    /**
       const timestampDate = new Date(parseInt(props.time));
       const currentDate = new Date();
     const differenceInTime = Number(currentDate) - Number(timestampDate);
     const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
     let dateUpdate = moment(Number(props.time)).format("DD/MM/YY");
     if (differenceInDays == 1) {
      setLastMsgDate("Yesterday");
    } else if (differenceInDays == 0) {
      setLastMsgDate(todayTime);
    } else {
      setLastMsgDate(dateUpdate);
    } */
  }, []);

  const formatBytes = (message) => {
    const docType = message?.name?.split(".");

    if (message.size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(message.size) / Math.log(k));
    const size = parseFloat((message.size / Math.pow(k, i)).toFixed(2));
    return `${size} ${sizes[i]} - ${docType[1]}`;
  };

  const createVideoThumbnail = async () => {
    try {
      /**
      let thumbnail = await createThumbnail({
        url:
          "https://epionecares.org/image/1-56778-1303-0x0-25916e2754e5e1716536941369-369000000-608/file_example_MP4_1280_10MG.mp4",
        timeStamp: 10000,
      });
      setVideoThumbnail(thumbnail);**/
    } catch (error) {
      console.log("thumbnail created", error);
    }
  };

  useEffect(() => {
    /** props?.setDocsVisible(false);
    setVisible(!visible);
    setCommentId(props.id);**/
    findDocsStatus();
    const subscription = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );

    return () => {
      subscription.remove(); // Properly remove the event listener
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      props?.item?.message?.documentUrl && findDocsStatus();
    }
    appState.current = nextAppState;
  };

  const checkFileStatus = () => {
    let checkImages = props?.item?.message?.type?.includes("image");
    let checkVideo = props?.item?.message?.type?.includes("video");
    let checkDocuments = props?.item?.message?.type?.includes("file");

    if (checkImages) {
      return imageFolderPath;
    } else if (checkDocuments) {
      return docsFolderPath;
    } else if (checkVideo) {
      return videoFolderPath;
    } else return imageFolderPath;
  };

  const findDocsStatus = async () => {
    createFolder();
    const folder = checkFileStatus();
    try {
      const filePath = `${folder}/${props?.item?.message?.name}`;

      const exists = await RNFS.exists(filePath);

      if (exists) {
        setLocalImagePath(`file://${filePath}`);
        setIsDownload(false);
        return true;
      } else {
        setIsDownload(true);
        setLocalImagePath(null);
        return false;
      }
    } catch {
      return false;
    }
  };

  const openFile = () => {
    const folder = checkFileStatus();

    const localFile = `${folder}/${props?.item?.message?.subject}`;

    localFile && FileViewer.open(localFile);
  };

  const createFolder = async () => {
    const folderPath = checkFileStatus();
    const folderExists = await RNFS.exists(folderPath);

    if (!folderExists) {
      await RNFS.mkdir(folderPath, { NSURLIsExcludedFromBackupKey: true });
    }
  };

  const storeFile = async () => {
    try {
      setIsDownload(false);
      setIsLoading(true); // Start loading
      setProgress(0);
      const folder = checkFileStatus();
      const imageName = props?.item?.message?.name; // Replace with the desired image name and extension
      const localFilePath = `${folder}/${imageName}`;

      const downloadResult = RNFS.downloadFile({
        fromUrl: props?.item?.message?.documentUrl, // The URL of the image to download
        toFile: localFilePath, // The path where the image will be stored
        background: true,

        discretionary: true,
        progressDivider: 1, // Set the frequency of the progress callback
        begin: () => {
          console.log("Download has started.");
        },
        progress: (data) => {
          const percentage = data.bytesWritten / data.contentLength;
          setProgress(percentage); // Update progress (value between 0 and 1)
          console.log(`Download progress: ${Math.round(percentage * 100)}%`);
        },
      });

      const result = await downloadResult.promise;

      if (result.statusCode === 200) {
        console.log(
          "Image successfully downloaded and saved to:",
          localFilePath
        );

        setLocalImagePath(`file://${localFilePath}`);
        openFile();
        setIsLoading(false);
      } else {
        console.error(
          "Failed to download image. Status code:",
          result.statusCode
        );
      }
      // }
      //  else {
      //   // If permission denied then show alert
      //   Alert.alert('Error', I18n.t('groupDetails.StoragePermissionDenied'));
      // }
      // }
    } catch (error) {
      // Download the image using RNFS
      console.error("Error downloading image:", error);
    }
  };

  const closeAction = () => {
    props?.setDocsVisible(false);
    setVisible(false);
    props?.closeBottomSheet();
  };

  const conbineUsers = () => {
    const combinedUsers = Object.entries(props?.emoji).flatMap(([key, value]) =>
      value?.users?.map((user) => ({
        ...user,
        emoji: emojiList[Number(key) - 1], // Add emoji to each user based on key
      }))
    );
    return combinedUsers;
  };

  const progressWrapper = () => {
    return (
      <>
        {isLoading && !localImagePath && (
          <Progress.Circle
            size={40}
            progress={progress}
            showsText
            color="black"
            thickness={4}
            textStyle={styles.progressLabel}
          />
        )}

        {isDownload && !isLoading && (
          <View style={IconsView}>
            <Ionicons name="arrow-down-circle" size={fontSize(20)} />
          </View>
        )}
      </>
    );
  };

  const renderMessageContent = () => {
    const hasFile = !!props?.comment?.name;
    const fileTypeIcon = hasFile ? fileType(props?.comment) : null;

    const onLongPress = () => {
      setVisible(true);
      setCommentId(props.id);
    };

    const onPress = () =>
      isDownload && !localImagePath ? storeFile() : openFile();

    // FILE MESSAGE FLOW
    if (hasFile) {
      //  DOCUMENT
      if (fileTypeIcon === "document-text-sharp") {
        return (
          <TouchableOpacity
            style={TextContainerDocs}
            onLongPress={onLongPress}
            onPress={onPress}
          >
            <View style={DocIcon}>
              {checkExtensionRandor(props?.comment.name)}
            </View>

            <View style={{ ...TextArea, ...UpdateTextArea }}>
              <Text numberOfLines={26} style={Title}>
                {props.comment.name}
              </Text>

              {props.comment.size && (
                <Text style={DocText}>{`${formatBytes(props.comment)} `}</Text>
              )}

              <View style={ProgressUpdate}>{progressWrapper()}</View>
            </View>
          </TouchableOpacity>
        );
      }

      //  IMAGE
      else if (fileTypeIcon === "images-sharp") {
        return (
          <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
            <View style={VideoPreview}>
              {localImagePath && !isDownload && !isLoading ? (
                <Image
                  source={{ uri: localImagePath }}
                  style={[styles.videoWrapper]}
                />
              ) : (
                <ShowImage
                  url={props?.item?.message?.thumbnail}
                  imageStyle={[styles.videoWrapper, { opacity: 0.2 }]}
                />
              )}

              <View style={styles.playWrapper}>{progressWrapper()}</View>
            </View>

            <View style={styles.videoDetail}>
              <Text style={DocText}>{`${formatBytes(props.comment)} `}</Text>
            </View>
          </TouchableOpacity>
        );
      }

      //  VIDEO
      else if (fileTypeIcon === "play-circle-sharp") {
        return (
          <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
            <View style={VideoPreview}>
              <ShowImage
                url={props?.item?.message?.thumbnail}
                imageStyle={[
                  styles.videoWrapper,
                  {
                    opacity:
                      localImagePath && !isDownload && !isLoading ? 1 : 0.2,
                  },
                ]}
              />

              <View style={styles.playWrapper}>
                {progressWrapper()}
                {!isDownload && !isLoading && (
                  <View style={styles.iconWrapper}>
                    <Ionicons
                      name="play"
                      size={fontSize(20)}
                      color={color.white}
                    />
                  </View>
                )}
              </View>
            </View>

            <View style={styles.videoDetail}>
              <Text style={DocText}>{`${formatBytes(props.comment)} `}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    }

    // TEXT ONLY
    return (
      <View style={TextContainer}>
        {(props?.isGroup || props?.isGroup === "true") && (
          <Text numberOfLines={1} style={profileStyle.personCal}>
            {props?.item?.profile}
          </Text>
        )}

        <View style={profileStyle.entireSpace}>
          <Text numberOfLines={26} style={Title}>
            {props.comment}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback
      style={MainView}
      onLongPress={() => {
        props?.setDocsVisible(false);
        setVisible(!visible);
        setCommentId(props.id);
      }}
      onPress={() => closeAction()}
    >
      <View
        style={[
          RawContainerMain,
          {
            paddingLeft:
              props.from == props.loginUser ? fontSize(50) : fontSize(15),
            paddingRight:
              props.from == props.loginUser ? fontSize(15) : fontSize(50),
          },
        ]}
      >
        {visible && props.id && commentId === props.id && (
          <ShowEmojis {...props} commentId={commentId} loginData={loginData} />
        )}

        <View
          style={[
            RawContainer,
            {
              flexDirection:
                props.from !== props.loginUser ? "row" : "row-reverse",
              alignSelf:
                props.from == props.loginUser ? "flex-end" : "flex-start",
              backgroundColor:
                props.from == props.loginUser
                  ? color.palette.secodaryShade
                  : color.palette.purpleShade,
            },
          ]}
        >
          {renderMessageContent()}
        </View>
        {Object.keys(props?.emoji).length > 0 && (
          <View
            style={
              props.from === props.loginUser
                ? { ...emojiModal, ...unKnownEmojiCal }
                : { ...emojiModal, ...LoginEmojiCal }
            }
          >
            {Object.keys(props?.emoji).map((emoji) => {
              return (
                <TouchableOpacity
                  key={emoji}
                  style={[styles.spaceBoth]}
                  onPress={() => {
                    setCommentId(props.id);
                    props?.bottomSheetRef({
                      emojiUser: conbineUsers(),
                      reaction: props?.emoji,
                    });
                  }}
                >
                  <Text style={EmojiTitle}>
                    {`${emojiList[Number(emoji) - 1]?.emoji}`}

                    {props?.emoji[emoji]?.count > 1 &&
                      ` ${props?.emoji[emoji]?.count}`}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {props?.isLoader &&
              commentId === props.id &&
              Object.keys(props?.emoji).length != 0 && (
                <Loader isLoader={props?.isLoader} />
              )}
          </View>
        )}
        {props?.isLoader &&
          commentId === props.id &&
          Object.keys(props?.emoji).length == 0 && (
            // Object.keys(props?.emoji).length
            <View
              style={
                props.from === props.loginUser
                  ? { ...emojiModal, ...unKnownEmojiCal }
                  : { ...emojiModal, ...LoginEmojiCal }
              }
            >
              <Loader isLoader={props?.isLoader} />
            </View>
          )}
        <Text
          style={[
            DateStyle,
            {
              alignSelf:
                props.from == props.loginUser ? "flex-end" : "flex-start",
            },
          ]}
        >
          {messageTime}
        </Text>
      </View>
      {/* </View> */}
    </TouchableWithoutFeedback>
  );
}
interface ShowEmojisProps extends CommentProps {
  commentId: string;
  loginData: any;
}
const ShowEmojis = ({ commentId, loginData, ...props }: ShowEmojisProps) => {
  return (
    <FlatList
      data={emojiList}
      style={
        props.from == props.loginUser
          ? [ModalStyle, { right: "10%" }]
          : { ...ModalStyle, ...styles.modelWrapper }
      }
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.spaceBothPad}
            onPress={() => {
              props?.reactMessage(
                item,
                commentId,
                loginData?.userName,
                props?.originalImageUrl,
                props?.emoji
              );
            }}
          >
            <Text style={styles.emojiFont}>{item.emoji}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
