import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import AudioRecord from 'react-native-audio-record'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { TurnTimer } from '.'
import { Button, TurnEndButton } from '../../Components'

interface TurnActiveProps {
  word: string,
  onRecord: () => void,
  onStopRecord: () => void,
  onPlayRecord: () => void,
  onWrongAnswer: () => void,
  onRightAnswer: () => void,
}

const TurnActive = ({word, onRecord, onStopRecord, onPlayRecord, onRightAnswer, onWrongAnswer}: TurnActiveProps) => {
  const [recordState, setRecordState] = useState('before')
  const [scoreType, setScoreType] = useState('')
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
    setTimeout(() => {
      
    }, 700);
  }

  const record = () => {
    onRecord()
    setRecordState('during')
  }

  const onScore = (buttonType: string) => {
    setScoreType(buttonType)
    if (buttonType === 'success') {
      onRightAnswer()
    } else {
      onWrongAnswer()
    }
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
    <>
      {
        (recordState === 'after' && scoreType !== 'error') && (
          <TurnEndButton
            animationEnd={onRightAnswer}
            onScore={onScore}
          />
        )
      }

      {
        (recordState === 'after' && scoreType !== 'success') && (
          <TurnEndButton
            buttonType='error'
            animationEnd={onWrongAnswer}
            onScore={onScore}
          />
        )
      }
     
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
          {/* <Animated.View style={[{alignItems: 'center'}, timerAnimation]}>
            <Text style={{color: 'white', fontSize: 24}}>Say it backwards in...</Text>
          </Animated.View> */}
          { recordState !== 'after' && (
            <View>
              { recordState === 'during' ? (
                <Button onPress={stopRecord}>Stop Recording</Button>
                ) : (
                <Button onPress={record}>Start Recording</Button>
              )}
            </View>
          )}
        </View>
      </View>
    </>
  )
}

export default TurnActive
