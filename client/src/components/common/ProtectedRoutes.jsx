import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

// Recibe la propiedad 'requiredRole' (ej. 'admin' o 'user')
const ProtectedRoutes = ({requiredRole}) => {
  const {user, token, isLoading, isAdmin} = useAuth();

  // Si aún está cargando la información de autenticación inicial, no renderizamos nada
  if (isLoading) {
    return <div className='text-center p-8'>Cargando autenticación...</div>;
  }

  // 1. Verificar si hay usuario logieado
  if (!token || !user) {
    // Si no está logueado, lo redirigimos al login
    return <Navigate to='/login' replace />;
  }

  // 2. Verificar el Rol si es necesario
  if (requiredRole === "admin" && !isAdmin) {
    // Si no es admin y la ruta lo requiere, redirigir a Home o a una página de error
    return <Navigate to='/' replace />;
  }

  // Si la autenticación y el rol son correctos, renderizamos el componente hijo
  return <Outlet />;
};

export default ProtectedRoutes;
