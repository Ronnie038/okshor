import React, { useState } from 'react';
import DownloadMobile from '../../components/DownloadMobile/DownloadMobile';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Fade } from 'react-awesome-reveal';
import { facebookLogin, googleLogin, signIn } from '../../Api/auth';
import { useDispatch } from 'react-redux';

import Loading from '../../components/Loading/Loading';
import toast from 'react-hot-toast';
import { addUser } from '../../store/slices/UserSlices';

const LoginPage = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false); // Initialize loading as true
	// from handle
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || '/men';

	const [error, setError] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data) => {
		// console.log(data);
		setError('');
		setLoading(true);
		try {
			let res = await signIn(data);
			const resData = await res.json();

			if (!res.ok) {
				setError(resData.message);
			}
			if (res.ok) {
				dispatch(addUser(resData.data.user));
				navigate(from, { replace: true });
				toast.success('successfully logged in');
			}
		} catch (error) {
			console.log(error);
			setError(error.message);
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
			<Fade>
				<Helmet>
					<title>UrbanUtopia | Login</title>
				</Helmet>
				<div className='bg-[#C8C2BF] py-20'>
					<div className='hero'>
						<div className=' flex-col lg:flex-row-reverse'>
							<div className='xl:max-w-full lg:max-w-3xl md:max-w-2xl max-w-sm flex-shrink-0 rounded-md shadow-md bg-white mx-1 md:mx-0 lg:mx-0 xl:mx-0 '>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className='card-body lg:px-28 md:px-28 px-[16px] space-y-5 py-16'
								>
									<div>
										<p>Welcome to</p>
										<Link to='/' className=''>
											<p className='logoFont mb-8 mt-3 text-[#03384D] lg:text-5xl text-3xl font-bold'>
												<span className='text-[#3B95B0] logoFont'>Urban</span>
												Utopia
											</p>
										</Link>
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
										<p className='text-red-500'>{error}</p>
									</div>
									<div className='form-control'>
										<button
											type='submit'
											className='btn bg-[#0C4E67] text-white mt-4 normal-case text-[16px] h-16 rounded-none hover:bg-[#3B95B0]'
										>
											{' '}
											{loading ? <Loading /> : 'Log In'}
										</button>
										<label className='label flex lg:justify-end md:justify-end justify-center'>
											<Link
												to='/user/forgetPasswordRequest'
												className='text-[#1877F2]'
											>
												Forgot password?
											</Link>
										</label>
									</div>
									<div className='text-center lg:px-20'>
										<p className='text-[17px]'>
											New Member?{' '}
											<Link to='/signUp' className=' text-[#1877F2]'>
												Registration Now
											</Link>
										</p>
										<div className='divider w-10/12 mx-auto text-black pt-8'>
											Or
										</div>
									</div>
									<div className='flex flex-wrap gap-5 justify-between  my-8'>
										<Link className='btn bg-transparent rounded-none w-full lg:w-auto border border-black'>
											<div
												onClick={() => googleLogin()}
												className='flex items-center gap-2'
											>
												<Icon
													icon='entypo-social:google'
													className='text-white bg-red-600 rounded-full p-2 text-3xl'
												/>
												<span className='normal-case'>Log in with Google</span>
											</div>
										</Link>
										<Link className='btn bg-transparent border-1 rounded-none w-full lg:w-auto border border-black'>
											<div
												onClick={() => facebookLogin()}
												className='flex items-center gap-2'
											>
												<Icon
													icon='ic:baseline-facebook'
													className='text-3xl text-[#1877F2]'
												/>
												<span className='normal-case'>
													Log in with Facebook
												</span>
											</div>
										</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<DownloadMobile></DownloadMobile>
			</Fade>
		</div>
	);
};

export default LoginPage;
