// lib/api.ts
import { Task } from '../components/TaskCard';

const API_URL = 'https://huggingface.co/spaces/Laiba0/Chatbot_Todo';

export const getTasks = async (token: string): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const addTask = async (token: string, task: { title: string; description?: string }): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to add task');
  }
  return response.json();
};

export const updateTask = async (token: string, taskId: number, task: { title?: string; description?: string }): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

export const deleteTask = async (token: string, taskId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};

export const toggleTaskCompleted = async (token: string, taskId: number): Promise<Task> => {
    const response = await fetch(`${API_URL}/api/tasks/${taskId}/complete`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail ||'Failed to toggle task completion');
    }
    return response.json();
};

export const getUserInfo = async (token: string): Promise<{
  email: string; username: string 
}> => {
  const response = await fetch(`${API_URL}/api/user/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  return response.json();
};
