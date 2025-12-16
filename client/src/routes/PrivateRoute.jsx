import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import Loader from "../components/common/Loader";

/**
 * Protected route component
 * Redirects to login if user is not authenticated
 */
const PrivateRoute = ({children}) => {
  const {isAuthenticated, loading} = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default PrivateRoute;
