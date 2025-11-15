import React, { type InputHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}
const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  const inputClasses = `
w-full px-4 py-2 border rounded-lg
focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
${error ? 'border-error' : 'border-gray-300'}
${className}
`;
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input className={inputClasses} {...props} />
      {error && <p>{error}</p>}
      {!error && helperText && <p>{helperText}</p>}
    </div>
  );
};
export default Input;
