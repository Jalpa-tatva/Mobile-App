import React from 'react';
import {View, Image, Text} from 'react-native';

import {
  ApprovalWrapper,
  TitleApproval,
  ImageWrapper,
  ImageContainer,
  RawContainerMain,
  TitleLocation,
  Title,
  RawContainer,
  TextContainer,
} from './ReportHistoryStyle';

export interface ReportHistoryProps {
  id: number;
  userName: string;
  userImage: string;
  userEmailId: string;
  reportTime: string;
  timeAgo: string;
}

export function ReportHistoryItem(props: ReportHistoryProps) {
  return (
    <View style={RawContainerMain}>
      <View style={ApprovalWrapper}>
        <Text style={TitleApproval}> {props.timeAgo}</Text>
      </View>

      <View style={RawContainer}>
        <View style={ImageContainer}>
          <Image
            style={ImageWrapper}
            resizeMode="stretch"
            source={require('../../../assets/images/user/user.png')}
            // source={props.userImage}
            // source={{uri: props.userImage}}
          />
        </View>

        <View style={TextContainer}>
          <View style={{flex: 1}}>
            <Text numberOfLines={4} style={Title}>
              {props.userName}
            </Text>
            {/* <Text numberOfLines={4} style={Title}>{props.userEmailId}</Text> */}
          </View>
          <Text style={TitleLocation}>{props.userEmailId}</Text>
        </View>
      </View>
    </View>
  );
}
