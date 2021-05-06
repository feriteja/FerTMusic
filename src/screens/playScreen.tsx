import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {themeDark} from '../constant/colors';
import {usePlayer} from '../context/playerContext/context';

import {Gap, MusicController, ProgressPlay} from '../components';

const playScreen = () => {
  const themeCol = themeDark;
  const controller = usePlayer();
  const {artist, title, duration} = controller?.currentTrack || {};

  return (
    <View style={[styles.container, {backgroundColor: themeCol.backGround}]}>
      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <Image
          source={
            controller.artWork
              ? {uri: controller.artWork}
              : require('../assets/icon/logo.png')
          }
          style={{height: 200, width: 200}}
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
        <ProgressPlay />
      </View>
      <View style={styles.controlOption}>
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
    flex: 1,
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
