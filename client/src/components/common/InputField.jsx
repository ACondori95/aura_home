import {memo} from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

// El componente se define FUERA del componente LoginPage
const InputField = ({
  icon: Icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  isPassword = false,
  showPassword, // Ahora showPassword debe pasarse como prop
  setShowPassword, // Y la función para cambiarlo también
}) => (
  <div className='relative mb-4'>
    <Icon
      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
      size={20}
    />
    <input
      // Usa type basándose en la prop showPassword
      type={isPassword && showPassword ? "text" : type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green outline-none'
      required
    />
    {isPassword && (
      <button
        type='button'
        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand-blue'
        // Llama a la función pasada como prop
        onClick={setShowPassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </button>
    )}
  </div>
);

// Exportamos el componente envuelto en memo para evitar re-renderizados innecesarios.
export default memo(InputField);
