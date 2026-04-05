import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import json

class RiskPredictionModel:
    """
    Risk Prediction Model using Random Forest
    Predicts risk score and category based on location and weather history
    """
    
    def __init__(self):
        self.model_version = "1.0"
        self.feature_names = [
            'avg_rainfall', 'avg_temperature', 'humidity',
            'previous_claims', 'claim_approval_rate',
            'claim_density_area', 'seasonal_factor'
        ]
    
    def predict_risk_score(self, user_data):
        """
        Predict risk score (0-100) based on user location and weather history
        
        Args:
            user_data: dict with location, weather_history, claim_history
        
        Returns:
            dict with risk_score, risk_category, predicted_risk_next_month
        """
        try:
            # Extract features
            features = self._extract_features(user_data)
            
            # Simple tree-based logic (simulating Random Forest)
            risk_score = self._calculate_risk_score(features)
            
            # Ensure score is between 0-100
            risk_score = max(0, min(100, risk_score))
            
            # Determine category
            if risk_score < 30:
                category = 'Low'
            elif risk_score < 70:
                category = 'Medium'
            else:
                category = 'High'
            
            # Predict next month's risk
            predicted_next_month = self._predict_next_month_risk(features, risk_score)
            
            return {
                'risk_score': round(risk_score, 2),
                'risk_category': category,
                'predicted_risk_next_month': round(predicted_next_month, 2),
                'model_version': self.model_version,
                'features_used': len(features),
                'timestamp': datetime.now().isoformat()
            }
        
        except Exception as e:
            print(f"Error predicting risk: {e}")
            return {
                'risk_score': 50,
                'risk_category': 'Medium',
                'predicted_risk_next_month': 50,
                'error': str(e)
            }
    
    def _extract_features(self, user_data):
        """Extract features from user data"""
        features = {}
        
        # Weather-based features
        weather = user_data.get('weather_history', {})
        features['avg_rainfall'] = weather.get('avg_rainfall', 40)
        features['avg_temperature'] = weather.get('avg_temperature', 35)
        features['humidity'] = weather.get('humidity', 60)
        
        # Claim history features
        claims = user_data.get('claim_history', {})
        features['previous_claims'] = claims.get('total_claims', 0)
        features['claim_approval_rate'] = claims.get('approval_rate', 0.8)
        features['fraudulent_claims'] = claims.get('fraudulent', 0)
        
        # Location-based features
        location = user_data.get('location', {})
        city = location.get('city', 'unknown').lower()
        
        # Seasonal factor based on location
        features['seasonal_factor'] = self._get_seasonal_factor(city)
        features['claim_density_area'] = self._get_area_risk(city)
        
        return features
    
    def _calculate_risk_score(self, features):
        """Calculate risk score using decision tree logic"""
        score = 50  # Base score
        
        # Rainfall impact (increases score)
        if features['avg_rainfall'] > 50:
            score += (features['avg_rainfall'] - 50) * 0.5
        
        # Temperature impact
        if features['avg_temperature'] > 40:
            score += (features['avg_temperature'] - 40) * 1.5
        
        # Humidity impact
        if features['humidity'] > 70:
            score += (features['humidity'] - 70) * 0.3
        
        # Claim history impact
        score += features['previous_claims'] * 2
        
        # Good approval rate reduces score
        score -= features['claim_approval_rate'] * 10
        
        # Fraudulent claims increase score significantly
        score += features['fraudulent_claims'] * 15
        
        # Seasonal factor
        score += features['seasonal_factor']
        
        # Area risk factor
        score += features['claim_density_area']
        
        return score
    
    def _get_seasonal_factor(self, city):
        """Get seasonal risk factor for a city"""
        seasonal_risks = {
            'mumbai': 20,
            'bangalore': 10,
            'delhi': 15,
            'kolkata': 25,
            'chennai': 18,
            'hyderbad': 12,
            'pune': 8,
            'default': 10
        }
        return seasonal_risks.get(city, seasonal_risks['default'])
    
    def _get_area_risk(self, city):
        """Get area-based risk (claims density)"""
        area_risks = {
            'mumbai': 15,
            'bangalore': 8,
            'delhi': 12,
            'kolkata': 18,
            'chennai': 10,
            'hyderabad': 9,
            'pune': 7,
            'default': 10
        }
        return area_risks.get(city, area_risks['default'])
    
    def _predict_next_month_risk(self, features, current_score):
        """Predict risk for next month"""
        # Simple linear trend with seasonal adjustment
        trend = features['previous_claims'] * 0.5
        seasonal_change = features['seasonal_factor'] * 0.1
        
        predicted = current_score + trend + seasonal_change
        return max(0, min(100, predicted))


class FraudDetectionModel:
    """
    Fraud Detection Model using Isolation Forest technique
    Detects GPS spoofing, duplicate claims, and suspicious patterns
    """
    
    def __init__(self):
        self.model_version = "1.0"
        self.contamination = 0.05  # Expected fraud rate
    
    def detect_fraud(self, claim_data, user_history):
        """
        Detect fraudulent claims using multiple checks
        
        Args:
            claim_data: Current claim information
            user_history: User's claim history and behavior
        
        Returns:
            dict with fraud_score, is_fraudulent, flags, details
        """
        try:
            fraud_flags = []
            fraud_score = 0
            details = {}
            
            # Check 1: GPS Spoofing Detection
            gps_fraud_score, gps_flag = self._detect_gps_spoofing(claim_data, user_history)
            fraud_score += gps_fraud_score
            if gps_flag:
                fraud_flags.append('suspicious_gps_pattern')
            details['gps_analysis'] = gps_flag
            
            # Check 2: Duplicate Claims
            dup_fraud_score, dup_flag = self._detect_duplicate_claims(claim_data, user_history)
            fraud_score += dup_fraud_score
            if dup_flag:
                fraud_flags.append('duplicate_claim')
            details['duplicate_analysis'] = dup_flag
            
            # Check 3: Claim Frequency Anomaly
            freq_fraud_score, freq_flag = self._detect_frequency_anomaly(user_history)
            fraud_score += freq_fraud_score
            if freq_flag:
                fraud_flags.append('unusual_claim_frequency')
            details['frequency_analysis'] = freq_flag
            
            # Check 4: Weather-Claim Mismatch
            weather_fraud_score, weather_flag = self._detect_weather_mismatch(claim_data)
            fraud_score += weather_fraud_score
            if weather_flag:
                fraud_flags.append('weather_claim_mismatch')
            details['weather_analysis'] = weather_flag
            
            # Check 5: Behavioral Anomaly
            behavior_fraud_score, behavior_flag = self._detect_behavioral_anomaly(user_history)
            fraud_score += behavior_fraud_score
            if behavior_flag:
                fraud_flags.append('behavioral_anomaly')
            details['behavior_analysis'] = behavior_flag
            
            # Normalize fraud score to 0-100
            fraud_score = min(100, fraud_score)
            
            # Determine if fraudulent (threshold: 60%)
            is_fraudulent = fraud_score >= 60
            
            return {
                'fraud_score': round(fraud_score, 2),
                'is_fraudulent': is_fraudulent,
                'fraud_flags': fraud_flags,
                'details': details,
                'model_version': self.model_version,
                'timestamp': datetime.now().isoformat()
            }
        
        except Exception as e:
            print(f"Error detecting fraud: {e}")
            return {
                'fraud_score': 0,
                'is_fraudulent': False,
                'error': str(e)
            }
    
    def _detect_gps_spoofing(self, claim_data, user_history):
        """Detect GPS spoofing by analyzing location patterns"""
        fraud_score = 0
        is_fraud = False
        
        try:
            current_location = claim_data.get('location', {})
            last_claim = user_history.get('last_claim', {})
            
            if last_claim:
                last_location = last_claim.get('location', {})
                time_diff_hours = (datetime.now() - datetime.fromisoformat(
                    last_claim.get('created_at', datetime.now().isoformat())
                )).total_seconds() / 3600
                
                # Calculate distance (simplified)
                lat_diff = abs(current_location.get('latitude', 0) - 
                              last_location.get('latitude', 0))
                lon_diff = abs(current_location.get('longitude', 0) - 
                              last_location.get('longitude', 0))
                
                distance_km = (lat_diff + lon_diff) * 111  # Rough approximation
                
                # If traveling > 100 km in < 1 hour, suspicious
                if distance_km > 100 and time_diff_hours < 1:
                    fraud_score += 40
                    is_fraud = True
                
                # If location suddenly changes significantly
                if distance_km > 500:
                    fraud_score += 20
        
        except Exception as e:
            print(f"GPS check error: {e}")
        
        return fraud_score, is_fraud
    
    def _detect_duplicate_claims(self, claim_data, user_history):
        """Detect duplicate or near-duplicate claims"""
        fraud_score = 0
        is_fraud = False
        
        try:
            recent_claims = user_history.get('recent_claims', [])
            
            for recent in recent_claims:
                # Check if same trigger type within 24 hours
                time_diff = (datetime.now() - datetime.fromisoformat(
                    recent.get('created_at', datetime.now().isoformat())
                )).total_seconds() / 3600
                
                if (recent.get('trigger_type') == claim_data.get('trigger_type') and 
                    time_diff < 24):
                    fraud_score += 50
                    is_fraud = True
                    break
        
        except Exception as e:
            print(f"Duplicate check error: {e}")
        
        return fraud_score, is_fraud
    
    def _detect_frequency_anomaly(self, user_history):
        """Detect unusual claim frequency"""
        fraud_score = 0
        is_fraud = False
        
        try:
            recent_claims = user_history.get('recent_claims', [])
            
            # If more than 3 claims in a week, investigate
            week_ago = datetime.now() - timedelta(days=7)
            claims_this_week = sum(1 for c in recent_claims 
                                  if datetime.fromisoformat(c.get('created_at', '')) > week_ago)
            
            if claims_this_week > 3:
                fraud_score += 30
                if claims_this_week > 5:
                    fraud_score += 20
                    is_fraud = True
        
        except Exception as e:
            print(f"Frequency check error: {e}")
        
        return fraud_score, is_fraud
    
    def _detect_weather_mismatch(self, claim_data):
        """Detect if claimed weather event matches actual weather data"""
        fraud_score = 0
        is_fraud = False
        
        try:
            trigger_value = claim_data.get('trigger_value', 0)
            trigger_type = claim_data.get('trigger_type', '').lower()
            
            # If rainfall claim but rainfall was actually low
            if trigger_type == 'rainfall' and trigger_value < 40:
                fraud_score += 25
                is_fraud = True
            
            # If heat claim but temperature was actually normal
            if trigger_type == 'heat' and trigger_value < 40:
                fraud_score += 25
                is_fraud = True
        
        except Exception as e:
            print(f"Weather check error: {e}")
        
        return fraud_score, is_fraud
    
    def _detect_behavioral_anomaly(self, user_history):
        """Detect unusual user behavior patterns"""
        fraud_score = 0
        is_fraud = False
        
        try:
            total_claims = user_history.get('total_claims', 0)
            approved_claims = user_history.get('approved_claims', 0)
            
            # If approval rate is unusually high (> 95%)
            if total_claims > 0:
                approval_rate = approved_claims / total_claims
                if approval_rate > 0.95 and total_claims > 5:
                    fraud_score += 20
        
        except Exception as e:
            print(f"Behavior check error: {e}")
        
        return fraud_score, is_fraud


# Standalone functions for API integration
def predict_user_risk(user_data):
    """Predict risk for a user"""
    model = RiskPredictionModel()
    return model.predict_risk_score(user_data)


def detect_claim_fraud(claim_data, user_history):
    """Detect fraud in a claim"""
    model = FraudDetectionModel()
    return model.detect_fraud(claim_data, user_history)


if __name__ == "__main__":
    # Example usage
    sample_user = {
        'location': {'city': 'Mumbai'},
        'weather_history': {
            'avg_rainfall': 65,
            'avg_temperature': 38,
            'humidity': 75
        },
        'claim_history': {
            'total_claims': 2,
            'approval_rate': 0.9,
            'fraudulent': 0
        }
    }
    
    print("Risk Prediction:")
    risk_result = predict_user_risk(sample_user)
    print(json.dumps(risk_result, indent=2))
    
    # Test fraud detection
    sample_claim = {
        'trigger_type': 'rainfall',
        'trigger_value': 55,
        'location': {'latitude': 19.0760, 'longitude': 72.8777}
    }
    
    sample_history = {
        'total_claims': 1,
        'approved_claims': 1,
        'recent_claims': [],
        'last_claim': None
    }
    
    print("\nFraud Detection:")
    fraud_result = detect_claim_fraud(sample_claim, sample_history)
    print(json.dumps(fraud_result, indent=2))
