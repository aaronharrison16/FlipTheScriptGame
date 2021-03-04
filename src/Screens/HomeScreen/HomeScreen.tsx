import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Button } from '../../Components';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';

const HomeScreen = ({ navigation }: StackNavigationProps<AppRoutes, 'HomeScreen'>) => {
  const onPlayPress = () => {
    navigation.navigate('GameSelectScreen')
  }

  return (
    <View style={styles.container}>
      <Button onPress={onPlayPress}>
        Play
      </Button>
      <Button onPress={() => {}}>
        How to play *TODO*
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default HomeScreen;
