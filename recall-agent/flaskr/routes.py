import asyncio
from flask import Blueprint, request, jsonify
from recall.agent import run_stage_assessment_and_teach
# from recall.db import save_diagnostic_result

api_bp = Blueprint('api', __name__)

@api_bp.route('/agent/evaluate-and-teach', methods=['POST'])
def evaluate_and_teach():
    payload = request.get_json()

    if not payload:
        return jsonify({"success": False, "error": "No JSON payload provided"}), 400

    user_id = payload.get("user_id")
    subject_id = payload.get("subject_id")
    score = payload.get("score", 0)

    try:
        # Run the async agent function synchronously inside Flask
        ai_assessment = asyncio.run(run_stage_assessment_and_teach(payload))

        # Save result to MongoDB
        '''save_diagnostic_result(
            user_id=user_id,
            subject_id=subject_id,
            score=score,
            assessment=ai_assessment
        )'''

        return jsonify({
            "success": True,
            "data": ai_assessment
        }), 200

    except Exception as e:
        print(f"Error in route execution: {e}")
        return jsonify({"success": False, "error": str(e)}), 500