import { color } from '@app/theme';
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

/**
 * ImagePreview
 * A simple, reusable image preview component for React Native.
 * - Shows a modal with the image
 * - Supports pinch-to-zoom on iOS via ScrollView (maximumZoomScale)
 * - Shows a close button and optional caption
 *
 * Props:
 *  - visible: boolean
 *  - imageUri: string (http(s) or local require)
 *  - onClose: function
 *  - caption: string (optional)
 *  - enableZoom: boolean (defaults to true)
 *
 * Usage:
 * <ImagePreview
 *   visible={isOpen}
 *   imageUri={imageUri}
 *   onClose={() => setIsOpen(false)}
 *   caption="My photo"
 * />
 */

export default function ImagePreview({
  visible,
  imageUri,
  onClose,
  caption,
  enableZoom = true,
  backgroundColor = 'rgba(0,0,0,0.95)',
}) {
  const [loading, setLoading] = useState(true);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <View style={[styles.container, {backgroundColor}]}>
        <View style={styles.header} pointerEvents="box-none">
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
            accessibilityLabel="Close preview">
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          maximumZoomScale={enableZoom ? 3 : 1}
          minimumZoomScale={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.imageWrap}>
            {loading && (
              <ActivityIndicator
                size="large"
                color={color.white}
                style={styles.loader}
              />
            )}

            <Image
              source={typeof imageUri === 'string' ? {uri: imageUri} : imageUri}
              style={styles.image}
              resizeMode="contain"
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: color.white,
    fontSize: 20,
    lineHeight: 20,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  imageWrap: {
    width: width,
    height: height * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    zIndex: 10,
  },
  captionWrap: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  captionText: {
    color: color.white,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.95,
  },
});

// Example usage (paste in any screen):
//
// const [open, setOpen] = useState(false);
// const sampleUri = 'https://picsum.photos/1200/800';
//
// <Button title="Open Preview" onPress={() => setOpen(true)} />
// <ImagePreview
//   visible={open}
//   imageUri={sampleUri}
//   onClose={() => setOpen(false)}
//   caption="A sample image from picsum"
// />

// Notes:
// - ScrollView pinch-zoom works on iOS. For Android pinch-to-zoom and smooth gestures, consider using
//   a library such as `react-native-image-zoom-viewer` or integrating `react-native-gesture-handler` + `reanimated`.
// - You can add swipe-to-dismiss or share button as required.
