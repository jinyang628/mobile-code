from langchain.chat_models import init_chat_model
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage

from app.inference.prompts.practice import (
    PRACTICE_SYSTEM_PROMPT,
    PRACTICE_USER_PROMPT_TEMPLATE,
)
from app.models.leetcode import LeetcodeQuestion
from app.models.practice import PracticeQuestions

structured_llm = init_chat_model("gpt-4o-mini", model_provider="openai").with_structured_output(
    PracticeQuestions
)


class PracticeService:
    async def generate_practice_questions(
        self, leetcode_question: LeetcodeQuestion
    ) -> PracticeQuestions:
        messages: list[BaseMessage] = [
            SystemMessage(content=PRACTICE_SYSTEM_PROMPT),
            HumanMessage(
                content=PRACTICE_USER_PROMPT_TEMPLATE.format(leetcode_question=leetcode_question),
            ),
        ]
        response = await structured_llm.ainvoke(messages)
        return PracticeQuestions.model_validate(response)
