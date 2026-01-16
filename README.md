<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LoanDecisionAgent Frontend

This is the frontend for the LoanDecisionAgent application.

## Run Locally

**Prerequisites:**

*   Node.js (v18 or higher)
*   npm

**Setup:**

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Create a `.env` file and set the `NEXT_PUBLIC_API_BASE_URL` to your backend API URL.
    ```
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
    ```
3.  Run the app:
    ```bash
    npm run dev
    ```

## Run with Docker

You can also run the frontend in a Docker container.

1.  Build the Docker image:
    ```bash
    docker build -t loan-frontend .
    ```
2.  Run the Docker container:
    ```bash
    docker run -p 3000:80 loan-frontend
    ```
The application will be available at `http://localhost:3000`.
