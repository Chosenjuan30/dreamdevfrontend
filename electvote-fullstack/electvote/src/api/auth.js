import client from './client';

/**
 * Register a new voter
 * @param {{ firstName, lastName, email, password, confirmPassword }} data
 * @returns {Promise<{ id, firstName, lastName, email, message }>}
 */
export async function register(data) {
  const res = await client.post('/auth/register', data);
  return res.data; // ApiResponse<VoterRegistrationResponse>
}

/**
 * Login voter — stores JWT + user info in localStorage on success
 * @param {{ email, password }} data
 * @returns {Promise<{ token, voterId, firstName, lastName, email, role }>}
 */
export async function login(data) {
  const res = await client.post('/auth/login', data);
  const { token, ...user } = res.data.data;

  // Persist token and user profile
  localStorage.setItem('electvote_token', token);
  localStorage.setItem('electvote_user', JSON.stringify(user));

  return res.data;
}

/**
 * Logout — clear local storage
 */
export function logout() {
  localStorage.removeItem('electvote_token');
  localStorage.removeItem('electvote_user');
}

/**
 * Get the currently logged-in user from localStorage
 * @returns {{ voterId, firstName, lastName, email, role } | null}
 */
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('electvote_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Check if a user is currently authenticated
 */
export function isAuthenticated() {
  return !!localStorage.getItem('electvote_token');
}
