import {useAuth} from "../../hooks/useAuth";
import {FiMail, FiMapPin, FiPhone, FiUser} from "react-icons/fi";

const UserProfilePage = () => {
  const {user} = useAuth();

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-primary mb-8'>Mi Perfil</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Sidebar */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <div className='text-center mb-6'>
            <div className='w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4'>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className='text-xl font-semibold'>{user?.name}</h2>
            <p className='text-text-secondary'>{user?.email}</p>
          </div>

          <div className='space-y-2'>
            <button className='w-full text-left px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold'>
              Información Personal
            </button>
            <button className='w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors'>
              Mis Direcciones
            </button>
            <button className='w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors'>
              Mis Pedidos
            </button>
            <button className='w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors'>
              Cambiar Contraseña
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className='md:col-span-2'>
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-semibold mb-6'>Información Personal</h3>

            <div className='space-y-4'>
              <div className='flex items-center gap-3 p-4 bg-secondary rounded-lg'>
                <FiUser className='text-primary text-xl' />
                <div>
                  <p className='text-sm text-text-secondary'>Nombre</p>
                  <p className='font-semibold'>{user?.name}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 bg-secondary rounded-lg'>
                <FiMail className='text-primary text-xl' />
                <div>
                  <p className='text-sm text-text-secondary'>Email</p>
                  <p className='font-semibold'>{user?.email}</p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 bg-secondary rounded-lg'>
                <FiPhone className='text-primary text-xl' />
                <div>
                  <p className='text-sm text-text-secondary'>Teléfono</p>
                  <p className='font-semibold'>
                    {user?.phone || "No registrado"}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 p-4 bg-secondary rounded-lg'>
                <FiMapPin className='text-primary text-xl' />
                <div>
                  <p className='text-sm text-text-secondary'>Direcciones</p>
                  <p className='font-semibold'>
                    {user?.addresses?.length || 0} direcciones fuardadas
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <button className='btn-warning'>Editar Información</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
