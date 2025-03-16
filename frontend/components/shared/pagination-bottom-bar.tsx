import { View } from 'react-native';

import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

type PaginationBottomBarProps = {
  pageText: string;
  pageNumber: number;
  contentColor: string;
  isPageDecrementDisabled: boolean;
  isPageIncrementDisabled: boolean;
  onPageDecrement: () => void;
  onPageIncrement: () => void;
};

export default function PaginationBottomBar({
  pageText,
  pageNumber,
  contentColor,
  isPageDecrementDisabled,
  isPageIncrementDisabled,
  onPageDecrement,
  onPageIncrement,
}: PaginationBottomBarProps) {
  return (
    <View className="absolute bottom-20 left-0 right-0 flex-row items-center justify-between px-4">
      <Button
        disabled={isPageDecrementDisabled}
        className="w-15 aspect-square items-center justify-center bg-blue-500 disabled:opacity-50 dark:bg-blue-400"
        onPress={onPageDecrement}
      >
        <ChevronLeft size={25} color={contentColor} />
      </Button>
      <Text className="text-lg font-bold">
        {pageText} {pageNumber}
      </Text>
      <Button
        className="w-15 aspect-square items-center justify-center bg-blue-500 disabled:opacity-50 dark:bg-blue-400"
        disabled={isPageIncrementDisabled}
        onPress={onPageIncrement}
      >
        <ChevronRight size={25} color={contentColor} />
      </Button>
    </View>
  );
}
