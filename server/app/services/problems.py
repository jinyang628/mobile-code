from app.models.problems import Problem, ProblemOptions


class ProblemsService:
    async def get_problem(self, input: ProblemOptions) -> list[Problem]:
        pass
