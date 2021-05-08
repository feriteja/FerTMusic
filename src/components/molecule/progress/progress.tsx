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
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import {usePlayer} from '../../../context/playerContext/context';
import {songTime} from '../../../functions';
import {themeDark} from '../../../constant/colors';

const progress = () => {
  const {position, duration} = useTrackPlayerProgress(1000, null);
  const {currentTrack} = usePlayer();
  const progress = useSharedValue(0);

  const themeCol = themeDark;

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

  const aniProgressCurent = useAnimatedStyle(() => {
    return {
      width: seekerMove.value,
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
      console.log('invok');

      runOnJS(seekTo)((progress.value / 250) * duration);
    },
  });

  const onseekerTap = (event: TapGestureHandlerStateChangeEvent) => {
    console.log(event.nativeEvent);
    if (event.nativeEvent.state === State.BEGAN) {
      cancelAnimation(progress);
      progress.value = event.nativeEvent.x;
      seekTo((event.nativeEvent.x / 250) * duration);
    }
  };

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text style={{color: 'white'}}>{songTime(position, duration)}</Text>
      </View>
      <TapGestureHandler onHandlerStateChange={onseekerTap}>
        <View
          style={{
            height: 10,
            width: 250,
            justifyContent: 'center',
            borderRadius: 99,
            backgroundColor: themeCol.progressBar,
          }}>
          <Animated.View style={[styles.progressCurent, aniProgressCurent]}>
            <PanGestureHandler minDist={20} onGestureEvent={gestureHandler}>
              <Animated.View
                style={[
                  styles.ballSeek,
                  {backgroundColor: themeCol.progressBall},
                  aniStyle,
                ]}
              />
            </PanGestureHandler>
          </Animated.View>
        </View>
      </TapGestureHandler>
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
  },
  progressCurent: {
    height: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 99,
  },
});
