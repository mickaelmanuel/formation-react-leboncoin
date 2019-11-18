import React from "react";

export const Input = ({
  placeholder,
  name,
  onTextChange,
  value,
  type = "text",
  min = 0
}) => (
  <div>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onTextChange}
      value={value}
      min={min}
    />
  </div>
);
