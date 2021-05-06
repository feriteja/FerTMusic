import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {themeDark} from '../../../constant/colors';
import {iMusic} from '../../../constant/interface';
import {CoverImage} from 'react-native-get-music-files-v3dev-test';
import TrackPlayer, {Track} from 'react-native-track-player';
import {useNavigation} from '@react-navigation/core';

const musicListItem = ({item}: {item: Track}) => {
  const themeCol = themeDark;

  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

  const musicPickHandler = async () => {
    try {
      await TrackPlayer.skip(item.id);

      navigation.navigate('play');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => musicPickHandler()}
      style={{
        backgroundColor: themeCol.card,
        marginVertical: 5,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        overflow: 'hidden',
        borderRadius: 10,
      }}>
      <Image
        source={
          imageUri ? {uri: imageUri} : require('../../../assets/icon/logo.png')
        }
        style={{height: 50, width: 50}}
      />

      <View style={{justifyContent: 'space-between', marginLeft: 10, flex: 1}}>
        <Text style={{color: themeCol.text}}>{item.title}</Text>
        <Text
          numberOfLines={1}
          lineBreakMode="tail"
          style={{color: themeCol.text}}>
          {item.artist}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default musicListItem;

const styles = StyleSheet.create({});
