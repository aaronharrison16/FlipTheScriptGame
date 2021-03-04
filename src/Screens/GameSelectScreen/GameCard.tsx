import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface GameModeListItemProps {
  name: string;
  onPress: () => void;
  index: number;
}

const { width, height } = Dimensions.get('window')
export const MARGIN = 10
export const CARD_HEIGHT = 200

const GameCard = ({ name, onPress, index }: GameModeListItemProps) => {
  return (
    <View style={[styles.card]}>
      <Text>{name}</Text>
    </View>
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
