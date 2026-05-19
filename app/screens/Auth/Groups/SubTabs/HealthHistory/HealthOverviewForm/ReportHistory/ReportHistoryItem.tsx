import I18n from 'i18n-js';
import React, {memo} from 'react';
import {View, Image, Text, TouchableNativeFeedback} from 'react-native';

import {
  ApprovalWrapper,
  TitleApproval,
  ImageWrapper,
  ImageContainer,
  RawContainerMain,
  TitleLocation,
  RawContainer,
  TextContainer,
} from './Styles';

export interface ReportHistoryProps {
  reportTime: string;
  timeAgo: string;
  firstUsername: string;
  secondUsername: string;
  userName: string;
  userImageUrl: string;
  userEmailId: string;
  userRole: string;
}

export const ReportHistoryItem = memo((props: ReportHistoryProps) => {
  return (
    <TouchableNativeFeedback>
      <View style={RawContainerMain}>
        <View style={ApprovalWrapper}>
          <Text style={TitleApproval}> {props.timeAgo}</Text>
        </View>

        <View style={RawContainer}>
          <View style={ImageContainer}>
            <Image
              style={ImageWrapper}
              resizeMode="stretch"
              source={{uri: props.userImageUrl}}
            />
          </View>

          <View style={TextContainer}>
            <View style={{flex: 1}}>
              <Text style={TitleLocation}>
                {I18n.t('TabTitle.By')} : {props.userName}
              </Text>
            </View>
            <Text style={TitleLocation}>{props.userEmailId}</Text>
            <Text style={TitleLocation}>
              To : {props?.firstUsername}
              {props?.secondUsername ? `,${props?.secondUsername}` : null}
            </Text>
            <Text style={TitleLocation}>Date : {props?.reportTime}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
});
