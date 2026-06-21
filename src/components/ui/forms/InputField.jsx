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

  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={style}
      {...rest}
    />
  );
};

export default InputField;
