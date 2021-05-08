import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useTrackPlayerProgress} from 'react-native-track-player';
import {usePlayer} from '../../../context/playerContext/context';

const progressSidebar = () => {
  const {position, duration} = useTrackPlayerProgress(1000, null);

  const imageRotation = useRef(useSharedValue(0)).current;

  const musicControl = usePlayer();

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

  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          height: 150,
          width: 7,
          backgroundColor: 'white',
          borderRadius: 99,
          marginVertical: 10,
        }}></View>
      <Animated.Image
        source={require('../../../assets/icon/logo.png')}
        style={[{height: 50, width: 50}, aniImageStyle]}
      />
    </View>
  );
};

export default progressSidebar;

const styles = StyleSheet.create({});
