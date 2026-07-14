const Container = ({ children, size = 'full', className = '' }) => {
  const sizes = {
    default: 'max-w-4xl',
    full: 'container max-w-full',
    xl: 'max-w-7xl',
    lg: 'max-w-6xl',
    sm: 'max-w-2xl',
  };

  const classes = `mx-auto px-4 sm:px-6 md:px-8  ${sizes[size]} ${className}`;
  return <section className={classes}>{children}</section>;
};

export default Container;
