import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  NativeModules,
  View,
  Text,
} from 'react-native';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';
import { useTheme } from '@react-navigation/native';
import { RecordButton, TurnStart } from '.';
import Metrics from '../../Themes/Metrics';
import { Button } from '../../Components';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { ReverseAudioModule } = NativeModules;

const GameScreen = ({ route }: StackNavigationProps<AppRoutes, 'GameScreen'>) => {
  const teamNameValue = useSharedValue(75)
  const { colors } = useTheme();
  const [screenState, setScreenState] = useState('start')
  const [audioFilePath, setAudioFilePath] = useState('')
  const gameSettings = route.params.gameSettings
  const teamList = gameSettings.teamList
  const [wordLibrary, setWordLibrary] = useState([...gameSettings.gameMode.gameModeList])
  const [turnWord, setTurnWord] = useState("")
  const [activeTeamIndex, setActiveTeamIndex] = useState(Math.floor(Math.random()*teamList.length))
  
  useEffect(() => {
    onChangeWord()
  }, [])

  const onChangeWord = () => {
    const remainingWords = [...wordLibrary]
    setTurnWord(remainingWords.splice(Math.floor(Math.random()*wordLibrary.length), 1)[0])
    setWordLibrary(remainingWords)
  }

  const temp = () => {
    teamNameValue.value = withSpring(10)
  }

  const onFinishRecord = () => {

  }

  const onPlayRecording = async () => {
    ReverseAudioModule.reverseAudioRecordingEvent(audioFilePath);
  }

  const onScore = () => {
    teamList[activeTeamIndex].score += 1
    endTurn()
  }

  const onNoScore = () => {
    endTurn()
  }

  const endTurn = () => {
    const activeTeam = teamList[activeTeamIndex]
    if (activeTeam.score === gameSettings.scoreLimit) {
      console.log("winner winner chicken dinner")
      return
      // todo have this be its own congrats screen with a random message from an array
    }
    var newIndex = activeTeamIndex + 1
    
    if (activeTeamIndex + 1 === teamList.length) {
      newIndex = 0
    }
    
    setActiveTeamIndex(newIndex)
    onChangeWord()
  }

  const teamNameAnimation = useAnimatedStyle(() => ({
    top: teamNameValue.value,
    fontSize: interpolate(teamNameValue.value, [75,10], [100, 75], Extrapolate.CLAMP)
  }))

  const passTextAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(teamNameValue.value, [75, 35], [1,0], Extrapolate.CLAMP)
  }))

  return (
    <>
      <StatusBar backgroundColor={teamList[activeTeamIndex].teamColor} barStyle="dark-content" />
      <View style={{flex: 1, alignItems: 'center', backgroundColor: teamList[activeTeamIndex].teamColor}}>
        <Animated.View style={[{ position: 'absolute', top: 75}, passTextAnimation]}>
          <Text>Pass the phone to someone on...</Text>
        </Animated.View>
        <Animated.Text style={[{ fontWeight: '600', position: 'absolute' }, teamNameAnimation]}>
          {teamList[activeTeamIndex].teamName}
        </Animated.Text>
        <View style={{position: 'absolute', bottom: 16}}>
          <Button onPress={temp}>temp</Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'green'
  }
});

export default GameScreen;
