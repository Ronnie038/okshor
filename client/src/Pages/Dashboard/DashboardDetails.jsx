import React, { useEffect, useState } from 'react';
import Chart from './Charts/Chart';
import ReChart from './Charts/ReChart';
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const DashboardDetails = () => {
	const [orders, setorders] = useState([]);

	useEffect(() => {
		fetch(`${apiBaseUrl}/order`, {
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.data);
				setorders(data.data);
			});
	}, []);

	const [products, setProduct] = useState([]);

	const fetchData = () => {
		fetch(`${apiBaseUrl}/products/displayProducts`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.data);
				setProduct(data.data);
			});
	};
	//data fecthing
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className='w-11/12 mx-auto '>
			<p className='text-3xl my-8 font-semibold'>Dashboard</p>
			<div className='flex md:flex-nowrap flex-wrap justify-between gap-5'>
				<div className='border text-center border-green-500 rounded-lg w-full py-8 px-5'>
					<p>Total Products</p>
					<p className='text-4xl mt-3 font-semibold'>{products.length}</p>
				</div>
				<div className='border text-center border-green-500 rounded-lg w-full py-8 px-5'>
					<p>Total Orders</p>
					<p className='text-4xl mt-3 font-semibold'>{orders.length}</p>
				</div>
			</div>
			<div className='flex gap-5 justify-between flex-col xl:flex-row my-10'>
				{/* <Chart></Chart>
				<ReChart /> */}
			</div>
		</div>
	);
};

export default DashboardDetails;
