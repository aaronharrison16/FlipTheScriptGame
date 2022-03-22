import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const TurnTimer = () => {

  return (
    <View>
      <Text style={{color: 'white', fontSize: 24}}>3... 2... 1...</Text>
    </View>
  )
}

export default TurnTimer
