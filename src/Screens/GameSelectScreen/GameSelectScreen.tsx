import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View, Text } from 'react-native';
import { Button } from '../../Components';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';
import GameCard, { CARD_HEIGHT, MARGIN } from './GameCard';
import firestore from '@react-native-firebase/firestore';

const DATA = [
  {
    name: 'Movies',
    key: 'Movies',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo',
      'A Quiet Place',
      'Zoolander',
      'The Other Guys',
      'Harry Potter',
      'The Tommorow War',
      'Cruella Deville',
      'Hacksaw Ridge',
      'A Land Before Time',
      'Pirates of the Caribbean',
      'The Lord of the Rings',
      'Star Wars',
      'Bonnie and Clyde',
      'Airplane',
      'Rocky',
      'Braveheart',
      'Slumdog Millionaire',
      'Beauty and the Beast',
      'Inception',
      'Die Hard',
      'Wall-E',
      'Ghostbusters',
      'The Wizard of Oz',
      'The Shawshank Redemption',
      'Back to the Future'
    ]
  },
  {
    name: 'States',
    key: 'States',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo',
      'A Quiet Place',
      'Zoolander',
      'The Other Guys',
      'Harry Potter',
      'The Tommorow War',
      'Cruella Deville',
      'Hacksaw Ridge',
      'A Land Before Time',
      'Pirates of the Caribbean',
      'The Lord of the Rings',
      'Star Wars'
    ]
  },
  {
    name: 'Countrys',
    key: 'Countrys',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Sports',
    key: 'Sports',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Other',
    key: 'Other',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Another',
    key: 'Another',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Test',
    key: 'Test',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
  {
    name: 'Here',
    key: 'Here',
    gameModeList: [
      'Inception',
      'Up',
      'Scooby Doo'
    ]
  },
]

interface Game {
  name: string;
  key: string;
  empty?: boolean;
  gameModeList?: string[];
}

const { width } = Dimensions.get('window')

const formatData = (data: Game[], numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns)
  var numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns)

  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ name: "", key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data
}

const GameSelectScreen = ({ navigation, route }: StackNavigationProps<AppRoutes, 'GameSelectScreen'>) => {
  const { colors } = useTheme();
  const [selectedGame, setSelectedGame] = useState('')
  const numColumns = 3

  useEffect(() => {
    firestore().collection('game_modes').get()
      .then((res) => console.log(res))
  }, [])

  const onGameCardPress = (itemKey: string) => {
    setSelectedGame(itemKey)
  }

  const onPlayPress = () => {
    const gameMode = DATA.find(element => element.key === selectedGame)
    var gameSettings = {...route.params.gameSettings, gameMode}
    navigation.navigate('GameScreen', { gameSettings })
  }

  const Header = () => (
    <View style={styles.headerContainer}>
      <Text style={{ color: colors.text }}>TODO - Select game copy</Text>
      <Text style={{ color: colors.text }}>TODO - Select game subcopy</Text>
    </View>
  )

  const Footer = () => (
    <View style={styles.footerContainer} >
      <Button onPress={onPlayPress}>Todo - play game</Button>
    </View>
  )

  const Item = ({ item }: { item: Game }) => {
    const isSelected = selectedGame === item.key ? true : false
    if (item.empty) {
      return (
        <View style={styles.empty} />
      )
    } else {
      return (
        <GameCard
          name={item.name}
          itemKey={item.key}
          onPress={onGameCardPress}
          selected={isSelected}
        />
      )
    }
  }

  return (
    <FlatList
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      numColumns={numColumns}
      data={formatData(DATA, numColumns)}
      renderItem={Item}
      style={{ width }}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    height: 160,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerContainer: {
    height: 150,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  empty: {
    height: CARD_HEIGHT,
    width: CARD_HEIGHT,
    margin: MARGIN
  }
})

export default GameSelectScreen;
