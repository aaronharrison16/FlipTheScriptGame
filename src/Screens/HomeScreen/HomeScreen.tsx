import React, { useEffect } from 'react'
import { View, StyleSheet, Image, PermissionsAndroid } from 'react-native';
import { Button } from '../../Components';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';

const teamList = [
  {
    teamName: 'Team 1',
  },
  {
    teamName: 'Team 2',
  },
];

const gameSettings = {
  scoreLimit: 7,
  timeLimit: 15,
  teamList,
};


const HomeScreen = ({ navigation }: StackNavigationProps<AppRoutes, 'HomeScreen'>) => {
  const onPlayPress = () => {
    navigation.navigate('GameSelectScreen', { gameSettings });
  }
  const onHowToPress = () => {
    navigation.navigate('HowToScreen')
  }

  useEffect(() => {
    PermissionsAndroid.request('android.permission.RECORD_AUDIO')
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
        
      </View>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'space-around' }}>
        <Button onPress={onPlayPress}>
          Play
        </Button>
        <Button onPress={onHowToPress}>
          How to play *TODO*
        </Button>
        <Button onPress={onHowToPress}>
          About... Maybe?
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 400,
    height: 200
  },
})

export default HomeScreen;
