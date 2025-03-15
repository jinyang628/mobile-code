import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';

import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { fetchQuestionListMetadata } from '~/apis/questions';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { QuestionFilters, QuestionMetadata } from '~/lib/types/questions';
import { useColorScheme } from '~/lib/useColorScheme';

type QuestionsScreenProps = {
  questionFilters: QuestionFilters;
  onPageIncrement: () => void;
  onPageDecrement: () => void;
};
export default function QuestionsScreen({
  questionFilters,
  onPageIncrement,
  onPageDecrement,
}: QuestionsScreenProps) {
  const { isDarkColorScheme } = useColorScheme();

  const { data: questions = [], isLoading } = useQuery<QuestionMetadata[]>({
    queryKey: ['questions', questionFilters],
    queryFn: () => fetchQuestionListMetadata(questionFilters),
  });

  const contentColor = isDarkColorScheme ? '#FFFFFF' : '#000000';

  const onQuestionSelected = async (titleSlug: string) => {
    router.push(`/question/${titleSlug}`);
  };

  const renderQuestions = () => {
    if (isLoading) {
      return (
        <View className="flex items-center justify-center p-8">
          <Chase size={48} color={contentColor} />
        </View>
      );
    }
    if (questions.length === 0) {
      return <Text className="text-center text-lg">No questions found.</Text>;
    }

    return questions.map((qn) => (
      <TouchableOpacity
        key={qn.id}
        className="mb-2 w-full items-center rounded-lg border-2 border-gray-900 p-4 dark:border-white"
        onPress={() => onQuestionSelected(qn.titleSlug)}
      >
        <Text className="text-center text-lg">{qn.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 pb-24">{renderQuestions()}</View>

      <View className="absolute bottom-20 left-0 right-0 flex-row items-center justify-between px-4">
        <Button
          disabled={questionFilters.page === 1 || isLoading}
          className="w-15 aspect-square items-center justify-center bg-blue-500 disabled:opacity-50 dark:bg-blue-400"
          onPress={onPageDecrement}
        >
          <ChevronLeft size={25} color={contentColor} />
        </Button>
        <Text className="text-lg font-bold">Page {questionFilters.page}</Text>
        <Button
          className="w-15 aspect-square items-center justify-center bg-blue-500 disabled:opacity-50 dark:bg-blue-400"
          disabled={questions.length === 0 || isLoading}
          onPress={onPageIncrement}
        >
          <ChevronRight size={25} color={contentColor} />
        </Button>
      </View>
    </SafeAreaView>
  );
}
