import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {main, play} from '../../screens';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Dimensions,
} from 'react-native';
import {themeDark} from '../../constant/colors';
import {IconSidebar, ProgressSideBar} from '../../components';

const {width} = Dimensions.get('screen');

const Drawer = createDrawerNavigator();

const DrawerContent = ({navigation, state: {index}}) => {
  const themeCol = themeDark;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: themeCol.sideBar,
        elevation: 2,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/icon/logo.png')}
          style={{
            height: 40,
            resizeMode: 'contain',
            justifyContent: 'flex-start',
          }}
        />
        <IconSidebar
          navigation={navigation}
          navState={index}
          index={0}
          to="main"
          name="list"
        />
        <IconSidebar
          navigation={navigation}
          navState={index}
          index={1}
          to="play"
          name="play-circle"
        />
      </View>
      {index != 1 && (
        <View style={{paddingVertical: 20}}>
          <ProgressSideBar />
        </View>
      )}
    </View>
  );
};

const router = () => {
  const {width} = useWindowDimensions();
  const themeCol = themeDark;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        sceneContainerStyle={{backgroundColor: themeCol.backGround}}
        drawerContent={DrawerContent}
        drawerType="permanent"
        drawerStyle={{
          width: (width * 2) / 10,
          borderColor: themeCol.backGround,
        }}>
        <Drawer.Screen name="main" component={main} />
        <Drawer.Screen name="play" component={play} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default router;
