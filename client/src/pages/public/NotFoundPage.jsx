import {Link} from "react-router-dom";
import Button from "../../components/common/Button";

const NotFoundPage = () => {
  return (
    <div className='container mx-auto px-4 py-16 text-center'>
      <div className='max-w-md mx-auto'>
        <div className='text-9xl font-bold text-primary mb-4'>404</div>
        <h1 className='text-3xl font-bold mb-4'>Página no encontrada</h1>
        <p className='text-text-secondary mb-8'>
          Lo sentimos, no pudimos encontrar la página que buscas. ¡Pero tenemos
          muchos otros muebles esperando!
        </p>
        <div className='flex gap-4 justify-center'>
          <Link to='/'>
            <Button variant='warning'>Volver al Inicio</Button>
          </Link>
          <Link to='/productos'>
            <Button variant='outline'>Ver Productos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
