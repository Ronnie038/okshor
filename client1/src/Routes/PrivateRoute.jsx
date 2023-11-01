import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const PrivateRoute = ({ children }) => {
	const userData = useSelector((state) => state.user);

	const { user, status, error } = userData;
	const location = useLocation();
	if (status === 'loading') {
		return <Loading />;
	}

	if (user._id) {
		return children;
	}
	return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
