// Load environment variables with fallbacks
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || '5000';
const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;

export const config = {
    apiBaseUrl: BACKEND_URL,
}; 