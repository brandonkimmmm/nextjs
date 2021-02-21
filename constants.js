export const API_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : `https://${process.env.VERCEL_URL}/api`;

