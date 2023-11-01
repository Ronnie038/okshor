import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Loading from '../../Components/Loading/Loading';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const ForgetPassword = () => {
	const [message, setMessage] = useState('');
	const [color, setColor] = useState('');
	const [loading, setLoading] = useState(false);
	const [matchPassword, setMatchPassword] = useState('');
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const resetToken = searchParams.get('resetId');

	// from handle
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = async (passport) => {
		setMessage('');
		if (passport.password !== passport.confirm_password) {
			setColor('red');
			setMessage('confirmPassword does not match');
			return toast.error('confirmPassword does not match');
		}

		try {
			const res = await fetch(`${apiUrl}/user/forget-password/${resetToken}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/json',
				},
				body: JSON.stringify(passport),
			});
			const data = await res.json();
			console.log(data);
			if (!res.ok) {
				setColor('red');
				setMessage(data.message);
			}
			if (res.ok) {
				setColor('green');
				setMessage(data.message);
				toast.success('passport reset Successfull');
			}
		} catch (error) {
			console.log(error);
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
		<div className=' '>
			<div className='bg-[#C8C2BF] py-20 flex justify-center'>
				<div className='xl:w-5/12 mx-auto'>
					<div className=' flex-col lg:flex-row-reverse'>
						<div className='xl:max-w-full lg:max-w-3xl  md:max-w-2xl max-w-sm flex-shrink-0 rounded-md shadow-md bg-white mx-1 md:mx-0 lg:mx-0 xl:mx-0 '>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='card-body lg:px-28 md:px-28 px-[16px] space-y-5 py-16'
							>
								<div>
									<h5 className='font-bold text-xl'>Set Your Password</h5>
								</div>

								<div className='form-control relative'>
									<input
										type={open ? 'text' : 'password'}
										{...register('password')}
										required
										placeholder='Password'
										className='placeholder-black input h-16 rounded-none input-bordered border-black text-black text-xl placeholder-dots'
									/>
									{open ? (
										<div className='absolute right-5 top-5 cursor-pointer'>
											<Icon
												icon='mdi:eye'
												onClick={toggle}
												className='text-3xl'
											/>
										</div>
									) : (
										<div className='absolute right-5 top-5 cursor-pointer'>
											<Icon
												icon='mdi:eye-off'
												onClick={toggle}
												className='text-3xl'
											/>
										</div>
									)}
								</div>
								<div className='form-control relative'>
									<input
										type={open ? 'text' : 'password'}
										{...register('confirm_password')}
										required
										placeholder='Confirm Password'
										className='placeholder-black input h-16 rounded-none input-bordered border-black text-black text-xl placeholder-dots'
									/>
									{open ? (
										<div className='absolute right-5 top-5 cursor-pointer'>
											<Icon
												icon='mdi:eye'
												onClick={toggle}
												className='text-3xl'
											/>
										</div>
									) : (
										<div className='absolute right-5 top-5 cursor-pointer'>
											<Icon
												icon='mdi:eye-off'
												onClick={toggle}
												className='text-3xl'
											/>
										</div>
									)}
									<div>
										<p className={`text-${color}-600`}>{message}</p>
									</div>{' '}
								</div>
								<div className='flex justify-end gap-3 mt-10'>
									<Link to='/login'>
										<input
											value='Cancel'
											className='px-8 btn bg-[#849094] text-white mt-4 normal-case text-[16px] h-16 rounded-none hover:bg-[#3B95B0]'
										/>
									</Link>
									<button
										type='submit'
										disabled={loading}
										className='btn bg-[#0C4E67] px-8 text-white mt-4 normal-case text-[16px] h-16 rounded-none hover:bg-[#3B95B0]'
									>
										{loading ? <Loading></Loading> : 'Reset'}
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

export default ForgetPassword;
