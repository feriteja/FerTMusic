import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {themeDark} from '../../../constant/colors';
import {iMusic} from '../../../constant/interface';
import {CoverImage} from 'react-native-get-music-files-v3dev-test';

const musicListItem = ({item}: {item: iMusic}) => {
  const themeCol = themeDark;

  const [imageUri, setImageUri] = useState(null);

  // const getArtworkSong = async () => {
  //   try {
  //     const musicInfo = await MusicInfo.getMusicInfoAsync(
  //       `file://${item.url}`,
  //       {
  //         picture: true,
  //       },
  //     );

  //     setImageUri(musicInfo.picture.pictureData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // getArtworkSong();
  }, []);

  return (
    <View
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
    </View>
  );
};

export default musicListItem;

const styles = StyleSheet.create({});
