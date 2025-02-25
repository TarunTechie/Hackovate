from flask import Flask, request, jsonify, send_file  # Flask for API and file handling
import pandas as pd  # To handle complaint data (if required)
import openai  # For complaint classification using OpenAI API
import os  # To handle environment variables
from reportlab.lib.pagesizes import letter  # For PDF page formatting
from reportlab.pdfgen import canvas  # To generate the PDF
from datetime import datetime  # To add date to the file

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
    date = datetime.now().strftime("%Y-%m-%d")
    letter_template = f"""
    Date: {date}
    
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

# Function to generate PDF
def generate_pdf(content):
    date_str = datetime.now().strftime("%Y-%m-%d")
    filename = f"complaint_letter_{date_str}.pdf"
    pdf_path = f"/mnt/data/{filename}"
    c = canvas.Canvas(pdf_path, pagesize=letter)
    c.setFont("Helvetica", 12)
    y = 750
    
    for line in content.split("\n"):
        c.drawString(50, y, line)
        y -= 20
    
    c.save()
    return filename, pdf_path

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
    pdf_path = generate_pdf(letter)
    
    response = {
        "complaint": user_request,
        "detected_complaint_type": complaint_type,
        "city": city,
        "relevant_government_body": authority,
        "registered_letter": letter,
        "download_pdf": f"/api/download_pdf?filename={filename}"
    }
    
    return jsonify(response)

# API endpoint to download PDF
@app.route('/api/download_pdf', methods=['GET'])
def download_pdf():
    filename = request.args.get("filename", "complaint_letter.pdf")
    pdf_path = f"/mnt/data/{filename}"
    return send_file(pdf_path, as_attachment=True)



if _name_ == '_main_':
    app.run(debug=True)