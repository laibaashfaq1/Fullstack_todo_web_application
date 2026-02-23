---
id: 1
title: Configure Frontend to use Backend API URL
stage: general
date: 2026-02-23
surface: agent
model: gemini-1.5-flash
feature: none
branch: main
user: current_user
command: "Fix the ERR_CONNECTION_REFUSED error on Vercel deployment."
labels: ["frontend", "configuration", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - frontend/lib/auth.ts
  - frontend/lib/api.ts
tests_yaml: []
prompt_text: "i deploy my backend successfully on hugging face and it is working successfully and i also connect my backend to frontend but when i run my project on vercol it shows me that error kindly solve this error why this happend @image.png"
response_text: "The frontend was attempting to connect to `localhost:8000` instead of the deployed backend. Modified `frontend/lib/auth.ts` and `frontend/lib/api.ts` to use `process.env.NEXT_PUBLIC_API_BASE_URL` for API calls. Provided instructions to the user on how to set this environment variable for Vercel deployment and local development."
outcome: success
evaluation:
  - The changes directly address the user's reported error by externalizing the backend API URL.
  - The solution provides clear instructions for the user to configure the environment variable, which is crucial for multi-environment deployments.
  - The changes are minimal and targeted, impacting only the API call URLs.
---
