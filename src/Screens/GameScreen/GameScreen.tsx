import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  NativeModules,
  View,
  Text,
} from 'react-native';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';
import { TurnActive, TurnStart } from '.';
import AudioRecord from 'react-native-audio-record';
import { TurnEndButton } from '../../Components';

const { ReverseAudioModule } = NativeModules;

const GameScreen = ({ route }: StackNavigationProps<AppRoutes, 'GameScreen'>) => {
  const [screenState, setScreenState] = useState('start')
  const [screenStep, setScreenStep] = useState(1)
  const [audioFilePath, setAudioFilePath] = useState('')
  const gameSettings = route.params.gameSettings
  const teamList = gameSettings.teamList
  const [wordLibrary, setWordLibrary] = useState([...gameSettings.gameMode.gameModeList])
  const [turnWord, setTurnWord] = useState("")
  const [activeTeamIndex, setActiveTeamIndex] = useState(Math.floor(Math.random()*teamList.length))
  const [scoreType, setScoreType] = useState("")
  
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
    setAudioFilePath(audioFile);
    setScreenStep(3)
  }

  const onPlayRecording = async () => {
    const audioFile = await AudioRecord.stop();
    ReverseAudioModule.reverseAudioRecordingEvent(audioFilePath);
  }

  const onScore = (score: string) => {
    teamList[activeTeamIndex].score += 1
    endTurn(score)
  }

  const turnReset = () => {
    setScreenStep(1)
    setScoreType("")
  }

  const endTurn = (score: string) => {
    setScreenStep(4)
    setScoreType(score)
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
  }

  return (
    <View style={{flex: 1, backgroundColor: 'steelblue' }}>
      <View style={{ backgroundColor: '#5BBA6F', padding: 16 }}>
        <Text style={{ paddingBottom: 16}}>Game to {gameSettings.scoreLimit}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          { teamList.map(team => (
            <View style={{ alignItems: 'center' }}>
              <Text>{team.teamName}</Text>
              <Text>{team.score}</Text>
            </View>
          ))}
        </View>
      </View>

      {(screenStep < 4) && (
        <TurnStart
          team={teamList[activeTeamIndex]}
          setScreenStep={() => setScreenStep(2)}
          screenStep={screenStep}
        />
      )}

      {(screenStep >= 2 && screenStep < 4) &&
        <TurnActive
          word={turnWord}
          onRecord={onStartRecording}
          onStopRecord={onFinishRecord}
          onPlayRecord={onPlayRecording}
        />
      }

      {(screenStep >= 3 && scoreType !== 'error') && (
        <TurnEndButton
          onScore={onScore}
          animationEnd={turnReset}
        />
      )}

      {(screenStep >= 3 && scoreType !== 'success') && (
        <TurnEndButton
          buttonType='error'
          animationEnd={turnReset}
          onScore={endTurn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

export default GameScreen;
