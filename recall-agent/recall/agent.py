import json
import asyncio
import re
from google.adk.agents import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
from db import get_source_content

session_service = InMemorySessionService()

def clean_json_response(raw_text: str) -> dict:
    """Strips markdown code ticks and returns parsed dict."""
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_text.strip(), flags=re.MULTILINE)
    return json.loads(cleaned)

# --- Agent Definitions ---
assessor_agent = Agent(
    name="assessor_agent",
    model="gemini-2.5-flash",
    instruction="""
    You evaluate the user's diagnostic quiz JSON payload.
    Examine the 'responses', 'score', and 'questions' metadata.
    Determine the final skill level using these rules:
    - 0 to 2 correct: "beginner"
    - 3 to 4 correct: "intermediate"
    - 5 correct: "advanced"
    
    Return ONLY valid JSON matching this schema:
    {
      "score": 4,
      "total_questions": 5,
      "level": "intermediate",
      "identified_weak_topics": ["topic_name"]
    }
    """
)

teacher_agent = Agent(
    name="teacher_agent",
    model="gemini-2.5-flash",
    instruction="""
    You are a witty, bite-sized gamified tutor (Duolingo style).
    Synthesize the reference context into exactly 3 punchy, engaging paragraphs tailored for the user's assessed skill level.
    Use emojis and include a bold takeaway rule.
    
    Return ONLY valid JSON matching this schema:
    {
      "topic": "Financial Literacy",
      "difficulty_level": "intermediate",
      "paragraphs": [
        "Paragraph 1 text...",
        "Paragraph 2 text...",
        "Paragraph 3 text..."
      ],
      "takeaway_rule": "**Takeaway Rule: ...**"
    }
    """
)

quiz_generator_agent = Agent(
    name="quiz_generator_agent",
    model="gemini-2.5-flash",
    instruction="""
    Generate exactly 10 multiple-choice questions testing ONLY the provided paragraphs.
    Return ONLY valid JSON matching this schema:
    {
      "questions": [
        {
          "id": 1,
          "question": "string",
          "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
          "correct_option": "A",
          "explanation": "string"
        }
      ]
    }
    """
)

summary_evaluator_agent = Agent(
    name="summary_evaluator_agent",
    model="gemini-2.5-flash",
    instruction="""
    Compare the student's summary against the taught paragraphs.
    Return ONLY valid JSON matching this schema:
    {
      "score": 85,
      "passed": true,
      "xp_awarded": 50,
      "feedback": "Great concise recap!"
    }
    """
)

# --- Runners ---
assessor_runner = Runner(agent=assessor_agent, app_name="assessor_app", session_service=session_service)
teacher_runner = Runner(agent=teacher_agent, app_name="teacher_app", session_service=session_service)
quiz_runner = Runner(agent=quiz_generator_agent, app_name="quiz_app", session_service=session_service)
summary_runner = Runner(agent=summary_evaluator_agent, app_name="summary_app", session_service=session_service)

# --- Execution Helper ---
async def execute_agent(runner_instance: Runner, app_name: str, session_id: str, user_id: str, prompt_text: str) -> str:
    session = await session_service.get_session(session_id=session_id, app_name=app_name, user_id=user_id)
    if session is None:
        await session_service.create_session(session_id=session_id, app_name=app_name, user_id=user_id)

    content = types.Content(
        role="user",
        parts=[types.Part(text=prompt_text)]
    )
    
    last_text = ""
    async for event in runner_instance.run_async(
        session_id=session_id, 
        user_id=user_id, 
        new_message=content
    ):
        if hasattr(event, "content") and event.content and event.content.parts:
            for part in event.content.parts:
                if hasattr(part, "text") and part.text:
                    last_text = part.text
        elif hasattr(event, "messages") and event.messages:
            for part in event.messages[-1].content.parts:
                if hasattr(part, "text") and part.text:
                    last_text = part.text
    return last_text


async def run_stage_assessment_and_teach(input_data) -> dict:
    """
    Accepts either a Python dictionary or a path to a JSON file (str),
    runs assessment, fetches matching DB chunks, and outputs JSON dictionaries.
    """
    # 1. Load data if a file path is provided
    if isinstance(input_data, str):
        with open(input_data, "r", encoding="utf-8") as file:
            payload = json.load(file)
    else:
        payload = input_data

    # 2. Extract nested identifiers
    user_id = payload.get("learner", {}).get("userId") or payload.get("user_id", "learner_default")
    raw_subject = payload.get("diagnostic", {}).get("subject") or payload.get("subject_name", "Financial Literacy")
    topic_tag = raw_subject.replace("_", " ").title()
    session_id = f"session_{user_id}"

    # 3. Assessor Agent
    assess_prompt = f"Analyze this diagnostic result JSON:\n{json.dumps(payload, indent=2)}"
    raw_assess = await execute_agent(assessor_runner, "assessor_app", f"{session_id}_assess", user_id, assess_prompt)
    assess_data = clean_json_response(raw_assess)
    
    level_map = {"foundational": "beginner", "basic": "beginner"}
    assessed_level = assess_data.get("level", "beginner").lower()
    normalized_level = level_map.get(assessed_level, assessed_level)

    raw_text = get_source_content(topic_tag=topic_tag, difficulty_level=normalized_level)

    # 5. Teacher Agent (Generates JSON paragraphs)
    teach_prompt = (
        f"Topic: {topic_tag}\n"
        f"Target Level: {normalized_level}\n"
        f"Reference Content:\n{raw_text[:4000]}"
    )
    raw_lesson = await execute_agent(teacher_runner, "teacher_app", f"{session_id}_teach", user_id, teach_prompt)
    lesson_data = clean_json_response(raw_lesson)

    # 6. Quiz Generator Agent (Generates JSON questions based on paragraphs)
    full_lesson_str = "\n\n".join(lesson_data.get("paragraphs", [])) + "\n\n" + lesson_data.get("takeaway_rule", "")
    quiz_prompt = f"Generate 10 multiple-choice questions based strictly on this lesson text:\n{full_lesson_str}"
    raw_quiz = await execute_agent(quiz_runner, "quiz_app", f"{session_id}_quiz", user_id, quiz_prompt)
    quiz_data = clean_json_response(raw_quiz)

    # Final Combined JSON Output
    return {
        "assessment": assess_data,
        "lesson": lesson_data,
        "quiz": quiz_data
    }

async def verify_summary(user_id: str, lesson_paragraphs: list, user_summary: str) -> dict:
    session_id = f"session_{user_id}_summary"
    prompt = f"Original Lesson:\n{json.dumps(lesson_paragraphs, indent=2)}\n\nStudent Summary:\n{user_summary}"
    raw_eval = await execute_agent(summary_runner, "summary_app", session_id, user_id, prompt)
    return clean_json_response(raw_eval)

# --- Direct File Execution Test ---
if __name__ == "__main__":
    async def main():
        # Pass path to any input JSON file directly
        output = await run_stage_assessment_and_teach("input_response.json")
        print(json.dumps(output, indent=2))

    asyncio.run(main())