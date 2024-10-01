# backend/app.py
import os
import streamlit as st
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

# Initialize the OpenAI client
client = OpenAI()

def get_career_advice(prompt):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return completion.choices[0].message['content'].strip()

# Streamlit app layout
st.title('AI Career Guidance')
user_input = st.text_input("Enter your career question:")
if user_input:
    advice = get_career_advice(user_input)
    st.write(advice)
