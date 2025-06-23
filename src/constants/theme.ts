import { DefaultTheme as DefaultLightTheme, DarkTheme as DefaultDarkTheme, Theme } from '@react-navigation/native';
import Colors from './Colors';

export const DefaultTheme: Theme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    background: Colors.light.background,
    text: Colors.light.text,
    primary: Colors.light.tint,
    card: Colors.light.card, 
    border: Colors.light.border,
    notification: Colors.light.notification,
  },
};

export const DarkTheme: Theme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    background: Colors.dark.background,
    text: Colors.dark.text,
    primary: Colors.dark.tint,
    card: Colors.dark.card,
    border: Colors.dark.border,
    notification: Colors.dark.notification,
  },
};