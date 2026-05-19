import React from 'react';
import {ActivityIndicator, View} from 'react-native';

// import custom styling & utils
import {color} from '@app/theme';
import {styles} from './styles';

/**
 * Loader component
 */
export function Loader(props: any) {
  return (
    <View
      style={
        props?.type
          ? {...styles.loaderContainer, ...styles.bottomSpace}
          : styles.loaderContainer
      }>
      <ActivityIndicator
        color={color.secondary}
        style={styles.indicatorContainer}
        animating={true}
        size={'large'}
      />
    </View>
  );
}
