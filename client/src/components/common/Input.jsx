import {useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  icon,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-semibold text-text-primary mb-2'>
          {label}
          {required && <span className='text-error ml-1'>*</span>}
        </label>
      )}

      <div className='relative'>
        {icon && (
          <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary'>
            {icon}
          </div>
        )}

        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
            icon ? "pl-10" : ""
          } ${type === "password" ? "pr-10" : ""} ${
            error ? "border-error" : "border-gray-300"
          }`}
        />

        {type === "password" && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary'>
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>

      {error && <p className='text-error text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default Input;
