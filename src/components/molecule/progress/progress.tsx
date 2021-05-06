import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTrackPlayerProgress} from 'react-native-track-player';
import Animated from 'react-native-reanimated';

const progress = () => {
  const {position, duration: time} = useTrackPlayerProgress(1000);

  return (
    <View>
      <Text style={{color: 'white'}}>
        {position}/{time}
      </Text>
    </View>
  );
};

export default progress;

const styles = StyleSheet.create({});
