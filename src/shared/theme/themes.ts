// import { DefaultTheme } from "@react-navigation/native";

// export const palette = {
//   primary: "#0564d4",
//   secondary: "#ff6a00",
//   background: "#f6f8fa",
//   white: "#fff",
//   black: "#101214",
//   button: "#1c1e21",
//   shadow: "#757575",
//   text: "#30363b",
//   borderColor: "#d0d7de",
//   borderColorDark: "#333942",
//   placeholder: "#a1a1a1",
//   danger: "rgb(208, 2, 27)",
//   title: "rgb(102, 102, 102)",
//   separator: "rgb(194, 194, 195)",
//   highlight: "rgb(199, 198, 203)",
//   blackOverlay: "rgba(0,0,0,0.6)",
//   iconWhite: "#fff",
//   iconBlack: "#101214",
//   dynamicWhite: "#fff",
//   dynamicBlack: "#1c1e21",
//   dynamicBackground: "#fff",
//   transparent: "transparent",
//   calpyse: "#2b7488",
//   purple: "#7D5DEE"
// };

// export const LightTheme: ExtendedTheme = {
//   dark: false,
//   colors: {
//     ...DefaultTheme.colors,
//     ...palette,
//   },
// };

// export const DarkTheme: ExtendedTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...LightTheme.colors,
//     background: palette.black,
//     foreground: palette.white,
//     text: palette.white,
//     tabBar: palette.black,
//     iconWhite: palette.black,
//     iconBlack: palette.white,
//     dynamicBackground: palette.dynamicBlack,
//     shadow: palette.transparent,
//     borderColor: palette.borderColorDark,
//   },
// };
export enum ColorThemes {
  base = 'base',
  yellow = 'yellow',
  blue = 'blue',
  green = 'green',
}

export type Theme = {
  primaryColor: string;
  darkerPrimaryColor: string;
  secondaryColor: string;
  lightColor: string;
  textColor: string;
  textColorBland: string;
  backgroundColor: string;
  backgroundApp: string;
};

// Define your themes
export const THEMES: {[key: string]: Theme} = {
  base: {
    primaryColor: '#FCDE89',
    darkerPrimaryColor: '#C9AB56',
    secondaryColor: '#424646',
    lightColor: 'white',
    textColor: 'black',
    textColorBland: '#6b7280',
    backgroundColor: 'white',
    backgroundApp: '#e5e7eb',
  },
  black: {
    primaryColor: '#FCDE89',
    darkerPrimaryColor: '#C9AB56',
    secondaryColor: '#424646',
    lightColor: 'blue',
    textColor: 'white',
    textColorBland: '#c8cbcf',
    backgroundColor: '#424646',
    backgroundApp: 'black',
  },
};

export default {
  SETTINGS: {
    THEMES: [ColorThemes.yellow, ColorThemes.base, ColorThemes.blue, ColorThemes.green],
  },
  THEMES,
}
