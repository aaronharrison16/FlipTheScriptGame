import { pallete } from './Colors'

const Themes = {
  lightTheme: {
    dark: false,
    colors: {
      primary: pallete.usafaBlue,
      background: pallete.cultured,
      text: pallete.oxfordBlue,
      card: pallete.gainsboro,
      border: pallete.lightGrey,
      notification: pallete.indianRed,
    }
  },

  darkTheme: {
    dark: true,
    colors: {
      primary: pallete.usafaBlue,
      background: pallete.oxfordBlue,
      text: pallete.cultured,
      card: pallete.independence,
      border: pallete.independence,
      notification: pallete.indianRed,
    }
  }
}

export default Themes;
