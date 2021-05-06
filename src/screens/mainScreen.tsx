import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {themeDark, themeLight} from '../constant/colors';

import {MusicListItem} from '../components';
import {PlayListContext} from '../context/playListContext/context';

const mainScreen = () => {
  const themeCol = themeDark;

  const musicList = useContext(PlayListContext);

  return (
    <View style={{flex: 1, backgroundColor: themeCol.backGround}}>
      <FlatList
        data={musicList.playList}
        initialNumToRender={20}
        renderItem={({item, index}) => {
          return <MusicListItem item={item} />;
        }}
      />
    </View>
  );
};

export default mainScreen;

const styles = StyleSheet.create({});
