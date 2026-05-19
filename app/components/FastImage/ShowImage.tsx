import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

// Import external library
import ImageView from 'react-native-image-viewing';
import FastImage from 'react-native-fast-image';

/**
 * ShowImage Props
 */
export interface ShowImageProps {
  imageList?: Array<{}>;
  index?: number;
  imageStyle?: object;
  containerStyle?: object;
  url?: string;
  source: any;
  resizeMode?: string;
  tintColor?: string;
}

/**
 * Default Props
 */
const defaultProps = {
  imageList: [],
  index: 0,
  imageStyle: {},
  containerStyle: {},
  url: '',
  source: '',
  tintColor: '',
};

/**
 * ShowImage Component
 */
const ShowImage = (props: ShowImageProps) => {
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    sizeMode();
  }, []);

  const sizeMode = () => {
    if (props?.resizeMode == 'stretch') {
      return FastImage.resizeMode.stretch;
    } else if (props?.resizeMode == 'contain') {
      return FastImage.resizeMode.contain;
    } else if (props?.resizeMode == 'center') {
      return FastImage.resizeMode.center;
    } else {
      return FastImage.resizeMode.cover;
    }
  };

  const ImageComp = () => {
    return (
      <FastImage
        style={props?.imageStyle}
        source={
          props?.source
            ? props?.source
            : {
                uri: props.url,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }
        }
        resizeMode={sizeMode()}
        tintColor={props?.tintColor}
      />
    );
  };
  return props?.imageList && props?.imageList.length > 0 ? (
    visible ? (
      <ImageView
        images={props?.imageList}
        imageIndex={props?.index}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    ) : (
      <TouchableOpacity
        style={props?.containerStyle}
        onPress={() => setIsVisible(true)}>
        <ImageComp />
      </TouchableOpacity>
    )
  ) : (
    <ImageComp />
  );
};

ShowImage.defaultProps = defaultProps;
export default ShowImage;
