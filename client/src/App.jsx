import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/common/Header";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import Footer from "./components/common/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen flex flex-col'>
        <Header />

        {/* Contenido de la Ruta */}
        <main className='flex-grow'>
          <Routes>
            {/* Rutas Públicas */}
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<div>Login Page</div>} />
            <Route path='*' element={<div>Error 404 - Not Found</div>} />

            {/* Rutas Protegidas para USUARIOS (Rol 'user' o 'admin') */}
            <Route element={<ProtectedRoutes requiredRole='user' />}>
              <Route path='/carrito' element={<div>Vista Carrito</div>} />
              <Route path='/favoritos' element={<div>Vista Favoritos</div>} />
              <Route path='/perfil' element={<div>Vista Perfil</div>} />
              <Route path='/checkout-1' element={<div>Vista Checkout 1</div>} />
              <Route path='/checkout-2' element={<div>Vista Checkout 2</div>} />
            </Route>

            {/* Rutas Protegidas para ADMINISTRADORES (Rol 'admin') */}
            <Route element={<ProtectedRoutes requiredRole='admin' />}>
              <Route path='/admin' element={<div>Dashboard Admin</div>} />
              <Route
                path='/admin/productos'
                element={<div>Gestión de Productos</div>}
              />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
