import React from 'react'
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  children: string,
  onPress: () => void,
  style?: object
}

const Button = ({ onPress, children, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ justifyContent: 'center', alignItems: 'center', width: 250, borderRadius: 10, padding: 25, backgroundColor: 'steelblue' }}>
      <Text style={{ color: 'white' }}>{children}</Text>
    </TouchableOpacity>
  )
}

export { Button };
