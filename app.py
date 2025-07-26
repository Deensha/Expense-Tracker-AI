from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS to allow React frontend to access this backend

# In-memory storage for expenses (reset when server restarts)
expenses = []

@app.route('/api/add-expense', methods=['POST'])
def add_expense():
    data = request.json
    data['date'] = datetime.now().strftime('%d/%m/%Y')  # Add current date
    expenses.append(data)

    # Calculate total expenses
    total_spent = sum(int(e['amount']) for e in expenses)

    # AI suggestion logic
    suggestion = ""
    if total_spent > 5000:
        suggestion = "⚠️ You're spending too much! Try saving more."

    return jsonify({"expenses": expenses, "suggestion": suggestion})

if __name__ == '__main__':
    app.run(debug=True)
