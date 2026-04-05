"""
ML Module API Server
Exposes risk prediction and fraud detection models via REST API
"""

from flask import Flask, request, jsonify
import json
from models import predict_user_risk, detect_claim_fraud

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Health check endpoint
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ML API is running', 'version': '1.0'})

# Risk Prediction Endpoint
@app.route('/api/risk/predict', methods=['POST'])
def predict_risk():
    """
    Predict risk score for a user
    
    Expected JSON:
    {
        "location": {"city": "Mumbai"},
        "weather_history": {"avg_rainfall": 50, "avg_temperature": 35},
        "claim_history": {"total_claims": 2, "approval_rate": 0.9, "fraudulent": 0}
    }
    """
    try:
        user_data = request.json
        
        if not user_data:
            return jsonify({'error': 'No data provided'}), 400
        
        result = predict_user_risk(user_data)
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Fraud Detection Endpoint
@app.route('/api/fraud/detect', methods=['POST'])
def detect_fraud():
    """
    Detect fraud in a claim
    
    Expected JSON:
    {
        "claim_data": {
            "trigger_type": "rainfall",
            "trigger_value": 55,
            "location": {"latitude": 19.076, "longitude": 72.8777}
        },
        "user_history": {
            "total_claims": 1,
            "approved_claims": 1,
            "recent_claims": [],
            "last_claim": null
        }
    }
    """
    try:
        data = request.json
        
        if not data or 'claim_data' not in data or 'user_history' not in data:
            return jsonify({'error': 'Missing claim_data or user_history'}), 400
        
        claim_data = data.get('claim_data')
        user_history = data.get('user_history')
        
        result = detect_claim_fraud(claim_data, user_history)
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Batch Risk Prediction
@app.route('/api/risk/batch', methods=['POST'])
def batch_predict_risk():
    """
    Predict risk for multiple users
    
    Expected JSON:
    {
        "users": [
            {...user_data...},
            {...user_data...}
        ]
    }
    """
    try:
        data = request.json
        users = data.get('users', [])
        
        results = []
        for user_data in users:
            result = predict_user_risk(user_data)
            results.append(result)
        
        return jsonify({
            'total_users': len(users),
            'results': results,
            'timestamp': datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
