import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PermissionsAndroid } from 'react-native';

import { AppRoutes } from './src/Navigation/Navigation';
import HomeScreen from './src/Screens/HomeScreen';
import GameScreen from './src/Screens/GameScreen';
import GameSelectScreen from './src/Screens/GameSelectScreen';
import GameSettingsScreen from './src/Screens/GameSettingsScreen/GameSettingsScreen';

const AppStack = createStackNavigator<AppRoutes>();

const App = () => {
  useEffect(() => {
    PermissionsAndroid.request('android.permission.RECORD_AUDIO')
  }, [])

  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode='none'>
        <AppStack.Screen name='HomeScreen' component={HomeScreen} />
        <AppStack.Screen name='GameScreen' component={GameScreen} />
        <AppStack.Screen name='GameSelectScreen' component={GameSelectScreen} />
        <AppStack.Screen name='GameSettingsScreen' component={GameSettingsScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
