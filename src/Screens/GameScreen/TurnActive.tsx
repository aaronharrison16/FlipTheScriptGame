import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { TurnTimer } from '.'

interface TurnActiveProps {
  word: string
}

const TurnActive = ({word}: TurnActiveProps) => {
  const shared = useSharedValue(0)

  useEffect(() => {
    shared.value = withTiming(4,
      {
        duration: 4000,
        easing: Easing.linear
      }
    )
  }, [])

  const introAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(shared.value, [1,2], [0,1], Extrapolate.CLAMP)
  }))

  const wordAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(shared.value, [2,3], [0,1], Extrapolate.CLAMP)
  }))

  const timerAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(shared.value, [3,4], [0,1], Extrapolate.CLAMP)
  }))

  return (
    <View style={{flex: 1}}>
      <View style={{ height: 100}}>

      </View>
      <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <Animated.Text style={[{ color: 'white', fontSize: 24 }, introAnimation]}>
            Your script is...
          </Animated.Text>
          <Animated.Text style={[{ color: 'white', fontSize: 70, textAlign: 'center' }, wordAnimation]}>
            {word}
          </Animated.Text>
        </View>
        <Animated.View style={[{alignItems: 'center'}, timerAnimation]}>
          <Text style={{color: 'white', fontSize: 24}}>Say it backwards in...</Text>
        </Animated.View>
        <View style={{ position: 'relative', backgroundColor: 'red'}}>
          {/* <View style={{ position: 'absolute' }}>
            <Text style={{color: 'white', fontSize: 48}}>3</Text>
          </View>
          <View style={{ position: 'absolute' }}>
            <Text style={{color: 'white', fontSize: 24}}>2</Text>
          </View>
          <View style={{ position: 'absolute' }}>
            <Text style={{color: 'white', fontSize: 24}}>1</Text>
          </View> */}
        </View>
      </View>
    </View>
  )
}

export default TurnActive
