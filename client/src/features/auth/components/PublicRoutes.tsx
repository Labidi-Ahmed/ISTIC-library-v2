import {Navigate, Outlet} from 'react-router-dom';
import useAuth from '@/features/auth/hooks/useAuth';
import Loading from '@/components/Loading';

const PublicRoutes = () => {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
