const Container = ({ children, size = 'full', className = '' }) => {
  const sizes = {
    default: 'max-w-4xl',
    full: 'max-w-8xl',
    xl: 'max-w-7xl',
    lg: 'max-w-6xl',
    sm: 'max-w-2xl',
  };

  const classes = `mx-auto px-4 sm:px-6 md:px-8 lg:px-[120px] ${sizes[size]} ${className}`;
  return <section className={classes}>{children}</section>;
};

export default Container;
