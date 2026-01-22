# LoanDecisionAgent End-to-End Demo Walkthrough

This guide will help you verify the integration of the Frontend with the Backend.

## Prerequisites

1.  **Backend Running**: Ensure the backend services are running.
    *   URL: `http://localhost:3001`
    *   Swagger Docs: `http://localhost:3001/api/docs`
2.  **Frontend Running**:
    *   Run `npm run dev` in the `frontend` directory.
    *   URL: `http://localhost:3000`

## Walkthrough Steps

### 1. Authentication
1.  Navigate to `http://localhost:3000/signup`.
2.  Create a new account (e.g., Role: Vendor).
    *   Fill in Name, Email, Password, Organization.
    *   Click **Create Account**.
3.  You should be automatically redirected to the Dashboard.
4.  *Verification*: You can check `http://localhost:3000/dashboard` and see your name in the sidebar.

### 2. Loan Scoring (Single Application)
1.  Click **Score New Application** (or go to `/score`).
2.  Fill in the loan application details (Income, Loan Amount, etc.).
3.  Click **Submit for Scoring**.
4.  *Verification*: You should see the **Risk Band**, **Default Probability**, and **Model Decision** (Approve/Reject).
5.  *Note*: If the backend returns an Application ID, note it down for the Feedback step.

### 3. Batch Processing
1.  Go to **Dashboard** > **Batch Processing** (or `/dashboard/batch-upload`).
2.  Upload a CSV file containing multiple loan applications.
    *   *Sample CSV format*: See backend documentation or use `sample_loans.csv`.
3.  Click **Upload and Process**.
4.  *Verification*:
    *   You should see a new Job appear in the list.
    *   Status should change from `Queued` -> `Processing` -> `Completed`.

### 4. Feedback Loop
1.  Go to **Dashboard** > **Feedback** (or `/dashboard/feedback`).
2.  Click **Submit Outcome**.
3.  Enter the **Application ID** (from a previous scoring request or batch job).
4.  Select the Outcome: **REPAID** or **DEFAULTED**.
5.  Click **Submit Outcome**.
6.  *Verification*: The feedback should appear in the "Recent Outcomes" list.

### 5. Audit Logs (Admin Only)
1.  Log out and sign up/login as an **Admin** user.
2.  Go to **Dashboard** > **Audit Logs**.
3.  *Verification*: You should see logs of the actions performed (registration, scoring, etc.).

## Troubleshooting
*   **Connection Refused**: Ensure backend is running on port 3001. Check `frontend/.env.local`.
*   **CORS Error**: Ensure backend has CORS enabled for `localhost:3000`.
*   **401 Unauthorized**: Ensure you are logged in. The frontend automatically attaches the JWT token to requests.
