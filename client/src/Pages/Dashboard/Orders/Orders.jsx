import React, { useEffect, useState } from 'react';
import OrderTable from '../Table/OrderTable';
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Orders = () => {
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
	return (
		<div className='w-11/12 mx-auto'>
			<p className='text-3xl my-8 font-semibold'>Orders</p>
			<div className=''>
				<div className='border text-center border-green-500 rounded-lg w-[200px] py-8 px-5'>
					<p>Total Orders</p>
					<p className='text-4xl mt-3 font-semibold'>{orders.length}</p>
				</div>
			</div>
			<div className=' mt-8 md:grid-cols-2 grid-cols-1 '>
				<OrderTable orders={orders}></OrderTable>
			</div>
		</div>
	);
};

export default Orders;
