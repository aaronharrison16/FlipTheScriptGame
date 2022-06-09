import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, TurnEndButton } from '../../Components';

interface TurnEndProps {
  onWrongAnswer: () => void,
  onRightAnswer: () => void,
  onPlayRecording: () => void
}

const TurnEnd = ({onWrongAnswer, onRightAnswer, onPlayRecording}: TurnEndProps) => {
  
  const wrongAnswer = () => {
    onWrongAnswer()
  }

  const rightAnswer = () => {
    onRightAnswer()
  }
  
  return (
    <View style={{flex: 1}}>
      <Button onPress={onPlayRecording}>Play Recording</Button>
      <TurnEndButton
        buttonType='error'
        animationEnd={wrongAnswer}
      />
      <TurnEndButton
        animationEnd={rightAnswer}
      />
    </View>
  )
}

export default TurnEnd;
