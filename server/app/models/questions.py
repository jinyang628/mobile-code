from enum import StrEnum

from pydantic import BaseModel


class Difficulty(StrEnum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class TopicTag(StrEnum):
    ARRAY = "array"
    BACKTRACKING = "backtracking"


class QuestionFilters(BaseModel):
    difficulty: Difficulty
    topic_tag: TopicTag  # Only permit a single tag for now


class Question(BaseModel):
    id: str  # stringified integer
    title: str  # Title of the problem shown to user in the UI
    titleSlug: str  # Slug used to query Leetcode API
