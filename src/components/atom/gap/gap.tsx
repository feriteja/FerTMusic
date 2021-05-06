import React from 'react';
import {View, Text} from 'react-native';

const gap = ({height = 0, width = 0}) => {
  return <View style={{height, width}} />;
};

export default gap;
