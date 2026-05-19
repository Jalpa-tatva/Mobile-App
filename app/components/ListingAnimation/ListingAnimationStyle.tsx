import {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface UseListingAnimationStyleProps {
  viewableItems: any;
  id: string;
  scaleOutput?: {visible: number; hidden: number};
  opacityOutput?: {visible: number; hidden: number};
}

const useListingAnimationStyle = ({
  viewableItems,
  id,
  scaleOutput = {visible: 1, hidden: 0.6},
  opacityOutput = {visible: 1, hidden: 0},
}: UseListingAnimationStyleProps) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(item => item.isViewable)
        .find(viewableItem => viewableItem.item?.uniqueId === id), // or `uniqueId` if needed
    );

    return {
      opacity: withTiming(
        isVisible ? opacityOutput.visible : opacityOutput.hidden,
      ),
      transform: [
        {
          scale: withTiming(
            isVisible ? scaleOutput.visible : scaleOutput.hidden,
          ),
        },
      ],
    };
  }, [viewableItems, id]);

  return rStyle;
};

export default useListingAnimationStyle;
