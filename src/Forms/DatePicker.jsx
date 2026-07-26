import { Controller, useFormContext } from 'react-hook-form';
import { getVariantClasses } from './formVariants';

const toInputDate = (value) => {
  if (!value) return '';
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
};

const todayInputDate = () => new Date().toISOString().split('T')[0];

const DatePicker = ({
  name,
  label,
  required,
  disabled = false,
  hideLabel = false,
  disableFuture = true,
  variant = 'dashboard',
  className = '',
  inputClassName = '',
  labelClassName = '',
}) => {
  const { control } = useFormContext();
  const styles = getVariantClasses(variant);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${label || name} è obbligatorio` : false,
      }}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <div className={className}>
          {label && !hideLabel && (
            <label className={`${styles.label} ${labelClassName}`}>
              {label} {required && <span className="text-[#f04c42]">*</span>}
            </label>
          )}
          <input
            {...field}
            type="date"
            value={toInputDate(value)}
            disabled={disabled}
            max={disableFuture ? todayInputDate() : undefined}
            onChange={(event) => onChange(event.target.value)}
            className={`${styles.input} ${inputClassName}`}
          />
          {error?.message && <p className={styles.error}>{error.message}</p>}
        </div>
      )}
    />
  );
};

export default DatePicker;
