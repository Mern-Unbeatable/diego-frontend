import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { getVariantClasses } from './formVariants';

const TextArea = ({
  name,
  label,
  placeholder,
  rows = 4,
  required,
  variant = 'dashboard',
  className = '',
}) => {
  const { control } = useFormContext();
  const styles = getVariantClasses(variant);

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
            <label className={styles.label}>
              {label} {required && <span className="text-[#f04c42]">*</span>}
            </label>
          )}
          <textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            className={`${styles.input} resize-none`}
          />
          {error?.message && <p className={styles.error}>{error.message}</p>}
        </div>
      )}
    />
  );
};

export default TextArea;
