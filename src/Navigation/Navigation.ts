  
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { GameSettings } from '../Screens/GameSettingsScreen'

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export type AppRoutes = {
  HomeScreen: undefined;
  GameScreen: { gameSettings: GameSettings };
  GameSelectScreen: { gameSettings: object };
  GameSettingsScreen: undefined;
  HowToScreen: undefined;
}
