import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import TrackPlayer from 'react-native-track-player';
import {themeDark} from '../../../constant/colors';
import {usePlayer} from '../../../context/playerContext/context';

const controller = () => {
  const themeCol = themeDark;

  const MusicController = usePlayer();

  return (
    <View style={styles.controller}>
      <TouchableOpacity onPress={() => MusicController.skiptoPrev()}>
        <IconEntypo
          name="controller-jump-to-start"
          color={themeCol.icon}
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => MusicController.playhandler()}
        style={[
          styles.circlePlay,
          {
            backgroundColor: themeCol.icon,
          },
        ]}>
        {MusicController.isPlaying ? (
          <IconEntypo
            name="controller-paus"
            color={themeCol.backGround}
            size={35}
          />
        ) : (
          <IconEntypo
            style={{left: 3}}
            name="controller-play"
            color={themeCol.backGround}
            size={40}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => MusicController.skipToNext()}>
        <IconEntypo name="controller-next" color={themeCol.icon} size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default controller;

const styles = StyleSheet.create({
  controller: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  circlePlay: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45 / 2,
  },
});
