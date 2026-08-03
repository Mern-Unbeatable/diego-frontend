import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { getVariantClasses } from './formVariants';

const Checkbox = ({
  name,
  label,
  variant = 'dashboard',
  className = '',
  disabled = false,
  layout = 'default',
}) => {
  const { control } = useFormContext();
  const styles = getVariantClasses(variant);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field } }) =>
        layout === 'inline' ? (
          <label
            className={`inline-flex items-center gap-2 text-sm text-[#444] ${className} ${
              disabled ? 'opacity-60' : ''
            }`}
          >
            <input
              {...field}
              type="checkbox"
              checked={Boolean(value)}
              disabled={disabled}
              onChange={(event) => onChange(event.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#71c2a3] focus:ring-[#71c2a3]"
            />
            {label}
          </label>
        ) : (
          <label
            className={`flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 ${className} ${
              disabled ? 'opacity-60' : ''
            }`}
          >
            <input
              {...field}
              type="checkbox"
              checked={Boolean(value)}
              disabled={disabled}
              onChange={(event) => onChange(event.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className={styles.label.replace('mb-3 block', 'block')}>{label}</span>
          </label>
        )
      }
    />
  );
};

export default Checkbox;
