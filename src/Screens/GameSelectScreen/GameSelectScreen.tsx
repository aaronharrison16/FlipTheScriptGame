import React from 'react';
import {  Dimensions, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { add, Extrapolate, interpolate } from 'react-native-reanimated';
import { usePanGestureHandler, withDecay, diffClamp } from  'react-native-redash/lib/module/v1';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';
import GameCard, { CARD_HEIGHT, MARGIN } from './GameCard';

const DATA = [
  {
    name: 'Movies',
    key: 'Movies',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'States',
    key: 'States',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Countrys',
    key: 'Countrys',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Sports',
    key: 'Sports',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Other',
    key: 'Other',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Another',
    key: 'Another',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Test',
    key: 'Test',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Here',
    key: 'Here',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
]

const { height } = Dimensions.get('window');
const HEIGHT = CARD_HEIGHT + MARGIN * 2

const GameSelectScreen = ({ navigation }: StackNavigationProps<AppRoutes, 'GameSelectScreen'>) => {
  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
  const visibleCards = Math.floor(height / HEIGHT)
  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state
    }),
    - DATA.length * HEIGHT + visibleCards * HEIGHT,
    0
  );

  const onGameCardPress = (gameMode: object) => {
    console.log(gameMode)
    navigation.navigate('GameSettingsScreen')
  }

  return (
    <View style={ styles.container }>
      <PanGestureHandler { ...gestureHandler }>
        <Animated.View>
          { DATA.map((gameMode, i) => {
            const positionY = add(y, i * HEIGHT)
            const isDisappearing = -HEIGHT
            const isOnTop = 0
            const isOnBottom = (visibleCards - 1) * HEIGHT
            const isAppearing = visibleCards * HEIGHT
            const extraTranslation = interpolate(positionY, {
              inputRange: [isOnBottom, isAppearing],
              outputRange: [0, -HEIGHT / 4],
              extrapolate: Extrapolate.CLAMP
            });
            const translateY = add(interpolate(y, {
              inputRange: [-HEIGHT * i, 0],
              outputRange: [-HEIGHT * i, 0],
              extrapolate: Extrapolate.CLAMP
            }), extraTranslation);
            const scale = interpolate(positionY, {
              inputRange: [isDisappearing, isOnTop, isOnBottom, isAppearing],
              outputRange: [0.6, 1, 1, 0.6],
              extrapolate: Extrapolate.CLAMP
            })
            const opacity = interpolate(positionY, {
              inputRange: [isDisappearing, isOnTop, isOnBottom, isAppearing],
              outputRange: [0, 1, 1, 0.5],
            })
              return (
                <Animated.View
                  style={{ opacity, transform: [{ translateY }, { scale }] }}
                  key={i}  
                >
                  <GameCard
                    name={gameMode.name}
                    onPress={() => onGameCardPress(gameMode)}
                  />
                </Animated.View>
              )
            })
          }
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default GameSelectScreen;
