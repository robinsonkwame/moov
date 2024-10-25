import React, { useEffect, useState, useMemo } from 'react';
import { useMoovToken } from '../hooks/useMoovToken';
import { Moov } from '@moovio/moov-js';
import { loadMoov } from '@moovio/moov-js';
import { PercentageSlider } from './PercentageSlider';
import Button from './Button';
import './ToggleSwitch.css';

const MAX_PERCENTAGE = 3;
const DEFAULT_PERCENTAGE = 1.5;

interface MoovProviderProps {
  children: React.ReactNode;
}

export const MoovProvider = ({ children }: MoovProviderProps) => {
  const { token, error } = useMoovToken();
  const [moov, setMoov] = useState<Moov | null>(null);
  const [user1Percentage, setUser1Percentage] = useState(DEFAULT_PERCENTAGE);
  const [user2Percentage, setUser2Percentage] = useState(DEFAULT_PERCENTAGE);
  const [cost, setCost] = useState<number>(5);
  const [showBothSliders, setShowBothSliders] = useState(false);

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

  const averages = useMemo(() => ({
    entrepreneur: ((user1Percentage + user2Percentage) / 2).toFixed(2),
    entrepreneurGroup: (MAX_PERCENTAGE - ((user1Percentage + user2Percentage) / 2)).toFixed(2)
  }), [user1Percentage, user2Percentage]);

  const handleUser1Change = (value: number) => {
    setUser1Percentage(value);
    // When toggle is off, keep user2Percentage in sync with user1Percentage
    if (!showBothSliders) {
      setUser2Percentage(value);
    }
  };

  const handleUser2Change = (value: number) => {
    setUser2Percentage(value);
  };

  const handleToggleChange = (checked: boolean) => {
    setShowBothSliders(checked);
    if (!checked) {
      setUser2Percentage(user1Percentage);
    } else {
      setUser2Percentage(DEFAULT_PERCENTAGE);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!moov) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col space-y-4">
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          placeholder="Enter cost"
          className="p-2 border rounded"
        />

        <div className="toggle-switch-container">
          <label className="toggle-switch-label">
            <input
              type="checkbox"
              className="toggle-switch-input"
              checked={showBothSliders}
              onChange={(e) => handleToggleChange(e.target.checked)}
            />
            <span className="toggle-switch"></span>
            <span className="toggle-switch-text">
              Show Entrepreneur Controls
            </span>
          </label>
        </div>

        <Button value1={user1Percentage} value2={user2Percentage} cost={cost} moov={moov} />
        <div className="average-percentage" style={{
          fontSize: '1.25rem',
          color: '#4CAF50',
          padding: '10px',
          backgroundColor: '#FFF3E0',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 'bold' }}>Entrepreneur:</span>
            <span style={{ 
              fontSize: '1.5rem',
              color: '#2E7D32'
            }}>
              {((user1Percentage + user2Percentage) / 2).toFixed(2)}%
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 'bold' }}>Entrepreneur Group:</span>
            <span style={{ 
              fontSize: '1.5rem',
              color: '#2E7D32'
            }}>
              {(3 - ((user1Percentage + user2Percentage) / 2)).toFixed(2)}%
            </span>
          </div>
        </div>
        <PercentageSlider onPercentageChange={handleUser1Change} labelText="Customer E" value={user1Percentage}/>
        {showBothSliders && (
          <PercentageSlider onPercentageChange={handleUser2Change} labelText="Entrepreneur E" value={user2Percentage}/>
        )}
      </div>
    </>
  );
};
