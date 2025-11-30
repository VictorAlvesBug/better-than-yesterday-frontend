import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; 
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  const inputClasses = `
w-full px-4 py-2 border rounded-lg
focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent
${error ? 'border-danger' : 'border-gray-200'}
${className}
`;
  return (
    <div className='w-full'>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input ref={ref} className={inputClasses} {...props} />
      {error && <p className='px-1 text-sm text-danger'>{error}</p>}
    </div>
  );
});
export default Input;
