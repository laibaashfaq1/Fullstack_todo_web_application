I have updated all the files with the premium dashboard design and backend integration.

Here is a summary of the changes and how to test them:

### Installation

I have already installed the required packages: `framer-motion`, `react-hot-toast`, `date-fns`, and `next-themes`.

### Running the Application

1.  **Start the backend server:** Make sure your FastAPI backend is running on `http://localhost:8000`.
2.  **Start the frontend server:** In your `frontend` directory, run `npm run dev`.
3.  Open your browser to `http://localhost:3000`.

### Testing the Functionality

1.  **Login:** You should be redirected to the login page. After logging in, you will be taken to the dashboard.
2.  **Dashboard:**
    *   The header should greet you with your username (e.g., "Hello, Laiba!").
    *   You can toggle between light and dark mode using the button in the header.
    *   If there are no tasks, you will see an empty state with an illustration.
3.  **Add a Task:**
    *   Click the floating "+" button to open the "Add Task" modal.
    *   Enter a title (required) and an optional description.
    *   Click "Save". A toast notification will confirm the action, and the new task will appear on the dashboard.
4.  **Task Card:**
    *   Each task card will display the title, description, and a "Created" date and time.
    *   The card has a glassmorphism effect and a hover animation.
5.  **Edit a Task:**
    *   Click the "Edit" button on a task card. The modal will open with the task's current information.
    *   Update the title or description and click "Save". The task will be updated in the list.
6.  **Toggle Completion:**
    *   Click the checkbox on a task card to toggle its completed status. The change will be reflected immediately.
7.  **Delete a Task:**
    *   Click the "Delete" button. A confirmation dialog will appear.
    *   Confirm the deletion, and the task will be removed from the list.
8.  **Logout:**
    *   Click the "Logout" button in the header. Your token will be cleared, and you will be redirected to the login page.

This should restore your premium dashboard and make it fully functional with the backend. Let me know if you have any other questions.