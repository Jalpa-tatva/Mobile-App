import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Text,
} from "react-native";

// import external libraries

import { useNavigation, useRoute } from "@react-navigation/native";
import { Dialog } from "react-native-simple-dialogs";
import RBSheet from "react-native-raw-bottom-sheet";
import Snackbar from "react-native-snackbar";
import I18n from "i18n-js";

// import custom function & Component
import { Loader, EmptyView } from "@components/index";
import { memberDetail } from "@app/redux/reducer/MemberReducer";
import {
  getMyMemberList,
  groupProfileManagement,
  groupProfileChangeRole,
  sendGroupInvitation,
} from "@app/services/api/groups";
import { MemberItem } from "./MemberItem";
import { useRedux } from "@app/redux/hooks";
import { SafeRBSheet } from "@app/constants";

// import custom styling & utils
import { color } from "@theme/index";
import commonStyle from "@app/theme/commonStyle";
import { content } from "@app/utils/string";
import {
  FULL,
  SheetWrapper,
  BODY,
  OverLayButtonText,
  OverLayButtonContainerCencel,
  WrapperContainer,
  ButtonSheetTitle,
  DialogContainer,
  DialogWrapper,
  DialogTitle,
  ButtonContainer,
  ButtonPositive,
  ButtonNegative,
  ButtonTitle,
  Style,
} from "./MemberStyles";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@app/utils/icons/VectorIcons";

let inviteArray = [];

/**
 * MembersProps
 */
export interface MembersProps {
  id: number;
  name: string;
  role: string;
  memberList: any;
  isMainOwner: boolean;
  setMemberList: Function;
  canEditInfos: string;
  isOwner: string;
  uniqueId: string;
  userUniqueId: string;
  isPending: string;
  isAdded: string;
  canApproveOrDeny: string;
  originalImageUrl: string;
  checkLoginUser: any;
  onPress: Function;
  onPressOption: Function;
  onPressPending: Function;
}

let roleType = "";
let commonArray = [];

/**
 * MembersScreen
 */
export const MembersScreen: React.FC<any> = () => {
  const route = useRoute<any>();
  const { groups } = content;
  const { group_detail, login_detail, map_detail, dispatches } = useRedux([
    groups.groupsDetail,
    groups.loginDetail,
    groups.mapDetail,
    groups.dispatch,
  ]);

  const uniqueId =
    route?.params?.isType == "maps"
      ? map_detail?.uniqueId
      : group_detail.uniqueId;

  const canEditInfos =
    route?.params?.isType == "maps"
      ? map_detail?.canEditInfo
      : group_detail.canEditInfo;

  const navigation = useNavigation<any>();

  const userUniqueId = login_detail.userUniqueId;

  const [memberList, setMemberList] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [refreshing] = useState(false);
  const [requestId, setRequestId] = useState(0);
  const [type, setType] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isMainOwner, setisMainOwner] = useState(false);

  // Create the sheets reference
  const refRBSheet = useRef<RBSheet>(null);
  const refRBSheetChange = useRef<RBSheet>(null);
  const refRBSheetPending = useRef<RBSheet>(null);

  const [rollList, setRollList] = useState([
    { id: 0, role: "Manager" },
    { id: 1, role: "Champion" },
    { id: 2, role: "VIP" },
    { id: 5, role: "Member" },
  ]);

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener("blur", () => {
      inviteArray = [];
      commonArray = [];
    });

    const unsubscribeFocus = navigation.addListener("focus", () => {
      commonArray = [];
      inviteArray = [];
      memberListService();
    });

    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
    };
  }, []);

  const memberListService = async () => {
    setIsLoader(true);

    try {
      const memberData = await getMyMemberList(uniqueId);

      if (
        memberData?.data?.length > 0 &&
        memberData?.data[0]?.objectList?.length > 0
      ) {
        const commonArray = memberData.data[0].objectList.map((val) => ({
          id: val.id,
          role: val.role,
          name: val.name,
          uniqueId: val.uniqueId,
          originalImageUrl: val.imageUrl,
          canApproveOrDeny: "false",
          isAdded: val?.isAdded ?? "false",
          isOwner: val?.isOwner ?? "false",
          isPending: val?.isPending ?? "false",
        }));

        dispatches(memberDetail(commonArray));
        setMemberList(commonArray);
      } else {
        setMemberList([]);
      }

      setIsLoader(false);
    } catch {
      setMemberList([]);
      setIsLoader(false);
    }
  };

  const checkLoginUser = useCallback(() => {
    const owner = memberList.find(
      (object) => object.uniqueId === userUniqueId && object.isOwner === "true"
    );

    if (owner) {
      setisMainOwner((prev) => {
        if (!prev) return true;
        return prev;
      });
      // setShowInvite(prev => {
      //   if (!prev) return true;
      //   return prev;
      // });
    }
  }, [memberList, userUniqueId]);

  const handlePressOption = useCallback((role: string, id: number) => {
    setType(role);
    setRequestId(id);
    refRBSheet.current?.open();
  }, []);

  const handlePressPending = useCallback(
    (role: string, id: number, uniqueId: any) => {
      inviteArray = [];
      setType(role);
      setRequestId(id);
      refRBSheetPending.current?.open();
      inviteArray.push({ uniqueId });
    },
    []
  );
  const memoizedMemberList = useMemo(() => memberList, [memberList]);

  const renderRaw = (item: MembersProps) => {
    return (
      <MemberItem
        connectionName={item.name}
        role={item.role}
        memberList={memoizedMemberList}
        isMainOwner={isMainOwner}
        canEditInfos={canEditInfos}
        setMemberList={setMemberList}
        isOwner={item.isOwner}
        uniqueId={item.uniqueId}
        userUniqueId={userUniqueId}
        isAdded={item.isAdded}
        isPending={item.isPending}
        canApproveOrDeny={item.canApproveOrDeny}
        originalImageUrl={item.originalImageUrl}
        checkLoginUser={checkLoginUser}
        onPressOption={() => handlePressOption(item.role, item.id)}
        onPressPending={() =>
          handlePressPending(item.role, item.id, item.uniqueId)
        }
      />
    );
  };

  const onRefresh = () => {
    refRBSheet.current.close();
    refRBSheetPending.current.close();
    refRBSheetChange.current.close();
    setMemberList([]);
    memberListService();
  };

  const onCheckAccess = () => {
    setTimeout(() => {
      refRBSheetChange.current.open();
    }, 1000);
  };

  const handlePress = (index) => {
    const updatedData = rollList.map((object, i) => {
      return object;
    });
    setRollList(updatedData);

    roleChangeService(requestId, "changeRole", roleType);
  };

  const roleChangeService = (requestId, action, type) => {
    setIsLoader(true);
    groupProfileChangeRole(requestId, action, type)
      .then((res) => {
        console.log("groupProfileManagement", JSON.stringify(res));
        setIsLoader(false);
        setDialogVisible(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].status.code == 0) {
            Snackbar.show({
              text: I18n.t("groupDetails.RollUpdated"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.white,
              numberOfLines: 5,
            });

            onRefresh();
          } else {
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.red,
              textColor: color.white,
              numberOfLines: 5,
            });
          }
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

  const onProfileManage = (requestId, action) => {
    setIsLoader(true);
    groupProfileManagement(requestId, action)
      .then((res) => {
        setIsLoader(false);
        const updateArray = memberList.filter(
          (member) => member.uniqueId != inviteArray[0].uniqueId
        );
        // dispatches(memberDetail(updateArray));

        setDialogVisible(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].status.code == 0) {
            Snackbar.show({
              text: "Successfully removed",
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
            onRefresh();
          } else {
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.palette.white,
              numberOfLines: 5,
            });
          }
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

  const groupProfileInvitationService = () => {
    setIsLoader(true);
    sendGroupInvitation(uniqueId, inviteArray)
      .then((res) => {
        setIsLoader(false);
        if (res.data && res.data.length > 0) {
          if (res.data[0].status.code == 0) {
            Snackbar.show({
              text: I18n.t("groupDetails.InvitedSuccessfully"),
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.palette.lightGreen,
              textColor: color.white,
              numberOfLines: 5,
            });
          } else {
            Snackbar.show({
              text: res.data[0].status.errorText,
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: color.red,
              textColor: color.white,
              numberOfLines: 5,
            });
          }
        }
      })
      .catch((err) => {
        setIsLoader(false);
      });
  };

  const renderRollRaw = (item, index) => {
    return (
      <TouchableOpacity
        style={WrapperContainer}
        onPress={() => {
          roleType = item.role;
          setType(item.role);
          handlePress(index);
        }}
      >
        {type == item.role ? (
          <AntDesign
            name="checksquare"
            size={25}
            color={color.white}
            style={Style.padLeftCommon}
          />
        ) : (
          <AntDesign
            name="checksquare"
            size={25}
            color={color.palette.darkGray}
            style={Style.padLeftCommon}
          />
        )}

        <Text
          style={[
            ButtonSheetTitle,
            {
              color: type == item.role ? color.white : color.palette.darkGray,
            },
          ]}
        >
          {item.role}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View testID="MembersScreen" style={FULL}>
      <SafeRBSheet
        ref={refRBSheetPending}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={Style.padTopCommon}>
          <View style={commonStyle.subSheetContainer}>
            <Entypo
              name="circle-with-cross"
              size={25}
              onPress={() => {
                refRBSheetPending.current.close();
              }}
              color={color.palette.blackSecondary}
            />
          </View>

          <View style={SheetWrapper}>
            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => onProfileManage(requestId, "decline")}
            >
              <MaterialCommunityIcons
                name="account-remove"
                size={25}
                color={color.palette.white}
                style={Style.padLeftCommon}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("groupDetails.Remove")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => {
                //refRBSheetChange.current.open();
                refRBSheetPending.current.close();
                groupProfileInvitationService();
              }}
            >
              <FontAwesome
                name="send"
                size={25}
                color={color.palette.white}
                style={Style.padLeftCommon}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("groupDetails.ResendInvitation")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => refRBSheetPending.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>
                {I18n.t("groupDetails.Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>

      <SafeRBSheet
        ref={refRBSheet}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={Style.padTopCommon}>
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
            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => onProfileManage(requestId, "decline")}
            >
              <MaterialCommunityIcons
                name="account-remove"
                size={25}
                color={color.palette.white}
                style={Style.padLeftCommon}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("groupDetails.Remove")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={WrapperContainer}
              onPress={() => {
                //refRBSheetChange.current.open();
                refRBSheet.current.close();
                onCheckAccess();
              }}
            >
              <MaterialCommunityIcons
                name="shield-key"
                size={25}
                color={color.palette.white}
                style={Style.padLeftCommon}
              />

              <Text style={ButtonSheetTitle}>
                {I18n.t("groupDetails.ChangesAccess")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>
                {I18n.t("groupDetails.Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>

      <SafeRBSheet
        ref={refRBSheetChange}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={Style.padTopCommon}>
          <View style={commonStyle.subSheetContainer}>
            <Entypo
              name="circle-with-cross"
              size={25}
              onPress={() => {
                refRBSheetChange.current.close();
              }}
              color={color.palette.black}
            />
          </View>

          <View style={SheetWrapper}>
            <FlatList
              data={rollList}
              scrollEnabled={false}
              renderItem={({ item, index }) => renderRollRaw(item, index)}
              showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
              onPress={() => refRBSheetChange.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>
                {I18n.t("groupDetails.Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>

      <Dialog
        visible={dialogVisible}
        dialogStyle={Style.dialogStyle}
        onTouchOutside={() => {
          setDialogVisible(false);
        }}
        onRequestClose={() => setDialogVisible(false)}
        contentInsetAdjustmentBehavior="always"
      >
        <View style={DialogContainer}>
          <View style={DialogWrapper}>
            <Entypo
              name="circle-with-cross"
              size={25}
              onPress={() => setDialogVisible(false)}
              color={color.palette.black}
            />
          </View>
          <FontAwesome
            name="group"
            size={50}
            color={color.palette.blackSecondary}
          />

          <Text style={DialogTitle}>
            {I18n.t("groupDetails.needMembershipApproval")}
          </Text>

          <View style={ButtonContainer}>
            <TouchableOpacity
              style={ButtonPositive}
              onPress={() => {
                onProfileManage(requestId, "approve");
              }}
            >
              <Text style={ButtonTitle}>{I18n.t("groupDetails.Accept")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={ButtonNegative}
              onPress={() => {
                onProfileManage(requestId, "decline");
              }}
            >
              <Text style={ButtonTitle}>{I18n.t("groupDetails.Decline")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>

      <View style={BODY}>
        {isLoader ? <Loader /> : null}
        {!isLoader && memberList.length == 0 ? (
          <EmptyView
            title={I18n.t("EmptyView.EmptyMember")}
            onPressRefresh={() => console.log("Refresh")}
          />
        ) : (
          <FlatList
            data={memberList}
            renderItem={({ item }) => renderRaw(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={commonStyle.flatBottomSpace}
            style={commonStyle.flatRadiousStyle}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};
