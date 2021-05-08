import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useTrackPlayerProgress} from 'react-native-track-player';
import {themeDark} from '../../../constant/colors';
import {usePlayer} from '../../../context/playerContext/context';

const progressSidebar = () => {
  const {position, duration} = useTrackPlayerProgress(1000, null);

  const themeCol = themeDark;

  const imageRotation = useRef(useSharedValue(0)).current;

  const musicControl = usePlayer();

  //imageAnimation
  useEffect(() => {
    if (!musicControl.isPlaying) {
      cancelAnimation(imageRotation);
      console.log(imageRotation.value);
    }
    if (musicControl.isPlaying) {
      imageRotation.value = withRepeat(
        withTiming(imageRotation.value + 360, {
          duration: 4000,
          easing: Easing.linear,
        }),
        -1,
      );
    }
  }, [musicControl.isPlaying]);

  const aniImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${imageRotation.value}deg`}],
    };
  });

  const aniProgressStyle = useAnimatedStyle(() => {
    const interHeight = interpolate(
      position,
      [0, duration],
      [0, 150],
      Extrapolate.CLAMP,
    );

    return {
      height: withTiming(interHeight),
    };
  });

  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={[
          styles.progressContainer,
          {
            backgroundColor: themeCol.progressBar,
          },
        ]}>
        <View style={[styles.ball, {backgroundColor: themeCol.progressBall}]} />
        <Animated.View
          style={[
            aniProgressStyle,
            {
              backgroundColor: 'red',
              width: 7,
            },
          ]}
        />
      </View>
      <Animated.Image
        source={require('../../../assets/icon/logo.png')}
        style={[{height: 50, width: 50}, aniImageStyle]}
      />
    </View>
  );
};

export default progressSidebar;

const styles = StyleSheet.create({
  progressContainer: {
    height: 150,
    width: 7,
    borderRadius: 99,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  ball: {
    height: 15,
    width: 15,
    borderRadius: 8,
    bottom: -7,
  },
});
