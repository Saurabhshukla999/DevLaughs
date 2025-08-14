// Configuration for API endpoints
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://devlaughs-backend.onrender.com' // Your Render backend URL
  : 'http://localhost:5000';
