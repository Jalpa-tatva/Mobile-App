import React from 'react';
import {View} from 'react-native';

// import external libraries
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {fontSize} from '@app/theme';

// import custom styling & utils
import {Text} from '../text/text';
import {Style} from './style';

/**
 * EmptyView Props
 */
export interface EmptyViewProps {
  title: string;
  onPressRefresh: () => void;
  type?: string;
}

/**
 * EmptyView component
 */
export function EmptyView(props: EmptyViewProps) {
  return (
    <View
      style={
        props?.type
          ? {...Style.baseview, ...Style.mainBottomSpace}
          : Style.baseview
      }>
      <FontAwesome
        name={'refresh'}
        onPress={props.onPressRefresh}
        size={fontSize(30)}
        style={Style.spaceBottom}
      />
      <Text style={Style.labelStyle}>{props.title}</Text>
    </View>
  );
}
