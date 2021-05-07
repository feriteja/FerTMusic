import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTrackPlayerProgress} from 'react-native-track-player';

const progressSidebar = () => {
  const {position, duration} = useTrackPlayerProgress(1000, null);

  return (
    <View>
      <View />
      <Image
        source={require('../../../assets/icon/logo.png')}
        style={{height: 50, width: 50}}
      />
    </View>
  );
};

export default progressSidebar;

const styles = StyleSheet.create({});
