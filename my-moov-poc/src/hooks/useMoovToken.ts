import { useState, useEffect } from 'react';

export const useMoovToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/token');
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setToken(data.token);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch token');
      }
    };

    fetchToken();
  }, []);

  return { token, error };
};
