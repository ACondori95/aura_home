import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

// Public Pages
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import NotFoundPage from "./pages/public/NotFoundPage";

// User Pages
import UserProfilePage from "./pages/user/UserProfilePage";
import FavoritesPage from "./pages/user/FavoritesPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

import "./index.css";

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />

        <main className='flex-grow'>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />

            {/* Protected User Routes */}
            <Route
              path='/perfil'
              element={
                <PrivateRoute>
                  <UserProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path='/favoritos'
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path='/admin'
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* 404 Route */}
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
