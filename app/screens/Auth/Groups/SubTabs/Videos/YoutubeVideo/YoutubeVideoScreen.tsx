import React, { useState, useEffect } from "react";
import { Dimensions, StatusBar, View } from "react-native";

// Import the external lib.
import YoutubePlayer from "react-native-youtube-iframe";
import I18n from "i18n-js";
import { RouteProp, useRoute } from "@react-navigation/native";

// Import the custom function,styles and common components.
import { Header } from "@components/index";
import { FULL, HEADERTOP, WRAPPER } from "./Style";
import useAppNavigation from "@app/navigation/navigation";

/****
 * YoutubeVideoScreen
 */

type RootStackParamList = {
  link: string;
  title: string;
};
type ViewVideoProp = RouteProp<
  { ViewVideoScreen: RootStackParamList },
  "ViewVideoScreen"
>;
export const YoutubeVideoScreen: React.FC = () => {
  const navigation = useAppNavigation();
  const route = useRoute<ViewVideoProp>();

  const link = route.params.link;
  const title = route.params.title;

  console.log("link", link);
  console.log("title", title);

  let strUrl = link;
  strUrl = strUrl.replace("http://www.youtube.com/watch?v=", "");
  strUrl = strUrl.replace(/ /g, "");

  const [isloader, setIsloader] = useState(true);
  const [screen, setScreen] = useState(Dimensions.get("window"));
  const isLandscape = screen.width > screen.height;
  useEffect(() => {
    const sub = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });

    return () => sub?.remove();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsloader(false);
    }, 3500);
  }, []);
  // const [isFullscreen, setIsFullscreen] = useState(false);
  // useEffect(() => {
  //   Orientation.addOrientationListener((orientation) => {
  //     if (orientation.includes("LANDSCAPE")) {
  //       setIsFullscreen(true);
  //     } else {
  //       setIsFullscreen(false);
  //     }
  //   });

  //   return () => {
  //     Orientation.removeAllListeners();
  //   };
  // }, []);

  // Calculate scale (cover mode)
  const videoRatio = 16 / 9;

  let playerWidth = screen.width;
  let playerHeight = screen.width / videoRatio;

  // If height exceeds screen → adjust
  if (playerHeight > screen.height) {
    playerHeight = screen.height;
    playerWidth = screen.height * videoRatio;
  }
  return (
    <View testID="YoutubeVideoScreen" style={FULL}>
      {<StatusBar hidden={true} />}
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
        <YoutubePlayer
          height={playerHeight}
          width={playerWidth}
          play={true}
          videoId={strUrl}
        />
      </View>
    </View>
  );
};
