import React from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface GameCardProps {
  name: string;
  itemKey: string;
  onPress: (itemKey: string) => void;
  selected: boolean;
}

export const MARGIN = 5
export const CARD_HEIGHT = 120

const GameCard = ({ name, itemKey, onPress, selected }: GameCardProps) => {
  const { colors } = useTheme();
  const borderColor = selected ? colors.notification : colors.card
  
  const onCardPress = () => {
    onPress(itemKey)
  }

  return (
    <TouchableOpacity onPress={onCardPress}>
      <View style={[styles.card, {borderColor, backgroundColor: colors.card}]}>
        <View style={[styles.cardImage, {backgroundColor: colors.primary}]} />
        <Text style={{ color: colors.text }}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardTouchContainer: {
    height: CARD_HEIGHT,
    width: CARD_HEIGHT,
    borderRadius: 25,
    overflow: 'hidden'
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: MARGIN,
    height: CARD_HEIGHT,
    width: CARD_HEIGHT,
    borderWidth: 3,
    borderRadius: 25,
    overflow: 'hidden'
  },
  cardImage: {
    height: 60,
    width: 60,
    marginBottom: 5,
    borderRadius: 90,
  }
})

export default GameCard;
