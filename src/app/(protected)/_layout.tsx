import { Stack } from "expo-router";

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
    <Stack.Screen
    name="newMarketplacePost"
    options={{
      title: "New Post",
      headerShown: true
    }}
    />

    </Stack>
  );
}
