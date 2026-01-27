# Frontend Quickstart Guide - Hackathon II Phase II Todo App

This guide provides instructions to set up and run the frontend application locally for development and testing.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Version 18.x or higher (LTS recommended). You can download it from [nodejs.org](https://nodejs.org/).
-   **npm** (Node Package Manager) or **Yarn**: npm comes with Node.js. If you prefer Yarn, install it globally (`npm install -g yarn`).
-   **Git**: For cloning the repository.

## 1. Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/hackathon-ii-phase-ii-todo-app.git
    cd hackathon-ii-phase-ii-todo-app/frontend
    ```
    *(Note: Replace `your-username` with the actual repository owner and `hackathon-ii-phase-ii-todo-app` with the actual repository name.)*

2.  **Install dependencies:**
    Navigate to the `frontend/` directory and install the required Node.js packages:
    ```bash
    cd frontend
    npm install
    # OR
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the `frontend/` directory based on `.env.example` (if provided). You will need to configure the API base URL for the backend.
    ```
    # .env.local example
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
    ```

## 2. Running the Development Server

To start the development server with hot-reloading:

```bash
npm run dev
# OR
yarn dev
```

The application will typically be accessible at `http://localhost:3000`.

## 3. Building for Production

To build the application for production:

```bash
npm run build
# OR
yarn build
```

This will create an optimized build of your application in the `.next` folder.

## 4. Running in Production Mode

To start the production server after building:

```bash
npm start
# OR
yarn start
```

## Next Steps

-   Ensure the backend API is running and accessible at `NEXT_PUBLIC_API_BASE_URL`.
-   Access the frontend application in your browser.
-   Begin implementing the UI components and integrating with the API according to the `plan.md` and `spec.md`.
