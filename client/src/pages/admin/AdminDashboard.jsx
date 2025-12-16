import {useAuth} from "../../hooks/useAuth";
import {FiDollarSign, FiPackage, FiShoppingCart, FiUsers} from "react-icons/fi";

const AdminDashboard = () => {
  const {user} = useAuth();

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-primary mb-2'>
          Dashboard Admin
        </h1>
        <p className='text-text-secondary'>Bienvenido/a, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <FiDollarSign className='text-success text-3xl' />
            <span className='text-success text-sm font-semibold'>↑ 12%</span>
          </div>
          <h3 className='text-text-secondary text-sm mb-1'>Ventas Totales</h3>
          <p className='text-3xl font-bold'>$15,840</p>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <FiShoppingCart className='text-primary text-3xl' />
            <span className='text-primary text-sm font-semibold'>
              25 nuevas
            </span>
          </div>
          <h3 className='text-text-secondary text-sm mb-1'>Órdenes Nuevas</h3>
          <p className='text-3xl font-bold'>25</p>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <FiPackage className='text-warning text-3xl' />
            <span className='text-error text-sm font-semibold'>18%</span>
          </div>
          <h3 className='text-text-secondary text-sm mb-1'>
            Productos Bajo Stock
          </h3>
          <p className='text-3xl font-bold'>18</p>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-6'>
          <div className='flex items-center justify-between mb-4'>
            <FiUsers className='text-success text-3xl' />
            <span className='text-success text-sm font-semibold'>↑ 8%</span>
          </div>
          <h3 className='text-text-secondary text-sm mb-1'>Usuarios Nuevos</h3>
          <p className='text-3xl font-bold'>42</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>Acciones Rápidas</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <button className='btn-primary'>Agregar Producto</button>
          <button className='btn-secondary'>Ver Órdenes</button>
          <button className='btn-warning'>Gestionar Categorías</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
