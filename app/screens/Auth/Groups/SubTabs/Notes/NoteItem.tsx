import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Loader } from "@components/index";

import { color, font, fontSize } from "@theme/index";
import { assets } from "../../../../../../assets/images/index";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getTaskFolderDetails } from "@app/services/api/groups";
export interface NoteProps {
  uniqueId: string;
  folderId: string;
  description: string;
  taskCount: number;
  arrowIcon: string;
  onPress: () => void;
  onPressDetails: Function;
  IsOpen: boolean;
}

export function NoteItem(props: NoteProps) {
  const [noteDetailsList, setNoteDetailsList] = useState([]);
  const [isMoreLoader, setIsMoreLoader] = useState(false);

  useEffect(() => {
    if (props.IsOpen) {
      callNoteDetailsApi();
    }
  }, [props.IsOpen]);

  const callNoteDetailsApi = async () => {
    setNoteDetailsList([]);
    setIsMoreLoader(true);
    await getTaskFolderDetails(props.uniqueId, props.folderId)
      .then((res) => {
        setIsMoreLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setNoteDetailsList(res.data[0].objectList);
          } else {
            setNoteDetailsList([]);
          }
        } else {
          setNoteDetailsList([]);
        }
      })
      .catch((err) => {
        setIsMoreLoader(false);
        setNoteDetailsList([]);
        // Snackbar.show({
        //   text: I18n.t('EmptyView.somethingWentWrong'),
        //   duration: Snackbar.LENGTH_LONG,
        //   backgroundColor: color.palette.lightGreen,
        //   textColor: color.palette.white,
        //   numberOfLines: 5,
        // });
      });
  };

  return (
    <View style={styles.RawContainerMain}>
      <View style={styles.RawContainer}>
        <Image source={assets.noteIcon} style={styles.ImageWrapper} />

        <Text
          style={styles.Title}
        >{`${props.description}(${props.taskCount})`}</Text>
        {/* <Text style={styles.Title}>{props.description}</Text> */}
        <TouchableWithoutFeedback onPress={props.onPress}>
          <MaterialIcons
            name={props.arrowIcon}
            size={fontSize(28)}
            color={color.palette.darkGray}
            style={styles.spaceRight}
          />
        </TouchableWithoutFeedback>
      </View>

      {props.IsOpen ? (
        <View style={styles.RawSub1Container}>
          {isMoreLoader ? <Loader /> : null}

          <FlatList
            data={noteDetailsList}
            scrollEnabled={true}
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={styles.fullFlex}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.RawSubContainer}
                  onPress={() => props.onPressDetails(item.taskId)}
                >
                  <View style={styles.ImageContainer}>
                    <Text style={{ color: color.white }}>{index + 1}</Text>
                  </View>

                  <Text style={styles.SUBTitle}>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  RawContainerMain: {
    backgroundColor: color.white,
    width: "90%",
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: fontSize(2) },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  spaceRight: { marginRight: 14 },

  RawContainerBottom: {
    flexDirection: "row",
  },
  fullFlex: {
    flex: 1,
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
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
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
    fontSize: fontSize(14),
    color: color.palette.blackSecondary,
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
