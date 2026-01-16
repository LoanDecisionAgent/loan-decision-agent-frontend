# API Contract

This document defines the API contract for the LoanDecisionAgent frontend.

## Endpoints

### `POST /api/score`

This endpoint is used to submit a loan application for scoring.

**Request Body:**

```json
{
  "age": 35,
  "income": 5500,
  "loanamount": 12000,
  "interestrate": 0.08,
  "loanterm": 36,
  "dtiratio": 0.18,
  "employmenttype": "Salaried",
  "maritalstatus": "Single",
  "loanpurpose": "Education",
  "hasdependents": 0
}
```

**Request Body Schema:**

| Field              | Type    | Description                                    | Required |
| ------------------ | ------- | ---------------------------------------------- | -------- |
| `age`              | number  | The applicant's age.                           | Yes      |
| `income`           | number  | The applicant's monthly income.                | Yes      |
| `loanamount`       | number  | The amount of money being requested.           | Yes      |
| `interestrate`     | number  | The interest rate of the loan (e.g., 0.08 for 8%). | Yes  |
| `loanterm`         | integer | The number of months for the loan term.       | Yes      |
| `dtiratio`         | number  | Debt-to-income ratio (e.g., 0.18 for 18%).    | Yes      |
| `employmenttype`   | string  | Employment type (e.g., "Salaried", "Self-Employed"). | Yes |
| `maritalstatus`    | string  | Marital status (e.g., "Single", "Married").   | Yes      |
| `loanpurpose`      | string  | Purpose of the loan (e.g., "Education", "Home"). | Yes   |
| `hasdependents`    | number  | Number of dependents (0 or 1).                | Yes      |

**Success Response (200 OK):**

```json
{
  "default_probability": 0.48,
  "risk_band": "MEDIUM",
  "model_decision": "APPROVE",
  "top_factors": ["income", "dtiratio", "loanamount"]
}
```

**Response Body Schema:**

| Field                 | Type    | Description                               |
| --------------------- | ------- | ----------------------------------------- |
| `default_probability` | number  | The probability of the applicant defaulting on the loan (0.0 to 1.0). |
| `risk_band`           | string  | Risk classification: "LOW", "MEDIUM", or "HIGH". |
| `model_decision`      | string  | The loan decision: "APPROVE" or "REJECT". |
| `top_factors`         | array   | An array of strings indicating the top factors influencing the decision. |

**Error Response (4xx/5xx):**

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "The provided input is invalid."
  }
```

**Error Response Schema:**

| Field     | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `error`   | object | Error object containing details. |
| `error.code` | string | Error code (e.g., "INVALID_INPUT", "NETWORK_ERROR"). |
| `error.message` | string | Human-readable error message. |

## Environment Configuration

The frontend uses the `NEXT_PUBLIC_API_BASE_URL` environment variable to configure the backend API base URL.

Example:
```
NEXT_PUBLIC_API_BASE_URL=http://backend:3001
```

**Note:** The frontend is API-first and does not contain any backend or ML logic. All interactions must go through HTTP APIs only.
