from enum import StrEnum

from pydantic import BaseModel


class Difficulty(StrEnum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class TopicTag(StrEnum):
    ARRAY = "array"
    BACKTRACKING = "backtracking"


class ProblemOptions(BaseModel):
    difficulty: Difficulty
    topic_tag: TopicTag


class Problem(BaseModel):
    pass
