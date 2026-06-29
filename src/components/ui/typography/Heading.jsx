import React from 'react';

const Heading = ({
  level = 1,
  children,
  className = '',
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ...props
}) => {
  // Determine level from props
  let finalLevel = level;
  if (h1) finalLevel = 1;
  if (h2) finalLevel = 2;
  if (h3) finalLevel = 3;
  if (h4) finalLevel = 4;
  if (h5) finalLevel = 5;
  if (h6) finalLevel = 6;

  const Tag = `h${finalLevel}`;

  const sizes = {
    1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    2: 'text-3xl sm:text-4xl md:text-5xl',
    3: 'text-2xl sm:text-3xl md:text-4xl',
    4: 'text-lg sm:text-xl md:text-2xl font-bold',
    5: 'text-base sm:text-lg md:text-xl',
    6: 'text-sm sm:text-base md:text-lg',
  };

  const classes = `${sizes[finalLevel]} ${className}`;

  return (
    <Tag className={classes} {...props}>
      {h1 || h2 || h3 || h4 || h5 || h6 || children}
    </Tag>
  );
};

export default Heading;
