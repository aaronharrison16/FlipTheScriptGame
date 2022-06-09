import React, { useState } from 'react'
import { Dimensions, View, TouchableWithoutFeedback, Text } from 'react-native';
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

interface ButtonProps {
  animationEnd: () => void,
  buttonType?: "success" | "error"
}

const { height, width } = Dimensions.get('window')
const initialDimensions = 82
const initialRadius = initialDimensions / 2

const marginX1 = (width * .2) - (initialDimensions / 2)
const marginX2 = (width * .8) - (initialDimensions / 2)
const bottom = (height * .2) - (initialDimensions / 2)
const top = (height * .8) - (initialDimensions / 2)

const TurnEndButton = ({ animationEnd, buttonType = "success" }: ButtonProps) => {
  const backgroundColor = buttonType === 'success' ? '#5BBA6F' : '#F95738'
  const right = buttonType === 'success' ? marginX1 : marginX2
  const left = buttonType === 'success' ? marginX2 : marginX1
  const [zIndex, setZIndex] = useState(1)
  const shared = useSharedValue(top)

  const onButtonPress = () => {
    setZIndex(999)
    shared.value = withTiming(
      0,
      {
        duration: 100,
      },
    )
    setTimeout(() => {
      animationEnd()
    }, 500);
  }

  const buttonAnimation = useAnimatedStyle(() => ({
    right: interpolate(shared.value, [top, 0], [right, 0], Extrapolate.CLAMP),
    left: interpolate(shared.value, [top, 0], [left, 0], Extrapolate.CLAMP),
    top: interpolate(shared.value, [top, 0], [top, 0], Extrapolate.CLAMP),
    bottom: interpolate(shared.value, [top, 0], [bottom, 0], Extrapolate.CLAMP),
    borderRadius: interpolate(shared.value, [top, 0], [initialRadius, 0], Extrapolate.CLAMP),
  }))

  return (
    <TouchableWithoutFeedback onPress={onButtonPress}>
      <Animated.View style={[{ backgroundColor, position: 'absolute', zIndex }, buttonAnimation]}>

      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export { TurnEndButton };
