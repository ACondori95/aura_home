import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FiLock, FiMail, FiPhone, FiUser} from "react-icons/fi";
import {useAuth} from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const LoginPage = () => {
  const navigate = useNavigate();
  const {login, register, isAuthenticated, loading: authLoading} = useAuth();

  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    acceptTerms: false,
  });

  // Form errors
  const [errors, setErrors] = useState({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate("/");
    }
  }, [isAuthenticated, authLoading, navigate]);

  /**
   * Handle login form change
   */
  const handleLoginChange = (e) => {
    const {name, value, type, checked} = e.target;
    setLoginData({...loginData, [name]: type === "checkbox" ? checked : value});
    // Clear error for this field
    if (errors[name]) {
      setErrors({...errors, [name]: ""});
    }
  };

  /**
   * Handle register form change
   */
  const handleRegisterChange = (e) => {
    const {name, value, type, checked} = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({...errors, [name]: ""});
    }
  };

  /**
   * Validate login form
   */
  const validateLogin = () => {
    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!loginData.password) {
      newErrors.password = "La contraseña es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Validate register form
   */
  const validateRegister = () => {
    const newErrors = {};

    if (!registerData.name) {
      newErrors.name = "El nombre es requerido";
    } else if (registerData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!registerData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!registerData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (registerData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!registerData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle login submit
   */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    setLoading(true);
    const result = await login({
      email: loginData.email,
      password: loginData.password,
    });
    setLoading(false);

    if (result.success) {
      navigate("/");
    }
  };

  /**
   * Handle register submit
   */
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateRegister()) return;

    setLoading(true);
    const result = await register({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      phone: registerData.phone,
    });
    setLoading(false);

    if (result.success) {
      navigate("/");
    }
  };

  if (authLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full' />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background py-12 px-4'>
      <div className='max-w-md w-full'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold'>
            <span className='text-primary'>AURA</span>
            <span className='text-warning'> HOME</span>
          </h1>
          <p className='text-text-secondary mt-2'>
            Diseño excepcional para tu hogar
          </p>
        </div>

        {/* Card */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          {/* Tabs */}
          <div className='flex border-b'>
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${
                activeTab === "login"
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}>
              Iniciar Sesión
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${
                activeTab === "register"
                  ? "text-primary border-b-2 border-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}>
              Registrarse
            </button>
          </div>

          {/* Forms */}
          <div className='p-8'>
            {activeTab === "login" ? (
              <form onSubmit={handleLoginSubmit} className='space-y-6'>
                <Input
                  label='Correo Electrónico'
                  type='email'
                  name='email'
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder='tu@email.com'
                  icon={<FiMail />}
                  errors={errors.email}
                  required
                />

                <Input
                  label='Contraseña'
                  type='password'
                  name='password'
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder='******'
                  icon={<FiLock />}
                  errors={errors.password}
                  required
                />

                <div className='flex items-center justify-between'>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      name='rememberMe'
                      checked={loginData.rememberMe}
                      onChange={handleLoginChange}
                      className='mr-2'
                    />
                    <span className='text-sm text-text-secondary'>
                      Recordarme
                    </span>
                  </label>
                  <Link
                    to='/recuperar-password'
                    className='text-sm text-primary hover:underline'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <Button
                  type='submit'
                  variant='warning'
                  size='lg'
                  fullWidth
                  loading={loading}>
                  Iniciar Sesión
                </Button>
              </form>
            ) : (
              // Register Form
              <form onSubmit={handleRegisterSubmit} className='space-y-6'>
                <Input
                  label='Nombre Completo'
                  type='text'
                  name='name'
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  placeholder='Juan Pérez'
                  icon={<FiUser />}
                  errors={errors.name}
                  required
                />

                <Input
                  label='Correo Electrónico'
                  type='email'
                  name='email'
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder='tu@email.com'
                  icon={<FiMail />}
                  errors={errors.email}
                  required
                />

                <Input
                  label='Teléfono'
                  type='tel'
                  name='phone'
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  placeholder='+54 123 456 7890'
                  icon={<FiPhone />}
                  errors={errors.phone}
                />

                <Input
                  label='Contraseña'
                  type='password'
                  name='password'
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder='******'
                  icon={<FiLock />}
                  errors={errors.password}
                  required
                />

                <Input
                  label='Confirmar Contraseña'
                  type='password'
                  name='confirmPassword'
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder='******'
                  icon={<FiLock />}
                  errors={errors.confirmPassword}
                  required
                />

                <div>
                  <label className='flex items-start'>
                    <input
                      type='checkbox'
                      name='acceptTerms'
                      checked={registerData.acceptTerms}
                      onChange={handleRegisterChange}
                      className='mt-1 mr-2'
                    />
                    <span className='text-sm text-text-secondary'>
                      Acepto los{" "}
                      <Link
                        to='/politicas'
                        className='text-primary hover:underline'>
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link
                        to='/politicas#privacidad'
                        className='text-primary hover:underline'>
                        política de privacidad
                      </Link>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className='text-error text-sm mt-1'>
                      {errors.acceptTerms}
                    </p>
                  )}
                </div>
                <Button
                  type='submit'
                  variant='warning'
                  size='lg'
                  fullWidth
                  loading={loading}>
                  Registrarse
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className='text-center mt-6 text-sm text-text-secondary'>
          {activeTab === "login" ? (
            <p>
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => setActiveTab("register")}
                className='text-primary hover:underline font-semibold'>
                Regístrate aquí
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => setActiveTab("login")}
                className='text-primary hover:underline font-semibold'>
                Inicia sesión aquí
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
