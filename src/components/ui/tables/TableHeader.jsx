import React from 'react';

const TableHeader = ({ children, className = '', ...props }) => {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};

export default TableHeader;
