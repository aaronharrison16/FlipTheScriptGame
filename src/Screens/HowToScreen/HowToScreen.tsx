import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableNativeFeedback, Image } from 'react-native';
import Animated, { Easing, Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';
import Icon from 'react-native-vector-icons/Feather';

const slides=[
  {
    title: 'Manage Files',
    content: 'Our service was designed to give you the full flexibility when it comes to managing the files',
    image: ''
  },
  {
    title: 'Store in Cloud',
    content: 'You can just store all your files in our cloud and you will be able to access them on any device',
    image: ''
  },
  {
    title: 'Collaborations',
    content: 'You can collaborate and make changes with your entire team to any files that you have on the cloud',
    image: ''
  },
]

const HowToScreen = ({ navigation }: StackNavigationProps<AppRoutes, 'HowToScreen'>) => {
  const { colors } = useTheme();
  const slideIndex = useSharedValue(0)

  const onNext = () => {
    if (slideIndex.value === slides.length - 1) {
      navigation.pop()   
      return
    }

    slideIndex.value = withTiming(slideIndex.value + 1,
      {
        duration: 200,
        easing: Easing.linear
      }
    )    
  }

  const carouselItemAnimation = (index: number) => useAnimatedStyle(() => ({
    opacity: interpolate(slideIndex.value, [index - 1, index, index + 1], [0,1,0], Extrapolate.CLAMP)
  }))
  const carouselContentAnimation = (index: number) => useAnimatedStyle(() => ({
    opacity: interpolate(slideIndex.value, [index - 1, index, index + 1], [0,1,0], Extrapolate.CLAMP),
    transform: [{translateX: interpolate(slideIndex.value, [index - 1, index, index + 1], [70,0,-70], Extrapolate.CLAMP)}]
  }))

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://pngset.com/images/utah-jazz-logo-2019-label-text-sticker-symbol-transparent-png-668921.png',
          }}
        />
        {/* <Image
          source={{
            uri: 'https://pngset.com/images/utah-jazz-logo-2019-label-text-sticker-symbol-transparent-png-668921.png',
          }}
        /> */}
      </View>
      <View style={{ flex: 1, padding: 24 }}>
        <View style={[styles.card, { borderColor: colors.border, }]}>
          <View style={{flex: 1, alignItems: 'center'}}>
            {
              slides.map((slide, i) => (
                <Animated.View style={[{position: 'absolute', flex: 1}, carouselContentAnimation(i)]} key={`slide_item_${i}`}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>{ slide.title }</Text>
                  </View>
                  <View style={styles.contentContainer}>
                    <Text style={{ textAlign: 'center', lineHeight: 22 }}>{ slide.content }</Text>
                  </View>
                </Animated.View>
              ))
            }
          </View>
          
          <View style={styles.carouselContainer}>
            {
              slides.map((_, i) => (
                <View
                  style={[styles.carouselItem, { backgroundColor: colors.border }]}
                  key={`carousel_item_${i}`}
                >
                  <Animated.View
                    style={[{flex: 1, borderRadius: 100, backgroundColor: colors.primary }, carouselItemAnimation(i)  ]}
                  />
                </View>
              ))
            }
            <View style={{ marginHorizontal: 8 }}>
              <TouchableNativeFeedback onPress={onNext} >
                <Icon 
                  color={colors.primary}
                  name='arrow-right' 
                  size={26}
                />
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 400,
    height: 200
  },
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 28,
    padding: 24,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    padding: 24,
    maxWidth: 300,
    textAlign: 'center' 
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  carouselItem: {
    height: 16,
    width: 16,
    borderRadius: 100,
    marginHorizontal: 8,
    position: 'relative'
  }
})

export default HowToScreen;
