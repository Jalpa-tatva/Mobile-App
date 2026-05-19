import React, { useEffect, useState } from "react";
import { View, BackHandler, Linking } from "react-native";

// import external libraries
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";

// import custom function
import { EmptyView, Header, WebViews, Loader } from "@components/index";
import { getSupportSite } from "@app/services/api/profile";

// import custom styling & utils
import { Full, HeaderTop, Body } from "./style";
import { color } from "@theme/index";
import useAppNavigation from "@app/navigation/navigation";

/**
 * SupportScreen component
 */

export const SupportScreen: React.FC = () => {
  const navigation = useAppNavigation();

  const [aboutContent, setAboutContent] = useState("");
  const [type] = useState("html");

  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      siteService();
      const subscibe = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => subscibe.remove();
    });

    return focus;
  }, []);

  const siteService = () => {
    setIsLoader(true);
    getSupportSite()
      .then((res) => {
        console.log("getSupportSite", JSON.stringify(res));
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length != 0) {
            setAboutContent(res.data[0].objectList[0].html);
          } else {
            setAboutContent("");
          }
        }
      })
      .catch((err) => {
        console.log("err==", err);
        setIsLoader(false);
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

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  return (
    <View testID="SupportScreen" style={Full}>
      <View style={HeaderTop}>
        <Header
          title={I18n.t("TabTitle.Support")}
          icon="menu"
          onPressLeft={() => {
            navigation.openDrawer();
          }}
        />
      </View>

      <View style={Body}>
        {isLoader ? <Loader /> : null}

        {!aboutContent && !isLoader ? (
          <EmptyView
            title="Data not available"
            onPressRefresh={() => console.log("Refresh")}
          />
        ) : (
          <WebViews
            type={type}
            source={aboutContent}
            onStartLoading={(request) => {
              console.log("request", request);

              if (type == "uri") {
                if (request.url !== aboutContent) {
                  Linking.openURL(request.url);
                  return false;
                }
              }

              if (type == "html") {
                if (request.url !== "about:blank") {
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
