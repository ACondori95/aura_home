import {Link} from "react-router-dom";
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-brand-blue text-white mt-auto'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 pb-4'>
          {/* Columna 1: Información */}
          <div>
            <h4 className='font-bold mb-3 text-brand-green'>Información</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='/acerca'
                  className='hover:text-brand-green transition'>
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to='/contacto'
                  className='hover:text-brand-green transition'>
                  Contacto
                </Link>
              </li>
              <li>
                <Link to='/faq' className='hover:text-brand-green transition'>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className='font-bold mb-3 text-brand-green'>Enlaces Rápidos</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='/categorias/sillas'
                  className='hover:text-brand-green transition'>
                  Sillas
                </Link>
              </li>
              <li>
                <Link
                  to='/categorias/sillones'
                  className='hover:text-brand-green transition'>
                  Sillones
                </Link>
              </li>
              <li>
                <Link
                  to='/categorias/textiles'
                  className='hover:text-brand-green transition'>
                  Textiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información Legal */}
          <div>
            <h4 className='font-bold mb-3 text-brand-green'>Legal</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='/terminos'
                  className='hover:text-brand-green transition'>
                  Términos de Servicios
                </Link>
              </li>
              <li>
                <Link
                  to='/privacidad'
                  className='hover:text-brand-green transition'>
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to='/devoluciones'
                  className='hover:text-brand-green transition'>
                  Devoluciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div>
            <h4 className='font-bold mb-3 text-brand-green'>Redes Sociales</h4>
            <div className='flex space-x-4 text-xl'>
              <a
                href='#'
                target='_blank'
                aria-label='Facebook'
                className='hover:text-brand-green transition'>
                <FaFacebook />
              </a>
              <a
                href='#'
                target='_blank'
                aria-label='Twitter'
                className='hover:text-brand-green transition'>
                <FaTwitter />
              </a>
              <a
                href='#'
                target='_blank'
                aria-label='Instagram'
                className='hover:text-brand-green transition'>
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Derechos de Autor */}
        <div className='text-center border-t border-gray-700 pt-4 mt-4 text-sm'>
          &copy; {currentYear} Aura Home. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
