import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AppRoutes } from './src/Navigation/Navigation';
import HomeScreen from './src/Screens/HomeScreen';
import GameScreen from './src/Screens/GameScreen';
import GameSelectScreen from './src/Screens/GameSelectScreen';
import GameSettingsScreen from './src/Screens/GameSettingsScreen/GameSettingsScreen';
import Themes from './src/Themes/Themes';

const AppStack = createStackNavigator<AppRoutes>();

const App = () => {
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
