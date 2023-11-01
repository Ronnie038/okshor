import { useState } from 'react';
import { toast } from 'react-hot-toast';
// import { category } from '../../../../ApiServices/fakeData';
import { Icon } from '@iconify/react';
import { newsCategory } from '../../../api/fakeData/fakedata';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AddBanner = () => {
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState();
	const [formData, setFormData] = useState({});

	const handleUpload = async (e) => {
		const form = e.target;
		e.preventDefault();
		setLoading(true);

		const newFormData = {
			...formData,
			category:
				selectedCategoryIndex > 0
					? newsCategory[selectedCategoryIndex - 1].category
					: undefined,
		};

		let formDataObj = new FormData();
		formDataObj.append('data', JSON.stringify(newFormData));

		if (image) {
			formDataObj.append('image', image);
		} else {
			setLoading(false);
			toast.error('Please provide a banner');
			return;
		}

		try {
			const response = await fetch(`${apiUrl}/banner`, {
				method: 'POST',
				body: formDataObj,
				credentials: 'include',
			});

			if (response.ok) {
				setImage(null);
				toast.success('Banner added successfully');
				form.reset();
				// Reset form and image state or perform other actions
			} else {
				toast.error('Upload failed');
				console.error('Upload failed');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleInput = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className='p-2 md:p-20 w-full xl:max-w-6xl'>
			<div className='shadow pb-5'>
				<div className='bg-gray-900 text-white py-2 mb-10'>
					<h3 className='font-bold text-xl tracking-wide pl-5'>
						Banner Image Upload
					</h3>
				</div>

				<form id='banner' onSubmit={handleUpload}>
					<div className='form-control mb-3 px-5'>
						<div className='lg:flex  items-center justify-between gap-20'>
							<label className='mb-2 md:text-lgl block text-gray-500'>
								Banner Image
							</label>
							<input
								autoComplete='off'
								required
								id='imagesId'
								type='file'
								name='images'
								accept='image/*'
								multiple
								onChange={(e) => setImage(e.target.files[0])}
								className='border py-2 px-5 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl'
								// onBlur={handleInputBlur}
							/>
						</div>
					</div>

					<div className='w-full p-5'>
						<label className='font-semibold cursor-pointer' htmlFor='title'>
							Banner Title
						</label>{' '}
						<br />
						<input
							onChange={handleInput}
							className='border w-full border-purple-200 mt-3 p-3 '
							type='text'
							name='title'
							placeholder='আপনার ব্যানারের টাইটেল দেন...'
							id='title'
							required={true}
						/>
					</div>
					<div className='flex mt-5 font-bold'>
						<div className='w-full mt-3 flex gap-5'>
							<label className='font-bold cursor-pointer' htmlFor='category'>
								Category
							</label>{' '}
							<br />
							<select
								required
								name='categoryTitle'
								onChange={(e) => {
									handleInput(e);
									setSelectedCategoryIndex(e.target.selectedIndex);
								}}
								className='mb-2 border py-1 px-5 font-normal'
								id=''
							>
								<option value=''>Select Category</option>
								{newsCategory.map((item, index) => (
									<option value={item.categoryTitle} key={index}>
										{item.categoryTitle}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className='px-5 mt-10 '>
						<span className='text-sm text-gray-500'>
							*** note: check again before ADD BANNER click the button
						</span>
						<button
							type='submit'
							disabled={loading}
							className='mt-5 flex w-full lg:w-1/2 mx-auto rounded-full justify-center items-center bg-sky-600 text-white py-2 lg:px-10 uppercase tracking-widest font-extrabold'
						>
							{loading ? (
								'Banner uploading ...'
							) : (
								<>
									Add Banner
									<Icon
										icon='line-md:upload-loop'
										width={25}
										className='ml-5'
									/>
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddBanner;
