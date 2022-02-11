import React, { useRef, useState } from "react"
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { TouchableNativeFeedback } from "react-native-gesture-handler"
import Animated, { cancelAnimation, Easing, Extrapolate, interpolate, useAnimatedProps, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated"
import { Svg, Path, G, Mask, Circle } from 'react-native-svg'

interface RecordButtonProps {
  onStartRecording: () => void;
  onStopRecording:  () => void;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const vWidth = 75
const vHeight = 75
const playPath = 'M0 0L75 37.5L0 75V0Z'
const stopPath = 'M0 0H75V75H0V0Z'

const RecordButton = ({ onStartRecording, onStopRecording }: RecordButtonProps) => {
  const progress = useSharedValue(0)
  const [recording, setIsRecording] = useState(false)

  const onRecordPress = () => {
    if (recording) {
      cancelAnimation(progress)
      onStopRecording()
    } else {
      startAnimation()
      onStartRecording()
      setIsRecording(true)
    }
    
  }

  const startAnimation = () => {
    console.log('start animation')
    const timingConfig = {
      duration: 750,
      easing: Easing.linear
    }

    progress.value = withRepeat(
      withTiming(1, timingConfig),
      -1,
      true
    )
  }

  const circleOneProps = useAnimatedProps(() => ({
    fillOpacity: interpolate(progress.value, [0,1], [0.4, 0.6], Extrapolate.CLAMP),
    r: interpolate(progress.value, [0,1], [40, 45], Extrapolate.CLAMP),
  }))

  return (
    <View style={{borderRadius: 12, overflow: 'hidden'}}>
    <TouchableNativeFeedback onPress={onRecordPress}>
      <View style={styles.recordBtn}>
        <View style={{ height: 33, width: 33, marginRight: 5 }}>
          <Svg viewBox="0 0 100 100">
            <AnimatedCircle
              animatedProps={circleOneProps}
              cx="50"
              cy="50"
              fill="#F50C0C"
            />
            <Circle cx="50" cy="50" r="38" fill="#F50C0C" />
          </Svg>
        </View>
          <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
      </View>
    </TouchableNativeFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  toggleBtn: {
    padding: 8,
    position: 'relative',
    height: 75,
    width: 75
  },
  toggleContent: {
    position: 'absolute'
  },
  recordBtn: {
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(255,80,80)',
    width: 180
  }
});

export default RecordButton
