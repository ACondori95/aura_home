import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import Loader from "../components/common/Loader";

/**
 * Admi route component
 * Redirect to home if user is not admin
 */
const AdminRoute = ({children}) => {
  const {user, isAuthenticated, loading} = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default AdminRoute;
