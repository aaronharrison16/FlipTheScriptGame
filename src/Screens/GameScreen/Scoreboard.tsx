import React from "react"
import { StyleSheet, Text, View } from "react-native"

interface ScoreboardProps {
  teams: Object[];
}

const Scoreboard = ({ teams }: ScoreboardProps) => {
  return (
    <View style={styles.scoreboardContainer}>
      {
        teams.map((team, i) => {
          return (
            <View key={i} style={[styles.teamContainer]}>
              <Text>{ team.teamName }</Text>
              <Text>{ team.score }</Text>
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  scoreboardContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: 30
  },
  teamContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
    borderRadius: 5,
    width: 100,
    height: 100
  }
})

export default Scoreboard
