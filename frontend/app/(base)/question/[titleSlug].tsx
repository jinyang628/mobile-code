// app/question/[titleSlug].tsx
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { fetchQuestionData } from '~/apis/questions';
import { Question } from '~/lib/types/questions';

export default function QuestionScreen() {
  const { titleSlug } = useLocalSearchParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestionData = async () => {
      try {
        const questionData = await fetchQuestionData(titleSlug);
        setQuestion(questionData);
      } catch (error) {
        console.error('Error fetching question data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestionData();
  }, [titleSlug]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {question ? (
        // Render your question data here
        <Text>{question.title}</Text>
      ) : (
        <Text>Failed to load question</Text>
      )}
    </View>
  );
}
