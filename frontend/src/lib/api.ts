// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('safecity-token');
  
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
    } catch(e) {
        // ignore
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
