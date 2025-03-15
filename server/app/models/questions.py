from enum import StrEnum

from pydantic import BaseModel


class Difficulty(StrEnum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


class TopicTag(StrEnum):
    ARRAY = "array"
    BACKTRACKING = "backtracking"
    STRING = "string"
    HASH_TABLE = "hash-table"
    DYNAMIC_PROGRAMMING = "dynamic-programming"
    MATH = "math"
    SORTING = "sorting"
    GREEDY = "greedy"
    DEPTH_FIRST_SEARCH = "depth-first-search"
    BINARY_SEARCH = "binary-search"
    DATABASE = "database"
    MATRIX = "matrix"
    TREE = "tree"
    BREADTH_FIRST_SEARCH = "breadth-first-search"
    BIT_MANIPULATION = "bit-manipulation"
    TWO_POINTERS = "two-pointers"
    PREFIX_SUM = "prefix-sum"
    HEAP_PRIORITY_QUEUE = "heap-priority-queue"
    BINARY_TREE = "binary-tree"
    SIMULATION = "simulation"
    STACK = "stack"
    GRAPH = "graph"
    COUNTING = "counting"
    SLIDING_WINDOW = "sliding-window"
    DESIGN = "design"
    ENUMERATION = "enumeration"
    UNION_FIND = "union-find"
    LINKED_LIST = "linked-list"
    NUMBER_THEORY = "number-theory"
    ORDERED_SET = "ordered-set"
    MONOTONIC_STACK = "monotonic-stack"
    SEGMENT_TREE = "segment-tree"
    TRIE = "trie"
    COMBINATORICS = "combinatorics"
    BITMASK = "bitmask"
    QUEUE = "queue"
    DIVIDE_AND_CONQUER = "divide-and-conquer"
    RECURSION = "recursion"
    MEMOIZATION = "memoization"
    BINARY_INDEXED_TREE = "binary-indexed-tree"
    GEOMETRY = "geometry"
    BINARY_SEARCH_TREE = "binary-search-tree"
    HASH_FUNCTION = "hash-function"
    STRING_MATCHING = "string-matching"
    TOPOLOGICAL_SORT = "topological-sort"
    SHORTEST_PATH = "shortest-path"
    ROLLING_HASH = "rolling-hash"
    INTERACTIVE = "interactive"
    DATA_STREAM = "data-stream"
    MONOTONIC_QUEUE = "monotonic-queue"
    RANDOMIZED = "randomized"
    MERGE_SORT = "merge-sort"
    DOUBLY_LINKED_LIST = "doubly-linked-list"
    COUNTING_SORT = "counting-sort"
    ITERATOR = "iterator"
    CONCURRENCY = "concurrency"
    PROBABILITY_AND_STATISTICS = "probability-and-statistics"
    QUICKSELECT = "quickselect"
    SUFFIX_ARRAY = "suffix-array"
    BUCKET_SORT = "bucket-sort"
    LINE_SWEEP = "line-sweep"
    MINIMUM_SPANNING_TREE = "minimum-spanning-tree"
    SHELL = "shell"
    RESERVOIR_SAMPLING = "reservoir-sampling"
    STRONGLY_CONNECTED_COMPONENT = "strongly-connected-component"
    EULERIAN_CIRCUIT = "eulerian-circuit"
    RADIX_SORT = "radix-sort"
    REJECTION_SAMPLING = "rejection-sampling"
    BICONNECTED_COMPONENT = "biconnected-component"


class QuestionFilters(BaseModel):
    difficulty: Difficulty
    topic_tag: TopicTag  # Only permit a single tag for now


class QuestionMetadata(BaseModel):
    id: str  # stringified integer
    title: str  # Title of the problem shown to user in the UI
    titleSlug: str  # Slug used to query Leetcode API


class CodeSnippet(BaseModel):
    lang: str
    code: str


class Question(QuestionMetadata):
    content: str
    codeSnippets: list[CodeSnippet]
