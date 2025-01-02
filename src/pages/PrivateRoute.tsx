import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hook';

const PrivateRoute = () => {
    const { accessToken } = useAppSelector((state) => state.auth);

    return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;