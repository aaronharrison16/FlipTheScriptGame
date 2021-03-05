import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

import { teamColors } from '../../Themes/Colors';
import TeamCard from './TeamCard';

const teamList = [
  { teamName: 'Team 1' },
  { teamName: 'Team 2' }
]

interface Team {
  teamName: string,
  teamNameCustom?: string,
  teamColor?: string
}

const GameSettingsScreen = () => {
  const { colors } = useTheme();
  const [numberOfTeams, SetNumberOfTeams] = useState(teamList.length)
  const [totalTeamsCreated, setTotalTeamsCreated] = useState(teamList.length)

  const setTeamColor = (teamColor: string, index: number) => {
    const team: Team = teamList[index]
    team.teamColor = teamColor
  }

  const createNewTeam = () => {
    const teamNumber = totalTeamsCreated + 1
    const newTeam = { teamName: `Team ${teamNumber}` }
    teamList.push(newTeam)
    setTotalTeamsCreated(totalTeamsCreated + 1)
    SetNumberOfTeams(numberOfTeams + 1)
  }

  const deleteTeam = (index: number) => {
    teamList.splice(index, 1);
    SetNumberOfTeams(numberOfTeams - 1)
  }

  const renderItem = ({ item, index }: { item: Team, index: number }) => {
    const deletable = numberOfTeams === 2 ? false : true
    return (
      <TeamCard
        name={item.teamName}
        color={teamColors[index]}
        setTeamColor={(teamColor) => setTeamColor(teamColor, index)}
        deleteTeam={() => deleteTeam(index)}
        deletable={deletable}
      />
    )
  }

  const renderFooter = () => {
    if (teamList.length < 5) {
      return (
        <View style={styles.manageTeamsButtonContainer}>
          <View style={styles.manageTeamsButtonOuter}>
            <TouchableNativeFeedback onPress={createNewTeam}>
              <Icon 
                name='add-circle' 
                size={60}
                style={{ color: colors.border }}
              />
            </TouchableNativeFeedback>
          </View>
        </View>
      )
    } else return null
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={teamList}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => item.teamName}
      />
      <Text>TODO: Game settings (timer length)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  manageTeamsButtonContainer: {
    padding: 10,
    alignItems: 'center'
  },
  manageTeamsButtonOuter: {
    overflow: 'hidden',
    borderRadius: 120
  },
  manageTeamsButton: {
    height: 60,
    width: 60,
    borderRadius: 120,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default GameSettingsScreen;
