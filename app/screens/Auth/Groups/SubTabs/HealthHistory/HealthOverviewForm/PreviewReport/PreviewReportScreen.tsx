import React, { useState, useEffect, useCallback } from "react";
import { BackHandler, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { EmptyView, Loader, Header } from "@components/index";
import { FULL, HEADERTOP, BODY } from "./PreviewReportStyle";
import I18n from "i18n-js";
import { postPreviewReport } from "@app/services/api/groups";
import Snackbar from "react-native-snackbar";
import { color } from "@app/theme/color";
import useAppNavigation from "@app/navigation/navigation";

type RouteParam = {
  PreviewReportScreen: {
    previewData:
      | {
          profile?: string;
          filter?: string;
          emailFirst?: string;
          namefirst?: string;
          emailSecond?: string;
          subject?: string;
          message?: string;
          other?: string;
          healthInfoAbout?: string;
          nameSecond?: string;
          backgroundInformationReport?: string;
          familyHealthHistoryReport?: string;
          healthOverviewReport?: string;
          personalHealthHistoryReport?: string;
          readingsReport?: string;
          vaccineReport?: string;
        }
      | undefined;
  };
};
export const PreviewReportScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<RouteParam, "PreviewReportScreen">>();

  const previewData = route.params.previewData;
  const [isLoader, setIsloader] = useState(true);
  const [basePdf, setBasePdf] = useState("");

  const callpostHovApi = () => {
    setIsloader(true);

    const formData = new FormData();
    formData.append("profile", previewData.profile);
    formData.append("filter", previewData.filter);
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
      .then((res) => {
        setIsloader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setBasePdf(res.data[0].objectList[0].content);
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
        setIsloader(false);
        console.log("err==", err);
      });
  };

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      callpostHovApi();
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

  const onPressLeft = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View testID="PreviewReportScreen" style={FULL}>
      <View style={HEADERTOP}>
        <Header
          title={I18n.t("sendReportPlaceholder.PreviewReportLable")}
          icon="chevron-left"
          onPressLeft={onPressLeft}
        />
      </View>

      <View style={BODY}>
        {isLoader ? <Loader /> : null}
        {basePdf == "" ? (
          <EmptyView
            title={I18n.t("EmptyView.noData")}
            onPressRefresh={() => callpostHovApi()}
          />
        ) : null}
      </View>
    </View>
  );
};
