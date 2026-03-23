import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
    {label}
    <input
      className={`rounded-xl border px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${
        error ? 'border-red-400' : 'border-slate-200'
      } ${className}`}
      {...props}
    />
    {error ? <span className="text-xs text-red-500">{error}</span> : null}
  </label>
);
