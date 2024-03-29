import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

import { teamColors } from '../../Themes/Colors';
import TeamCard from './TeamCard';
import Metrics from '../../Themes/Metrics';
import ApplicationStyles from '../../Themes/ApplicationStyles';
import { Button } from '../../Components';
import { AppRoutes, StackNavigationProps } from '../../Navigation/Navigation';

const teamList = [
  {
    teamName: 'Team 1',
    score: 0,
    teamColor: teamColors[0]
  },
  {
    teamName: 'Team 2',
    score: 0,
    teamColor: teamColors[1]
  }
]

interface Team {
  teamName: string,
  teamNameCustom?: string,
  teamColor?: string
}

const GameSettingsScreen = ({ navigation }: StackNavigationProps<AppRoutes, 'GameSettingsScreen'>) => {
  const { colors } = useTheme();
  const [numberOfTeams, SetNumberOfTeams] = useState(teamList.length)
  const [totalTeamsCreated, setTotalTeamsCreated] = useState(teamList.length)
  const [scoreLimit, setScoreLimit] = useState(11)
  const [timeLimit, setTimeLimit] = useState(15)

  const setTeamColor = (teamColor: string, index: number) => {
    const team: Team = teamList[index]
    team.teamColor = teamColor
  }

  const createNewTeam = () => {
    const teamNumber = totalTeamsCreated + 1
    const newTeam = { teamName: `Team ${teamNumber}`, score: 0 }
    teamList.push(newTeam)
    setTotalTeamsCreated(totalTeamsCreated + 1)
    SetNumberOfTeams(numberOfTeams + 1)
  }

  const deleteTeam = (index: number) => {
    teamList.splice(index, 1);
    SetNumberOfTeams(numberOfTeams - 1)
  }

  const OnGameSelect = () => {
    navigation.navigate('GameSelectScreen', {
      gameSettings: {
        scoreLimit,
        timeLimit,
        teamList
      },
    })
  }

  const renderHeader = () => {
    return (
    <View>
      <View style={styles.gameSettingsContainer}>
        <Text style={styles.title}>Game Settings</Text>
        <View style={[styles.gameSettingsCard, { backgroundColor: colors.card }]}>
          <View style={{ flex: 1, justifyContent: "center"}}>
            <Text>
              Score Limit
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ borderRadius: 100, overflow: "hidden" }}>
                <TouchableNativeFeedback onPress={() => setScoreLimit(scoreLimit - 1)}>
                  <Icon 
                    name='remove-circle' 
                    size={60}
                    style={{ color: colors.border }}
                  />
                </TouchableNativeFeedback>
              </View>
              <View style={{ width: 60, alignItems: "center" }}>
                <Text style={{ fontSize: 24, margin: 12 }}>{scoreLimit}</Text>
              </View>
              <View style={{ borderRadius: 100, overflow: "hidden" }}>
                <TouchableNativeFeedback onPress={() => setScoreLimit(scoreLimit + 1)}>
                  <Icon 
                    name='add-circle' 
                    size={60}
                    style={{ color: colors.border }}
                  />
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "center"}}>
            <Text>
              Time Limit
            </Text>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <View style={{ borderRadius: 100, overflow: "hidden" }}>
                <TouchableNativeFeedback onPress={() => setTimeLimit(timeLimit - 5)}>
                  <Icon 
                    name='remove-circle' 
                    size={60}
                    style={{ color: colors.border }}
                  />
                </TouchableNativeFeedback>
              </View>
              <View style={{ width: 60, alignItems: "center" }}>
                <Text style={{ fontSize: 24, margin: 12 }}>{timeLimit}</Text>
              </View>
              <View style={{ borderRadius: 100, overflow: "hidden" }}>
                <TouchableNativeFeedback onPress={() => setTimeLimit(timeLimit + 5)}>
                  <Icon 
                    name='add-circle' 
                    size={60}
                    style={{ color: colors.border }}
                  />
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Team Settings</Text>
    </View>
    )
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
        style={{ paddingHorizontal: Metrics.margins.base }}
        data={teamList}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => item.teamName}
      />
      <Button onPress={OnGameSelect}>TODO - Game Select</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  ...ApplicationStyles,
  container: {
    flex: 1,
  },
  manageTeamsButtonContainer: {
    padding: Metrics.margins.base,
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
  },
  gameSettingsContainer: {
    marginBottom: Metrics.margins.xLarge,
    marginTop: Metrics.margins.base
  },
  gameSettingsCard: {
    alignSelf: 'center',
    height: 180,
    width: '100%',
    borderRadius: Metrics.borderRadius.card,
    elevation: 2,
    padding: 6
  }
})

export default GameSettingsScreen;
