import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  NativeModules,
  View,
} from 'react-native';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';
import { TurnActive, TurnStart } from '.';
import AudioRecord from 'react-native-audio-record';

const { ReverseAudioModule } = NativeModules;

const GameScreen = ({ route }: StackNavigationProps<AppRoutes, 'GameScreen'>) => {
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

  const onFinishRecord = async () => {
    const audioFile = await AudioRecord.stop();
    setAudioFilePath(audioFile)
  }

  const onPlayRecording = async () => {
    const audioFile = await AudioRecord.stop();
    ReverseAudioModule.reverseAudioRecordingEvent(audioFilePath);
  }

  const onScore = () => {
    teamList[activeTeamIndex].score += 1
    console.log(teamList[activeTeamIndex])
    endTurn()
  }

  const onNoScore = () => {
    endTurn()
  }

  const endTurn = () => {
    const activeTeam = teamList[activeTeamIndex]

    console.log(teamList)

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
    setScreenState('active')
  }

  return (
    <View style={{flex: 1, backgroundColor: 'steelblue' }}>
      <TurnStart
        team={teamList[activeTeamIndex]}
        setScreenState={setScreenState}
        screenState={screenState}
      />
      {screenState === 'active' &&
        <TurnActive
          word={turnWord}
          onRecord={onStartRecording}
          onStopRecord={onFinishRecord}
          onPlayRecord={onPlayRecording}
          onRightAnswer={onScore}
          onWrongAnswer={onNoScore}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({});

export default GameScreen;
