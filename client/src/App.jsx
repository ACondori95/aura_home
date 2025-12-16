import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import "./index.css";

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />

        <main className='flex-grow container mx-auto px-4 py-8'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-primary mb-4'>
              Bienvenido a AURA HOME
            </h1>
            <p className='text-xl text-text-secondary'>
              Sistema de autenticación completado ✓
            </p>
            <p className='text-text-secondary mt-2'>
              Próximo paso: Página de Login/Register
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
