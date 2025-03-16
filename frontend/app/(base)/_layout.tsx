import { Stack } from 'expo-router';
import { ThemeToggle } from '~/components/ThemeToggle';

export default function BaseLayout() {
  return (
    <Stack>
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
        name="[titleSlug]/index"
        options={({ route }) => {
          const { titleSlug } = route.params || {};

          return {
            headerTitle: titleSlug
              ? titleSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
              : 'Question',
            headerShown: true,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <ThemeToggle />,
          };
        }}
      />
      <Stack.Screen
        name="[titleSlug]/practice/index"
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
