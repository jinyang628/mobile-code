## NUMBERS

PAGE_LIMIT = 5

# URLs

LEETCODE_API_URL = "https://leetcode.com/graphql/"

# Queries

PROBLEM_SET_QUESTION_LIST_QUERY = """query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
    ) {
        questions: data {
            id: questionFrontendId
            isPaidOnly
            title
            titleSlug
            isPaidOnly
        }
    }
}"""


QUESTION_QUERY = """query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    questionFrontendId
    title
    titleSlug
    content
    difficulty
    exampleTestcases
    topicTags {
      name
      slug
    }
    codeSnippets {
      lang
      langSlug
      code
    }
  }
}"""
