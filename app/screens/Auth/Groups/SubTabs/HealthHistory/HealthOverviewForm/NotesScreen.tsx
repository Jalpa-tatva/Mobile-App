import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  BackHandler,
  Text,
  TouchableOpacity,
} from "react-native";

// import external libararies
import { RouteProp, useRoute } from "@react-navigation/native";
import Snackbar from "react-native-snackbar";
import ReadMore from "react-native-read-more-text";
import I18n from "i18n-js";
import moment from "moment";
import useAppNavigation from "@app/navigation/navigation";

// import custom component & function
import { Loader, EmptyView, Header, LoadMore } from "@components/index";
import { getProgressNotesAll } from "@app/services/api/groups";
import commonStyle from "@app/theme/commonStyle";
import { FULL, HEADERTOP, BODY } from "./Style";
import { color, fontSize } from "@theme/index";
import { HoStyles } from "./healthStyle";
import { FontAwesome } from "@app/utils/icons/VectorIcons";

export interface VideosProps {
  title: string;
  publishedText: string;
  thumbnail: string;
  onPress: Function;
  link: string;
}

let Sound = require("react-native-sound");

Sound.setCategory("Playback");

type RouteParam = {
  NotesScreen: {
    profile?: string;
  };
};

export const NotesScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<RouteParam, "NotesScreen">>();
  const [page, setPage] = useState(1);
  const [isMoreLoader, setMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [, setTotalVaccineData] = useState(4);
  const { profile } = route.params;
  const [vaccineInitial, setVaccineInitial] = useState([]);

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

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    setIsLoader(true);
    getProgressNotesAll(profile, 1)
      .then((res) => {
        console.log("notes", JSON.stringify(res));
        setTotalRecords(res.data[0].status.total);
        setTotalVaccineData(res.data[0].status.total);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            setTotalVaccineData(res.data[0].status.total);
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
          setIsLoader(false);
        }
      })
      .catch((err) => {
        // setHovData([]);
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
    getProgressNotesAll(profile, page)
      .then((res) => {
        console.log("res2", JSON.stringify(res));

        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            const cleanedArray = [];
            res.data[0].objectList.forEach((val) => {
              cleanedArray.push(val);
            });

            setVaccineInitial(
              page === 1 ? cleanedArray : [...vaccineInitial, ...cleanedArray]
            );

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

  const onRefresh = () => {
    setPage(1);
    setTotalRecords(0);
    setVaccineInitial([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);

    getNotes();
  };

  const renderRaw = (item, index) => {
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
            <Text style={HoStyles.vaccName}>{item?.physicianClinician}</Text>
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

          <ReadMore
            numberOfLines={3}
            renderTruncatedFooter={_renderTruncatedFooter}
            renderRevealedFooter={_renderRevealedFooter}
            onReady={_handleTextReady}
          >
            <Text style={HoStyles.vaccName}>
              {item?.assessment == "" ? "No details found" : item?.assessment}
            </Text>
          </ReadMore>
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
  };

  const onPressLeft = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPressRight = useCallback(() => {
    navigation.navigate("notes");
  }, [navigation]);

  return (
    <View testID="VideosScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={"Progress Notes"}
          icon="chevron-left"
          onPressLeft={onPressLeft}
          iconRight="plus"
          onPressRight={onPressRight}
        />
      </View>

      <View style={BODY}>
        {isLoader ? <Loader /> : null}
        {!isLoader && vaccineInitial.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.noData")}
            onPressRefresh={() => getNotes()}
          />
        ) : (
          <FlatList
            data={vaccineInitial}
            renderItem={({ item, index }) => renderRaw(item, index)}
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
    </View>
  );
};
