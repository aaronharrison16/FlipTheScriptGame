import React, { useEffect, useState } from 'react'
import { Dimensions, View, TouchableWithoutFeedback, Text } from 'react-native';
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Button } from './Button';

interface ButtonProps {
  onScore: (buttonType: string) => void,
  animationEnd: () => void,
  buttonType?: "success" | "error",
}

const successMessages = [
  "Way to go!",
  "You did it!"
]

const errorMessages = [
  "You Suck!",
  "Better luck next time"
]

const { height, width } = Dimensions.get('window')
const initialDimensions = 82
const initialRadius = initialDimensions / 2
const offScreenOffset = 30

const marginX1 = (width * .2) - (initialDimensions / 2)
const marginX2 = (width * .8) - (initialDimensions / 2)
const bottom = (height * .2) - (initialDimensions / 2)
const top = (height * .8) - (initialDimensions / 2)

const TurnEndButton = ({ onScore, buttonType = "success", animationEnd }: ButtonProps) => {
  const backgroundColor = buttonType === 'success' ? '#5BBA6F' : '#F95738'
  const right = buttonType === 'success' ? marginX1 : marginX2
  const left = buttonType === 'success' ? marginX2 : marginX1
  const startingLeft = buttonType === 'success' ? width + offScreenOffset : - left * 2 - offScreenOffset
  const startingRight = buttonType === 'success' ? - right * 2 - offScreenOffset : width + offScreenOffset
  const endingRight = buttonType === 'success' ? -width : width
  const endingLeft = buttonType === 'success' ? width : -width
  const [zIndex, setZIndex] = useState(0)
  const shared = useSharedValue(0)

  useEffect(() => {
    shared.value = withTiming(
      1,
      {
        duration: 400,
      },
    )
  }, [])

  const onButtonPress = () => {
    if (shared.value <= 1) {
      setZIndex(998)
      shared.value = withTiming(
        2,
        {
          duration: 100,
        },
      )
      setTimeout(() => {
        onScore(buttonType)
      }, 500);
    }
  }

  const onDismiss = () => {
    shared.value = withTiming(
      3,
      {
        duration: 250,
      },
    )
    setTimeout(() => {
      animationEnd()
    }, 250);
  }

  const getMessage = () => {
    if (buttonType === 'success') {
      return successMessages[Math.floor(Math.random()*successMessages.length)]
    }

    return errorMessages[Math.floor(Math.random()*errorMessages.length)]
  }

  const buttonAnimation = useAnimatedStyle(() => ({
    right: interpolate(shared.value, [0, 1, 2, 3], [startingRight, right, 0, endingRight], Extrapolate.CLAMP),
    left: interpolate(shared.value, [0, 1, 2, 3], [startingLeft, left, 0, endingLeft], Extrapolate.CLAMP),
    top: interpolate(shared.value, [1, 2], [top, 0], Extrapolate.CLAMP),
    bottom: interpolate(shared.value, [1, 2], [bottom, 0], Extrapolate.CLAMP),
    borderRadius: interpolate(shared.value, [1, 2], [initialRadius, 0], Extrapolate.CLAMP),
  }))

  return (
    <TouchableWithoutFeedback onPress={onButtonPress}>
      <Animated.View style={[{ backgroundColor, position: 'absolute', zIndex, justifyContent: 'center', alignItems: 'center' }, buttonAnimation]}>
        {
          
          shared.value >= 1 && (
            <>
              <Text>{getMessage()}</Text>
              <Button onPress={onDismiss}>Dismiss</Button>
            </>
          )
        }
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export { TurnEndButton };
