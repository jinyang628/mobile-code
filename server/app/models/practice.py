from pydantic import BaseModel, Field


class MultipleChoiceOption(BaseModel):
    description: str = Field(description="The description of the option")
    isCorrect: bool = Field(description="Whether the option is correct")


class PracticeQuestion(BaseModel):
    description: str = Field(description="The problem description")
    options: list[MultipleChoiceOption] = Field(
        description="2-4 relevant multiple choice options for the problem description. Only one option should be correct"
    )


class PracticeQuestions(BaseModel):
    questions: list[PracticeQuestion] = Field(
        description="The list of practice questions"
    )
