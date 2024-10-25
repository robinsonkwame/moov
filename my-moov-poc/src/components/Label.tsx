import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label
      style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center'
      }}
      {...props}
    >
      {children}
    </label>
  );
};
