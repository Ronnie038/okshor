import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
// import CartImg from "../../assets/WomanNewItems/img2.png";
// import Rating from "react-rating";

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { toast } from 'react-hot-toast';
import AddressModal from '../../components/AddressModal/AddressModal';
import { useDispatch, useSelector } from 'react-redux';
import { getToUserAddress } from '../../utilities/fakedb';
import { removeSingleItem } from '../../store/slices/CartSlices';
import cashOnDeliveryImg from '../../assets/Home/Icon2.png';

const Checkout = () => {
	const user = true;
	const userAddress = false;
	const dispatch = useDispatch();

	const foundProducts = [];
	// const [products, setProducts] = useState([]);
	const [openModal, setOpenModal] = useState();
	// const [userAddressData, setuserAddressData] = useState()
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
	const [paymentMethod, setPaymentMethod] = useState();
	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState(null);

	let priceItems = 200;
	useEffect(() => {
		setPrice(quantity * priceItems);
	}, [quantity]);

	// toastify
	const notify = () =>
		toast.success('Your Selected Item Deleted Successfull', {
			style: {
				backgroundColor: '#0C4E67',
				color: 'white',
			},
			className: 'bg-black',
		});
	const handleDelete = () => {
		if (user) {
			notify();
		}
	};

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	// const itemsData = useSelector((state) => {
	//   // console.log(state.items.data)
	//   return state.items.data;
	// });
	const {
		cart: products,
		total,
		subTotal,
	} = useSelector((state) => {
		return state.cartItems;
	});
	//   let products = [{ title: "hello" }, { title: "hello" }];

	const navigate = useNavigate();

	const handleOrderConfirm = () => {
		// Find the selected payment method object

		// Check if the selectedMethod exists

		navigate('/adedAddress', {});
	};

	const userAddressData = getToUserAddress();

	return (
		<div>
			<Fade>
				<div className='w-10/12 mx-auto my-20'>
					<div className='mx-5'>
						{/*  single added products  */}
						<div className='my-10'>
							<table className='w-full border'>
								<thead>
									<tr>
										<th className='border p-2 lg:text-xl'>Product Name</th>
										<th className='border p-2 lg:text-xl'>Product Price</th>
										<th className='border p-2 lg:text-xl'>Product Quantity</th>
										<th className='border p-2 lg:text-xl'>Delete</th>
									</tr>
								</thead>
								<tbody className='text-center py-5'>
									{products.map((item, index) => (
										<>
											<tr className='border'>
												<td className='py-5 px-3 font-semibold'>
													{item.title}
												</td>
												<td className='py-5 px-3 font-semibold'>
													{item.price}৳
												</td>
												<td className='py-5 px-3 font-semibold'>
													{item.quantity}
												</td>
												<td className='py-5 px-3'>
													<div className='flex justify-center'>
														<Icon
															onClick={() =>
																dispatch(removeSingleItem(item._id))
															}
															title='Delete'
															className='text-2xl text-red-600 cursor-pointer'
															icon='fluent-mdl2:delete'
														/>
													</div>
												</td>
											</tr>
										</>
									))}
								</tbody>
							</table>
						</div>

						<div className='grid lg:grid-cols-2 gap-5'>
							{/* added address  */}
							<div className='border p-5'>
								<div className='flex justify-between items-center'>
									<h3 className='text-2xl font-bold'>Address</h3>
									<div>
										{userAddressData ? (
											<Link>
												<Icon
													onClick={() => handleOpenModal()}
													icon='tabler:edit'
													className='text-4xl text-[#4A53A1]'
												/>
											</Link>
										) : (
											<Link onClick={() => handleOpenModal()} to=''>
												<Icon
													className='text-4xl text-[#4A53A1]'
													icon='gala:add'
												/>
											</Link>
										)}
									</div>
								</div>
								{userAddressData ? (
									<>
										<hr className='mt-2' />
										<div className='mt-5'>
											<div className='space-y-5'>
												<p>
													<span className='font-medium'>Name:</span>{' '}
													{userAddressData?.name}
												</p>
												<p>
													<span className='font-medium'>Email:</span>{' '}
													{userAddressData?.email}
												</p>
												<p>
													<span className='font-medium'>Mobile:</span>{' '}
													{userAddressData?.contactNumber}
												</p>
												<p>
													<span className='font-medium'>Address:</span>{' '}
													{userAddressData?.address}
												</p>
												<p>
													<span className='font-medium'>Area:</span>{' '}
													{userAddressData?.area}
												</p>
												<p>
													<span className='font-medium'>City:</span>{' '}
													{userAddressData?.city}
												</p>
											</div>
										</div>
									</>
								) : (
									<></>
								)}
							</div>

							{/* summery  */}
							<div className='row-span-3'>
								{/* <div className='flex mb-5'>
									<input
										type='text'
										placeholder='Please Enter Coupon'
										className='border-2 focus:outline-none text-xl w-full border-[#0C4E67] px-3 rounded-none'
									/>
									<button className='bg-[#0C4E67] lg:w-5/12 w-8/12 text-white py-3 px-3 font-semibold'>
										Add Coupon
									</button>
								</div> */}
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
											<td className='border p-5 text-lg font-semibold text-end'>
												{subTotal.toFixed(2)}৳
											</td>
										</tr>
										<tr>
											<td className='border p-5 text-lg font-semibold'>
												Quantity
											</td>
											<td className='border p-5 text-lg font-semibold text-end'>
												{products?.length}
											</td>
										</tr>
										<tr>
											<td className='border p-5 text-lg font-semibold'>
												Vat {5}%
											</td>
											<td className='border p-5 text-lg font-semibold text-end'>
												{Math.abs(subTotal * 0.05).toFixed(2)}৳
											</td>
										</tr>
										<tr>
											<td className='border p-5 text-lg font-semibold'>
												Delivery Charge
											</td>
											<td className='border p-5 text-lg font-semibold text-end'>
												{100}৳
											</td>
										</tr>
										<tr>
											<td className='border p-5 text-lg font-semibold'>
												Total
											</td>
											<td className='border p-5 text-lg font-semibold text-end'>
												{products.length > 0 ? total.toFixed(2) : 0}৳
											</td>
										</tr>
									</tbody>
								</table>
								<div className='border mt-5 p-5'>
									<div className='space-y-5'></div>
								</div>
								<div className='mt-5'>
									<button
										onClick={() => {
											const notUserAddress =
												!userAddressData.name ||
												!userAddressData.email ||
												!userAddressData.contactNumber ||
												!userAddressData.address ||
												!userAddressData.area ||
												!userAddressData.city;

											if (notUserAddress) {
												return handleOpenModal();
											}
											handleOrderConfirm();
										}}
										disabled={products.length == 0}
										className={
											products.length == 0
												? `w-full px-8 text-xl font-semibold py-3 bg-[#0C4E67] bg-opacity-50 cursor-not-allowed text-white`
												: `w-full px-8 text-xl font-semibold py-3 bg-[#0C4E67] text-white`
										}
									>
										Order Confirm
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fade>

			{openModal ? <AddressModal setOpenModal={setOpenModal} /> : <></>}
		</div>
	);
};

export default Checkout;
