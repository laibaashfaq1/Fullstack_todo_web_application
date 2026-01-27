# Next.js Component Skill

## Description
This skill provides a template for creating Next.js functional components or pages for the Todo application's frontend. It includes a basic structure for defining a React component, handling state, fetching data from a backend API (with authentication headers), and applying styling using Tailwind CSS. It also demonstrates how to handle routing and display loading/error states, and integrates with an assumed `AuthContext` for authentication status and tokens.

## Example Prompt
"Frontend Agent, create a Next.js page component `app/tasks/[id]/page.tsx` to display a single todo item. It should fetch the task data from `/api/tasks/{id}`, show its title, description, and completion status. Include an 'Edit' button that navigates to an edit page. Use Tailwind CSS for styling and ensure it respects the user's authentication state."

## Template/Structure

```typescript jsx
// {file_path_and_name}.tsx
'use client'; // Mark as client component if using Hooks or client-side interactions

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For app router
// import { useAuth } from '@/context/AuthContext'; // Assuming an AuthContext for global auth state

interface {ComponentName}Props {{
  // Define props here, e.g., if rendering a generic item from a parent
  // itemId?: string;
}}

const {ComponentName}: React.FC<{ComponentName}Props> = ({ /* itemId */ }) => {{
  const router = useRouter();
  // For app router, dynamic segments are accessed via `params` prop or `useParams()`
  // const params = useParams();
  // const id = itemId || params.id; // Use prop or URL param
  const id = '{{id_from_route_or_props}}'; // Placeholder for dynamic ID retrieval

  // Placeholder for authentication state
  const isAuthenticated = true; // Replace with actual context/hook
  const token = "YOUR_AUTH_TOKEN"; // Replace with actual token from context/hook

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {{
    if (id && isAuthenticated && token) {{
      const fetchData = async () => {{
        try {{
          setLoading(true);
          const response = await fetch(`/api/{resource_name}s/${{id}}`, {{ // Adjust API path
            headers: {{
              'Authorization': `Bearer ${{token}}`,
              'Content-Type': 'application/json',
            }},
          }});
          if (!response.ok) {{
            const errorData = await response.json();
            throw new Error(errorData.detail || `Error: ${{response.status}} ${{response.statusText}}`);
          }}
          const result = await response.json();
          setData(result);
        }} catch (err: any) {{
          setError(err.message);
        }} finally {{
          setLoading(false);
        }}
      }};
      fetchData();
    }} else if (!isAuthenticated && id) {{
        // Optionally redirect to login or show unauthorized message
        router.push('/login'); // Adjust login path
    }}
  }}, [id, isAuthenticated, token, router]);

  if (loading) {{
    return <div className="text-center py-8 text-gray-600">Loading {resource_name}...</div>;
  }}

  if (error) {{
    return <div className="text-center py-8 text-red-500">Error: {{error}}</div>;
  }}

  if (!data) {{
    return <div className="text-center py-8 text-gray-500">No {resource_name} found.</div>;
  }}

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{'{data.title}'}</h1>
      <p className="text-lg mb-4 text-gray-700">{'{data.description}'}</p>
      <p className="text-md text-gray-600">Status: {{data.completed ? 'Completed' : 'Pending'}}</p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={{() => router.push(`/{resource_name}s/edit/${{id}}`)}} // Adjust edit path
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Edit {resource_name}
        </button>
        <button
          onClick={{() => {{ /* Handle delete logic, e.g., show confirmation modal */ }}}}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Delete {resource_name}
        </button>
      </div>
    </div>
  );
}};

export default {ComponentName};

```