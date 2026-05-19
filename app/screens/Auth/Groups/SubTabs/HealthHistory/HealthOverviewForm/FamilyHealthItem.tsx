import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

// import external libraries
import I18n from "i18n-js";

// import custom function,styles, theme & utils
import {
  relationTitle,
  RawContainerMain,
  Title,
  TextContainer,
  OverLayTopButtonContainerCencel,
  OverLayTopButtonText,
  SheetWrapper,
  OverLayButtonContainerCencel,
  OverLayButtonText,
  WrapperContainer,
  ButtonSheetTitle,
} from "./familyHealthStyles";
import { color, fontSize } from "@app/theme";
import commonStyle from "@app/theme/commonStyle";
import {
  ElementIcon,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@app/utils/icons/VectorIcons";
import { stylesBack } from "./BackgroundStyle";
import { SafeRBSheet } from "@app/constants";

var mArray = [];
var fArray = [];
var sArray = [];
var gpArray = [];
var cleanedArray = [];

export interface FamilyHealthProps {
  id?: number;
  diseasesList?: any;
  selected?: boolean;
  changes?: boolean;
  title?: string;
  relation?: string;
  onPress?: Function;
  setChange?: Function;
  item?: any;
  arrlenth?: any;
}

export function FamilyHealthItem(props: FamilyHealthProps) {
  const refRelation = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [relationList, setRelationList] = useState([]);

  const checkRelationShip = (relation: string) => {
    var found = false;
    for (var i = 0; i < relationList.length && !found; i++) {
      if (relationList[i].relation === relation) {
        found = true;
        relationList[i].selected = true;
        break;
      }
    }
  };

  const handleRelationShipPress = (index, key) => {
    let updatedData = props.item.map((object: any, i) => {
      let val = key.toString() + index.toString();

      if (object.recordNumber == index) {
        if (object[val] == "true") {
          object[val] = "false";
          return object;
        } else {
          object[val] = "true";
          return object;
        }
      } else {
        object[val] = object[val];
        console.log("none");
        return object;
      }
    });

    updatedData.map((obj, index) => {
      var tempArr = Object.values(obj);

      Object.entries(tempArr).shift();

      tempArr.splice(0, 2);

      let ischange = tempArr.includes("true");

      if (ischange == true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    });

    setRelationList(updatedData);
  };

  const renderRollRaw = (item, index) => {
    return (
      <>
        <TouchableOpacity activeOpacity={1} style={WrapperContainer}>
          {item.M1 == "true" ||
          item.M2 == "true" ||
          item.M3 == "true" ||
          item.M4 == "true" ||
          item.M5 == "true" ||
          item.M6 == "true" ||
          item.M7 == "true" ||
          item.M8 == "true" ||
          item.M9 == "true" ||
          item.M10 == "true" ||
          item.M11 == "true" ||
          item.M12 == "true" ||
          item.M13 == "true" ||
          item.M14 == "true" ||
          item.M15 == "true" ||
          item.M16 == "true" ||
          item.M17 == "true" ||
          item.M18 == "true" ||
          item.M19 == "true" ||
          item.M20 == "true" ||
          item.M21 == "true" ||
          item.M22 == "true" ||
          item.M23 == "true" ||
          item.M24 == "true" ||
          item.M25 == "true" ||
          item.M26 == "true" ||
          item.M27 == "true" ||
          item.M28 == "true" ||
          item.M29 == "true" ||
          item.M30 == "true" ||
          item.M31 == "true" ||
          item.M32 == "true" ||
          item.M33 == "true" ||
          item.M34 == "true" ||
          item.M35 == "true" ||
          item.M36 == "true" ||
          item.M37 == "true" ||
          item.M38 == "true" ||
          item.M39 == "true" ||
          item.M40 == "true" ||
          item.M41 == "true" ||
          item.M42 == "true" ||
          item.M43 == "true" ||
          item.M44 == "true" ||
          item.M45 == "true" ||
          item.M46 == "true" ||
          item.M47 == "true" ||
          item.M48 == "true" ||
          item.M49 == "true" ||
          item.M50 == "true" ||
          item.M51 == "true" ||
          item.M52 == "true" ||
          item.M53 == "true" ||
          item.M54 == "true" ||
          item.M55 == "true" ||
          item.M56 == "true" ||
          item.M57 == "true" ||
          item.M58 == "true" ||
          item.M59 == "true" ||
          item.M60 == "true" ||
          item.M61 == "true" ||
          item.M62 == "true" ||
          item.M63 == "true" ||
          item.M64 == "true" ||
          item.M65 == "true" ||
          item.M66 == "true" ||
          item.M67 == "true" ||
          item.M68 == "true" ||
          item.M69 == "true" ||
          item.M70 == "true" ||
          item.M71 == "true" ? (
            <View style={stylesBack.famHealthIcon}>
              <ElementIcon
                color={color.secondary}
                name="check-box"
                type="materialicons "
                size={fontSize(24)}
                onPress={() => {
                  handleRelationShipPress(index, "M");
                }}
              />
            </View>
          ) : (
            <View style={stylesBack.famHealthIcon}>
              <ElementIcon
                color={color.placeholder}
                name="check-box-outline-blank"
                type="materialicons"
                size={fontSize(24)}
                onPress={() => {
                  handleRelationShipPress(index, "M");
                }}
              />
            </View>
          )}

          <Text style={[ButtonSheetTitle]}>Mother</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={WrapperContainer}>
          {item.F1 == "true" ||
          item.F2 == "true" ||
          item.F3 == "true" ||
          item.F4 == "true" ||
          item.F5 == "true" ||
          item.F6 == "true" ||
          item.F7 == "true" ||
          item.F8 == "true" ||
          item.F9 == "true" ||
          item.F10 == "true" ||
          item.F11 == "true" ||
          item.F12 == "true" ||
          item.F13 == "true" ||
          item.F14 == "true" ||
          item.F15 == "true" ||
          item.F16 == "true" ||
          item.F17 == "true" ||
          item.F18 == "true" ||
          item.F19 == "true" ||
          item.F20 == "true" ||
          item.F21 == "true" ||
          item.F22 == "true" ||
          item.F23 == "true" ||
          item.F24 == "true" ||
          item.F25 == "true" ||
          item.F26 == "true" ||
          item.F27 == "true" ||
          item.F28 == "true" ||
          item.F29 == "true" ||
          item.F30 == "true" ||
          item.F31 == "true" ||
          item.F32 == "true" ||
          item.F33 == "true" ||
          item.F34 == "true" ||
          item.F35 == "true" ||
          item.F36 == "true" ||
          item.F37 == "true" ||
          item.F38 == "true" ||
          item.F39 == "true" ||
          item.F40 == "true" ||
          item.F41 == "true" ||
          item.F42 == "true" ||
          item.F43 == "true" ||
          item.F44 == "true" ||
          item.F45 == "true" ||
          item.F46 == "true" ||
          item.F47 == "true" ||
          item.F48 == "true" ||
          item.F49 == "true" ||
          item.F50 == "true" ||
          item.F51 == "true" ||
          item.F52 == "true" ||
          item.F53 == "true" ||
          item.F54 == "true" ||
          item.F55 == "true" ||
          item.F56 == "true" ||
          item.F57 == "true" ||
          item.F58 == "true" ||
          item.F59 == "true" ||
          item.F60 == "true" ||
          item.F61 == "true" ||
          item.F62 == "true" ||
          item.F63 == "true" ||
          item.F64 == "true" ||
          item.F65 == "true" ||
          item.F66 == "true" ||
          item.F67 == "true" ||
          item.F68 == "true" ||
          item.F69 == "true" ||
          item.F70 == "true" ||
          item.F71 == "true" ? (
            <View style={stylesBack.famHealthIcon}>
              <ElementIcon
                color={color.secondary}
                name="check-box"
                type="materialicons "
                size={fontSize(24)}
                onPress={() => {
                  handleRelationShipPress(index, "F");
                }}
              />
            </View>
          ) : (
            <View style={stylesBack.famHealthIcon}>
              <ElementIcon
                color={color.placeholder}
                name="check-box-outline-blank"
                type="materialicons "
                size={fontSize(24)}
                onPress={() => {
                  handleRelationShipPress(index, "F");
                }}
              />
            </View>
          )}

          <Text style={[ButtonSheetTitle]}>Father</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={WrapperContainer}>
          {item.GP1 == "true" ||
          item.GP2 == "true" ||
          item.GP3 == "true" ||
          item.GP4 == "true" ||
          item.GP5 == "true" ||
          item.GP6 == "true" ||
          item.GP7 == "true" ||
          item.GP8 == "true" ||
          item.GP9 == "true" ||
          item.GP10 == "true" ||
          item.GP11 == "true" ||
          item.GP12 == "true" ||
          item.GP13 == "true" ||
          item.GP14 == "true" ||
          item.GP15 == "true" ||
          item.GP16 == "true" ||
          item.GP17 == "true" ||
          item.GP18 == "true" ||
          item.GP19 == "true" ||
          item.GP20 == "true" ||
          item.GP21 == "true" ||
          item.GP22 == "true" ||
          item.GP23 == "true" ||
          item.GP24 == "true" ||
          item.GP25 == "true" ||
          item.GP26 == "true" ||
          item.GP27 == "true" ||
          item.GP28 == "true" ||
          item.GP29 == "true" ||
          item.GP30 == "true" ||
          item.GP31 == "true" ||
          item.GP32 == "true" ||
          item.GP33 == "true" ||
          item.GP34 == "true" ||
          item.GP35 == "true" ||
          item.GP36 == "true" ||
          item.GP37 == "true" ||
          item.GP38 == "true" ||
          item.GP39 == "true" ||
          item.GP40 == "true" ||
          item.GP41 == "true" ||
          item.GP42 == "true" ||
          item.GP43 == "true" ||
          item.GP44 == "true" ||
          item.GP45 == "true" ||
          item.GP46 == "true" ||
          item.GP47 == "true" ||
          item.GP48 == "true" ||
          item.GP49 == "true" ||
          item.GP51 == "true" ||
          item.GP52 == "true" ||
          item.GP53 == "true" ||
          item.GP54 == "true" ||
          item.GP55 == "true" ||
          item.GP56 == "true" ||
          item.GP57 == "true" ||
          item.GP58 == "true" ||
          item.GP59 == "true" ||
          item.GP60 == "true" ||
          item.GP61 == "true" ||
          item.GP62 == "true" ||
          item.GP63 == "true" ||
          item.GP64 == "true" ||
          item.GP65 == "true" ||
          item.GP66 == "true" ||
          item.GP67 == "true" ||
          item.GP68 == "true" ||
          item.GP69 == "true" ||
          item.GP70 == "true" ||
          item.GP71 == "true" ? (
            <View style={{ marginHorizontal: 4, justifyContent: "center" }}>
              <ElementIcon
                color={color.secondary}
                name="check-box"
                type="materialicons "
                size={fontSize(24)}
                onPress={() => {
                  handleRelationShipPress(index, "GP");
                }}
              />
            </View>
          ) : (
            <View style={stylesBack.famHealthIcon}>
              <ElementIcon
                color={color.placeholder}
                name="check-box-outline-blank"
                type="materialicons "
                size={fontSize(24)}
                onPress={() => {
                  handleRelationShipPress(index, "GP");
                }}
              />
            </View>
          )}

          <Text style={[ButtonSheetTitle]}>Grand Parents</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={WrapperContainer}>
          {item.S1 == "true" ||
          item.S2 == "true" ||
          item.S3 == "true" ||
          item.S4 == "true" ||
          item.S5 == "true" ||
          item.S6 == "true" ||
          item.S7 == "true" ||
          item.S8 == "true" ||
          item.S9 == "true" ||
          item.S10 == "true" ||
          item.S11 == "true" ||
          item.S12 == "true" ||
          item.S13 == "true" ||
          item.S14 == "true" ||
          item.S15 == "true" ||
          item.S16 == "true" ||
          item.S17 == "true" ||
          item.S18 == "true" ||
          item.S19 == "true" ||
          item.S20 == "true" ||
          item.S21 == "true" ||
          item.S22 == "true" ||
          item.S23 == "true" ||
          item.S24 == "true" ||
          item.S25 == "true" ||
          item.S26 == "true" ||
          item.S27 == "true" ||
          item.S28 == "true" ||
          item.S29 == "true" ||
          item.S30 == "true" ||
          item.S31 == "true" ||
          item.S32 == "true" ||
          item.S33 == "true" ||
          item.S34 == "true" ||
          item.S35 == "true" ||
          item.S36 == "true" ||
          item.S37 == "true" ||
          item.S38 == "true" ||
          item.S39 == "true" ||
          item.S40 == "true" ||
          item.S41 == "true" ||
          item.S42 == "true" ||
          item.S43 == "true" ||
          item.S44 == "true" ||
          item.S45 == "true" ||
          item.S46 == "true" ||
          item.S47 == "true" ||
          item.S48 == "true" ||
          item.S49 == "true" ||
          item.S50 == "true" ||
          item.S51 == "true" ||
          item.S52 == "true" ||
          item.S53 == "true" ||
          item.S54 == "true" ||
          item.S55 == "true" ||
          item.S56 == "true" ||
          item.S57 == "true" ||
          item.S58 == "true" ||
          item.S59 == "true" ||
          item.S60 == "true" ||
          item.S61 == "true" ||
          item.S62 == "true" ||
          item.S63 == "true" ||
          item.S64 == "true" ||
          item.S65 == "true" ||
          item.S66 == "true" ||
          item.S67 == "true" ||
          item.S68 == "true" ||
          item.S69 == "true" ||
          item.S70 == "true" ||
          item.S71 == "true" ? (
            <View style={stylesBack.famHealthIcon}>
              <ElementIcon
                color={color.secondary}
                name="check-box"
                type="materialicons "
                size={fontSize(24)}
                onPress={() => {
                  handleRelationShipPress(index, "S");
                }}
              />
            </View>
          ) : (
            <View style={stylesBack.famHealthIcon}>
              <ElementIcon
                color={color.placeholder}
                name="check-box-outline-blank"
                type="materialicons "
                size={fontSize(24)}
                onPress={() => {
                  handleRelationShipPress(index, "S");
                }}
              />
            </View>
          )}

          <Text style={[ButtonSheetTitle]}>Sibling</Text>
        </TouchableOpacity>
      </>
    );
  };

  useEffect(() => {
    familyHealthUseEffect();
  }, [isChecked]);

  const familyHealthUseEffect = () => {
    props.item.map((obj: any, index) => {
      var tempArr = Object.values(obj);
      Object.entries(tempArr).shift();
      tempArr.splice(0, 2);
      let isCheck = tempArr.includes("true");

      if (isCheck == true) {
        setIsChecked(true);
      }

      let mIndex = `M${obj.recordNumber}`;
      let fIndex = `F${obj.recordNumber}`;
      let gpIndex = `GP${obj.recordNumber}`;
      let sIndex = `S${obj.recordNumber}`;

      mArray.push(mIndex);
      fArray.push(fIndex);
      sArray.push(sIndex);
      gpArray.push(gpIndex);
      cleanedArray.push(mIndex, fIndex, gpIndex, sIndex);
    });
  };

  return (
    <View style={RawContainerMain}>
      <SafeRBSheet
        ref={refRelation}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: commonStyle.mainSheetContainer,
        }}
      >
        <View style={{ marginTop: -24 }}>
          <View style={commonStyle.subSheetContainer}>
            <Entypo
              name="circle-with-cross"
              size={25}
              onPress={() => {
                refRelation.current.close();
              }}
              color={color.palette.black}
            />
          </View>
          <View style={OverLayTopButtonContainerCencel}>
            <Text style={OverLayTopButtonText}>
              {I18n.t("addHealthRecord.SelectRelationship")} for
            </Text>
            <Text style={OverLayTopButtonText}>{name}</Text>
          </View>
          <View style={SheetWrapper}>
            <FlatList
              data={props.item}
              contentContainerStyle={{ alignItems: "center" }}
              scrollEnabled={false}
              renderItem={({ item, index }: any) =>
                renderRollRaw(item, item.recordNumber)
              }
              showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => refRelation.current.close()}
              style={OverLayButtonContainerCencel}
            >
              <Text style={OverLayButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeRBSheet>

      {props.item[0].title != "otherIssue" ? (
        <>
          <View style={{ marginHorizontal: 10, justifyContent: "center" }}>
            {isChecked == true ? (
              <View style={{ marginHorizontal: 10, justifyContent: "center" }}>
                <FontAwesome
                  color={color.palette.blackSecondary}
                  name="circle"
                  size={fontSize(24)}
                />
              </View>
            ) : (
              <View style={{ marginHorizontal: 10, justifyContent: "center" }}>
                <FontAwesome
                  color={color.palette.blackSecondary}
                  name="circle-thin"
                  size={fontSize(24)}
                />
              </View>
            )}
          </View>
          <View style={TextContainer}>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={4} style={Title}>
                {props.item[0].title}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              refRelation.current.open();
              console.log("props.title", props.item[0].title);

              setName(props.item[0].title);
              checkRelationShip(props.relation);
            }}
            style={{
              width: undefined,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={relationTitle}>{props.relation}</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={fontSize(20)}
              style={{ marginRight: 10 }}
              color={color.palette.blackSecondary}
            />
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
}
