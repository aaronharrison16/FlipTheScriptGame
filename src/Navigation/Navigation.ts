  
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export type AppRoutes = {
  HomeScreen: undefined;
  GameScreen: { gameSettings: object };
  GameSelectScreen: { gameSettings: object };
  GameSettingsScreen: undefined;
}
