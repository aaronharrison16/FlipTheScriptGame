import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface RecordButtonProps {
  onPressIn: () => void,
  onPressOut: () => void,
}

const RecordButton = ({ onPressIn, onPressOut }: RecordButtonProps) => {
  const [isRecording, toggleIsRecording] = useState(false)

  const handlePressIn = () => {
    toggleIsRecording(true)
    console.log('press in')
    onPressIn()
  }

  const handlePressOut = () => {
    toggleIsRecording(false)
    console.log('press out')
    onPressOut()
  }

  const recordingStatusStyle = isRecording ? styles.buttonIsRecording : styles.buttonNotRecording

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.buttonDefault, recordingStatusStyle]}
    />
  )
}

const styles = StyleSheet.create({
  buttonDefault: {
    height: 80,
    width: 80,
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonNotRecording: {
    backgroundColor: 'red'
  },
  buttonIsRecording: {
    backgroundColor: 'green'
  }
})

export { RecordButton };
