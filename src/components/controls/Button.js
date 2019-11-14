import React from "react";

export const Button = ({ children, onClick }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);
