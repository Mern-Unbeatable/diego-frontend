const Button = ({
  icon,
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  tooltip = '',
  className = '',
  color, // custom background color
  ...props
}) => {
  const variants = {
    primary: 'bg-[#73BFA1] text-white hover:bg-[#296d52]',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-[#73BFA1] hover:bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const baseClasses =
    'inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full';

  const variantClasses = color
    ? `bg-[${color}] text-white hover:opacity-90`
    : variants[variant];

  const classes = `${baseClasses} ${variantClasses} ${sizes[size]} ${
    disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      title={tooltip}
      aria-label={tooltip || label}
      {...props}
    >
      {loading && 'loading...'}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
