import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Map GOOGLE_API_KEY to GEMINI_API_KEY for ADK / Google GenAI SDK
if os.getenv("GOOGLE_API_KEY"):
    os.environ["GEMINI_API_KEY"] = os.getenv("GOOGLE_API_KEY")

from flaskr import create_app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)