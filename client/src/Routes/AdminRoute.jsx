import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import the MainLoading component for the loading state.
import MainLoading from '../components/Loading/MainLoading';

// AdminRoutes Component: A route guard for admin-only routes.
const AdminRoutes = ({ children }) => {
	// Get the current route location.
	const location = useLocation();

	// Retrieve user data from Redux store.
	const userData = useSelector((state) => state.user);
	const { user, status, isAuthenticated } = userData;

	// Check if the user is authenticated and their profile has loaded.
	if (status === 'loading') {
		return (
			<div role='status' className='text-center my-40'>
				{/* Display a loading spinner when user data is loading. */}
				<MainLoading />
			</div>
		);
	}

	// Check if the user is an admin with the 'admin' role.
	if (user?.isAdmin && user?.role === 'admin' && isAuthenticated) {
		// User is authenticated and has admin privileges.
		return children;
	} else {
		// Redirect to the login page with the original route as state.
		return <Navigate to='/login' state={{ from: location }} replace />;
	}
};

export default AdminRoutes;
