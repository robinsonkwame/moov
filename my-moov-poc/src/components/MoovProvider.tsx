import React from 'react';
import { useEffect, useState } from 'react';
import { useMoovToken } from '../hooks/useMoovToken';
import { Moov } from '@moovio/moov-js';
import { loadMoov } from '@moovio/moov-js';

interface MoovProviderProps {
  children: React.ReactNode;
}

export const MoovProvider = ({ children }: MoovProviderProps) => {
  const { token, error } = useMoovToken();
  const [moov, setMoov] = useState<Moov | null>(null);

  useEffect(() => {
    if (token) {
      try {
        loadMoov(token)
          .then(setMoov)
          .catch((err) => console.error('Failed to initialize Moov:', err));
      } catch (err) {
        console.error('Failed to initialize Moov:', err);
      }
    }
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!moov) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {moov && <pre>{JSON.stringify(moov, null, 2)}</pre>}
      {children}
      {token}
    </>
  );
};
