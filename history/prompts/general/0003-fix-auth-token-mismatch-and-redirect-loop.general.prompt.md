---
id: 3
title: Fix Auth Token Mismatch and Redirect Loop
stage: general
date: 2026-02-23
surface: agent
model: gemini-1.5-flash
feature: none
branch: main
user: current_user
command: "@image.png yh to ho gaya ha lakin aga ka dashboard khulna ma time laga rah ah"
labels: ["frontend", "authentication", "bugfix", "redirect-loop"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - frontend/lib/auth.ts
prompt_text: "@image.png yh to ho gaya ha lakin aga ka dashboard khulna ma time laga rah ah"
response_text: "Identified a token mismatch: `frontend/proxy.ts` checks for `access_token` in cookies, but `frontend/lib/auth.ts` was storing it only in `localStorage`. This caused a redirect loop between `/auth/login` and `/dashboard` and repeated `POST /api/signup` calls. Modified `frontend/lib/auth.ts` to store the token in cookies after successful login and prioritize reading it from cookies. Provided instructions to the user to redeploy, clear browser data, and re-attempt login."
outcome: success
evaluation:
  - Identified the root cause of the redirect loop and the spurious signup calls.
  - Provided a targeted fix by harmonizing token storage and retrieval methods.
  - Gave clear, actionable instructions for the user to verify the fix.
---
