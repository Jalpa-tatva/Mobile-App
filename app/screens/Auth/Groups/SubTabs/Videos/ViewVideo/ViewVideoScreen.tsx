import React, { useEffect, useState } from "react";
import { Dimensions, StatusBar, View } from "react-native";

// Import the external lib.
import { RouteProp, useRoute } from "@react-navigation/native";
import I18n from "i18n-js";

// Import the custom function,styles and common components.
import { EmptyView, Header, WebViews } from "@components/index";
import {  HEADERTOP, WRAPPER } from "./Style";
import useAppNavigation from "@app/navigation/navigation";
import { translate } from "@app/i18n";

type RootStackParamList = {
  link: string;
  title: string;
};
type ViewVideoProp = RouteProp<
  { ViewVideoScreen: RootStackParamList },
  "ViewVideoScreen"
>;

export const ViewVideoScreen: React.FC = () => {
  const route = useRoute<ViewVideoProp>();
  const navigation = useAppNavigation();

  const [type] = useState("uri");
  const { link, title } = route.params;

  const [isLoader] = useState(true);
  const [screen, setScreen] = useState(Dimensions.get("window"));

  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });

    return () => sub?.remove();
  }, []);

  const isLandscape = screen.width > screen.height;
  useEffect(() => {
    StatusBar.setHidden(isLandscape);

    return () => {
      StatusBar.setHidden(false);
    };
  }, [isLandscape]);

  return (
    <View testID="SupportScreen" style={WRAPPER}>
      {!isLandscape && (
        <View style={HEADERTOP}>
          <Header
            title={I18n.t("groupDetails.Videos")}
            icon="chevron-left"
            onPressLeft={() => navigation.goBack()}
          />
        </View>
      )}

      <View style={WRAPPER}>
        {!link && !isLoader ? (
          <EmptyView
            title={translate("EmptyView.EmptyVideo")}
            onPressRefresh={() => console.log("Refresh")}
          />
        ) : (
          <WebViews
            type={type}
            source={link}
            style={{
              flex: 1,
              width: screen.width,
              height: isLandscape ? screen.height : (screen.width * 9) / 16,
              alignSelf: "center",
            }}
          />
        )}
      </View>
    </View>
  );
};
