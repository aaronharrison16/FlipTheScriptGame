import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Button } from '../../Components'
import { Team } from '../GameSettingsScreen'

interface TurnStartProps {
  team: Team,
  setScreenStep: () => void,
  screenStep: number
}

const endMarginTop = 10
const startMarginTop = Dimensions.get('window').height / 3

const TurnStart = ({ team, screenStep, setScreenStep }: TurnStartProps) => {
  const shared = useSharedValue(startMarginTop)

  const onStartPress = () => {
    shared.value = withSpring(
      endMarginTop,
      {
        stiffness: 90
      },
    )
    setScreenStep()
  }

  const nameContainerAnimation = useAnimatedStyle(() => ({
    top: shared.value
  }))

  const teamNameAnimation = useAnimatedStyle(() => ({
    fontSize: interpolate(shared.value, [startMarginTop, endMarginTop], [90, 70], Extrapolate.CLAMP)
  }))

  const passTextAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(shared.value, [startMarginTop, endMarginTop / 2], [1,0], Extrapolate.CLAMP)
  }))

  return (
    <View style={styles.turnStartContainer}>
      <Animated.View style={[{position: 'absolute', top: startMarginTop - 30}, passTextAnimation]}>
        <Animated.Text style={{ fontSize: 24, color: 'white' }}>
          Pass the phone to someone on...
        </Animated.Text>
      </Animated.View>

      <Animated.View style={[{ position: 'absolute' }, nameContainerAnimation]}>
        <Animated.Text style={[{ fontWeight: '600', color: 'white' }, teamNameAnimation]}>
          {team.teamName}
        </Animated.Text>
      </Animated.View>

      {screenStep === 1 && 
        <Animated.View style={[{position: 'absolute', top: startMarginTop + 150}, passTextAnimation]}>
          <Button onPress={onStartPress}>Start Turn</Button>
        </Animated.View>
      }
    </View>
  )
}

export default TurnStart

const styles = StyleSheet.create({
  turnStartContainer: {
    alignItems: 'center'
  },
})
