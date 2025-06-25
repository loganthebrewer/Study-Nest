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
    <Stack.Screen
    name="newMarketplacePost"
    options={{
      title: "New Listing",
      headerShown: true,
      headerRight: () => (
        <Button title="Publish" onPress={() => alert('Post (not really) Published!')} />
      ),
      headerBackButtonDisplayMode: "minimal",
    }}
    />

    </Stack>
  );
}
