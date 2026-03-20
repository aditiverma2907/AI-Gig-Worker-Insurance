# AI-Powered Parametric Insurance for Food Delivery Partners

## Problem Statement
India’s food delivery partners (Zomato, Swiggy) are a crucial part of the gig economy. Their income depends entirely on daily deliveries. However, external disruptions such as heavy rain, floods, extreme heat, and curfews can significantly reduce or completely stop their work.

Currently, there is no insurance system that protects their loss of income during such uncontrollable events. As a result, delivery workers bear the full financial risk.

---

## Objective
To build an AI-powered parametric insurance platform that protects food delivery partners against loss of income caused by external disruptions, with:
- Automated claim triggering
- Instant payouts
- Weekly-based premium model

---

## Target Persona
Food Delivery Partner (Zomato/Swiggy)

### Example Persona:
- Location: Chennai
- Working Hours: 8–10 hours/day
- Income Type: Per delivery
- Weekly Earnings: ₹3000–₹6000

---

## Problem Scenarios

### 1. Heavy Rainfall
- Rainfall exceeds 50mm
- Deliveries are delayed or cancelled
- Income loss: ₹300–₹800/day

### 2. Flooded Roads
- Waterlogging restricts movement
- Delivery apps reduce service areas
- Worker unable to operate

### 3. Extreme Heat
- Temperature above 40°C
- Reduced working hours due to health risks

### 4. Curfew / Strike
- Government-imposed restrictions
- No delivery operations allowed

---

## Proposed Solution
We propose an AI-enabled parametric insurance system that:
- Monitors real-time environmental conditions
- Automatically detects disruptions
- Triggers claims without user intervention
- Provides instant payouts for income loss

---

## System Workflow
1. User registers as a delivery partner  
2. Selects a weekly insurance plan  
3. System collects location and working zone  
4. AI calculates dynamic premium  
5. System continuously monitors:
   - Weather APIs  
   - Government alerts  
6. If disruption conditions are met:
   - Claim is automatically triggered  
7. Instant payout is processed  

---

## Weekly Premium Model

| Risk Level | Conditions | Weekly Premium |
|------------|----------|----------------|
| Low Risk | Minimal disruptions | ₹20/week |
| Medium Risk | Occasional rain | ₹40/week |
| High Risk | Flood-prone areas | ₹60/week |

### Dynamic Pricing (AI-Based)
- Premium adjusts based on:
  - Location risk
  - Historical weather data
  - Frequency of disruptions

---

## Parametric Triggers
Claims are triggered automatically based on predefined conditions:

- Rainfall > 50mm → ₹300 payout  
- Flood alert issued → ₹500 payout  
- Temperature > 42°C → ₹200 payout  
- Curfew declared → ₹400 payout  

Note: No manual claim process is required.

---

## AI/ML Integration

### 1. Risk Assessment
- Predicts high-risk zones
- Adjusts premium accordingly

### 2. Dynamic Pricing
- Weekly premium varies based on real-time risk factors

### 3. Fraud Detection
- Detects:
  - GPS spoofing
  - Duplicate claims
  - False activity reports

### 4. Predictive Analytics
- Forecasts:
  - Weather disruptions
  - High-risk time periods

---

## Integration Capabilities
- Weather API (OpenWeather API)
- Traffic Data (Mock APIs)
- Delivery Platform APIs (Simulated)
- Payment Gateway (Razorpay test mode)

---

## Platform Choice
Mobile Application

### Justification:
- Delivery workers rely on smartphones
- Enables real-time notifications
- Easy accessibility during work hours

---

## Tech Stack

### Frontend:
- Flutter / React Native

### Backend:
- Node.js / Python

### AI/ML:
- Python (Scikit-learn)

### Database:
- MongoDB / Firebase

### APIs:
- OpenWeather API
- Google Maps API

### Payments:
- Razorpay (Test Mode)

---

## Key Features
- Seamless onboarding for delivery partners  
- AI-based risk profiling  
- Weekly insurance policy creation  
- Automatic claim triggering  
- Instant payout system  
- Fraud detection mechanisms  
- Real-time monitoring dashboard  

---

## Future Enhancements
- Hyper-local weather prediction models  
- Personalized insurance plans  
- Integration with real delivery platforms  
- Advanced analytics dashboard for insurers  

---

## Conclusion
This solution provides a reliable financial safety net for food delivery partners by protecting their income against unpredictable external disruptions. By leveraging AI and parametric insurance models, the platform ensures fast, transparent, and automated claim processing, improving financial security for gig workers.
