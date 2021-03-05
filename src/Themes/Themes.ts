import { pallete } from './Colors'

const Themes = {
  lightTheme: {
    dark: false,
    colors: {
      primary: pallete.starCommanderBlue,
      background: pallete.light,
      text: pallete.dark,
      card: 'rgb(255, 255, 255)',
      border: '#c7c7cc',
      notification: 'rgb(255, 69, 58)',
    }
  },

  // darkTheme: {
  //   dark: true,
  //   colors: {
  //     primary: Colors.cederChest,
  //     secondary: Colors.cadetBlue,
  //     background: Colors.dark,
  //     text: Colors.light,
  //   }
  // }
}

export default Themes;
