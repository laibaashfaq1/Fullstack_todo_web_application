---
id: 4
title: Fix Next.js Turbopack Root Warning on Vercel
stage: general
date: 2026-02-23
surface: agent
model: gemini-1.5-flash
feature: none
branch: main
user: current_user
command: "@image.png facing this error on vercol solve this"
labels: ["frontend", "configuration", "build-issue", "nextjs", "vercel"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - frontend/next.config.ts
tests_yaml: []
prompt_text: "@image.png facing this error on vercol solve this"
response_text: "The warning 'Both `outputFileTracingRoot` and `turbopack.root` are set, but they must have the same value' was caused by an inconsistency in Next.js configuration. Modified `frontend/next.config.ts` to explicitly set `outputFileTracingRoot` to `path.join(__dirname, '../../')`, matching the `turbopack.root` value. Provided instructions to the user to redeploy on Vercel."
outcome: success
evaluation:
  - Identified the configuration mismatch in `next.config.ts`.
  - Applied the correct fix by aligning the `outputFileTracingRoot` and `turbopack.root` values.
  - Provided clear instructions for the user to verify the fix by redeploying.
---
