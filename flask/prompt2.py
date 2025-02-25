from flask import Flask, request, jsonify
import pandas as pd
import openai
import os

# Load complaint data
file_path = "/mnt/data/final_complaints.csv"
df = pd.read_csv(file_path)

# Set OpenAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(_name_)

# Function to classify complaint using OpenAI GPT
def classify_complaint(user_input):
    complaint_types = df["Civil Problem"].unique().tolist()
    
    prompt = f"""
    Classify the following complaint into one of these categories: {', '.join(complaint_types)}.
    Complaint: "{user_input}"
    Return only the category name.
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "You are an AI that categorizes complaints."},
                  {"role": "user", "content": prompt}]
    )
    
    return response["choices"][0]["message"]["content"].strip()

# Function to find relevant authority
def get_government_body(complaint_type, city):
    row = df[df["Civil Problem"] == complaint_type]
    if not row.empty and city in df.columns:
        return row[city].values[0]
    return "Relevant authority not found."

# Function to generate a registered complaint letter
def generate_letter(user_name, user_address, complaint, complaint_type, authority, city):
    letter_template = """
    From:
    {user_name}
    {user_address}
    
    To:
    {authority}
    {city}
    
    Subject: Complaint Regarding {complaint_type}
    
    Dear Sir/Madam,
    
    I am writing to formally bring to your attention the issue of {complaint} in {city}. 
    This matter requires immediate intervention, as it has been causing inconvenience to the residents. 
    
    Kindly take the necessary action at the earliest.
    
    Sincerely,
    {user_name}
    """
    return letter_template

# API endpoint to handle user requests
@app.route('/api/complaint', methods=['POST'])
def handle_complaint():
    data = request.get_json()
    user_name = data.get("user_name")
    user_address = data.get("user_address")
    user_request = data.get("user_request")
    city = data.get("city")
    
    if not all([user_name, user_address, user_request, city]):
        return jsonify({"error": "All fields (user_name, user_address, user_request, city) are required"}), 400
    
    complaint_type = classify_complaint(user_request)
    authority = get_government_body(complaint_type, city)
    letter = generate_letter(user_name, user_address, user_request, complaint_type, authority, city)
    
    response = {
        "complaint": user_request,
        "detected_complaint_type": complaint_type,
        "city": city,
        "relevant_government_body": authority,
        "registered_letter": letter
    }
    
    return jsonify(response)

if _name_ == '_main_':
    app.run(debug=True)