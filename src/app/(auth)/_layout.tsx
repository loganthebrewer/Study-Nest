import { Redirect, Stack } from "expo-router";
import{ useAuth } from 'src/providers/AuthProvider'

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/(protected)" />;
  }

  return <Stack />;
}

/*
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
}*/