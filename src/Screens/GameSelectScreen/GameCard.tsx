import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

interface GameCardProps {
  name: string;
  onPress: () => void;
}

export const MARGIN = 10
export const CARD_HEIGHT = 200

const GameCard = ({ name, onPress }: GameCardProps) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.card]}>
        <Text>{name}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    height: CARD_HEIGHT,
    width: '75%',
    margin: MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2dcde',
    borderRadius: 5,
    borderWidth: 1
  }
})

export default GameCard;
