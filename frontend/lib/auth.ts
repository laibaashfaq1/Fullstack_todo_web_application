// frontend/lib/auth.ts
// 'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

// Get token from localStorage or cookies
export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // First try localStorage
    const token = localStorage.getItem('access_token');
    if (token) return token;
    
    // Fallback: try to get from cookies (for httponly cookies, this won't work in client)
    // But we can check document.cookie as fallback
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'access_token') {
            return value;
        }
    }
    
    return null;
}

// Decode JWT token to get user info
export function getUserFromToken(): { user_id?: string; sub?: string; [key: string]: any } | null {
    const token = getToken();
    if (!token) return null;
    
    try {
        const decoded = jwtDecode(token);
        return decoded as { user_id?: string; sub?: string; [key: string]: any };
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

// Logout hook
export function useLogout() {
    const router = useRouter();
    
    return useCallback(() => {
        console.log("Logging out...");
        // Clear token from localStorage
        localStorage.removeItem('access_token');
        
        // Call logout endpoint to clear httponly cookie
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout`, {
            method: 'POST',
            credentials: 'include',
        }).catch(err => {
            console.error('Logout API call failed:', err);
        });
        
        // Redirect to the main landing page
        router.push('/');
        router.refresh();
    }, [router]);
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
        console.log("Attempting to log in with:", { email, password: '***' });
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'include', // Important: allows cookies to be sent/received
            body: new URLSearchParams({
                username: email,
                password: password,
            }),
        });

        console.log("Login response status:", response.status);

        if (!response.ok) {
            let errorMessage = "Login failed";
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || "Invalid credentials";
            } catch (e) {
                // If response is not JSON, use status text
                errorMessage = response.status === 401 ? "Invalid credentials" : `Login failed (${response.status})`;
            }
            console.error("Login error:", errorMessage);
            return { success: false, error: errorMessage };
        }

        const data = await response.json();
        console.log("Login successful, token received");
        
        // Backend sets httponly cookie, but we can also store in localStorage as backup
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
        }

        return { success: true };

    } catch (error) {
        console.error("Login error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please check if the backend server is running.";
        return { success: false, error: errorMessage };
    }
}



export async function signup(credentials: {

  email: string;

  password: string;

  first_name: string;

  last_name: string;

}): Promise<{ success: boolean; error?: string }> {

  try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup`, {

          method: 'POST',

          headers: {

              'Content-Type': 'application/json',

          },

          body: JSON.stringify(credentials),

      });



      if (!response.ok) {

          const errorData = await response.json();

          return { success: false, error: errorData.detail || "Signup failed" };

      }



      return { success: true };



  } catch (error) {

      console.error("Signup error:", error);

      return { success: false, error: "An unexpected error occurred." };

  }

}
// frontend/lib/auth.ts
'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

// Get token from localStorage or cookies
export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // First try to get from cookies
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'access_token') {
            return value;
        }
    }
    
    // Fallback: try localStorage
    const token = localStorage.getItem('access_token');
    if (token) return token;
    
    return null;
}

// Decode JWT token to get user info
export function getUserFromToken(): { user_id?: string; sub?: string; [key: string]: any } | null {
    const token = getToken();
    if (!token) return null;
    
    try {
        const decoded = jwtDecode(token);
        return decoded as { user_id?: string; sub?: string; [key: string]: any };
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

// Logout hook
export function useLogout() {
    const router = useRouter();
    
    return useCallback(() => {
        console.log("Logging out...");
        // Clear token from localStorage
        localStorage.removeItem('access_token');
        
        // Call logout endpoint to clear httponly cookie
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout`, {
            method: 'POST',
            credentials: 'include',
        }).catch(err => {
            console.error('Logout API call failed:', err);
        });
        
        // Redirect to the main landing page
        router.push('/');
        router.refresh();
    }, [router]);
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
        console.log("Attempting to log in with:", { email, password: '***' });
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'include', // Important: allows cookies to be sent/received
            body: new URLSearchParams({
                username: email,
                password: password,
            }),
        });

        console.log("Login response status:", response.status);

        if (!response.ok) {
            let errorMessage = "Login failed";
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || "Invalid credentials";
            } catch (e) {
                // If response is not JSON, use status text
                errorMessage = response.status === 401 ? "Invalid credentials" : `Login failed (${response.status})`;
            }
            console.error("Login error:", errorMessage);
            return { success: false, error: errorMessage };
        }

        const data = await response.json();
        console.log("Login successful, token received");
        
        // Backend sets httponly cookie, but we can also store in localStorage as backup
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
            // Also set a cookie for the proxy to read
            const d = new Date();
            d.setTime(d.getTime() + (1*24*60*60*1000)); // 1 day expiration
            document.cookie = `access_token=${data.access_token}; expires=${d.toUTCString()}; path=/`;
        }

        return { success: true };

    } catch (error) {
        console.error("Login error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred. Please check if the backend server is running.";
        return { success: false, error: errorMessage };
    }
}



export async function signup(credentials: {

  email: string;

  password: string;

  first_name: string;

  last_name: string;

}): Promise<{ success: boolean; error?: string }> {

  try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/signup`, {

          method: 'POST',

          headers: {

              'Content-Type': 'application/json',

          },

          body: JSON.stringify(credentials),

      });



      if (!response.ok) {

          const errorData = await response.json();

          return { success: false, error: errorData.detail || "Signup failed" };

      }



      return { success: true };



  } catch (error) {

      console.error("Signup error:", error);

      return { success: false, error: "An unexpected error occurred." };

  }

}
