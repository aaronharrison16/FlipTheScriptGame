import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Button } from '../components';
import { AppRoutes, StackNavigationProps } from '../Navigation/Navigation';

const Home = ({ navigation }: StackNavigationProps<AppRoutes, 'GameScreen'>) => {
  const onHomeScreenPress = () => {
    navigation.navigate('GameScreen')
  }

  return (
    <View style={styles.container}>
      <Button onPress={onHomeScreenPress}>
        Game Screen
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Home;
