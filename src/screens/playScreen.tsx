import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {themeDark} from '../constant/colors';
import {usePlayer} from '../context/playerContext/context';

import {Gap, MusicController, ProgressPlay} from '../components';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const playScreen = () => {
  const themeCol = themeDark;
  const controller = usePlayer();
  const {artist, title} = controller?.currentTrack || {};
  const imageRotation = useSharedValue(0);

  const {isPlaying} = usePlayer();

  useEffect(() => {
    if (!isPlaying) {
      cancelAnimation(imageRotation);
      console.log(imageRotation.value);
    }
    if (isPlaying) {
      imageRotation.value = withRepeat(
        withTiming(imageRotation.value + 360, {
          duration: 4000,
          easing: Easing.linear,
        }),
        -1,
      );
    }
  }, [isPlaying]);

  const aniImage = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${imageRotation.value}deg`}],
    };
  });

  return (
    <View style={[styles.container, {backgroundColor: themeCol.backGround}]}>
      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <Animated.Image
          source={
            controller.artWork
              ? {uri: controller.artWork}
              : require('../assets/icon/logo.png')
          }
          style={[{height: 200, width: 200}, aniImage]}
        />
        <Gap height={20} />
        <Text style={[styles.textTitle, {color: themeCol.text}]}>
          {title || ''}
        </Text>
        <Gap height={10} />
        <Text style={[styles.textArtist, {color: themeCol.text}]}>
          {artist || ''}
        </Text>
        <Gap height={20} />
      </View>
      <View style={styles.controlOption}>
        <ProgressPlay />
        <Gap height={20} />

        <MusicController />
      </View>
    </View>
  );
};

export default playScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circlePlay: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
  },

  controlOption: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textArtist: {
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
