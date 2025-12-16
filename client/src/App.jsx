import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoginPage from "./pages/public/LoginPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />

        <main className='flex-grow'>
          <Routes>
            <Route
              path='/'
              element={
                <div className='container mx-auto px-4 py-8 text-center'>
                  <h1 className='text-4xl font-bold text-primary mb-4'>
                    Bienvenido a AURA HOME
                  </h1>
                  <p className='text-xl text-text-secondary'>
                    Sistema de autenticación completado ✓
                  </p>
                </div>
              }
            />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
