import {useState} from "react";
import {Link} from "react-router-dom";
import {
  FiHeart,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
} from "react-icons/fi";
import {useAuth} from "../../hooks/useAuth";
import Button from "../common/Button";

const Navbar = () => {
  const {user, isAuthenticated, logout} = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className='bg-background-dark text-white shadow-lg sticky top-0 z-40'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2'>
            <div className='text-2xl font-bold'>
              <span className='text-white'>AURA</span>
              <span className='text-warning'> HOME</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className='hidden md:flex flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <input
                type='text'
                placeholder='Buscar productos...'
                className='w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20'
              />
              <FiSearch
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60'
                size={20}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-6'>
            <Link
              to='/productos'
              className='hover:text-warning transition-colors'>
              Productos
            </Link>
            <Link
              to='/contacto'
              className='hover:text-warning transition-colors'>
              Contacto
            </Link>

            {/* Icons */}
            <div className='flex items-center space-x-4 ml-4'>
              {isAuthenticated ? (
                <>
                  <Link
                    to='/favoritos'
                    className='hover:text-warning transition-colors relative'>
                    <FiHeart size={24} />
                    {user?.favorites?.length > 0 && (
                      <span className='absolute -top-2 -right-2 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                        {user.favorites.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to='/carrito'
                    className='hover:text-warning transition-colors relative'>
                    <FiShoppingCart size={24} />
                    <span className='absolute -top-2 -right-2 bg-warning text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                      3
                    </span>
                  </Link>

                  <div className='relative group'>
                    <button className='flex items-center space-x-2 hover:text-warning transition-colors'>
                      <FiUser size={24} />
                      <span className='text-sm'>{user?.name}</span>
                    </button>

                    {/* Drodown */}
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block'>
                      <Link
                        to='/perfil'
                        className='block px-4 py-2 text-text-primary hover:bg-secondary transition-colors'>
                        Mi Perfil
                      </Link>
                      <Link
                        to='/mis-pedidos'
                        className='block px-4 py-2 text-text-primary hover:bg-secondary transition-colors'>
                        Mis Pedidos
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to='/admin'
                          className='block px-4 py-2 text-text-primary hover:bg-secondary transition-colors'>
                          Dashboard Admin
                        </Link>
                      )}
                      <hr className='my-2' />
                      <button
                        onClick={handleLogout}
                        className='w-full text-left px-4 py-2 text-error hover:bg-secondary transition-colors flex items-center space-x-2'>
                        <FiLogOut size={16} />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <Link to='/login'>
                  <Button variant='warning' size='sm'>
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden text-white hover:text-warning transition-colors'>
            {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='md:hiden py-4 border-t border-white/20'>
            {/* Mobile Search */}
            <div className='mb-4'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Buscar productos...'
                  className='w-full px-4 py-2 pl-10 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary'
                />
                <FiSearch
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60'
                  size={20}
                />
              </div>
            </div>

            {/* Mobile Links */}
            <div className='space-y-2'>
              <Link
                to='/productos'
                className='block py-2 hover:text-warning transition-colors'
                onClick={() => setMobileMenuOpen(false)}>
                Productos
              </Link>
              <Link
                to='/contacto'
                className='block py-2 hover:text-warning transition-colors'
                onClick={() => setMobileMenuOpen(false)}>
                Contacto
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to='/favoritos'
                    className='block py-2 hover:text-warning transition-colors'
                    onClick={() => setMobileMenuOpen(false)}>
                    Mis Favoritos
                  </Link>
                  <Link
                    to='/carrito'
                    className='block py-2 hover:text-warning transition-colors'
                    onClick={() => setMobileMenuOpen(false)}>
                    Carrito
                  </Link>
                  <Link
                    to='/perfil'
                    className='block py-2 hover:text-warning transition-colors'
                    onClick={() => setMobileMenuOpen(false)}>
                    Mi Perfil
                  </Link>
                  <Link
                    to='/mis-pedidos'
                    className='block py-2 hover:text-warning transition-colors'
                    onClick={() => setMobileMenuOpen(false)}>
                    Mis Pedidos
                  </Link>
                  {user?.role === "admin" && (
                    <Link
                      to='/admin'
                      className='block py-2 hover:text-warning transition-colors'
                      onClick={() => setMobileMenuOpen(false)}>
                      Dashboard Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className='w-full text-left py-2 text-error hover:text-red-600 transition-colors'>
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link to='/login' onClick={() => setMobileMenuOpen(false)}>
                  <Button variant='warning' size='sm' fullWidth>
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
