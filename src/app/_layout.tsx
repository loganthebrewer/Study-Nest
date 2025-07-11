import { Stack } from "expo-router";
import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from "@/constants/theme";
import { useColorScheme } from "react-native";
//define global providers
import{GestureHandlerRootView} from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from '../providers/AuthProvider'


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
    <GestureHandlerRootView>
      <AuthProvider>
    
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
    
    </AuthProvider>
    </GestureHandlerRootView>
    </SafeAreaProvider>
  );

}