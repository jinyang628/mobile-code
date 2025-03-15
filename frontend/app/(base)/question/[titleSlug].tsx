import React, { useEffect, useState } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';
import RenderHtml from 'react-native-render-html';

import { useLocalSearchParams, useNavigation } from 'expo-router';
import { fetchQuestionData } from '~/apis/questions';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Question } from '~/lib/types/questions';
import { useColorScheme } from '~/lib/useColorScheme';

export default function QuestionScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const navigation = useNavigation();
  const { titleSlug } = useLocalSearchParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();

  const contentColor = isDarkColorScheme ? '#FFFFFF' : '#000000';
  const backgroundColor = isDarkColorScheme ? '#1A1A1A' : '#FFFFFF';
  const codeBackgroundColor = isDarkColorScheme ? '#2D2D2D' : '#F0F0F0';

  const htmlStyles = {
    baseStyle: {
      color: contentColor,
      fontFamily: 'System',
      lineHeight: 28,
    },
    tagsStyles: {
      p: {
        color: contentColor,
        marginBottom: 10,
      },
      h1: {
        color: contentColor,
        fontWeight: '700',
        marginVertical: 10,
      },
      h2: {
        color: contentColor,
        fontWeight: '600',
        marginVertical: 8,
      },
      h3: {
        color: contentColor,
        fontWeight: '500',
        marginVertical: 6,
      },
      a: {
        color: isDarkColorScheme ? '#4DA0FF' : '#0066CC',
      },
      code: {
        backgroundColor: codeBackgroundColor,
        color: isDarkColorScheme ? '#E0E0E0' : '#333333',
        padding: 4,
        borderRadius: 4,
        fontFamily: 'monospace',
      },
      pre: {
        backgroundColor: codeBackgroundColor,
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
      },
      ul: {
        color: contentColor,
      },
      ol: {
        color: contentColor,
      },
      li: {
        color: contentColor,
        marginBottom: 4,
      },
      strong: {
        color: contentColor,
        fontWeight: '700',
      },
      em: {
        color: contentColor,
        fontStyle: 'italic',
      },
      table: {
        borderColor: isDarkColorScheme ? '#444444' : '#DDDDDD',
        marginVertical: 10,
      },
      th: {
        backgroundColor: isDarkColorScheme ? '#333333' : '#F5F5F5',
        color: contentColor,
        padding: 8,
        borderColor: isDarkColorScheme ? '#444444' : '#DDDDDD',
      },
      td: {
        padding: 8,
        borderColor: isDarkColorScheme ? '#444444' : '#DDDDDD',
        color: contentColor,
      },
    },
  };

  useEffect(() => {
    const loadQuestionData = async () => {
      try {
        const questionData = await fetchQuestionData(titleSlug as string);
        setQuestion(questionData);
      } catch (error) {
        console.error('Error fetching question data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestionData();
  }, [titleSlug]);

  useEffect(() => {
    if (question) {
      navigation.setOptions({
        headerTitle: question.title,
      });
    }
  }, [question, navigation]);

  if (isLoading) {
    return (
      <View className="flex items-center justify-center p-8">
        <Chase size={48} color={contentColor} />
      </View>
    );
  }

  if (!question) {
    return (
      <View className="flex items-center justify-center p-8">
        <Text className="text-lg font-bold">Failed to load question</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 flex-grow px-6 pb-20 pt-6" style={{ backgroundColor }}>
      <RenderHtml
        contentWidth={width - 32}
        source={{ html: question.content }}
        baseStyle={htmlStyles.baseStyle}
        tagsStyles={htmlStyles.tagsStyles}
      />
      <Button
        className="mb-40 mt-6 items-center justify-center bg-blue-500 disabled:opacity-50 dark:bg-blue-400"
        onPress={() => {
          console.log('Begin Practice button pressed');
        }}
      >
        <Text className="text-white">Begin Practice</Text>
      </Button>
    </ScrollView>
  );
}
