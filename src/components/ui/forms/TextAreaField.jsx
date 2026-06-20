const TextAreaField = ({
  id,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  rows = 4,
  className = '',
  ...rest
}) => {
  return (
    <div className={className}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`w-full resize-none rounded-md border px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'cursor-not-allowed bg-gray-100' : ''}`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextAreaField;
