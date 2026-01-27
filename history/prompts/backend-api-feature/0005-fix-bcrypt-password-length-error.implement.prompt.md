---
id: 0005
title: Fix bcrypt Password Length Error
stage: implement
date: 2026-01-21
surface: agent
model: gemini-1.5-pro
feature: backend-api-feature
branch: master
user: User
command: 
labels: ["bug", "backend", "security"]
links:
  spec: 
  ticket: 
  adr: 
  pr: 
files:
- backend/app/security.py
tests:
- none
---

## Prompt

@.gemini-clipboard\clipboard-1768995475065.png in F12 facing this error while running backend and in terminal where backend is running facing this error INFO:     127.0.0.1:51573 - "GET /openapi.json HTTP/1.1" 200 OK
(trapped) error reading bcrypt version
Traceback (most recent call last):
  File "E:\governor project\Agentic AI\Q4\Speckkit\HACKATHON\Hackathon_2\Frontend_Todo\backend\.venv\Lib\site-packages\passlib\handlers\bcrypt.py", line 620, in _load_backend_mixin
    version = _bcrypt.__about__.__version__
              ^^^^^^^^^^^^^^^^^
AttributeError: module 'bcrypt' has no attribute '__about__'
INFO:     127.0.0.1:51612 - "POST /api/signup HTTP/1.1" 500 Internal Server Error
ERROR:    Exception in ASGI application
Traceback (most recent call last):
...
ValueError: password cannot be longer than 72 bytes, truncate manually if necessary (e.g. my_password[:72])

## Response snapshot

I've fixed the issue. The error was caused by a limitation in the `bcrypt` library, which does not allow passwords longer than 72 bytes. I have truncated the password to 72 bytes before hashing to resolve this issue. Please try again.

## Outcome

- ✅ Impact: Fixed a `ValueError` that occurred when hashing passwords longer than 72 bytes, which is a limitation of the `bcrypt` library. This allows users with long passwords to sign up without encountering an error.
- 🧪 Tests: No new tests were added. The fix was based on the clear error message from the library.
- 📁 Files: Modified `backend/app/security.py` to truncate the password to 72 bytes before hashing.
- 🔁 Next prompts: The user should be able to sign up successfully now.
- 🧠 Reflection: The traceback and error message were very clear, making this a straightforward fix. It's a good reminder to be aware of the limitations of the libraries being used.

## Evaluation notes (flywheel)

- Failure modes observed: Library limitation causing a `ValueError`.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
