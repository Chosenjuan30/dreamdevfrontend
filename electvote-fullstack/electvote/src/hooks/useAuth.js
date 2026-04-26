import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser, isAuthenticated, logout } from '../api/auth';

export function useAuth() {
  const [user, setUser]       = useState(getCurrentUser);
  const [authed, setAuthed]   = useState(isAuthenticated);

  // Listen for the global logout event fired by the Axios 401 interceptor
  useEffect(() => {
    const handler = () => { setUser(null); setAuthed(false); };
    window.addEventListener('electvote:logout', handler);
    return () => window.removeEventListener('electvote:logout', handler);
  }, []);

  const signIn = useCallback((userData) => {
    setUser(userData);
    setAuthed(true);
  }, []);

  const signOut = useCallback(() => {
    logout();
    setUser(null);
    setAuthed(false);
  }, []);

  return { user, authed, signIn, signOut };
}
