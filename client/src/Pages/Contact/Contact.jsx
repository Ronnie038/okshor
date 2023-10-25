import { useState } from 'react';
import { setDocumentTitle } from '../../Components/UseDocumentTitle/UseDocumentTitle';
import toast from 'react-hot-toast';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Contact = () => {
	setDocumentTitle('অক্ষর | Contact');
	const [formData, setFormData] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(formData);
		try {
			const res = await fetch(`${apiUrl}/contact`, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/json',
				},
				body: JSON.stringify(formData),
			});

			if (res.ok) {
				e.target.reset();
				toast.success('message sent to the admin');
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className='mx-5 lg:mx-0'>
			<div className=' w-10/12 mx-auto mt-8 '>
				<div className='flex lg:flex-row md:flex-col flex-col gap-6 '>
					<div className='w-full'>
						<h1 className='text-2xl text-[#1F2659] font-bold'>Say Hello!</h1>
						<form onSubmit={handleSubmit}>
							<div className='mt-4 flex md:flex-col flex-col  lg:flex-row gap-4'>
								<div className='w-full'>
									<input
										onChange={handleInputChange}
										name='name'
										type='name'
										placeholder='Name*'
										required
										className=' border w-full border-black p-3 '
									/>
								</div>
							</div>
							<div className='mt-4 flex md:flex-col flex-col lg:flex-row  gap-4'>
								<div className='w-full'>
									<input
										onChange={handleInputChange}
										name='email'
										type='email'
										placeholder='Email*'
										required
										className=' border w-full border-black p-3 '
									/>
								</div>
							</div>
							<div className='mt-4 w-full'>
								<textarea
									onChange={handleInputChange}
									className='border p-4 w-full'
									placeholder='Message'
									name='message'
									id=''
									cols='30'
									rows='10'
								></textarea>
							</div>
							<div className='w-32 border text-center mt-2 bg-red-600 p-3 rounded'>
								<button type='submit' className='text-white'>
									Submit
								</button>
							</div>
						</form>
					</div>

					{/* second */}
					<div className='w-full'>
						<h1 className='text-3xl text-black font-bold'>Contact</h1>
						<div className='mt-4'>
							<h2 className='text-2xl font-semibold text-[#1F2659]'>
								Main Office:
							</h2>
							<p className='mt-2'>
								<span className='text-red-600 '>Address</span>:{' '}
								<span className='text-gray-800'>
									1600 Pennsylvania Ave NW, Washington, DC 20500
								</span>{' '}
								<br /> <span className='text-red-600 '>Phone</span>: +990 (312)
								123 45 67 <br /> <span className='text-red-600 '>Email</span>:
								hello@domain.com
							</p>
							<br /> <br />
							<h1 className='text-2xl text-[#1F2659] font-semibold'>
								Secondary Office:
							</h1>
							<p className='mt-2'>
								<span className='text-red-600 '>Address</span>: 1600
								Pennsylvania Ave NW, Washington, DC 20500 <br />{' '}
								<span className='text-red-600 '>Phone</span>: +990 (312) 123 45
								67 <br /> <span className='text-red-600 '>Email</span>:
								hello@domain.com
							</p>
							<br />
						</div>
					</div>
				</div>
			</div>
			<div className='my-12 w-full'>
				<div className=' mt-4 flex w-full  '>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d58421.73195891319!2d90.420095!3d23.770254!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77d4db6410b%3A0xd75a6e7f69f545cb!2sTejgaon%20Industrial%20Area%2C%20Dhaka%201208!5e0!3m2!1sen!2sbd!4v1696533482466!5m2!1sen!2sbd'
						className=' w-full h-96'
						allowfullscreen=''
						loading='lazy'
						referrerpolicy='no-referrer-when-downgrade'
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default Contact;
