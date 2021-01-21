import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AppRoutes } from './src/Navigation/Navigation';
import Home from './src/Home';
import GameScreen from './src/GameScreen';

const AppStack = createStackNavigator<AppRoutes>();

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode='none'>
        <AppStack.Screen name='Home' component={Home} />
        <AppStack.Screen name='GameScreen' component={GameScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
