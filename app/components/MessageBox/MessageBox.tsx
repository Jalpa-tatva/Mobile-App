import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

// Import external libraries
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Import styles, theme
import {Style} from './style';
import {color, fontSize} from '@app/theme';

interface MessageBoxProps {
  visible: boolean;
  onClose: Function;
  modalList: Array<{}>;
  parentViewStyle?: any;
  onOpenDetails?: Function;
}
interface Listing {
  title?: string;
  name?: string;
}
const MessageBox = (props: MessageBoxProps) => {
  return (
    props?.visible && (
      <View style={props.parentViewStyle}>
        {props?.modalList.map((element: Listing) => {
          return (
            <TouchableOpacity
              style={Style.subCal}
              onPress={() => {
                props?.onOpenDetails(element.title);
                // props?.onClose();
              }}>
              <View style={Style.iconView}>
                <FontAwesome
                  name={element.name}
                  size={fontSize(22)}
                  color={color.white}
                />
              </View>
              <Text style={Style.title}>{element.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    )
  );
};

export default MessageBox;
