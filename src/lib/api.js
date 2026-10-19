export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://portofoliobackend-y3zh.onrender.com';

export async function getJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
