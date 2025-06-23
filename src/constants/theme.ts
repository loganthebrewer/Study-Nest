import { DefaultTheme as DefaultLightTheme, DarkTheme as DefaultDarkTheme, Theme } from '@react-navigation/native';
import Colors from './Colors';

export const DefaultTheme: Theme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    background: Colors.light.background,
    text: Colors.light.text,
    primary: Colors.light.tint,
    card: '#1e1e1e', 
    border: '#444',
    notification: Colors.light.tint,
  },
};

export const DarkTheme: Theme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    background: Colors.dark.background,
    text: Colors.dark.text,
    primary: Colors.dark.tint,
    card: '#333',
    border: '#333',
    notification: Colors.dark.tint,
  },
};