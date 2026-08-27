import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { getVariantClasses } from './formVariants';

const Input = ({
  name,
  label,
  type = 'text',
  disabled,
  placeholder,
  required,
  multiline = false,
  rows = 4,
  variant = 'dashboard',
  className = '',
  helperText,
  min,
  max,
  step,
  inputMode,
  minLength,
  suffix,
  interactiveSuffix = false,
  inputClassName = '',
  labelClassName = '',
}) => {
  const { control } = useFormContext();
  const styles = getVariantClasses(variant);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? `${label || name} è obbligatorio` : false,
        minLength: minLength
          ? {
              value: minLength,
              message: `Minimo ${minLength} caratteri`,
            }
          : undefined,
      }}
      render={({ field, fieldState: { error } }) => (
        <div className={`group ${className}`}>
          {label && (
            <label className={`${styles.label} ${labelClassName}`}>
              {label} {required && <span className="text-[#f04c42]">*</span>}
            </label>
          )}
          <div className="relative">
            {multiline ? (
              <textarea
                {...field}
                rows={rows}
                disabled={disabled}
                placeholder={placeholder}
                className={`${styles.input} resize-none ${inputClassName}`}
              />
            ) : (
              <input
                {...field}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                inputMode={inputMode}
                minLength={minLength}
                className={`${styles.input} ${inputClassName}`}
              />
            )}
            {suffix && (
              <div
                className={`absolute inset-y-0 right-4 flex items-center text-sm text-gray-500 ${
                  interactiveSuffix ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                {suffix}
              </div>
            )}
          </div>
          {helperText && !error && (
            <p className={styles.helper}>{helperText}</p>
          )}
          {error?.message && <p className={styles.error}>{error.message}</p>}
        </div>
      )}
    />
  );
};

export default Input;
