import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import AudioRecord from 'react-native-audio-record'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { TurnTimer } from '.'
import { Button } from '../../Components'

interface TurnActiveProps {
  word: string,
  onRecord: () => void,
  onStopRecord: (turnState: string) => void
}

const TurnActive = ({word, onRecord, onStopRecord}: TurnActiveProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const shared = useSharedValue(0)

  useEffect(() => {
    shared.value = withTiming(4,
      {
        duration: 4000,
        easing: Easing.linear
      }
    )
  }, [])

  const stopRecord = () => {
    onStopRecord("end")
  }

  const record = () => {
    onRecord()
    setIsRecording(true)
  }

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
        <View>
          { isRecording ? (
            <Button onPress={stopRecord}>Stop Recording</Button>
            ) : (
            <Button onPress={record}>Start Recording</Button>
          )}
        </View>
      </View>
    </View>
  )
}

export default TurnActive
