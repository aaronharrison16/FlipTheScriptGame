import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AppRoutes } from './src/Navigation/Navigation';
import HomeScreen from './src/Screens/HomeScreen';
import GameScreen from './src/Screens/GameScreen';
import SelectGameScreen from './src/Screens/SelectGameScreen';

const AppStack = createStackNavigator<AppRoutes>();

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode='none'>
        <AppStack.Screen name='HomeScreen' component={HomeScreen} />
        <AppStack.Screen name='GameScreen' component={GameScreen} />
        <AppStack.Screen name='SelectGameScreen' component={SelectGameScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
