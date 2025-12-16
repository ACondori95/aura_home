import {Link} from "react-router-dom";
import {FiFacebook, FiInstagram, FiMail, FiTwitter} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className='bg-background-dark text-white mt-auto'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div>
            <h3 className='text-2xl font-bold mb-4'>
              <span className='text-white'>AURA</span>
              <span className='text-warning'> HOME</span>
            </h3>
            <p className='text-white/70 text-sm'>
              Diseño excepcional para tu hogar. Encuentra los mejores muebles y
              accesorios.
            </p>
          </div>

          {/* Información */}
          <div>
            <h4 className='font-semibold mb-4'>Información</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='/sobre-nosotros'
                  className='text-white/70 hover:text-warning transition-colors'>
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to='/politicas'
                  className='text-white/70 hover:text-warning transition-colors'>
                  Políticas
                </Link>
              </li>
              <li>
                <Link
                  to='/contacto'
                  className='text-white/70 hover:text-warning transition-colors'>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className='font-semibold mb-4'>Enlaces</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='/productos'
                  className='text-white/70 hover:text-warning transition-colors'>
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  to='/politicas#devoluciones'
                  className='text-white/70 hover:text-warning transition-colors'>
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  to='/politicas#envios'
                  className='text-white/70 hover:text-warning transition-colors'>
                  Envíos
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className='font-semibold mb-4'>Síguenos</h4>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-white/70 hover:text-warning transition-colors'>
                <FiFacebook sice={24} />
              </a>
              <a
                href='#'
                className='text-white/70 hover:text-warning transition-colors'>
                <FiTwitter sice={24} />
              </a>
              <a
                href='#'
                className='text-white/70 hover:text-warning transition-colors'>
                <FiInstagram sice={24} />
              </a>
              <a
                href='#'
                className='text-white/70 hover:text-warning transition-colors'>
                <FiMail sice={24} />
              </a>
            </div>
          </div>
        </div>

        <div className='border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60'>
          <p>&copy; 2025 Aura Home. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
