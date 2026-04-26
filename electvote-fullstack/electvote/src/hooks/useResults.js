import { useState, useEffect, useCallback, useRef } from 'react';
import { getResults } from '../api/elections';

/**
 * Polls results for all provided election IDs every `interval` ms.
 * Falls back to a one-shot fetch when interval is null.
 */
export function useResults(electionIds = [], interval = 30000) {
  const [results,  setResults]  = useState({});
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const timerRef               = useRef(null);

  const fetchAll = useCallback(async () => {
    if (!electionIds.length) { setLoading(false); return; }
    try {
      const settled = await Promise.allSettled(electionIds.map(id => getResults(id)));
      const map = {};
      settled.forEach((s, i) => {
        if (s.status === 'fulfilled') map[electionIds[i]] = s.value.data;
      });
      setResults(map);
      setError(null);
    } catch (err) {
      setError('Failed to load results');
    } finally {
      setLoading(false);
    }
  }, [electionIds.join(',')]); // eslint-disable-line

  useEffect(() => {
    fetchAll();
    if (interval) {
      timerRef.current = setInterval(fetchAll, interval);
    }
    return () => clearInterval(timerRef.current);
  }, [fetchAll, interval]);

  return { results, loading, error, refetch: fetchAll };
}
