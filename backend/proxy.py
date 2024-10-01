from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize OpenAI client
api_key = os.getenv("OPENAI_API_KEY")  # Get the API key from the environment variables
client = OpenAI(api_key=api_key)  # Pass the API key to the OpenAI client

@app.route('/api/career_advice', methods=['POST'])
def career_advice():
    data = request.json
    print("Received data:", data)  # Log received data
    
    user_question = data.get('question')
    if not user_question:
        print("No question provided")  # Log if no question is provided
        return jsonify({"error": "No question provided"}), 400

    try:
        # Define the system prompt for career guidance
        system_prompt = (
            "You are a career guidance assistant. Your role is to provide helpful, insightful, and empathetic responses to users seeking advice on career-related topics. "
            "You should encourage users to explore their options and provide practical steps they can take to achieve their career goals. "
            "Always ensure your responses are positive and informative, aiming to empower the user with knowledge and suggestions."
        )
        
        # Attempt to call the OpenAI API
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_question}
            ]
        )

        # Check if choices are returned
        if not completion.choices:
            return jsonify({"error": "No response from OpenAI"}), 500

        # Access the content of the first choice
        answer = completion.choices[0].message.content.strip()  # Use dot notation
        return jsonify({"advice": answer})

    except Exception as e:
        print("Error during OpenAI API call:", str(e))  # Log any exceptions
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


