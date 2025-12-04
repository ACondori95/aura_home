import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-white'>
        <Routes>
          {/* Rutas Públicas */}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<div>Login Page</div>} />

          {/* Rutas Protegidas (se implementarán con el middleware/componente ProtectedRoute) */}
          <Route path='/admin' element={<div>Admin Dashboard</div>} />

          {/* Ruta de Error 404 */}
          <Route path='*' element={<div>Error 404 - Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
