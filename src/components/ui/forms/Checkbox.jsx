import React from 'react';

const Checkbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
      />
      {label && (
        <label htmlFor={id} className="ml-2 text-sm text-gray-900">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
