from flask import Flask, request, jsonify
from prompt import super_agent

app = Flask(__name__)

# API endpoint to handle user requests
@app.route('/api/super_agent', methods=['POST'])
def handle_request():
    data = request.get_json()
    

    user_request = data.get('user_request')
    
    if not user_request:
        return jsonify({"error": "user_request is required"}), 400
    

    result = super_agent(user_request)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)