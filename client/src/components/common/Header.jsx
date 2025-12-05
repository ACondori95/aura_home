import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {
  AiOutlineDashboard,
  AiOutlineHeart,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import {FiSearch} from "react-icons/fi";

const Header = () => {
  const {user, isAdmin, logout} = useAuth();

  return (
    <header className='bg-white shadow-md sticky top-0 z-50'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        {/* 1. Logo */}
        <Link
          to='/'
          className='text-xl font-bold text-brand-blue min-w-[150px]'>
          AURA HOME
        </Link>

        {/* 2. Barra de Búsqueda Central (Estilo de la vista home) */}
        <div className='flex-grow max-w-lg mx-8 hidden md:block'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Buscar productos...'
              className='w-full p-2 pl-10 border border-gray-300 rounded-full focus:ring-brand-green focus:border-brand-green'
            />
            <FiSearch
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
          </div>
        </div>

        {/* 3. Íconos de Navegación Derecha */}
        <div className='flex items-center space-x-4 min-w-[150px] justify-end'>
          {/* Perfil o Login */}
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to='/admin'
                  title='Dashboard Admin'
                  className='text-brand-blue hover:text-brand-green p-1'>
                  <AiOutlineDashboard size={24} />
                </Link>
              )}
              <Link
                to='/perfil'
                title='Mi Perfil'
                className='text-brand-blue hover:text-brand-green p-1'>
                <AiOutlineUser size={24} />
              </Link>
              <button
                onClick={logout}
                title='Cerrar Sesión'
                className='text-brand-blue hover:text-brand-red p-1'>
                <AiOutlineLogout size={24} />
              </button>
            </>
          ) : (
            <Link
              to='/login'
              title='Iniciar Sesión'
              className='text-brand-blue hover:text-brand-green p-1'>
              <AiOutlineLogin size={24} />
            </Link>
          )}

          {/* Favoritos */}
          <Link
            to='/favoritos'
            title='Favoritos'
            className='text-brand-blue hover:text-brand-green p-1'>
            <AiOutlineHeart size={24} />
          </Link>

          {/* Carrito de Compras */}
          <Link
            to='/carrito'
            title='Carrito'
            className='text-brand-blue hover:text-brand-green p-1 relative'>
            <AiOutlineShoppingCart size={24} />
            {/* Placeholder para el contador */}
            <span className='absolute -top-1 -right-1 bg-brand-green text-white text-xs rounded-full h-4 w-4 flex items-center justify-center'>
              3
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
