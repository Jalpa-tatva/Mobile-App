import React, {memo} from 'react';
import ShowImage from '@app/components/FastImage/ShowImage';
import {styles} from './Styles';

export interface videoProps {
  originalUrl: string;
  onPress: Function;
  imageList?: Array<{}>;
  index?: any;
  photoList?: any;
}
export const PhotoItem = memo((props: videoProps) => {
  return (
    <ShowImage
      imageList={props?.photoList}
      index={props.index}
      url={props.originalUrl}
      imageStyle={styles.imageWrapper}
      containerStyle={styles.rawItemContainer}
    />
  );
});
