from flask import Flask, request, jsonify,send_file
from prompt import super_agent
from reportlab.lib.pagesizes import letter  # For PDF page formatting
from reportlab.pdfgen import canvas  # To generate the PDF
from datetime import datetime
import os

app = Flask(__name__)

PDF_FOLDER = os.path.join(os.getcwd(), "complain_letter")  # Uses current directory
os.makedirs(PDF_FOLDER, exist_ok=True)

# API endpoint to handle user requests
@app.route('/api/super_agent', methods=['POST'])
def handle_request():
    data = request.get_json()
    

    user_request = data.get('user_request')
    city = data.get('city')
    state = data.get('state')
    user_name = data.get('user_name')
    user_address = data.get('user_address')
    
    if not user_request:
        return jsonify({"error": "user_request is required"}), 400
    

    obj = super_agent(user_request, city, state, user_name, user_address)
    pdf_path=generate_pdf(obj["full_letter"])
    print(obj)
    obj["pdf_path"] = pdf_path
    
    # Prepare the JSON structure with markdown formatting
    return jsonify (obj)



@app.route('/api/download_pdf', methods=['GET'])
def download_pdf():
    filename = request.args.get("filename", "complaint_letter.pdf")
    return send_file(filename, as_attachment=True)

def generate_pdf(content):
    
    date_str = datetime.now().strftime("%Y-%m-%H%M%S")
    filename = f"complaint_letter_{date_str}.pdf"
    pdf_path = os.path.join(PDF_FOLDER,filename)
    c = canvas.Canvas(pdf_path, pagesize=letter)
    c.setFont("Helvetica", 12)
    y = 750
    
    for line in content.split("\n"):
        c.drawString(50, y, line)
        y -= 20
    
    c.save()
    return pdf_path

if __name__ == '__main__':
    app.run(debug=True)