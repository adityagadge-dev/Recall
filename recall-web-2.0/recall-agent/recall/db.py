import os
import certifi
from bson import ObjectId
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(
    os.getenv("MONGO_URI"),
    tlsCAFile=certifi.where()
)
db = client["Gamified_edu"]

if __name__ == "__main__":
    print(db.subjects.count_documents({}))

def get_subject_by_name(subject_name: str):
    """Finds subject document by name (case-insensitive)."""
    return db.subjects.find_one({"name": {"$regex": f"^{subject_name}$", "$options": "i"}})

def get_diagnostic_quiz(subject_name: str):
    """Fetches the 5 diagnostic questions and answer key for a subject."""
    subject = get_subject_by_name(subject_name)
    if not subject:
        return None, []
    
    quiz_doc = db.diagnostic_quizzes.find_one({"subject_id": subject["_id"]})
    if not quiz_doc:
        return None, []
    
    questions = quiz_doc.get("questions", [])
    answer_key = [q["correct_option"] for q in questions]
    return questions, answer_key

def get_source_content(topic_tag: str, difficulty_level: str):
    """Fetches raw text chunks matching the topic and assessed difficulty."""
    # Ensure lowercase to match DB ("beginner", "intermediate", "advanced")
    difficulty = difficulty_level.lower()
    
    cursor = db.source_content.find({
        "topic_tag": {"$regex": f"^{topic_tag}$", "$options": "i"},
        "difficulty_level": difficulty
    }).sort("chunk_order", 1)
    
    chunks = [doc["raw_text_chunk"] for doc in cursor]
    
    # Fallback: If no exact difficulty match, fetch any chunks for this topic
    if not chunks:
        fallback_cursor = db.source_content.find({
            "topic_tag": {"$regex": f"^{topic_tag}$", "$options": "i"}
        }).sort("chunk_order", 1)
        chunks = [doc["raw_text_chunk"] for doc in fallback_cursor]
        
    return "\n\n".join(chunks)