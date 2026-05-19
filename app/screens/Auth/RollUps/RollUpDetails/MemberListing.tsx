import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "./Style";
import { useNavigation } from "@react-navigation/native";
import { Header } from "@app/components";
import { color } from "@app/theme";
import ShowImage from "@app/components/FastImage/ShowImage";
import Snackbar from "react-native-snackbar";

const MemberListing = (props) => {
  const list = props?.route?.params?.data;
  const navigation = useNavigation();
  return (
    <View style={styles.listingContainer}>
      <StatusBar translucent={false} backgroundColor={color?.secondary} />
      <View style={styles.headerTop}>
        <Header
          title={"Members"}
          icon="chevron-left"
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.memberBody}>
        <FlatList data={list} renderItem={MemberItem} />
      </View>
    </View>
  );
};

export default MemberListing;

const MemberItem = (props) => {
  return (
    <View style={styles.RawContainerMain}>
      <View style={styles.RawContainer}>
        <View style={styles.ImageContainer}>
          <ShowImage
            url={props?.item?.imageUrl}
            imageStyle={styles.ImageWrapper}
          />
        </View>
        <View style={styles.TextContainer}>
          <View style={styles.TitleWrapper}>
            <Text style={styles.Title} numberOfLines={2}>
              {props?.item?.name}
            </Text>
          </View>

          <View style={styles.roleWrapper}>
            {props?.item?.role && (
              <Text style={styles.roleLbl}>{props?.item?.role}</Text>
            )}
            {props?.item?.isPending == "true" && (
              <TouchableOpacity
                style={styles.ApprovalWrapper}
                onPress={props.onPressPending}
              >
                <Text style={styles.TitleApproval}>Pending Invitation</Text>
              </TouchableOpacity>
            )}

            {props?.item?.role == "Guest" ? (
              <TouchableOpacity
                activeOpacity={1}
                style={{ ...styles.ApprovalWrapper, ...styles.greenBg }}
                onPress={
                  props?.item?.canApproveOrDeny == "true"
                    ? props.onPress
                    : () => {
                        Snackbar.show({
                          text: "You do not have a permisson",
                          duration: Snackbar.LENGTH_LONG,
                          backgroundColor: color.red,
                          textColor: color.palette.white,
                          numberOfLines: 5,
                        });
                      }
                }
              >
                <Text style={styles.TitleApproval}>Needs Approval</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};
