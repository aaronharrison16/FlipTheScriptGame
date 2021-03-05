import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

interface GameCardProps {
  name: string;
  itemKey: string;
  onPress: (itemKey: string) => void;
  selected: boolean;
}

export const MARGIN = 5
export const CARD_HEIGHT = 120

const GameCard = ({ name, itemKey, onPress, selected }: GameCardProps) => {
  const selectionStyle = selected ? styles.selected : styles.notSelected

  const onCardPress = () => {
    onPress(itemKey)
  }

  return (
    <TouchableOpacity onPress={onCardPress}>
      <View style={[styles.card, selectionStyle]}>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2dcde',
    flex: 1,
    margin: MARGIN,
    height: CARD_HEIGHT,
    width: CARD_HEIGHT,
    borderWidth: 3,
    borderRadius: 25
  },
  selected: {
    borderColor: 'green'
  },
  notSelected: {
    borderColor: '#e2dcde'
  }
})

export default GameCard;
