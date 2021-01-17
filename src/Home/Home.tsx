import React from 'react'
import { View, Text } from 'react-native';
import { Button } from '../components';
import { AppRoutes, StackNavigationProps } from '../Navigation/Navigation';

const Home = ({ navigation }: StackNavigationProps<AppRoutes, 'GameScreen'>) => {
  const onHomeScreenPress = () => {
    navigation.navigate('GameScreen')
  }

  return (
    <View>
      <Button onPress={onHomeScreenPress}>
        Game Screen
      </Button>
      <Text>Test from the home screen</Text>
    </View>
  )
}

export default Home;
