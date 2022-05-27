import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { Button } from '../../Components';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';

const HomeScreen = ({ navigation }: StackNavigationProps<AppRoutes, 'HomeScreen'>) => {
  const onPlayPress = () => {
    navigation.navigate('GameSettingsScreen');
  }
  const onHowToPress = () => {
    navigation.navigate('HowToScreen')
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://pngset.com/images/utah-jazz-logo-2019-label-text-sticker-symbol-transparent-png-668921.png',
          }}
        />
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
