import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { EmptyView } from "@components/index";

import { ListItem } from "./ListItem";
import { FULL, BODY, styles } from "./Style";
import I18n from "i18n-js";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import styleConfig from "@app/theme/styleConfig";
import { fontSize } from "@app/theme";
import RNKeyboardView from "@app/components/RNKeyboardView/RNKeyboardView";

export interface HealthOvFormProps {
  id: number;
  profile: string;
  title: string;
  arrowIcon: string;
  IsOpen: boolean;
  onPress: Function;
}

export const HealthOverviewFormScreen: React.FC<{
  uniqueIds?: any;
  titles?: any;
  imageUrls?: any;
  activeTab?: any;
  setActiveTab: any;
}> = ({ uniqueIds, titles, imageUrls, activeTab, setActiveTab }) => {
  const [profile, setProfile] = useState("");
  const [list, setList] = useState([
    {
      id: 0,
      IsOpen: false,
      title: "Patient Profile",
    },
    {
      id: 1,
      IsOpen: false,
      title: "Health History",
    },
    {
      id: 2,
      IsOpen: false,
      title: "Vaccine History",
    },
    {
      id: 3,
      IsOpen: false,
      title: "Family Health History",
    },
    {
      id: 6,
      IsOpen: false,
      title: "Progress Notes",
    },
    {
      id: 4,
      IsOpen: false,
      title: "Send Report",
    },
    {
      id: 5,
      IsOpen: false,
      title: "Report History",
    },
  ]);

  useEffect(() => {
    setActiveTab(activeTab);
  }, []);

  const onRefresh = () => {
    const updatedData = list.map((object, i) => {
      object.IsOpen = false;
      return object;
    });

    setList(updatedData);
  };

  const handlePress = useCallback((item, index) => {
    const updatedData = list.map((object, i) => {
      if (i === index) {
        object.IsOpen = !object.IsOpen;
        return object;
      } else {
        object.IsOpen = false;
        return object;
      }
    });
    setList(updatedData);
  }, []);

  const renderRaw = (item: HealthOvFormProps, index: number) => {
    return (
      <ListItem
        title={item.title}
        profile={uniqueIds}
        id={item.id}
        IsOpen={item.IsOpen}
        arrowIcon={item.IsOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
        onPress={() => handlePress(item, index)}
        setProfile={setProfile}
      />
    );
  };

  return (
    <View testID="ListsScreen" style={[FULL]}>
      <RNKeyboardView
        keyboardVerticalOffset={fontSize(170)}
        containerStyle={FULL}
      >
        <View style={BODY}>
          {list.length == 0 ? (
            <EmptyView
              title={I18n.t("EmptyView.EmptyTask")}
              onPressRefresh={() => onRefresh()}
            />
          ) : (
            <KeyboardAwareFlatList
              data={list}
              bounces={false}
              renderItem={({ item, index }) => renderRaw(item, index)}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode={"on-drag"}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.listinMain}
              scrollEnabled
              style={styles.subListingMain}
              keyboardOpeningTime={300}
              keyExtractor={(item) => item.id.toString()}
              extraHeight={
                profile === "Health History"
                  ? 1
                  : styleConfig.isAndroid
                  ? 300
                  : 150
              }
              extraScrollHeight={
                profile === "Health History"
                  ? 1
                  : styleConfig.isAndroid
                  ? 100
                  : 50
              }
              alwaysBounceVertical={false}
            />
          )}
        </View>
      </RNKeyboardView>
    </View>
  );
};
