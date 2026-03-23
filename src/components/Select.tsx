import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: Array<{ label: string; value: string | number }>;
}

export const Select = ({ label, error, options, className = '', ...props }: SelectProps) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
    {label}
    <select
      className={`rounded-xl border px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${
        error ? 'border-red-400' : 'border-slate-200'
      } ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error ? <span className="text-xs text-red-500">{error}</span> : null}
  </label>
);
