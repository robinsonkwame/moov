import React, { useState, useRef, useEffect } from "react";
import { Label } from "./Label";
import "./PercentageSlider.css";

interface PercentageSliderProps {
  onPercentageChange: (value: number) => void;
  labelText?: string; // Add new optional prop
}

export const PercentageSlider = ({ 
  onPercentageChange, 
  labelText = "E%" 
}: PercentageSliderProps) => {
  const [value, setValue] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const updateValue = (clientX: number) => {
    if (sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue = ((clientX - left) / width) * 3;
      newValue = Math.max(0, Math.min(3, newValue));
      setValue(newValue);
      onPercentageChange(newValue);
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    updateValue(event.clientX);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    updateValue(event.clientX);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (thumbRef.current && sliderRef.current) {
      const percentage = (value / 3) * 100;
      thumbRef.current.style.left = `${percentage}%`;
    }
  }, [value]);

  return (
    <div className="slider-container">
      <div className="slider-header">
        <Label htmlFor="smooth-slider">
          {labelText}
        </Label>
        <div className="percentage-display">
          {value.toFixed(2)}%
        </div>
      </div>
      <div 
        ref={sliderRef}
        className="slider-track"
        onClick={(e) => updateValue(e.clientX)}
      >
        <div 
          className="slider-fill"
          style={{ width: `${(value / 3) * 100}%` }}
        />
        <div
          ref={thumbRef}
          className="slider-thumb"
          onMouseDown={handleMouseDown}
        />
      </div>
      <div className="slider-labels">
        <span>0%</span>
        <span>3%</span>
      </div>
    </div>
  );
};
