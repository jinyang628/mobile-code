import React, { useEffect, useState } from 'react';
import { Alert, AppState, Linking, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { createProfile } from '@/api/profiles/create';
import { supabase } from '@/utils/supabase';
import { Profile, profileSchema } from '@/utils/types/api/profiles/create';

import CardWrapper from '@/components/shared/CardWrapper';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    const handleDeepLink = (event: any) => {
      const url = event.url || event;
      const params = new URLSearchParams(url.split('#')[1]);

      const accessToken: string | null = params.get('access_token');
      const refreshToken: string | null = params.get('refresh_token');

      if (!accessToken || !refreshToken) {
        console.error("Couldn't find access token or refresh token in deep link");
        return;
      }

      supabase.auth
        .setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .then(async ({ data, error }) => {
          if (error) {
            Alert.alert('Error', error.message || 'An unexpected error occurred');
            return;
          }
          const profile: Profile = profileSchema.parse({
            username: username,
            user_id: data.user?.id,
          });
          await createProfile(profile);
          Alert.alert('Success', 'You have been authenticated!');
        });
    };

    // Listen for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check if the app was launched from a deep link
    Linking.getInitialURL().then((url: string | null) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    // Cleanup
    return () => {
      subscription.remove();
    };
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert('Error', 'Email or password is incorrect');
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);

    const {
      data: { user, session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
      return;
    }

    if (!session) {
      Alert.alert('Please check your inbox for email verification!');
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: user?.id,
        username: username,
      },
    ]);

    if (profileError) {
      Alert.alert('Error', profileError.message);
    } else {
      Alert.alert('Sign-up successful! Please verify your email.');
    }

    setLoading(false);
  }

  return (
    <CardWrapper>
      <Text className="text-center text-5xl font-bold tracking-tight text-white drop-shadow-lg">
        Raise & Rage
      </Text>

      <View className="mb-4" style={{ minHeight: 200 }}>
        {isSignUp && (
          <View className="mb-4">
            <TextInput
              className="w-full rounded-xl bg-white p-3 text-black shadow-lg"
              placeholder="Username"
              placeholderTextColor="#9CA3AF"
              onChangeText={(text) => setUsername(text)}
              value={username}
              autoCapitalize="none"
            />
          </View>
        )}

        <View className="mb-4">
          <TextInput
            className="w-full rounded-xl bg-white p-3 text-black shadow-lg"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
          />
        </View>

        <View className="mb-6">
          <TextInput
            className="w-full rounded-xl bg-white p-3 text-black shadow-lg"
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
      </View>

      <View className="flex-row justify-between space-x-4">
        <TouchableOpacity
          className="flex-1 rounded-xl bg-emerald-500 py-3 shadow-lg active:bg-emerald-600"
          disabled={loading}
          onPress={isSignUp ? signUpWithEmail : signInWithEmail}
        >
          <Text className="text-center text-lg font-bold text-white">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text className="text-center text-white underline">
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </CardWrapper>
  );
}
