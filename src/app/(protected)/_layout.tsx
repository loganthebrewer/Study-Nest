import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)/Auth" />
      <Stack.Screen name="(auth)/SignUp" />
      <Stack.Screen name="(auth)/ForgotPassword" />
      <Stack.Screen name="(auth)/ResetPassword" />
    </Stack>
  );
}
