const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

// In development, Vite can proxy API requests. In production, set
// VITE_API_URL to the public URL of the Render API service.
const productionApiUrl = 'https://ai-interview-preparation-platform-dh6d.onrender.com/api';
const API_URL = (
  configuredApiUrl || (import.meta.env.PROD ? productionApiUrl : '/api')
).replace(/\/$/, '');

export const apiUrl = (path) => API_URL + (path.startsWith('/') ? path : '/' + path);
