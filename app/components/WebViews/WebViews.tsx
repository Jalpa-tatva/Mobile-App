import React from "react";
import { View } from "react-native";

// import external libraries
import { WebView } from "react-native-webview";

// import custom styling & utils
import { styles } from "./style";

/**
 * WebViews Props
 */
export interface WebViewsProps {
  type: string;
  source: string;
  onStartLoading?: Function;
}

/**
 * WebViews component
 */

export function WebViews(props: WebViewsProps) {
  const source = {
    html: `<html><head><style>
    img{
      height:auto;
      width:100%;
    }
    body{
      font-family: Helvetica;
      font-size:20px;

    }
    </style><meta name="viewport" content="width=device-width, initial-scale=0.8" /></head><body>${props.source}</body></html>`,
  };

  return (
    <View style={styles.webViewContainer}>
      {props.type == "html" ? (
        <WebView
          style={styles.webViewWrapper}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          source={source}
          bounces={false}
          showsVerticalScrollIndicator={false}
          androidHardwareAccelerationDisabled={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <WebView
          style={styles.webViewWrapper}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          bounces={false}
          source={{ uri: props.source }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}
