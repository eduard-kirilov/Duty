import React from "react";

export const Label = ({ children, label, width }) => {
  return (
    <div className="label-container" style={{ width }}>
      <div>{label}</div>
      {children}
    </div>
  );
};
