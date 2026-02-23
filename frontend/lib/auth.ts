'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

// ✅ Get token from localStorage
export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
}

// ✅ Decode JWT token
export function getUserFromToken(): { user_id?: string; sub?: string; [key: string]: any } | null {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

// ✅ Logout
export function useLogout() {
    const router = useRouter();

    return useCallback(() => {
        console.log("Logging out...");

        // Remove token
        localStorage.removeItem('access_token');

        router.push('/');
        router.refresh();
    }, [router]);
}

// ✅ Login
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // ❌ credentials remove kar diya
            body: new URLSearchParams({
                username: email,
                password: password,
            }),
        });

        if (!response.ok) {
            let errorMessage = "Login failed";
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || "Invalid credentials";
            } catch {
                errorMessage = `Login failed (${response.status})`;
            }
            return { success: false, error: errorMessage };
        }

        const data = await response.json();

        // ✅ Save token
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
        }

        return { success: true };

    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: "Backend connection issue" };
    }
}

// ✅ Signup
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
        return { success: false, error: "Backend connection issue" };
    }
}
