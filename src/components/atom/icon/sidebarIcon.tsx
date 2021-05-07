import React from 'react';
import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {themeDark} from '../../../constant/colors';

const sidebarIcon = ({
  name,
  navigation,
  to,
  index,
  navState,
}: {
  name: string;
  navigation: any;
  to: string;
  index: number;
  navState: number;
}) => {
  const themeCol = themeDark;

  const isFocus = index == navState;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(to)}
      style={{
        backgroundColor: isFocus ? themeCol.iconContainerFocus : 'transparent',

        alignItems: 'center',
        marginVertical: 5,
        paddingVertical: 5,
      }}>
      <IconFeather name={name} size={40} color={themeCol.icon} />
    </TouchableOpacity>
  );
};

export default sidebarIcon;
