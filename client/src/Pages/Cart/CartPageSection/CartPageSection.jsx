import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
// import CartImg from "../../assets/WomanNewItems/img2.png";
// import Rating from "react-rating";
// import ProductCouter from "../Counter/ProductCounter";
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import AddedCartProducts from './AddedCartProducts.jsx';
import { removeAll } from '../../../store/slices/CartSlices';

const CartPageSection = () => {
	const dispatch = useDispatch();
	const [price, setPrice] = useState(null);
	const [productIsCheck, setProductIsCheck] = useState(false);
	const userData = useSelector((state) => state.user);
	const { user, status, error } = userData;
	const {
		cart: products,
		total,
		subTotal,
	} = useSelector((state) => {
		return state.cartItems;
	});

	// console.log(quantity);
	const notify = () =>
		toast.success('Your Selected Item Deleted Successfull', {
			style: {
				backgroundColor: '#0C4E67',
				color: 'white',
			},
			className: 'bg-red-600',
		});
	const handleDelete = () => {
		if (user) {
			notify();
		}
	};

	const handleProductChecked = () => {
		setProductIsCheck(!productIsCheck);
	};

	const handleAllDelete = () => {
		if (!productIsCheck) return;

		dispatch(removeAll());
		setProductIsCheck(!productIsCheck);
		notify();
	};

	return (
		<>
			<Fade>
				<div className='mx-5'>
					<div className='w-10/12 mx-auto my-20'>
						{/* all select  */}
						<div className='border p-5 flex justify-between'>
							<div className='flex items-center gap-5 '>
								<input
									onClick={() => handleProductChecked()}
									checked={productIsCheck ? true : false}
									type='checkbox'
									id='selectAll'
									className='cursor-pointer text-xlappearance-none indeterminate:bg-gray-300 rounded-lg border-4 border-black w-8 h-8'
								/>
								<label
									htmlFor='selectAll'
									className='cursor-pointer text-2xl font-semibold'
								>
									{productIsCheck ? 'Not Seletct' : 'Select all'}
								</label>
							</div>
							<div
								onClick={() => handleAllDelete()}
								title='Delete'
								className='cursor-pointer'
							>
								<Icon
									className={`text-3xl text-red-600 ${
										!productIsCheck && 'cursor-not-allowed opacity-50'
									}`}
									icon='fluent-mdl2:delete'
								/>
							</div>
						</div>
						{/*  select product  */}
						{products?.map((item, index) => (
							<AddedCartProducts
								key={item._id}
								item={item}
								productIsCheck={productIsCheck}
							/>
						))}

						{/* summery  */}
						<div className='mt-16'>
							<table className='border w-full'>
								<tr>
									<th className='p-5 text-2xl' colSpan={2}>
										Summary
									</th>
								</tr>
								<tbody>
									<tr>
										<td className='border p-5 text-lg font-semibold'>
											Sub Total
										</td>
										<td className='border p-5 text-lg font-semibold flex justify-end items-center '>
											{subTotal.toFixed(2)}
											<Icon icon='mdi:currency-bdt' />
										</td>
									</tr>
									<tr>
										<td className='border p-5 text-lg font-semibold'>
											Quantity
										</td>
										<td className='border p-5 text-lg font-semibold flex justify-end items-center'>
											{products.length}
										</td>
									</tr>
									<tr>
										<td className='border p-5 text-lg font-semibold'>Vat 5%</td>
										<td className='border p-5 text-lg font-semibold flex justify-end items-center'>
											{subTotal * 0.05} <Icon icon='mdi:currency-bdt' />
										</td>
									</tr>
									<tr>
										<td className='border p-5 text-lg font-semibold'>
											Delivery Charge
										</td>
										<td className='border p-5 text-lg font-semibold flex justify-end items-center'>
											{100} <Icon icon='mdi:currency-bdt' />
										</td>
									</tr>
									<tr>
										<td className='border p-5 text-lg font-semibold'>Total</td>
										<td className='border p-5 text-lg font-semibold flex justify-end items-center'>
											{products.length > 0 ? total.toFixed(2) : 0}{' '}
											<Icon icon='mdi:currency-bdt' />
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className='flex justify-center items-center gap-5 mt-20'>
							<Link
								to='/shop'
								className='px-5 py-2 text-center rounded-none  text-xl bg-transparent border hover:bg-[#3B95B0] hover:text-white hover:border-[#3B95B0] duration-300 border-black'
							>
								Return Shop
							</Link>
							{products?.length > 0 && user._id ? (
								<Link
									to='/checkOut'
									className='btn rounded-none lg:w-52 h-14 text-xl border-0 bg-[#0C4E67] hover:bg-[#3B95B0] text-white normal-case'
								>
									Check Out
								</Link>
							) : (
								<div>
									{!user._id ? (
										<>
											<div className='flex items-center gap-5'>
												<p className='text-red-600'>
													Please Login to proceed further
												</p>
												<Link
													to='/login'
													className='bg-red-600 hover:bg-red-500 duration-300 text-white px-5 py-1'
												>
													Login
												</Link>
											</div>
										</>
									) : (
										<button
											className='btn rounded-none lg:w-52 h-14 text-xl border-0 bg-[#0C4E67] bg-opacity-50 cursor-not-allowed hover:bg-[#3B95B0] text-white normal-case'
											disabled
										>
											Check Out
										</button>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</Fade>
		</>
	);
};

export default CartPageSection;
