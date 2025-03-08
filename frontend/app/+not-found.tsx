import { Stack } from 'expo-router';
import Link from 'expo-router/link';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" className="mt-5 text-center">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
