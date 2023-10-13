import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Stepper, Step } from 'react-form-stepper';

function CustomStepper(props) {
	return (
		<Stepper
			{...props}
			connectorStateColors={true}
			connectorStyleConfig={{
				completedColor: '#006fba',
				activeColor: '#006fba',
				disabledColor: '#eee',
			}}
			styleConfig={{
				activeBgColor: '#006fba',
				completedBgColor: '#006fba',
				inactiveBgColor: '#eee',
				activeTextColor: '#fff',
				completedTextColor: '#fff',
				inactiveTextColor: '#444',
			}}
		/>
	);
}
const Order = ({ order }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [activeText, setActiveText] = useState('');
	// console.log(order);
	const { orderStatus } = order;
	const steps = [
		{ label: 'Processing' },
		{ label: 'Shipped' },
		{ label: 'Delivered' },
	];

	useEffect(() => {
		statusGenrate(orderStatus);
	}, [orderStatus]);
	const statusGenrate = (orderStatus) => {
		switch (orderStatus) {
			case 'Processing':
				return setActiveStep(0);
			case 'Shipped':
				return setActiveStep(1);
			case 'Delivered':
				return setActiveStep(2);

			default:
				return null;
		}
	};
	return (
		<div className=' '>
			<div className='max-w-screen-2xl mx-auto px-5 md:px-0 '>
				<div className='max-w-7xl mx-auto relative'>
					<div>
						<h1 className='text-xl font-bold'>Order Shipment Details</h1>
					</div>
					<div>
						<CustomStepper
							className='text-[#006fba]'
							steps={steps}
							activeStep={activeStep}
						></CustomStepper>

						{/* <div>{orderStatus}</div> */}
					</div>

					<div className='flex md:justify-between flex-col md:flex-row gap-2 border-b-2'>
						<div>
							<h3>
								Order <span className='text-blue-500'># {order?._id}</span>
							</h3>
							<small>Placed on {order?.updatedAt?.toLocaleString()}</small>
						</div>
						<div>
							<Link to={`/order/${order?._id}`} className=''>
								<button className='text-[#006fba] font-bold flex justify-center items-center gap-2 shadow-md bg-white px-2 py-1'>
									Invoice <Icon icon='material-symbols:download' />
								</button>
							</Link>
						</div>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-6 md:gap-12  gap-2 py-2'>
						<div className='flex justify-center items-center col-span-1'>
							{order?.products?.map((product) => (
								<>
									<img src={product.image} alt='' className='w-24 rounded-xl' />
								</>
							))}
						</div>
						<div className='grid grid-cols-1 col-span-5 md:grid-cols-5 gap-5 md:gap-10 my-2 md:my-0'>
							<div className='col-span-2'>
								<h1 className='font-bold pb-1'>Product Name</h1>
								<p>
									{order?.products?.map((product) => (
										<>
											<p>{product?.name}</p>
										</>
									))}
								</p>
							</div>
							<div>
								<h1 className='font-bold pb-1 capitalize'>orderStatus</h1>
								<p>
									{' '}
									<>
										<p>{orderStatus}</p>
									</>
								</p>
							</div>
							<div>
								<h1 className='font-bold pb-1'>Quantity</h1>
								<p>
									{' '}
									{order?.products?.map((product) => (
										<>
											<p>{product?.quantity}</p>
										</>
									))}
								</p>
							</div>
							<div>
								<h1 className='font-bold pb-1'>Price</h1>
								<p className='flex justify-start items-center'>
									{' '}
									<Icon icon='mdi:currency-bdt' className='font-bold' />{' '}
									{order?.price}
								</p>
							</div>
						</div>
					</div>

					<div className='p-2'>
						<hr />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Order;
