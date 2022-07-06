import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Button } from '../../Components'

interface TurnActiveProps {
  word: string,
  onRecord: () => void,
  onStopRecord: () => void,
  onPlayRecord: () => void,
}

const TurnActive = ({word, onRecord, onStopRecord, onPlayRecord}: TurnActiveProps) => {
  const [recordState, setRecordState] = useState('before')
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
    onStopRecord()
    setRecordState('after')
  }

  const record = () => {
    onRecord()
    setRecordState('during')
  }

  const introAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(shared.value, [1,2], [0,1], Extrapolate.CLAMP)
  }))

  const wordAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(shared.value, [2,3], [0,1], Extrapolate.CLAMP)
  }))

  return (
    <View style={{flex: 1}}>
      <View style={{ height: 100}}>

      </View>

      <View style={{flex: 1,  alignItems: 'center'}}>
        <View style={{alignItems: 'center', flex: 2, justifyContent: 'space-around'}}>
          <Animated.Text style={[{ color: 'white', fontSize: 24 }, introAnimation]}>
            Your script is...
          </Animated.Text>
          <Animated.Text style={[{ color: 'white', fontSize: 70, textAlign: 'center' }, wordAnimation]}>
            {word}
          </Animated.Text>
        </View>

        <View style={{ flex: 2 }}>
          { recordState !== 'after' ? (
            <View>
              { recordState === 'during' ? (
                <Button onPress={stopRecord}>Stop Recording</Button>
                ) : (
                <Button onPress={record}>Start Recording</Button>
              )}
            </View>
          ) : (
            <Button onPress={onPlayRecord}>Play Recording</Button>
          )}
        </View>
      </View>
    </View>
  )
}

export default TurnActive
