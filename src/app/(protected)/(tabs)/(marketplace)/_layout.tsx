import { router, Stack } from "expo-router";
import { Button } from "react-native";

export default function MarketplaceLayout() {
    return (
        <Stack>
            <Stack.Screen
            name="index"
            options={{
                title: "Marketplace",
                headerRight: () => <Button onPress={() => router.push("/newMarketplacePost")} title="New Post"/>
            }}
            />
        </Stack>
    )
}