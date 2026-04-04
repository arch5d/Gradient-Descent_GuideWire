<div align="center">

# 🛡️ GigGuard AI

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](#)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](#)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)](#)
[![Guidewire](https://img.shields.io/badge/Guidewire-Integration-orange?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-Scale_MVP-success?style=for-the-badge)](#)

*A full-stack, intelligent parametric income protection platform for gig workers.*

</div>

---

## 🌟 Overview

**GigGuard AI** is now a full-stack MVP for parametric income protection. Moving from a frontend-only prototype to a functional, backend-enabled implementation, the repository now features autonomous trigger detection, policy exclusion enforcement, and AI-driven risk scoring.

The repository includes:
- **React/Tailwind Frontend Dashboard** *(UI for policies & claims)*
- **Node.js/Express Backend** *(Trigger validation, claim decisioning, Guidewire payload mapping)*
- **Python Scikit-Learn Microservice** *(Predictive risk scoring using freelancer gig history)*

## ✨ What Changed

- **Parametric Logic:** Trigger service simulates external event data and automates payout flags when income drop is >= 40%.
- **Domain Credibility:** Policy engine strictly blocks approvals for exclusions like war, pandemic, and 
uclearHazard.
- **Guidewire Integration Scaffold:** Backend seamlessly maps internal Claim Objects to a Guidewire-compatible InsuranceSuite structure.
- **AI Logic Integration:** Backend queries a Python Scikit-Learn script to calculate and append an algorithmic 
iskScore.

---

## 🏗️ Architecture

`mermaid
graph TD;
    A[Frontend React + Vite] -->|HTTP POST| B(Backend API Express)
    B --> C{TriggerService}
    B --> D{PolicyEngine}
    B --> E{ClaimService}
    B --> F{GuidewireClient}
    B --> G{RiskScoringService}
    G -->|spawn | H[Python: risk_model_service.py]
    H -.->|JSON riskScore| G
    C -.->|40% Parametric Check| E
    D -.->|War/Pandemic Exclusions| E
`

---

## 🚦 Quick Start

### **1. Prerequisites**
- Node.js 20+
- Python 3.10+
- pip (for Python dependency installation)

### **2. Environment Variables**
Create a .env file in the project root:
`env
BACKEND_PORT=4000
PYTHON_BIN=python
GUIDEWIRE_API_BASE_URL=https://guidewire.example.invalid
GUIDEWIRE_API_TOKEN=replace-me
`

### **3. Installation**
`ash
#### Install Node dependencies
npm install

#### Install Python dependencies
pip install -r backend/python/requirements.txt
`

### **4. Execution**
`ash
#### Start Frontend and Backend simultaneously
npm run dev:full

#### Or start Backend only
npm run start:backend
`

---

## 📡 API Specification (V1)

### GET /api/health
Returns the operational status of the backend logic.

### POST /api/risk/predict
Generates a predictive risk score utilizing the Python Scikit-Learn regression model.

**Payload:**
`json
{
  "gigHistory": {
    "weeklyJobsCompleted": 44,
    "onTimeRate": 0.92,
    "cancellationRate": 0.07,
    "incomeVolatility": 0.24
  }
}
`

### POST /api/claims/evaluate
The orchestration endpoint evaluating the **Trigger -> Exclusion -> Risk -> Mapping** pipeline.

**Payload:**
`json
{
  "policyId": "POLICY-9001",
  "freelancer": {
    "freelancerId": "FR-1001",
    "fullName": "Aarav Sharma",
    "gigHistory": {
      "weeklyJobsCompleted": 42,
      "onTimeRate": 0.91,
      "cancellationRate": 0.09,
      "incomeVolatility": 0.28
    }
  },
  "event": {
    "baselineIncome": 5000,
    "currentIncome": 2800,
    "exclusions": {
      "war": false,
      "pandemic": false,
      "nuclearHazard": false
    }
  }
}
`

**Decision Rules:**
1. **Trigger Mechanism:** Claim payout triggers if (baseline - current) / baseline >= 0.40.
2. **Approval Gate:** Claim is auto-rejected if **any** exclusion flag (war, pandemic, 
uclearHazard) is true.
3. **Auto-flagging:** Returns FLAGGED_FOR_PAYOUT strictly when the parametric trigger succeeds and all exclusions pass.

---

## 📂 Repository Layout

`	ext
backend/
  ├── python/
  │   ├── requirements.txt
  │   └── risk_model_service.py
  ├── src/
  │   ├── app.js
  │   ├── server.js
  │   ├── controllers/
  │   │   └── claimController.js
  │   ├── integrations/
  │   │   ├── GuidewireClaimMapper.js
  │   │   └── GuidewireClient.js
  │   ├── routes/
  │   │   └── claimRoutes.js
  │   └── services/
  │       ├── ClaimService.js
  │       ├── PolicyEngine.js
  │       ├── RiskScoringService.js
  │       └── TriggerService.js
src/
  ├── App.jsx
  ├── index.css
  └── main.jsx
...
`

---

## 🏛 Clean Code & Actuarial Philosophy

> *"GigGuard AI is built on the principle of Zero-Friction Indemnity. By automating the 'Trigger-to-Payment' pipeline, we reduce administrative overhead while maintaining strict adherence to enterprise risk exclusions."*

- **Service-Oriented Structure:** Business logic is fully encapsulated.
- **Thin Controllers & Routes:** HTTP networking separate from policy decision-making.
- **Isolated Integrations:** Guidewire data mapping logic has zero crossover with claim exclusion rules. This keeps logic explicit, maintainable, and verifiable across scaling epochs.

<br>

<div align="center">
  <b>GigGuard AI MVP - Developed for Next Gen Insurance Tech</b>
</div>
