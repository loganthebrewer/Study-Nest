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
        },
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(protected)"/>
    </Stack>
    </ThemeProvider>
  );

}