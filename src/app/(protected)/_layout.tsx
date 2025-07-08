import { Stack } from "expo-router";
import { Button } from "react-native";

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
    <Stack.Screen
    name="(tabs)"
    options={{
      title: "",
      headerShown: false
    }}
    />
    </Stack>
  );
}
