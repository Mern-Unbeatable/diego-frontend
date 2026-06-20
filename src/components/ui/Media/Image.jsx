import React from 'react';

const Image = ({
  src,
  alt = '',
  className = '',
  rounded = 'lg',
  objectFit = 'contain',
  hoverZoom = true,
  width = 'auto',
  height = 'auto',
}) => {
  const classes = `
    object-${objectFit}
    ${hoverZoom ? 'transition-transform duration-300 hover:scale-105' : ''}
    ${rounded ? `rounded-${rounded}` : ''}
    ${className}
  `;

  return (
    <img
      src={src}
      alt={alt}
      className={classes}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
};

export default Image;
