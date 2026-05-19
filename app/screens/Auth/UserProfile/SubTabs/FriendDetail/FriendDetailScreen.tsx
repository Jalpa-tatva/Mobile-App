import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Alert,
  BackHandler,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Loader, Header, Button } from "@components/index";

import Snackbar from "react-native-snackbar";
import moment from "moment";
import {
  FULL,
  HEADERTOP,
  BODY,
  DetailsContainer,
  ImageBg,
  sub1ContainerStyle,
  titleStyle,
  text1Style,
  textStyle,
  OverLayButtonText,
  SheetWrapper,
  WrapperContainer,
  BottonTitle,
  ButtonSheetTitle,
  OverLayButtonContainerCencel,
  BottomlWrapperMain,
  Title,
  TitleLocation,
  OverLayText,
  OverLayRowContainer1,
  overlay,
  backdropStyle,
  OverLayInputContainer,
  OverLayRowContainer,
  MainOverLayContainer,
  OverLayImageContainer,
  OverLayTitleContainer,
  OverLayImage,
  TagContainer,
  TextInputs,
  loginButtonContainer,
  OverLayButtonContainer1,
  OverTitle,
  Style,
} from "./Style";
import { color, fontSize } from "@app/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import RBSheet from "react-native-raw-bottom-sheet";
import commonStyle from "@app/theme/commonStyle";
import { addFriends, removeFriends } from "@app/services/api/profile";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { translate } from "@app/i18n";
import I18n from "i18n-js";
import { SafeOverlay, SafeRBSheet } from "@app/constants";
import ShowImage from "@app/components/FastImage/ShowImage";

export interface FriendDetailsProps {
  id: number;
  title: string;
  value: string;
  time: string;
  onPress: Function;
}

interface FriendDetailRouteParams {
  item: {
    startDate?: any;
    imageUrl?: string;
    title?: string;
    location?: string;
    description?: string;
    country?: string;
    canRequestToJoin?: string;
    isPendingMember?: string;
    uniqueId?: string;
    image200Url?: string;
  };
}

type MessageDetailScreenRouteProp = RouteProp<
  { FriendDetail: FriendDetailRouteParams },
  "FriendDetail"
>;
export const FriendDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<MessageDetailScreenRouteProp>();

  const item = route.params.item;

  console.log("item", item);

  const [isLoader, setIsLoader] = useState(false);
  const [request, setRequest] = useState("");

  const [showOverlayPost, setShowOverlayPost] = useState(false);

  const refRBSheet = useRef<RBSheet>(null);

  var enteredDate = moment(item.startDate.slice(0, -3) * 1000).format(
    "MMM DD, YYYY, HH:mm a"
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    navigation.goBack();
    return true;
  };

  const removeFriendsApiCall = (uniqueiD: any) => {
    setIsLoader(true);
    removeFriends(uniqueiD)
      .then((res) => {
        setIsLoader(false);

        console.log("AddFriends : ", JSON.stringify(res.data));
        if (res.data[0].status.code === 0) {
          console.log("code1121");
          Snackbar.show({
            text: I18n.t("Userprofile.FriendRequestCancel"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          navigation.goBack();
        } else {
          Snackbar.show({
            text: I18n.t("EmptyView.somethingWentWrong"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
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

  const unFollowService = (uniqueiD: string, title: string) => {
    Alert.alert(
      I18n.t("Userprofile.RemoveFriend"),
      I18n.t("Userprofile.confirmRemove") +
        `${title}` +
        I18n.t("Userprofile.fromFriendlist"),
      [
        {
          text: "Yes",
          onPress: () => {
            removeFriendsApiCall(uniqueiD);
          },
        },
        {
          text: "No",
          onPress: () => {},
        },
      ]
    );
  };

  const onCheckAccess = () => {
    setTimeout(() => {
      setShowOverlayPost(!showOverlayPost);
    }, 1000);
  };

  const AddFriendsApiCall = (uniqueiD: any) => {
    setIsLoader(true);
    addFriends(uniqueiD)
      .then((res) => {
        setIsLoader(false);

        console.log("AddFriends : ", JSON.stringify(res.data));
        if (res.data[0].status.code === 0) {
          console.log("code1121");
          Snackbar.show({
            text: I18n.t("Userprofile.FriendRequestSent"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setShowOverlayPost(false);
          setRequest("");
          navigation.goBack();
        } else {
          Snackbar.show({
            text: I18n.t("EmptyView.somethingWentWrong"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
        }
      })
      .catch((err) => {
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
  return (
    <View testID="FriendDetailScreen" style={FULL}>
      <SafeRBSheet
        ref={refRBSheet}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={Style.commonMargeTop}>
          <View style={commonStyle.subSheetContainer}>
            <Entypo
              name="circle-with-cross"
              size={25}
              onPress={() => {
                refRBSheet.current.close();
              }}
              color={color.palette.blackSecondary}
            />
          </View>

          <View style={SheetWrapper}>
            {item.canRequestToJoin == "false" &&
            item.isPendingMember == "false" ? (
              <TouchableOpacity
                style={WrapperContainer}
                onPress={() => {
                  refRBSheet.current.close();
                  unFollowService(item.uniqueId, item.title);
                }}
              >
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={25}
                  color={color.palette.white}
                  style={Style.commonPadLeft}
                />

                <Text style={ButtonSheetTitle}>
                  {I18n.t("Userprofile.removeFriends")}
                </Text>
              </TouchableOpacity>
            ) : null}

            {item.canRequestToJoin == "true" ? (
              <TouchableOpacity
                style={WrapperContainer}
                onPress={() => {
                  refRBSheet.current.close();
                  onCheckAccess();
                }}
              >
                <Entypo
                  name="add-user"
                  size={25}
                  color={color.palette.white}
                  style={Style.commonPadLeft}
                />

                <Text style={ButtonSheetTitle}>
                  {I18n.t("Userprofile.addFriends")}
                </Text>
              </TouchableOpacity>
            ) : null}

            {item.isPendingMember == "true" ? (
              <TouchableOpacity
                style={WrapperContainer}
                onPress={() => {
                  refRBSheet.current.close();
                  unFollowService(item.uniqueId, item.title);
                }}
              >
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={25}
                  color={color.palette.white}
                  style={Style.commonPadLeft}
                />

                <Text style={ButtonSheetTitle}>
                  {I18n.t("Userprofile.Requested")}
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>
                {I18n.t("Userprofile.Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>

      <SafeOverlay
        overlayStyle={overlay}
        backdropStyle={backdropStyle}
        isVisible={showOverlayPost}
        onBackdropPress={() => {}}
      >
        <KeyboardAwareScrollView
          style={commonStyle.OverlayKeyboardStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <TouchableWithoutFeedback
            style={Style.commonMargeTop}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={MainOverLayContainer}>
              <View style={OverLayRowContainer}>
                <View style={OverLayImageContainer}>
                  <Image
                    style={OverLayImage}
                    source={{ uri: item.image200Url }}
                  />
                </View>
                <View style={OverLayTitleContainer}>
                  <Text style={OverTitle}>{item.title}</Text>
                </View>
              </View>

              <View style={OverLayRowContainer1}>
                <Entypo
                  name={"info-with-circle"}
                  size={fontSize(22)}
                  color={color.white}
                />
                <Text style={OverLayText}>
                  {translate("profile.requestFriendsWarningText")}
                </Text>
              </View>

              <View style={OverLayInputContainer}>
                <View style={TagContainer}>
                  <TextInput
                    multiline={true}
                    value={request}
                    style={TextInputs}
                    onChangeText={(text) => {
                      setRequest(text);
                      console.log("request change:", request);
                    }}
                    autoCorrect={false}
                    autoCapitalize="none"
                    selectionColor={color.palette.black}
                  />
                </View>
              </View>

              <Button
                tx={"profile.AddFriends"}
                isLoader={isLoader}
                style={loginButtonContainer}
                textStyle={BottonTitle}
                onPress={() => AddFriendsApiCall(item.uniqueId)}
              />

              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();

                  setShowOverlayPost(!showOverlayPost);
                }}
                style={OverLayButtonContainer1}
              >
                <Text style={OverLayButtonText}>
                  {translate("profile.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </SafeOverlay>

      <View style={HEADERTOP}>
        <Header
          title={I18n.t("Userprofile.FriendsDetails")}
          icon="chevron-left"
          iconRight="dots-three-vertical"
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            refRBSheet.current.open();
          }}
        />
      </View>

      <View style={BODY}>
        <View style={DetailsContainer}>
          {isLoader == true ? (
            <Loader />
          ) : (
            <View>
              <View style={sub1ContainerStyle}>
                <View style={ImageBg}>
                  {/* <SingleImage
                    uri={item.imageUrl}
                    style={commonStyle.friendImage}
                  /> */}
                  <ShowImage
                    url={item.imageUrl}
                    imageStyle={commonStyle.friendImage}
                    imageList={[{ url: item.imageUrl }]}
                  />
                </View>

                <View style={titleStyle}>
                  <View style={Style.titleWrapper}>
                    <Text
                      numberOfLines={1}
                      style={[textStyle, Style.titleTransform]}
                    >
                      {item.title}
                    </Text>
                  </View>

                  <Text numberOfLines={2} style={text1Style}>
                    {item.location}
                  </Text>
                </View>

                {/* <Text style={TitleLocation}>{eventName}</Text> */}
              </View>

              <View style={BottomlWrapperMain}>
                <View>
                  <Text style={Title}>{I18n.t("profile.lblDescription")}</Text>
                </View>
                <Text style={TitleLocation}>{item.description}</Text>
              </View>

              <View style={BottomlWrapperMain}>
                <View>
                  <Text style={Title}>{I18n.t("profile.lblcountry")}</Text>
                </View>
                <Text style={TitleLocation}>{item.country} </Text>
              </View>

              <View style={BottomlWrapperMain}>
                <View>
                  <Text style={Title}>{I18n.t("profile.AddedDate")}</Text>
                </View>
                <Text style={TitleLocation}>{enteredDate}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
