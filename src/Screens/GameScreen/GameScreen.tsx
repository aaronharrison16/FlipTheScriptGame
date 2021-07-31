import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  PermissionsAndroid,
  NativeModules,
  Text,
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import Scoreboard from './Scoreboard';
import { Button } from '../../Components';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';
import { useTheme } from '@react-navigation/native';

const { ReverseAudioModule } = NativeModules;

const GameScreen = ({ route }: StackNavigationProps<AppRoutes, 'GameScreen'>) => {
  const { colors } = useTheme();


  const [audioFilePath, setAudioFilePath] = useState('')
  const gameSettings = route.params.gameSettings
  const teamList = gameSettings.teamList
  const [wordLibrary, setWordLibrary] = useState([...gameSettings.gameMode.gameModeList])
  const [turnWord, setTurnWord] = useState("")
  const [activeTeamIndex, setActiveTeamIndex] = useState(Math.floor(Math.random()*teamList.length))
  const [isRecorded, setIsRecorded] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  
  useEffect(() => {
    onChangeWord()
    PermissionsAndroid.request('android.permission.RECORD_AUDIO')
  }, [])

  const onChangeWord = () => {
    const remainingWords = [...wordLibrary]
    setTurnWord(remainingWords.splice(Math.floor(Math.random()*wordLibrary.length), 1)[0])
    setWordLibrary(remainingWords)
  }

  const onStartRecording = () => {
    const options = {
      sampleRate: 44100,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: 'flipTheScript.wav'
    }
    AudioRecord.init(options);
    AudioRecord.start();
    setIsRecording(true)
  }

  const onStopRecording = async () => {
    const audioFile = await AudioRecord.stop();
    setAudioFilePath(audioFile)
    setIsRecorded(true)
    setIsRecording(false)
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
    
    setIsRecorded(false)
    setActiveTeamIndex(newIndex)
    onChangeWord()
  }

  const RecordButton = () => {
    if (isRecording) {
      return <Button onPress={onStopRecording}>Stop Recording</Button>
    } else {
      return <Button style={{ backgroundColor: colors.primary }} onPress={onStartRecording}>Start Recording</Button>  
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Scoreboard teams={teamList} />
      <SafeAreaView style={styles.container}>
        <Text>{ teamList[activeTeamIndex].teamName }'s turn</Text>
        <Text style={{ fontSize: 50}}>{ turnWord }</Text>
        {
          !isRecorded ? (
            <RecordButton />
          ) : (
            <>
              <Button style={{ backgroundColor: colors.primary }}  onPress={onPlayRecording}>Play Recording</Button>
              <Button onPress={onNoScore}>No Score</Button>
              <Button style={{ backgroundColor: colors.primary }} onPress={onScore}>Score!</Button>
            </>
          )
        }        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

export default GameScreen;
