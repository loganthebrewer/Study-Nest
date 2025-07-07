import { DefaultTheme as DefaultLightTheme, DarkTheme as DefaultDarkTheme, Theme } from '@react-navigation/native';
import colors from './colors';

export const DefaultTheme: Theme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    background: colors.light.background,
    text: colors.light.text,
    primary: colors.light.tint,
    card: colors.light.card, 
    border: colors.light.border,
    notification: colors.light.notification,
  },
};

export const DarkTheme: Theme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    background: colors.dark.background,
    text: colors.dark.text,
    primary: colors.dark.tint,
    card: colors.dark.card,
    border: colors.dark.border,
    notification: colors.dark.notification,
  },
};