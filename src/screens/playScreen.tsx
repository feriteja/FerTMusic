import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {themeDark} from '../constant/colors';

const playScreen = () => {
  const themeCol = themeDark;
  return (
    <View style={[styles.container, {backgroundColor: themeCol.backGround}]}>
      <Text>playHere</Text>
    </View>
  );
};

export default playScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
