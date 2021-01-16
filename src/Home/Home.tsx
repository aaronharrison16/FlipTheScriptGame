import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  PermissionsAndroid,
  NativeModules
} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Button } from '../components';

const { ReverseAudioModule } = NativeModules;

const Home = () => {
  const [audioFilePath, setAudioFilePath] = useState('')
  const audioRecorderPlayer = new AudioRecorderPlayer()
  
  useEffect(() => {
    PermissionsAndroid.request('android.permission.RECORD_AUDIO')
  }, [])

  const onStartRecording = async () => {
    await AudioRecord.init({
      audioSource: 6
    });

    AudioRecord.start();
    ReverseAudioModule.reverseAudioRecordingEvent('onStartRecording');
  }

  const onStopRecording = async () => {
    const audioFile = await AudioRecord.stop();
    setAudioFilePath(audioFile)
    ReverseAudioModule.reverseAudioRecordingEvent('onStopRecording');
  }

  const onPlayRecording = async () => {
    ReverseAudioModule.reverseAudioRecordingEvent('onPlayRecording');
    await audioRecorderPlayer.startPlayer(audioFilePath);
    audioRecorderPlayer.addPlayBackListener((audio) => {
      if (audio.current_position === audio.duration) {
        audioRecorderPlayer.stopPlayer()
          .catch(() => {});
      }
      return
    })
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Button onPress={onStartRecording}>Start Recording</Button>
        <Button onPress={onStopRecording}>Stop Recording</Button>
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

export default Home;
