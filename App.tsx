import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes } from './src/Navigation/Navigation';
import Home from './src/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const AppStack = createStackNavigator<AppRoutes>();

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode='none'>
        <AppStack.Screen name='Home' component={Home} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
