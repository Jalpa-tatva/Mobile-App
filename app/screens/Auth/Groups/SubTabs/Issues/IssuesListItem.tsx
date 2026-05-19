import React, {memo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ShowImage from '@app/components/FastImage/ShowImage';
import {styles} from './Style';
import { translate } from '@app/i18n';

export interface IssuesListProps {
  status: string;
  createdByImageUrl: string;
  problem: string;
  createdBy: string;
  severity: string;
  enteredText: string;
  assignedTo: string;
  onPress: () => void;
}

export const IssuesListItem = memo((props: IssuesListProps) => {
  const [lengthMore, setLengthMore] = useState(false);
  const [textShown, setTextShown] = useState(false);

  const onTextLayout = e => {
    const lines = e.nativeEvent.lines.length;
    if (lines > 2) setLengthMore(true);
  };

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };
  return (
    <TouchableOpacity style={styles.RawContainerMain} onPress={props.onPress}>
      <View style={styles.subWrapper}>
        <View style={styles.ImageContainer}>
          <ShowImage
            imageStyle={styles.ImageWrapper}
            url={props.createdByImageUrl}
          />
        </View>
        <View style={styles.detailWrapper}>
          <View>
            <Text
              numberOfLines={textShown ? undefined : 2}
              style={styles.Title}
              onTextLayout={onTextLayout}>
              {props.problem}
            </Text>
          </View>
          {lengthMore && (
            <View>
              <Text onPress={toggleNumberOfLines} style={styles.readMoreText}>
                {textShown ? 'Read less' : 'Read more'}
              </Text>
            </View>
          )}
          <Text style={styles.createByLbl}>{`${translate('TabTitle.By')}${
            props?.createdBy
          }`}</Text>
          {props.assignedTo && (
            <Text style={styles.assignedTo}>
              <Text style={styles.assignedToBold}>{`Assign To : `}</Text>
              {`${props?.createdBy}`}
            </Text>
          )}
        </View>
        {/* <View style={styles.ApprovalWrapper}>
        <Text style={styles.TitleApproval}> {props.enteredText}</Text>
      </View> */}
      </View>
      <View style={styles.bottomWrapper}>
        <View style={styles.BottomlWrapperMain}>
          <View>
            <Text style={styles.Title}>Severity</Text>
          </View>
          <Text style={styles.TitleLocation}>{props.severity}</Text>
        </View>

        <View style={styles.BottomlWrapperMain2}>
          <View>
            <Text style={styles.Title}>Status</Text>
          </View>
          <Text style={styles.TitleLocation}>{props.status}</Text>
        </View>
      </View>
      <View style={styles.ApprovalWrapper}>
        <Text style={styles.TitleApproval}> {props.enteredText}</Text>
      </View>
    </TouchableOpacity>
  );
});
