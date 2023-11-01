import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../Components/Loading/Loading';
import toast from 'react-hot-toast';
// import Invoice from '../../../components/Invoice/Invoice';
// import Loading from "../../../components/Loading/Loading";
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const OrderStatus = [
	//   "Order Placed",
	'Processing',
	'Shipped',
	'Delivered',
	'canceled',
];

const UpdateOrder = () => {
	const [order, setOrderData] = useState({});
	const { id } = useParams();
	const [status, setStatus] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getOrder();
	}, [id]);
	// console.log({ status });

	const getOrder = async () => {
		try {
			const res = await fetch(`${apiBaseUrl}/order/single/${id}`, {
				credentials: 'include',
			});
			const data = await res.json();
			if (res.ok) {
				// console.log(data);
				setOrderData(data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const updateStatus = async () => {
		if (!status) return alert('please select status');
		setLoading(true);
		try {
			const res = await fetch(`${apiBaseUrl}/order/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'Application/json' },
				body: JSON.stringify({ orderStatus: status }),
				credentials: 'include',
			});
			const data = await res.json();
			if (res.ok) {
				toast.success('status updated');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className='min-h-screen p-5 w-full   '>
			{/* <Invoice order={order} /> */}
			<div className='mt-5'>
				<Link
					to={`/order/${order._id}`}
					className='text-3xl bg-[#006fba]  text-white font-bold rounded-md p-2'
				>
					Go to Invoice
				</Link>
			</div>

			<div className='mt-10'>
				<div className='min-w-full'>
					<table className='w-[100%]'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									Image
								</th>
								<th scope='col' className='px-6 py-3'>
									Name
								</th>
								<th scope='col' className='px-6 py-3'>
									Quantity
								</th>
								<th scope='col' className='px-6 py-3'>
									Total
								</th>
							</tr>
						</thead>
						<tbody className='text-center'>
							<tr>
								<td className=''>
									{order?.products?.map((product) => (
										<>
											<img
												src={product.image}
												alt=''
												className='w-24 rounded-xl mx-auto'
											/>
										</>
									))}
								</td>
								<td className=''>
									{order?.products?.map((product) => (
										<>
											<p>{product?.name}</p>
										</>
									))}
								</td>
								<td>
									{order?.products?.map((product) => (
										<>
											<p>{product?.quantity}</p>
										</>
									))}
								</td>
								<td>
									<p>{order?.price}Tk</p>
								</td>
							</tr>
						</tbody>
					</table>

					<div className='m-5'>
						<h1 className='text-3xl my-3'>Order Status</h1>
						<select
							className='font-bold outline-none'
							onChange={(e) => setStatus(e.target.value)}
							defaultValue='Select Status'
						>
							<option value=''>updata status</option>
							{OrderStatus?.map((status, idx) => (
								<option key={idx} value={status}>
									{status}
								</option>
							))}
						</select>

						<button
							disabled={loading}
							onClick={updateStatus}
							className='btn bg-[#006FBA] text-white mx-2'
						>
							{loading ? <Loading /> : 'Update'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateOrder;
