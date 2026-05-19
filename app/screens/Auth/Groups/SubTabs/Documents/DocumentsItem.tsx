import React, { JSX, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

// import external libraries
import { file } from "../../../../../../assets/images/index";
import ShowImage from "@app/components/FastImage/ShowImage";

// import custom styling & utils
import {
  RawContainer,
  HeaderWrapper,
  AuthorWrapper,
  TitleAuthor,
  FileImageWrapper,
  Title,
  FileContainer,
  LoaderWrapper,
  indicatorContainer,
  TitleAuthorFolder,
  folderWrapper,
  DownloadWrapper,
} from "./Style";
import { color, fontSize } from "@app/theme";
import { MaterialCommunityIcons } from "@app/utils/icons/VectorIcons";

/**
 *  DocProps
 */
export interface DocProps {
  clientFileName?: string;
  contactText?: string;
  documentId?: any;
  documentUrl?: string;
  type?: string;
  isFile?: string;
  progress?: any;
  createdText?: any;
  downloadStatus?: any;
  subject?: any;
  openDialog?: any;
  onViewPress?: Function;
  loader?: {
    loader?: boolean;
    selectedID?: number;
  };
  lastDownloadComplete: any;
}

/**
 *  DocumentsItem
 */
export function DocumentsItem(props: DocProps) {
  const [isDownload, setDownload] = useState(false);
  const checkExtensionRender = (): JSX.Element | null => {
    const documentUrl = props?.documentUrl?.toLowerCase();

    if (!documentUrl) return null;

    const imageExtensions = ["png", "gif", "jpeg", "jpg"];
    const excelExtensions = ["xlsx", "xlsm", "xlsb", "xltx"];
    const pptExtensions = ["pptx", "ppt", "potx", "potm", "ppsx", "pps"];
    const wordExtensions = ["doc", "docx"];
    const videoExtensions = ["mp4", "mov", "avi", "wmv", "flv"];
    const textExtensions = ["txt", "text"];
    const zipExtensions = ["zip"];
    const pdfExtensions = ["pdf"];

    const getExtension = (url: string): string | null => {
      const match = url.match(/\.(\w+)(\?.*)?$/);
      return match ? match[1] : null;
    };

    const extension = getExtension(documentUrl);

    if (!extension) return null;

    if (imageExtensions.includes(extension)) {
      return (
        <ShowImage
          url={props.documentUrl}
          imageStyle={FileImageWrapper}
          resizeMode="cover"
        />
      );
    }

    if (excelExtensions.includes(extension)) {
      return (
        <ShowImage
          source={file.excelIcon}
          imageStyle={FileImageWrapper}
          resizeMode="contain"
        />
      );
    }

    if (pptExtensions.includes(extension)) {
      return (
        <ShowImage
          source={file.pptIcon}
          imageStyle={FileImageWrapper}
          resizeMode="contain"
        />
      );
    }

    if (wordExtensions.includes(extension)) {
      return (
        <ShowImage
          source={file.docIcon}
          imageStyle={FileImageWrapper}
          resizeMode="contain"
        />
      );
    }

    if (pdfExtensions.includes(extension)) {
      return (
        <ShowImage
          source={file.pdfIcon}
          imageStyle={FileImageWrapper}
          resizeMode="contain"
        />
      );
    }

    if (textExtensions.includes(extension)) {
      return (
        <ShowImage
          source={file.textIcon}
          imageStyle={FileImageWrapper}
          resizeMode="contain"
        />
      );
    }

    if (videoExtensions.includes(extension)) {
      return (
        <ShowImage
          source={file.videoIcon}
          imageStyle={FileImageWrapper}
          resizeMode="contain"
        />
      );
    }

    if (zipExtensions.includes(extension)) {
      return (
        <ShowImage
          source={file.ZipIcon}
          imageStyle={FileImageWrapper}
          resizeMode="contain"
        />
      );
    }

    return (
      <ShowImage
        source={file.fileIcon}
        imageStyle={FileImageWrapper}
        resizeMode="contain"
      />
    );
  };

  useEffect(() => {
    const checkStatus = async () => {
      const checkUpdate = await props?.downloadStatus(
        props?.documentUrl,
        props?.subject
      );
      setDownload(checkUpdate);
    };
    checkStatus();
  }, [props?.lastDownloadComplete]);

  const folderRender = () => {
    return (
      <ShowImage
        source={file.folderIcon}
        imageStyle={FileImageWrapper}
        resizeMode="contain"
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={() => props.onViewPress(false)}
      activeOpacity={1}
      style={RawContainer}
    >
      <View style={HeaderWrapper}>
        <View style={AuthorWrapper}>
          {props?.isFile === "false" ? folderRender() : checkExtensionRender()}

          {props?.isFile === "false" && (
            <View style={folderWrapper}>
              <Text style={TitleAuthorFolder} numberOfLines={2}>
                {props?.clientFileName}
              </Text>
            </View>
          )}

          {props?.isFile === "true" && (
            <View style={FileContainer}>
              <Text style={TitleAuthor} numberOfLines={2}>
                {props?.clientFileName}
              </Text>
              <Text style={Title} numberOfLines={2}>
                {props?.contactText}
              </Text>
            </View>
          )}
        </View>
        {!isDownload && props?.isFile == "true" && (
          <TouchableOpacity
            style={DownloadWrapper}
            onPress={() =>
              props.openDialog({ data: props, downloadStatus: true })
            }
          >
            <MaterialCommunityIcons
              name="download-circle"
              size={fontSize(20)}
              color={color.secondary}
            />
          </TouchableOpacity>
        )}

        {props?.loader?.loader &&
          props?.loader?.selectedID == props?.documentId && (
            <View style={LoaderWrapper}>
              <ActivityIndicator
                color={color.dullOrange}
                style={indicatorContainer}
                animating={true}
                size={"small"}
              />
            </View>
          )}
      </View>
    </TouchableOpacity>
  );
}
