import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/Auth" />
      <Stack.Screen name="(auth)/SignUp" />
      <Stack.Screen name="(auth)/ForgotPassword" />
      <Stack.Screen name="(auth)/ResetPassword" />
    </Stack>
  );
}

