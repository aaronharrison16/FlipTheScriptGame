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
import { Scoreboard } from '.';
import { Button, RecordButton } from '../../Components';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';

const { ReverseAudioModule } = NativeModules;

const GameScreen = ({ route }: StackNavigationProps<AppRoutes, 'GameScreen'>) => {
  const [audioFilePath, setAudioFilePath] = useState('')
  const gameSettings = route.params.gameSettings
  const wordLibrary = gameSettings.gameMode.gameModeList
  const teamList = gameSettings.teamList
  const [turnWord, setTurnWord] = useState(wordLibrary.splice(Math.floor(Math.random()*wordLibrary.length), 1))
  const [activeTeam, setActiveTeam] = useState(teamList[Math.floor(Math.random()*teamList.length)])
  
  useEffect(() => {
    console.log(wordLibrary)
    console.log(teamList)
    PermissionsAndroid.request('android.permission.RECORD_AUDIO')
  }, [])

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
  }

  const onStopRecording = async () => {
    const audioFile = await AudioRecord.stop();
    setAudioFilePath(audioFile)
  }

  const onPlayRecording = async () => {
    ReverseAudioModule.reverseAudioRecordingEvent(audioFilePath);
  }

  const onScore = () => {
    const team = teamList.find((el) => (el.teamName === activeTeam.teamName))
    console.log(team)
    team.score = team.score + 1
  }

  const onNoScore = () => {

  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Scoreboard teams={teamList} />
      <SafeAreaView style={styles.container}>
        <Text>{ activeTeam.teamName }'s turn</Text>
        <Text>{ turnWord }</Text>
        <RecordButton
          onPressIn={onStartRecording}
          onPressOut={onStopRecording}
        />
        <Button onPress={onPlayRecording}>Play Recording</Button>
        <Button onPress={onNoScore}>No Score</Button>
        <Button onPress={onScore}>Score!</Button>
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
