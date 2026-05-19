import * as React from 'react';
import {ActivityIndicator} from 'react-native';

// import custom styling & utils
import { color } from '@app/theme';
import { styles } from './styles';

/**
 * LoadMore Props
 */
export interface LoadMoreProps {
  animating: boolean;
}

/**
 * LoadMore component
 */
export function LoadMore(props: LoadMoreProps) {
  return (
    <ActivityIndicator
      style={styles.loaderContainer}
      animating={props.animating}
      color={color.secondary}
      size="large"
    />
  );
}
