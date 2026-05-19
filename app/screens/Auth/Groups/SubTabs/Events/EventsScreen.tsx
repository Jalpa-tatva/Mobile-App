import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList } from "react-native";

// Import external lib.
import moment from "moment";
import I18n from "i18n-js";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Agenda } from "react-native-calendars";

// Importcustom components, function & styles
import { Loader, EmptyView } from "@components/index";
import { getEventList } from "@app/services/api/groups";
import { CalanderItem } from "./CalanderItem";
import { FULL, CalanderWrapper, FullWrapper, styles } from "./Styles";
import { MODULES } from "@app/constants";
import useAppNavigation from "@app/navigation/navigation";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import { color } from "@app/theme";

interface EventItem {
  country?: string;
  address?: string;
  city?: string;
  profileLocation?: string;
  createdBy?: string;
}

interface EventsProps {
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  endDateNew?: string;
  startDateNew?: string;
  index?: string;
  startDateText?: string;
  onPress?: Function;
  eventArray?: EventItem;
  id?: string;
}

type EventsRouteProps = {
  EventsScreen: {
    setActiveTab?: (s: string) => void;
    profile: any;
    activeTab: string;
    reload: boolean;
    setReload: (b: boolean) => void;
    screen?: string;
  };
};

type EventsScreenType = RouteProp<EventsRouteProps, "EventsScreen">;

export const EventsScreen: React.FC = () => {
  const route = useRoute<EventsScreenType>();
  const { profile, setActiveTab, activeTab, reload, setReload, screen } =
    route?.params || ({} as any);

  const { groups } = content;
  const { group_detail } = useRedux([groups.groupsDetail]);
  const uniqueId =
    group_detail?.uniqueId == "" || group_detail?.uniqueId == null
      ? profile
      : group_detail?.uniqueId;

  const navigation = useAppNavigation();
  const currentDay = moment().format("YYYY-MM-DD");

  const [isLoader, setIsloader] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(currentDay);
  const [dateMark, setDateMark] = useState<Record<string, any>>({});
  const [calendarList, setCalendarList] = useState<any>({});

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setDateMark({});
      setCalendarList({});
      if (setActiveTab) setActiveTab(activeTab);
      calendarsListService();
    });

    // also load on mount
    calendarsListService();

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, uniqueId]);

  useEffect(() => {
    if (reload) {
      calendarsListService();
      if (setReload) setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const onRefresh = () => calendarsListService();

  const dateDifferent = (startDate: string, endDate: string) => {
    const dateArr: string[] = [];
    let cur = moment(startDate, "MM/DD/YYYY").startOf("day");
    const end = moment(endDate, "MM/DD/YYYY").startOf("day");
    while (cur.valueOf() <= end.valueOf()) {
      dateArr.push(cur.format("MM/DD/YYYY"));
      cur = cur.add(1, "day");
    }
    return dateArr;
  };

  const calendarsListService = async () => {
    setIsloader(true);
    try {
      const res = await getEventList(uniqueId);
      const objectList = res?.data?.[0]?.objectList ?? [];
      const eventArray: any[] = [];

      objectList.forEach((val: any) => {
        const startTs = Number(val.startDate?.slice?.(0, -3)) || null;
        const endTs = Number(val.endDate?.slice?.(0, -3)) || null;

        val.startDateNew = startTs
          ? moment(startTs * 1000).format("MM/DD/YYYY")
          : null;
        val.endDateNew = endTs
          ? moment(endTs * 1000).format("MM/DD/YYYY")
          : null;

        val.startDate = startTs
          ? moment(startTs * 1000).format("MMM DD, YYYY, HH:mm a")
          : val.startDate;
        val.endDate = endTs
          ? moment(endTs * 1000).format("MMM DD, YYYY, HH:mm a")
          : val.endDate;

        eventArray.push(val);
      });

      const tempObj: Record<string, EventsProps[]> = {};
      let marks: Record<string, any> = {};

      eventArray.forEach((element) => {
        if (!element.startDateNew || !element.endDateNew) return;
        const dateRange = dateDifferent(
          element.startDateNew,
          element.endDateNew
        );

        dateRange.forEach((d) => {
          const iso = moment(d, "MM/DD/YYYY").format("YYYY-MM-DD");

          // mark event dates with blue circle (not dot)
          marks[iso] = {
            customStyles: {
              container: {
                ...styles.markWrapper,
                // normal event date
              },
              text: styles.dateLabel,
            },
          };

          const itemObj: EventsProps = {
            eventArray: element,
            id: element.id,
            startDate: element.startDate,
            endDate: element.endDate,
            endDateNew: element.endDateNew,
            startDateNew: element.startDateNew,
            title: element.title,
            startDateText: element.startDateText,
          };

          if (tempObj[iso]) tempObj[iso].push(itemObj);
          else tempObj[iso] = [itemObj];
        });
      });

      // ensure today's key exists in items so Agenda will render the list area for today
      if (!tempObj[currentDay]) {
        tempObj[currentDay] = [];
      }

      // always include today's mark (keep previous dot if present)
      marks = {
        ...marks,
        [currentDay]: {
          ...(marks[currentDay] || {}),
          marked: !!marks[currentDay],
          selected: false,
          selectedColor: "#1cc5dc",
        },
      };

      // Set selectedDate to currentDay (you wanted today always)
      const pickDate = currentDay; // if you prefer first event use: Object.keys(tempObj)[0] || currentDay

      // ensure selected flag for the pickDate
      const finalMarks: Record<string, any> = {};

      Object.keys(marks).forEach((k) => {
        const isSelected = k === pickDate;

        finalMarks[k] = {
          customStyles: {
            container: {
              ...styles.markWrapper,
              backgroundColor: isSelected
                ? color.eventColorOne // selected event date
                : color.eventBlueColor, // normal event date
            },
            text: styles.dateLabel,
          },
        };
      });

      // set states using new object references
      setDateMark({ ...finalMarks });
      setCalendarList({ ...tempObj });
      setSelectedDate(pickDate);
    } catch (err) {
      console.log("error in events", err);

      // optionally log
    } finally {
      setIsloader(false);
    }
  };

  const rowHasChanged = (r1: any, r2: any) => {
    return (r1?.id ?? JSON.stringify(r1)) !== (r2?.id ?? JSON.stringify(r2));
  };

  const renderItem = (item: EventsProps) => {
    const country = item?.eventArray?.country
      ? ` ${item?.eventArray?.country}`
      : "";
    const address = item?.eventArray?.address
      ? ` ${item?.eventArray?.address}`
      : "";
    const city = item?.eventArray?.city ? ` ${item?.eventArray?.city},` : "";
    const finalLocation =
      !address && !city && !country
        ? item?.eventArray?.profileLocation || ""
        : [address, city, country].filter(Boolean).join(", ");

    return (
      <CalanderItem
        title={item.title}
        startDate={item.startDate}
        endDate={item.endDate}
        index={item?.index}
        userName={item?.eventArray?.createdBy ?? ""}
        location={finalLocation}
        startDateText={item.startDateText}
        onPress={() => {
          navigation.navigate(MODULES.RollUpDetailsScreen, {
            eventId: item.id,
            item: item?.eventArray,
            From: "calender",
            screen,
          });
        }}
      />
    );
  };

  const handleDayChange = useCallback(
    (dayParam: any) => {
      const selected =
        typeof dayParam === "string"
          ? dayParam
          : dayParam?.dateString ?? moment(dayParam).format("YYYY-MM-DD");

      setSelectedDate(selected);

      const newMarks: Record<string, any> = {};
      Object.keys(dateMark).forEach((k) => {
        const isSelected = k === selected;
        newMarks[k] = {
          customStyles: {
            container: {
              ...styles.markWrapper,
              backgroundColor: isSelected
                ? color.eventColorOne // selected event date
                : color.eventBlueColor, // normal event date
            },
            text: styles.dateLabel,
          },
        };
      });

      setDateMark({ ...newMarks });
      setCalendarList((prev) => ({ ...prev }));
    },
    [dateMark]
  );
  const renderEmptyDate = () => (
    <View style={FullWrapper}>
      {!isLoader ? (
        <EmptyView
          title={I18n.t("EmptyView.EmptyEvent")}
          onPressRefresh={onRefresh}
        />
      ) : null}
    </View>
  );

  return (
    <View testID="CalandersScreen" style={FULL}>
      {isLoader ? (
        <Loader />
      ) : (
        <Agenda
          items={calendarList}
          onDayPress={(d) => handleDayChange(d?.dateString ?? d)}
          onDayChange={(d) => handleDayChange(d?.dateString ?? d)}
          refreshing={isLoader}
          selected={selectedDate}
          // disable Agenda internal item renderer since we use renderList
          renderItem={() => null}
          renderEmptyData={renderEmptyDate}
          markedDates={dateMark}
          markingType="custom"
          theme={{
            agendaDayTextColor: "black",
            agendaDayNumColor: "black",
            agendaTodayColor: "black",
            agendaKnobColor: "blue",
          }}
          renderKnob={() => (
            <View style={{ paddingVertical: 8 }}>
              <View style={CalanderWrapper} />
            </View>
          )}
          rowHasChanged={rowHasChanged}
          renderList={(listProps) => (
            <MyCustomList
              {...listProps}
              renderItem={renderItem}
              renderEmptyDate={renderEmptyDate}
              selectedDate={selectedDate}
            />
          )}
        />
      )}
    </View>
  );
};
const MyCustomList: React.FC<any> = ({
  items,
  renderItem: passedRenderItem,
  renderEmptyDate,
  selectedDate,
}) => {
  const data: EventsProps[] = items[selectedDate] || [];
  if (!data || data.length === 0) {
    // show empty UI (today exists but no events)
    return renderEmptyDate();
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${selectedDate}-${item?.id ?? index}`}
      renderItem={({ item }) => passedRenderItem(item)}
    />
  );
};
