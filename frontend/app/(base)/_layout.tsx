import { Stack } from 'expo-router';
import { ThemeToggle } from '~/components/ThemeToggle';

export default function BaseLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Mobile Code',
          headerShown: true,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="question/[titleSlug]"
        options={{
          headerTitle: 'Question',
          headerShown: true,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="question/[titleSlug]/practice"
        options={{
          headerTitle: 'Practice',
          headerShown: true,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
