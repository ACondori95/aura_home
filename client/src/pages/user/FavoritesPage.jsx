import {useAuth} from "../../hooks/useAuth";

const FavoritesPage = () => {
  const {user} = useAuth();

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-primary mb-8'>Mi Favoritos</h1>

      {user?.favorites?.length === 0 ? (
        <div className='text-center py-16'>
          <div className='text-6xl mb-4'>💔</div>
          <h2 className='text-2xl font-semibold mb-2'>No tienes favoritos</h2>
          <p className='text-text-secondary mb6'>
            Empieza a guardar los productos favoritos
          </p>
          <button className='btn-warning'>Explorar Productos</button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {/* Placeholder for product cards */}
          <div className='bg-white rounded-lg shadow-lg p-4 text-center'>
            <div className='bg-secondary h-48 rounded-lg mb-4'></div>
            <h3 className='font-semibold mb-2'>Producto Favorito</h3>
            <p className='text-primary font-bold'>$499.99</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
