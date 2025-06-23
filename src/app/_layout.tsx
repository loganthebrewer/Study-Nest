import { Stack } from "expo-router";
import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from "@/constants/theme";
import { useColorScheme } from "react-native";


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background,
        },
        headerTintColor: colorScheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text,
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(protected)"/>
    </Stack>
    </ThemeProvider>
  );

}