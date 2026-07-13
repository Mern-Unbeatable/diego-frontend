const InputField = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  disabled = false,
  className = '',
  ...rest
}) => {
  const style = `w-full bg-white px-3 py-2 border rounded-md  focus:border-[#73bfa1] focus:ring-2 focus:ring-[#73bfa1] focus:outline-none
                ${disabled ? 'cursor-not-allowed bg-gray-100' : ''} ${className}`;

  // Only pass `value` when controlled — otherwise defaultValue (via rest) works
  const valueProps =
    value !== undefined ? { value, onChange } : onChange ? { onChange } : {};

  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      className={style}
      {...valueProps}
      {...rest}
    />
  );
};

export default InputField;
