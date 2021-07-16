export { default, Team } from './GameSettingsScreen'
export { default as TeamCard } from './TeamCard'
export interface Team {
  teamName: string,
  teamNameCustom?: string,
  teamColor?: string
}
