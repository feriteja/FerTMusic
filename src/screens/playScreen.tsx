import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {themeDark} from '../constant/colors';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {usePlayer} from '../context/playerContext/context';

const playScreen = () => {
  const themeCol = themeDark;
  const controller = usePlayer();

  return (
    <View style={[styles.container, {backgroundColor: themeCol.backGround}]}>
      <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/icon/logo.png')}
          style={{height: 200, width: 200}}
        />
      </View>
      <View style={styles.controlOption}>
        <View style={styles.controller}>
          <IconEntypo
            name="controller-jump-to-start"
            color={themeCol.icon}
            size={40}
          />
          <View
            style={{
              height: 45,
              width: 45,
              backgroundColor: themeCol.icon,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 45 / 2,
            }}>
            <IconEntypo
              style={{left: 3}}
              name="controller-play"
              color={'red'}
              size={40}
            />
          </View>
          <IconEntypo name="controller-next" color={themeCol.icon} size={40} />
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
});
