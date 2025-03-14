import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import FiltersScreen from '~/components/index/filters';
import QuestionsScreen from '~/components/index/questions';
import {
  Difficulty,
  QuestionFilters,
  TopicTag,
  defaultQuestionFilters,
} from '~/lib/types/questions';

const { width } = Dimensions.get('window');

export default function Index() {
  const [questionFilters, setQuestionFilters] = useState<QuestionFilters>(defaultQuestionFilters);
  // Animation values
  const translateX = useSharedValue(0);
  const [isQuestionsScreenActive, setIsQuestionsScreenActive] = useState<boolean>(false);

  const onDifficultyChange = (diff: Difficulty) => {
    setQuestionFilters((prevOptions) => ({
      ...prevOptions,
      difficulty: diff,
      page: 1,
    }));
  };

  const onTopicTagChange = (tag: TopicTag) => {
    setQuestionFilters((prevOptions) => ({
      ...prevOptions,
      topicTag: tag,
      page: 1,
    }));
  };

  const onPageIncrement = () => {
    setQuestionFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }));
  };

  const onPageDecrement = () => {
    setQuestionFilters((prevFilters) => ({
      ...prevFilters,
      page: Math.max(prevFilters.page - 1, 1),
    }));
  };

  // Update screen state
  const updateScreenState = (isActive: boolean) => {
    setIsQuestionsScreenActive(isActive);
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10]) // Only activate for horizontal movement
    .failOffsetY([-15, 15]) // Fail the gesture if there's significant vertical movement
    .onUpdate((event) => {
      // Clamp the translationX value to prevent scrolling past the second screen
      const clampedTranslationX = Math.max(Math.min(event.translationX, 0), -width);

      if (
        (isQuestionsScreenActive && event.translationX > 0) ||
        (!isQuestionsScreenActive && event.translationX < 0)
      ) {
        translateX.value = isQuestionsScreenActive
          ? -width + clampedTranslationX
          : clampedTranslationX;
      }
    })
    .onEnd((event) => {
      if (
        (event.velocityX < -500 && !isQuestionsScreenActive) ||
        (Math.abs(event.translationX) > width / 3 &&
          event.translationX < 0 &&
          !isQuestionsScreenActive)
      ) {
        // Swipe left to questions with velocity or significant drag
        translateX.value = withSpring(-width, { damping: 20, stiffness: 150 });
        runOnJS(updateScreenState)(true);
      } else if (
        (event.velocityX > 500 && isQuestionsScreenActive) ||
        (Math.abs(event.translationX) > width / 3 &&
          event.translationX > 0 &&
          isQuestionsScreenActive)
      ) {
        // Swipe right to filters with velocity or significant drag
        translateX.value = withSpring(0, { damping: 20, stiffness: 150 });
        runOnJS(updateScreenState)(false);
      } else {
        // Snap back to current screen if gesture wasn't decisive
        translateX.value = withSpring(isQuestionsScreenActive ? -width : 0, {
          damping: 20,
          stiffness: 150,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View className="flex-1">
      <GestureDetector gesture={panGesture}>
        <Animated.View className="h-screen flex-row" style={[{ width: width * 2 }, animatedStyle]}>
          <View className="flex-1 p-4" style={{ width }}>
            <FiltersScreen
              userOptions={questionFilters}
              isScreenActive={!isQuestionsScreenActive}
              onDifficultyChange={onDifficultyChange}
              onTopicTagChange={onTopicTagChange}
            />
          </View>

          <View className="flex-1 p-4" style={{ width }}>
            <QuestionsScreen
              isScreenActive={isQuestionsScreenActive}
              questionFilters={questionFilters}
              onPageIncrement={onPageIncrement}
              onPageDecrement={onPageDecrement}
            />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
