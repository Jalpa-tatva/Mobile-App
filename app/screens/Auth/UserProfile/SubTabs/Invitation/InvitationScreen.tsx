import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

// import external libraries
import Snackbar from "react-native-snackbar";
import { Dialog } from "react-native-simple-dialogs";
import I18n from "i18n-js";

// import custom function & component
import { Loader, EmptyView, LoadMore } from "@components/index";
import {
  getInvitationList,
  friendsRequestManagement,
} from "@app/services/api/profile";
import { InvitationItem } from "./InvitationItem";

// import custom styling & utils
import { color, fontSize } from "@theme/index";
import {
  FULL,
  BODY,
  ButtonContainer,
  ButtonPositive,
  DialogMainWrapper,
  DialogSubWrapper,
  ButtonTitle,
  DialogTitle,
  style,
} from "./Styles";
import commonStyle from "@app/theme/commonStyle";
import moment from "moment";
import ShowImage from "@app/components/FastImage/ShowImage";
import { styles } from "@app/components/loader/styles";
import { trackApiEvent } from "@app/utils/appReport/ActivityReport";
import { PROFILE } from "@app/constants";
import { points } from "@app/utils/appReport/ReportPoint";
import { method } from "@app/services/api/Method";
import { Entypo, FontAwesome } from "@app/utils/icons/VectorIcons";

/**
 * InvitationScreen Props
 */
export interface InvitationProps {
  id: string;
  title: string;
  imageUrl: string;
  country: string;
  category: string;
  description: string;
  startDate: string;
  location: string;
  onPressRequestAccept: Function;
}
export interface InviteProps {
  tab?: string;
  setReload?: any;
}

/**
 * InvitationScreen component
 */
export const InvitationScreen = (props: InviteProps) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [requestId, setRequestId] = useState("");

  const [invitationList, setInvitationList] = useState([]);
  const [userDetail, setUserDetail] = useState<{
    imageUrl: string;
    title: string;
    location: string;
  }>();

  const [page, setPage] = useState(1);
  const [isMoreLoader, setMoreLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [endReach, setEndReach] = useState(false);
  const [refreshing] = useState(false);
  const [endReachedMomentum, setEndReachedMomentum] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    myActivitiesApiCall();
  }, [props?.tab]);

  const myActivitiesApiCall = () => {
    setInvitationList([]);
    setIsLoader(true);

    getInvitationList(1)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${PROFILE.Invites}`,
          endpoint: points.profileRequestList,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        setIsLoader(false);
        console.log("res.data", res.data[0].objectList);
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            setTotalRecords(res.data[0].status.total);
            props?.setReload(true);
            setInvitationList(res.data[0].objectList);
          } else {
            setInvitationList([]);
          }
        } else {
          setInvitationList([]);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${PROFILE.Invites}`,
          endpoint: points.profileRequestList,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
        setInvitationList([]);
      });
  };

  const loadMoreData = (page: number) => {
    console.log("Page", page);
    setMoreLoader(true);
    setEndReach(false);
    getInvitationList(page)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${PROFILE.Invites}`,
          endpoint: points.profileRequestList,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        if (res.data && res.data.length > 0) {
          if (res.data[0].objectList && res.data[0].objectList.length > 0) {
            let groupObjectList = res.data[0].objectList;
            setInvitationList(
              page === 1
                ? groupObjectList
                : [...invitationList, ...groupObjectList]
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
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${PROFILE.Invites}`,
          endpoint: points.profileRequestList,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
      });
  };

  const loadMorePage = () => {
    if (!endReachedMomentum && totalRecords > invitationList.length) {
      const pageData = page + 1;
      setPage(pageData);
      setMoreLoader(true);
      setEndReach(false);
      loadMoreData(pageData);
      setEndReachedMomentum(true);
    }
  };

  const onRefresh = () => {
    setPage(1);
    setTotalRecords(0);
    setInvitationList([]);
    setEndReach(false);
    setMoreLoader(false);
    setEndReachedMomentum(false);
    myActivitiesApiCall();
  };

  const manageReqFriendsApiCall = (action, uniqueId, result) => {
    setIsLoader(true);

    friendsRequestManagement(action, uniqueId)
      .then(async (res) => {
        const statusCode = res?.data?.[0]?.status?.code || 200;
        await trackApiEvent({
          screen: `${PROFILE.Invites}`,
          endpoint: points.profileRequest,
          method: method.GET,
          status: statusCode,
          response: res,
        });
        setIsLoader(false);
        if (res.data[0].status.code === 0) {
          Snackbar.show({
            text:
              I18n.t("Userprofile.invitationRequest") +
              `${result}` +
              I18n.t("Userprofile.Successfully"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          onRefresh();
          props?.setReload(true);
          setDialogVisible(false);
        } else {
          Snackbar.show({
            text: I18n.t("EmptyView.somethingWentWrong"),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: color.palette.lightGreen,
            textColor: color.palette.white,
            numberOfLines: 5,
          });
          setDialogVisible(false);
        }
      })
      .catch(async (err) => {
        await trackApiEvent({
          screen: `${PROFILE.Invites}`,
          endpoint: points.profileRequest,
          method: method.GET,
          status: err?.response?.status || 500,
          response: err,
          messageKey: I18n.t("EmptyView.somethingWentWrong"),
        });
        setIsLoader(false);
        Snackbar.show({
          text: I18n.t("EmptyView.somethingWentWrong"),
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: color.palette.lightGreen,
          textColor: color.palette.white,
          numberOfLines: 5,
        });
        setDialogVisible(false);
      });
  };
  const requestAccept = (item) => {
    setRequestId(item.id);
    setDialogVisible(true);
    setUserDetail(item);
  };

  const renderRaw = (item: InvitationProps) => {
    const city = item?.location ? `${item?.location}, ` : "";
    const address = item?.country ? item?.country : "";
    const location = `${city}${address}`;
    const date = item?.startDate
      ? moment(Number(item?.startDate)).format("MMM DD, YYYY")
      : "";

    return (
      <InvitationItem
        category={item.category}
        imageUrl={item.imageUrl}
        title={item.title}
        location={location}
        description={item.description}
        date={date}
        country={item.country}
        onPressRequestAccept={() => requestAccept(item)}
      />
    );
  };

  const onEndReached = () => {
    endReach == false ? loadMorePage() : null;
  };

  return (
    <View testID="InvitationScreen" style={FULL}>
      <Dialog
        visible={dialogVisible}
        dialogStyle={commonStyle.inviteDialog}
        onTouchOutside={() => {
          setDialogVisible(false);
        }}
        onRequestClose={() => {
          setDialogVisible(false);
        }}
        contentInsetAdjustmentBehavior={"automatic"}
      >
        <View style={DialogMainWrapper}>
          <View style={styles.topView}>
            <View style={styles.titleView}>
              <Text numberOfLines={2} style={style.titleLbl}>
                {I18n.t("Userprofile.invitationRequestTitle")}
              </Text>
            </View>
            <View style={DialogSubWrapper}>
              <Entypo
                name="circle-with-cross"
                size={25}
                onPress={() => setDialogVisible(false)}
                color={color.palette.blackSecondary}
              />
            </View>
          </View>
          <View style={style.userLocation}>
            <ShowImage
              imageStyle={style?.imageWrapper}
              url={userDetail?.imageUrl}
            />
            <View>
              {userDetail?.title && (
                <Text
                  numberOfLines={1}
                  style={{ ...DialogTitle, ...style.detailSubCal }}
                >
                  {userDetail?.title}
                </Text>
              )}
              {/* <Text>{userDetail?.title}</Text> */}
              {userDetail?.location && (
                <View style={{ ...style.locationBox }}>
                  <FontAwesome
                    name="map-marker"
                    size={fontSize(13)}
                    color={color.palette.blackSecondary}
                  />
                  <Text numberOfLines={1} style={style.titleLocation}>
                    {userDetail.location}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={ButtonContainer}>
            <TouchableOpacity
              activeOpacity={1}
              style={ButtonPositive}
              onPress={() => {
                manageReqFriendsApiCall("true", requestId, "accepted");
              }}
            >
              <Text style={ButtonTitle}>{I18n.t("Userprofile.Accept")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...ButtonPositive, ...style.redbackground }}
              activeOpacity={1}
              onPress={() => {
                manageReqFriendsApiCall("false", requestId, "declined");
              }}
            >
              <Text style={ButtonTitle}>{I18n.t("Userprofile.Reject")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
      <TouchableWithoutFeedback>
        <View style={BODY}>
          {isLoader ? <Loader /> : null}
          {!isLoader && invitationList.length == 0 ? (
            <EmptyView
              title={I18n.t("EmptyView.EmptyInvitation")}
              onPressRefresh={() => onRefresh()}
            />
          ) : (
            <FlatList
              data={invitationList}
              renderItem={({ item }) => renderRaw(item)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={commonStyle.flatBottomSpace}
              style={commonStyle.flatRadiousStyle}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0.1}
              onEndReached={onEndReached}
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
      </TouchableWithoutFeedback>
    </View>
  );
};
