import React from 'react';

const TableRow = ({ children, className = '', ...props }) => {
  return (
    <tr className={`border-b border-gray-200 bg-white ${className}`} {...props}>
      {children}
    </tr>
  );
};

export default TableRow;
