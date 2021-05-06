import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {themeDark} from '../constant/colors';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {usePlayer} from '../context/playerContext/context';
import TrackPlayer from 'react-native-track-player';
import {Gap} from '../components';

const playScreen = () => {
  const themeCol = themeDark;
  const controller = usePlayer();
  const {artist, title, duration} = controller?.currentTrack || {};

  console.log(controller);

  const skipToNext = () => {
    TrackPlayer.skipToNext();
    controller.setArtWork('');
  };

  const skiptoPrev = () => {
    TrackPlayer.skipToPrevious();
    controller.setArtWork('');
  };

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
      </View>
      <View style={styles.controlOption}>
        <View style={styles.controller}>
          <TouchableOpacity onPress={() => skiptoPrev()}>
            <IconEntypo
              name="controller-jump-to-start"
              color={themeCol.icon}
              size={40}
            />
          </TouchableOpacity>
          <View
            style={[
              styles.circlePlay,
              {
                backgroundColor: themeCol.icon,
              },
            ]}>
            <IconEntypo
              style={{left: 3}}
              name="controller-play"
              color={themeCol.backGround}
              size={40}
            />
          </View>
          <TouchableOpacity onPress={() => skipToNext()}>
            <IconEntypo
              name="controller-next"
              color={themeCol.icon}
              size={40}
            />
          </TouchableOpacity>
        </View>
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
  controller: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-around',
    alignItems: 'center',
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
