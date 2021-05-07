import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTrackPlayerProgress, seekTo} from 'react-native-track-player';
import Animated, {
  cancelAnimation,
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {usePlayer} from '../../../context/playerContext/context';

const progress = () => {
  const {position, duration} = useTrackPlayerProgress(1000, null);

  const {isPlaying, currentTrack} = usePlayer();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(0);
  }, [currentTrack]);

  useEffect(() => {
    if (position > 0 && duration > 0) {
      const percentage = (position / duration) * 100;
      const positionX = (250 * percentage) / 100;

      progress.value = withTiming(positionX, {
        duration: 1000,
        easing: Easing.linear,
      });
    }
  }, [position]);

  const seekerMove = useDerivedValue(() => {
    return interpolate(progress.value, [0, 250], [0, 250], Extrapolate.CLAMP);
  });

  const aniStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: seekerMove.value}],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = progress.value;
    },
    onActive: (event, ctx: any) => {
      cancelAnimation(progress);

      const moveToPosition = ctx.startX + event.translationX;
      progress.value = moveToPosition;
    },
    onEnd: (event, ctx: any) => {
      if (ctx.startX + event.translationX < 0) {
        progress.value = 0;
      }
      if (ctx.startX + event.translationX > 250) {
        progress.value = 250;
      }

      runOnJS(seekTo)((progress.value / 250) * duration);
    },
  });

  return (
    <View>
      <Text style={{color: 'white'}}>
        {position}/{duration}
      </Text>
      <View
        style={{
          height: 10,
          backgroundColor: 'white',
          width: 250,
          justifyContent: 'center',
          // overflow: 'hidden',
        }}>
        <Animated.View>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.ballSeek, aniStyle]} />
          </PanGestureHandler>
        </Animated.View>
      </View>
    </View>
  );
};

export default progress;

const styles = StyleSheet.create({
  ballSeek: {
    height: 20,
    width: 20,
    left: -10,
    borderRadius: 10,
    backgroundColor: 'lightblue',
  },
});
