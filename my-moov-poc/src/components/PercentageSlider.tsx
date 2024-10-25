import React, { useState, useRef, useEffect } from "react";
import { Label } from "./Label";
import "./PercentageSlider.css";

interface PercentageSliderProps {
    onPercentageChange: (value: number) => void;
    labelText: string;
    value?: number;  // Add this if not already present
  }
  
export const PercentageSlider = ({ 
  onPercentageChange, 
  labelText = "E%",
  value = 0.25
}: PercentageSliderProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const updateValue = (clientX: number) => {
    if (sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue = ((clientX - left) / width) * 3;
      newValue = Math.max(0, Math.min(3, newValue));
      setInternalValue(newValue);
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
      const percentage = (internalValue / 3) * 100;
      thumbRef.current.style.left = `${percentage}%`;
    }
  }, [internalValue]);

  return (
    <div className="slider-container">
      <div className="slider-header">
        <Label htmlFor="smooth-slider">
          {labelText}
        </Label>
        <div className="percentage-display">
          {internalValue.toFixed(2)}%
        </div>
      </div>
      <div 
        ref={sliderRef}
        className="slider-track"
        onClick={(e) => updateValue(e.clientX)}
      >
        <div 
          className="slider-fill"
          style={{ width: `${(internalValue / 3) * 100}%` }}
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
