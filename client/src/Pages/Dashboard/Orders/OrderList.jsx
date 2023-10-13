import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const OrderList = ({ order }) => {
	const {
		address,
		user,
		email,
		_id,
		contactNumber,
		price,
		products,
		paidStatus,
		orderStatus,
		updatedAt,
	} = order;
	//   [
	//     //   "Order Placed",
	//     "Processing",
	//     "Shipped",
	//     "Delivered",
	//     "canceled",
	//   ];
	const [statusColor, setStatusColor] = useState('');

	useEffect(() => {
		if (orderStatus === 'Delivered') {
			setStatusColor('bg-green-400');
		} else if (orderStatus === 'canceled') {
			setStatusColor('bg-red-400');
		} else if (orderStatus === 'Processing') {
			setStatusColor('bg-[#54b7d3]');
		} else if (orderStatus == 'Shipped') {
			setStatusColor('bg-[#1e91cf]');
		} else {
			setStatusColor('bg-[#f3a638]');
		}
	}, []);

	const date = new Date();

	// console.log(statusColor);

	return (
		<>
			<tr className='py-10 text-center'>
				<td>{_id}</td>
				<td>{date.toLocaleDateString('en-US', updatedAt)}</td>

				<td className='py-6 text-center'>
					{products?.map((item) => (
						<img src={item.image} className='h-20' alt='' />
					))}
				</td>
				<td className='py-6 text-center'>
					{products?.map((item) => (
						<>
							<p>{item.name}</p>
						</>
					))}
				</td>
				{/* <td className='py-6 text-center'>
					{products?.map((item) => (
						<>
							<p>{item.sku}</p>
						</>
					))}
				</td> */}
				<td scope='row'>
					{products?.map((item) => (
						<>
							<p>{item.quantity}</p>
						</>
					))}
				</td>
				<td scope='row'>
					{products?.map((item) => (
						<>
							<p>{item.price}</p>
						</>
					))}
				</td>
				<td>{price}</td>

				<td>{user?.name}</td>
				<td>{contactNumber}</td>
				{/* <td>{paidStatus.toString()}</td> */}
				<td>
					{/* {orderStatus === "Delivered" ? (
            <span className="font-bold text-green-500">{orderStatus}</span>
          ) : (
            <span className="font-bold">{orderStatus}</span>
          )} */}
					<span
						className={`${statusColor} text-white p-2 rounded-md mx-2 font-bold`}
					>
						{orderStatus}
					</span>
				</td>

				<td>
					<Link to={`${order?._id}`} className='text-green-600 font-bold'>
						<div className='flex items-center'>
							<span>Update</span>{' '}
							<Icon icon='mingcute:edit-line' className='text-3xl' />
						</div>
					</Link>
				</td>
				{/* <td > */}
				{/* <Link to ={`/updateProduct/${order._id}`}><span><AiFillEdit ></AiFillEdit>Edit   </span></Link> */}

				{/* <Link to=``>Edit</Link> */}

				{/* <UpdateProduct></UpdateProduct> */}
				{/* <button onClick={() => navigate(`updateProduct/${product._id}`)}>edit</button> */}
				{/* <button onClick={ handleClick}>edit</button> */}
				{/* <Button   type="submit" className='p-0 text-primary'> <span><AiFillEdit ></AiFillEdit>Edit   </span> </Button> */}

				{/* </td> */}
				{/* <td ><Button type="submit" className='p-0 text-danger'> <span className='text-danger'><AiOutlineDelete ></AiOutlineDelete></span> Delete</Button></td> */}
			</tr>
		</>
	);
};

export default OrderList;
