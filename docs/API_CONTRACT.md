# API Contract

This document defines the API contract for the LoanDecisionAgent frontend.

## Endpoints

### `POST /api/score`

This endpoint is used to submit a loan application for scoring.

**Request Body:**

```json
{
  "income": 5000,
  "requested_amount": 10000,
  "term_months": 24,
  "interest_rate": 5.5
}
```

**Request Body Schema:**

| Field              | Type    | Description                            | Required |
| ------------------ | ------- | -------------------------------------- | -------- |
| `income`           | number  | The applicant's monthly income.        | Yes      |
| `requested_amount` | number  | The amount of money being requested.   | Yes      |
| `term_months`      | integer | The number of months for the loan term.| Yes      |
| `interest_rate`    | number  | The annual interest rate of the loan.  | Yes      |

**Success Response (200 OK):**

```json
{
  "app_id": "e7a8c9b0-f1d2-4e3a-8b6c-5d4e3f2a1b0c",
  "scorecard": {
    "trust_score": 850,
    "default_probability": 0.15,
    "affordability": {
      "monthly_payment": 441.05,
      "max_loan_amount": 12000
    },
    "anomaly_flag": false,
    "decision": "Approved",
    "reasons": [
      { "feature": "income", "impact": 0.5 },
      { "feature": "debt_to_income_ratio", "impact": -0.2 }
    ]
  },
  "audit": {
    "model_version": "v1.2.3",
    "timestamp": "2025-02-12T10:00:00Z"
  }
}
```

**Response Body Schema:**

| Field                 | Type    | Description                               |
| --------------------- | ------- | ----------------------------------------- |
| `app_id`              | string  | A unique identifier for the application.  |
| `scorecard`           | object  | The main scorecard object.                |
| `scorecard.trust_score` | number  | A score indicating the trustworthiness of the applicant. |
| `scorecard.default_probability` | number | The probability of the applicant defaulting on the loan. |
| `scorecard.affordability` | object | Affordability calculation results. |
| `scorecard.affordability.monthly_payment` | number | The calculated monthly payment for the requested loan. |
| `scorecard.affordability.max_loan_amount` | number | The maximum loan amount the applicant can afford. |
| `scorecard.anomaly_flag` | boolean | A flag indicating if any anomalies were detected. |
| `scorecard.decision` | string | The loan decision ('Approved', 'Rejected', 'Manual Review'). |
| `scorecard.reasons` | array   | An array of objects explaining the top factors for the decision. |
| `audit`               | object  | Auditing information.                     |
| `audit.model_version` | string  | The version of the model used for scoring. |
| `audit.timestamp`     | string  | The timestamp of when the score was generated. |

**Error Response (4xx/5xx):**

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "The provided input is invalid."
  }
}
```
