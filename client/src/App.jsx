import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Routes';
import { useEffect, useState } from 'react';
import MainLoading from './Components/Loading/MainLoading';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingState } from './store/slices/loadingSlices';

function App() {
	const { isLoading } = useSelector((state) => state.isLoading);
	const disPatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			disPatch(setLoadingState(false));
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	});
	if (isLoading) return <MainLoading />;
	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
