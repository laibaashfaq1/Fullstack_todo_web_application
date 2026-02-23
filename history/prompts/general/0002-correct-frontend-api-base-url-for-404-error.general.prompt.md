---
id: 2
title: Correct Frontend API Base URL for 404 Error
stage: general
date: 2026-02-23
surface: agent
model: gemini-1.5-flash
feature: none
branch: main
user: current_user
command: "Why did this happen (referring to 404 error after previous fix)"
labels: ["frontend", "configuration", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: []
tests_yaml: []
prompt_text: "@image.png chnages done but whhy this happend"
response_text: "The frontend is now making requests to `/docs/api/signup` and `/docs/api/token` resulting in a 404 error. This indicates that the `NEXT_PUBLIC_API_BASE_URL` environment variable is likely incorrectly configured to include `/docs`. Provided instructions to the user to correct `NEXT_PUBLIC_API_BASE_URL` to be the base URL of the Hugging Face space *without* the `/docs` suffix."
outcome: success
evaluation:
  - Identified the root cause of the 404 error: incorrect `NEXT_PUBLIC_API_BASE_URL` configuration.
  - Provided clear and actionable instructions for the user to rectify the environment variable.
  - Explained *why* the error occurred based on the URL shown in the console.
---
