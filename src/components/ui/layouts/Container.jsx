const Container = ({ children, size = 'full', className = '' }) => {
  // const sizes = {
  //   default: 'max-w-4xl',
  //   full: 'container mx-auto px-4 ',
  //   xl: 'max-w-7xl',
  //   lg: 'max-w-6xl',
  //   sm: 'max-w-2xl',
  // };

  const classes = `mx-auto   ${className}`;
  return <section className={classes}>{children}</section>;
};

export default Container;
