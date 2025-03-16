from app.models.leetcode import LeetcodeQuestion
from app.models.practice import PracticeQuestion


class PracticeService:
    async def generate_practice_questions(
        self, leetcode_question: LeetcodeQuestion
    ) -> list[PracticeQuestion]:
        print(leetcode_question)
        return []
