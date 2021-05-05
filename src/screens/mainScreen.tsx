import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {themeDark, themeLight} from '../constant/colors';
import {MusicListContext} from '../context/playListContext';

import TrackPlayer from 'react-native-track-player';

const mainScreen = () => {
  const themeCol = themeDark;

  const musicList = useContext(MusicListContext);

  console.log(musicList);

  return (
    <View style={{flex: 1, backgroundColor: themeCol.backGround}}>
      <FlatList data={musicList} renderItem={} />
    </View>
  );
};

export default mainScreen;

const styles = StyleSheet.create({});
