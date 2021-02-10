import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import { Button, RecordButton } from '../../Components';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';

const { ReverseAudioModule } = NativeModules;

const GameScreen = ({ navigation }: StackNavigationProps<AppRoutes, 'GameScreen'>) => {
  const [audioFilePath, setAudioFilePath] = useState('')
  
  useEffect(() => {
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

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <RecordButton
          onPressIn={onStartRecording}
          onPressOut={onStopRecording}
        />
        <Button onPress={onPlayRecording}>Play Recording</Button>
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
