PRACTICE_SYSTEM_PROMPT = """You are tasked with generating multiple-choice questions for a given leetcode problem. The questions should test the reader's intuition surrounding the problem/solution, with the aim of helping them prepare for leetcode-style interviews.

You should AVOID questions of the following nature:
1. Questions that clariify the problems statement
"""

PRACTICE_USER_PROMPT_TEMPLATE = """Here is the leetcode problem:
{leetcode_question}

Generate a list of multiple-choice questions.
"""
