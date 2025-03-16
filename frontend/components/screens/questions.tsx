import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';

import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { fetchLeetcodeQuestionListMetadata } from '~/apis/leetcode';
import PaginationBottomBar from '~/components/shared/pagination-bottom-bar';
import { Text } from '~/components/ui/text';
import { LeetcodeQuestionFilters, LeetcodeQuestionMetadata } from '~/lib/types/leetcode';
import { useColorScheme } from '~/lib/useColorScheme';

type QuestionsScreenProps = {
  questionFilters: LeetcodeQuestionFilters;
  onPageIncrement: () => void;
  onPageDecrement: () => void;
};
export default function QuestionsScreen({
  questionFilters,
  onPageIncrement,
  onPageDecrement,
}: QuestionsScreenProps) {
  const { isDarkColorScheme } = useColorScheme();

  const { data: questions = [], isLoading } = useQuery<LeetcodeQuestionMetadata[]>({
    queryKey: ['questions', questionFilters],
    queryFn: () => fetchLeetcodeQuestionListMetadata(questionFilters),
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

      <PaginationBottomBar
        pageText="Page"
        pageNumber={questionFilters.page}
        contentColor={contentColor}
        isPageDecrementDisabled={questionFilters.page === 1 || isLoading}
        isPageIncrementDisabled={questions.length === 0 || isLoading}
        onPageDecrement={onPageDecrement}
        onPageIncrement={onPageIncrement}
      />
    </SafeAreaView>
  );
}
