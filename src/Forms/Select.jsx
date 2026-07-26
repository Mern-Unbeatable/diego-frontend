import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { getVariantClasses } from './formVariants';

const Select = ({
  name,
  label,
  required,
  variant = 'dashboard',
  className = '',
  labelClassName = '',
  selectClassName = '',
  options = [],
  items = [],
  onChange,
  disabled,
}) => {
  const { control } = useFormContext();
  const styles = getVariantClasses(variant);

  const normalizedOptions =
    options.length > 0
      ? options
      : items.map((item) => ({ value: item, label: item }));

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? `${label || name} è obbligatorio` : false,
      }}
      render={({ field, fieldState: { error } }) => (
        <div className={`group ${className}`}>
          {label && (
            <label className={`${styles.label} ${labelClassName}`}>
              {label} {required && <span className="text-[#f04c42]">*</span>}
            </label>
          )}
          <div className="relative">
            <select
              {...field}
              disabled={disabled}
              onChange={(event) => {
                field.onChange(event);
                onChange?.(event.target.value);
              }}
              className={`${styles.select} ${selectClassName}`}
            >
              {normalizedOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 ${
                variant === 'course' || variant === 'employee'
                  ? 'text-[#5f6764]'
                  : 'text-gray-400'
              }`}
            />
          </div>
          {error?.message && <p className={styles.error}>{error.message}</p>}
        </div>
      )}
    />
  );
};

export default Select;
