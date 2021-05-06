import React from 'react';
import {View, Text, Button, Image} from 'react-native';

import Router from './src/config/router/router';
import {themeDark} from './src/constant/colors';

import Context from './src/context';

const App = () => {
  const themeCol = themeDark;

  return (
    <Context>
      <View
        style={{
          flex: 1,
          backgroundColor: themeCol.backGround,
        }}>
        <Router />
      </View>
    </Context>
  );
};

export default App;
