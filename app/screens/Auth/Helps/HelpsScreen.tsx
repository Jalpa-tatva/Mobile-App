import React, { useState, useEffect } from "react";
import { BackHandler, View, Linking } from "react-native";

// import external libraries
import I18n from "i18n-js";
import Snackbar from "react-native-snackbar";

// import custom function
import { EmptyView, Header, WebViews, Loader } from "@components/index";
import { getHelp } from "@services/api/profile";

// import custom styling & utils
import { Full, HeaderTop, Body } from "./styles";
import { color } from "@app/theme";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import useAppNavigation from "@app/navigation/navigation";
import { matcher } from "@app/constants";

/**
 * HelpsScreen component
 */
export const HelpsScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const [aboutContent, setAboutContent] = useState("");
  const [type] = useState("html");
  const [isLoader, setIsloader] = useState(false);
  const { groups } = content;
  const { drawer_status } = useRedux([groups.drawerStatus]);

  useEffect(() => {
    siteService();
  }, []);

  function isUrl(string) {
    return matcher.test(string);
  }

  const siteService = () => {
    setAboutContent("");
    setIsloader(true);
    getHelp()
      .then((res) => {
        console.log("help screen", res.data);
        if (res?.data && res?.data?.length > 0) {
          if (
            res?.data[0]?.objectList &&
            res?.data[0]?.objectList?.length != 0
          ) {
            setAboutContent(res?.data[0]?.objectList[0]?.html);
            isUrl(res?.data[0]?.objectList[0]?.html);
            setIsloader(false);
          } else {
            setIsloader(false);
            setAboutContent("");
          }
        }
      })
      .catch((err) => {
        console.log("err==", err);
        setIsloader(false);
        setAboutContent("");
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.red,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
      });
  };

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
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

  return (
    <View testID="HelpsScreen" style={Full}>
      <View style={HeaderTop}>
        <Header
          title={I18n.t("AppDrawer.Help")}
          icon={drawer_status?.isDrawerOpen ? "circle-with-cross" : "menu"}
          onPressLeft={() => {
            navigation.openDrawer();
          }}
        />
      </View>

      <View style={Body}>
        {isLoader ? <Loader /> : null}

        {!aboutContent && !isLoader ? (
          <EmptyView
            title={I18n.t("EmptyView.noData")}
            onPressRefresh={() => siteService()}
          />
        ) : (
          <WebViews
            type={type}
            source={aboutContent}
            onStartLoading={(request) => {
              if (type == "uri") {
                if (request?.url !== aboutContent) {
                  Linking.openURL(request.url);
                  return false;
                }
              }

              if (type == "html") {
                if (request?.url !== "about:blank") {
                  Linking.openURL(request.url);
                  return false;
                }
              }

              return true;
            }}
          />
        )}
      </View>
    </View>
  );
};
