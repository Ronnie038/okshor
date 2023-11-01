import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import Loading from '../../Components/Loading/Loading';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const ForgetPasswordRequest = () => {
	// from handle
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [color, setColor] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = async (user) => {
		setLoading(true);
		setMessage('');
		console.log(user);
		try {
			const res = await fetch(`${apiUrl}/user/reset-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/json',
				},
				body: JSON.stringify(user),
			});
			const data = await res.json();

			if (!res.ok) {
				setColor('red');
				setMessage(data.message);
			}
			if (res.ok) {
				setColor('green');
				setMessage(data.message);
			}
		} catch (error) {
			setMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	// password eye show hide
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen(!open);
	};

	return (
		<div>
			<div className='bg-[#C8C2BF] py-20'>
				<div className='xl:w-5/12 mx-auto'>
					<div className=' flex-col lg:flex-row-reverse flex justify-center'>
						<div className='xl:max-w-full lg:max-w-3xl md:max-w-2xl max-w-sm flex-shrink-0 rounded-md shadow-md  bg-white mx-auto md:mx-0 lg:mx-0 xl:mx-0 '>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='card-body lg:px-28 md:px-28 px-[16px] space-y-5 py-16'
							>
								<div>
									<h5 className='font-bold text-xl mb-3'>Find Your Account</h5>
									<p>
										Please enter your email address to search for your account.
									</p>
								</div>
								<div className='form-control'>
									<input
										type='email'
										{...register('email')}
										required
										placeholder='Email'
										className='input placeholder-black input-bordered h-16 rounded-none border-black text-black text-xl'
									/>
								</div>
								<div>
									<p className={`text-${color}-600`}>{message}</p>
								</div>
								<div className='flex justify-end gap-3 mt-10 items-center'>
									<Link to='/login'>
										<input
											value='Cancel'
											className='px-8 btn bg-[#849094] text-white mt-4 normal-case text-[16px] h-16 rounded-none hover:bg-[#3B95B0]'
										/>
									</Link>
									<button
										disabled={loading}
										type='submit'
										className='px-8 btn bg-[#3B95B0] text-white mt-4 normal-case text-[16px] h-16 rounded-none'
									>
										{loading ? <Loading></Loading> : 'Search'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgetPasswordRequest;
