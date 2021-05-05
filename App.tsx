import React from 'react';
import {View, Text, Button, Image} from 'react-native';

import Router from './src/config/router/router';
import {themeDark} from './src/constant/colors';

import PlaylistProvider from './src/context/playListContext';

const App = () => {
  const themeCol = themeDark;

  return (
    <PlaylistProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: themeCol.backGround,
        }}>
        <Router />
      </View>
    </PlaylistProvider>
  );
};

export default App;
