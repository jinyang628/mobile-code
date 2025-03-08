import { Stack } from 'expo-router';

export default function BaseLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Home',
        }}
      />
    </Stack>
  );
}
