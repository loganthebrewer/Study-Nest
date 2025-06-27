import { Stack } from "expo-router";
import{ useAuth } from '../../app/index'

export default function AuthLayout() {
  const { user } = useAuth();
  if(user){
  return (
    <Stack>
        <Stack.Screen name="LoginPage"
            options={{
                title: 'Login',
                headerShown: true,
            }}
        />
    </Stack>
  );
}
}