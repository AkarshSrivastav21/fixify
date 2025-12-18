// API utility functions
const getBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://fixify-backend-aqtb.onrender.com';
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
};

export const createApiUrl = (endpoint) => {
  const baseUrl = getBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

export { getBaseUrl };