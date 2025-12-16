import {Link} from "react-router-dom";
import Button from "../../components/common/Button";

const HomePage = () => {
  return (
    <div className='container mx-auto px-4 py-12'>
      {/* Hero Section */}
      <div className='text-center mb-16'>
        <h1 className='text-5xl font-bold text-primary mb-4'>
          Diseño Excepcional para tu hogar
        </h1>
        <p className='text-xl text-text-secondary mb-8'>
          Descubre nuestra colección de muebles modernos y accesorios únicos
        </p>
        <Link to='/productos'>
          <Button variant='warning' size='lg'>
            Explorar Colección
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className='bg-secondary rounded-lg p-12 mb-16 text-center'>
        <div className='max-w-2xl mx-auto'>
          <img
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
            alt='Modern Living Room'
            className='rounded-lg shadow-lg w-full'
          />
        </div>
      </div>

      {/* Features */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
        <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
          <div className='text-4xl mb-4'>🚚</div>
          <h3 className='text-xl font-semibold mb-2'>Envío Gratis</h3>
          <p className='text-text-secondary'>En compras mayorea a $1000</p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
          <div className='text-4xl mb-4'>✅</div>
          <h3 className='text-xl font-semibold mb-2'>Garantía de Calidad</h3>
          <p className='text-text-secondary'>
            2 años en todos nuestros productos
          </p>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
          <div className='text-4xl mb-4'>🔄️</div>
          <h3 className='text-xl font-semibold mb-2'>Devoluciones Fáciles</h3>
          <p className='text-text-secondary'>30 días para devolver tu compra</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-primary text-white rounded-lg p-12 text-center'>
        <h2 className='txt-3xl font-bold mb-4'>
          ¿Listo para transformar tu hogar?
        </h2>
        <p className='text-xl mb-6'>Únete a miles de clientes satisfechos</p>
        <Link to='/productos'>
          <Button variant='warning' size='lg'>
            Ver Productos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
