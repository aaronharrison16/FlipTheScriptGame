import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { teamColors } from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics';

interface TeamCardProps {
  name: string;
  color: string;
  setTeamColor: (teamColor: string) => void;
  deleteTeam: () => void;
  deletable: boolean;
}

const TeamCard = ({ name, color, setTeamColor, deleteTeam, deletable }: TeamCardProps) => {
  const [backgroundColor, setBackgroundColor] = useState(color)
  const opacity = !deletable ? 0.33 : 1
  const onColorPress = (circleColor: string) => {
    setBackgroundColor(circleColor)
    setTeamColor(circleColor)
  }

  return (
    <View style={[styles.cardContainer, { backgroundColor }]}>
      <View style={styles.topRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.cardName}>{name}</Text>
        </View>
        <TouchableOpacity
          onPress={deleteTeam}
          disabled={!deletable}
        >
          <Icon 
            name='delete' 
            size={22}
            style={{ color: 'white', opacity }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.colorCircleContainer}>
        {teamColors.map((teamColor, i) => {
          const borderColor = teamColor === backgroundColor ? 'white' : teamColor
          return (
            <TouchableOpacity
              onPress={() => onColorPress(teamColor)}
              style={[styles.colorCircle, { backgroundColor: teamColor, borderColor }]}
              key={i}  
            />
          )
        })}        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'center',
    height: 100,
    width: '100%',
    marginBottom: Metrics.margins.base,
    padding: Metrics.margins.base,
    borderRadius: Metrics.borderRadius.card,
    elevation: 2
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardName: {
    color: 'white',
    fontSize: 20
  },
  colorCircleContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: Metrics.margins.base,
    elevation: 1
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 90,
    marginRight: Metrics.margins.small,
    borderWidth: 2,
  }
})

export default TeamCard;
