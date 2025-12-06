import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import AuthService from "../api/auth.service";
import InputField from "../components/common/InputField";
import {AiOutlineLock, AiOutlineMail, AiOutlineUser} from "react-icons/ai";
import {toast, ToastContainer} from "react-toastify";

const LoginPage = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  // Estado para manejar el Tab Activo (Iniciar Sesión por defecto)
  const [activeTab, setActiveTab] = useState("login");

  // Estados de Formulario
  const [loginData, setLoginData] = useState({email: "", password: ""});
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- Funciones de Formulario ---

  const handleLoginChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value});
  };

  const handleRegisterChange = (e) => {
    setRegisterData({...registerData, [e.target.name]: e.target.value});
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast.success("¡Inicio de sesión exitoso! Redirigiendo...");
      navigate("/"); // Redirigir a la página de inicio en caso de éxito
    } catch (error) {
      // Mostrar mensajes de error del backend
      const errorMessage =
        error.response?.data?.message ||
        "Error al iniciar sesión. Inténtelo de nuevo.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await AuthService.register(
        registerData.name,
        registerData.email,
        registerData.password
      );

      // Mostrar notificación de éxito del diseño
      toast.success("¡Registro exitoso! Por favor, inicie sesión.");
      setActiveTab("login"); // Cambiar al tab de login
      setRegisterData({name: "", email: "", password: ""}); // Limpiar formulario
    } catch (error) {
      // manejar errores de registro
      const errorMessage =
        error.response?.data?.message || "Error al registrar usuario.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-[calc(100vh-160px)] flex items-center justify-center bg-neutral-light p-4'>
      <div className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-md'>
        {/* Tabs de Iniciar Sesión / Registrarse */}
        <div className='flex justify-center mb-8 border-b border-gray-200'>
          <button
            onClick={() => setActiveTab("login")}
            className={`text-lg font-semibold py-2 px-6 transition duration-200 ${
              activeTab === "login"
                ? "text-brand-blue border-b-2 border-brand-green"
                : "text-gray-500 hover:text-brand-blue"
            }`}>
            Iniciar Sesión
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`text-lg font-semibold py-2 px-6 transition duration-200 ${
              activeTab === "register"
                ? "text-brand-blue border-b-2 border-brand-green"
                : "text-gray-500 hover:text-brand-blue"
            }`}>
            Registrarse
          </button>
        </div>

        {/* --- Contenido del Tab: INICIAR SESIÓN --- */}
        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit}>
            <InputField
              icon={AiOutlineMail}
              type='email'
              name='email'
              placeholder='Correo Electrónico'
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <InputField
              icon={AiOutlineLock}
              type='password'
              name='password'
              placeholder='Contraseña'
              value={loginData.password}
              onChange={handleLoginChange}
              isPassword
              showPassword={showPassword}
              setShowPassword={() => setShowPassword(!showPassword)}
            />

            {/* Opciones de Recuérdame y Olvidé Contraseña */}
            <div className='flex justify-between items-center mb-6 text-sm'>
              <label className='flex items-center text-gray-600'>
                <input
                  type='checkbox'
                  className='mr-2 rounded border-gray-300 text-brand-green focus:ring-brand-green'
                />
                Recordarme
              </label>
              <Link
                to='/forgot-password'
                className='text-sm text-brand-green hover:underline'>
                Olvidé mi contraseña
              </Link>
            </div>

            {/* Botón Principal */}
            <button
              type='submit'
              className='w-full bg-brand-green text-white font-bold text-lg p-3 rounded-lg hover:bg-opacity-90 transition duration-300'
              disabled={isLoading}>
              {isLoading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>
        )}

        {/* --- Contenido del Tab: REGISTRARSE --- */}
        {activeTab === "register" && (
          <form onSubmit={handleRegisterSubmit}>
            <InputField
              icon={AiOutlineUser}
              name='name'
              placeholder='Nombre Completo'
              value={registerData.name}
              onChange={handleRegisterChange}
            />
            <InputField
              icon={AiOutlineMail}
              type='email'
              name='email'
              placeholder='Correo Electrónico'
              value={registerData.email}
              onChange={handleRegisterChange}
            />
            <InputField
              icon={AiOutlineLock}
              type='password'
              name='password'
              placeholder='Contraseña (min. 6 caracteres)'
              value={registerData.password}
              onChange={handleRegisterChange}
              isPassword
              showPassword={showPassword}
              setShowPassword={() => setShowPassword(!showPassword)}
            />

            {/* Botón Principal */}
            <button
              type='submit'
              className='w-full bg-brand-green text-white font-bold text-lg p-3 rounded-lg hover:bg-opacity-90 transition duration-300'
              disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrarse"}
            </button>
          </form>
        )}
      </div>

      {/* Componente para mostrar las notificaciones Toast */}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LoginPage;
