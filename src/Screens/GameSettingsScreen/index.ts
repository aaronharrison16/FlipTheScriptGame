export { default } from './GameSettingsScreen'
export { default as TeamCard } from './TeamCard'
export interface Team {
  teamName: string,
  teamNameCustom?: string,
  teamColor?: string,
  score: number
}
export interface GameMode {
  gameModeList: string[],
  key: string,
  name: string
}
export interface GameSettings {
  gameMode: GameMode,
  scoreLimit: number,
  teamList: Team[],
  timeLimit: number
}