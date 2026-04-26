import { useState, useEffect, useCallback } from 'react';
import { getAllElections } from '../api/elections';

export function useElections(statusFilter) {
  const [elections, setElections] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllElections(statusFilter);
      setElections(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load elections');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { fetch(); }, [fetch]);

  return { elections, loading, error, refetch: fetch };
}
