import React from "react";

export const Input = ({
  placeholder,
  name,
  onTextChange,
  value,
  type = "text"
}) => (
  <div>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onTextChange}
      value={value}
    />
  </div>
);
