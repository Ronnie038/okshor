import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import ReactQuill from 'react-quill';

import { bcsCategory, modules } from '../../../../api/fakeData/fakedata';
import { createBcsService } from '../../../../api/bcsService';
import toast from 'react-hot-toast';

const AddBcsNews = () => {
	const editor = useRef(null);
	const [description, setDescription] = useState('');
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
	const [formData, setFormData] = useState({});
	const [selectedImages, setSelectedImages] = useState([]);
	const [loading, setLoading] = useState([]);
	const handleInput = (e) => {
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		setLoading(true);
		const newFormData = {
			...formData,
			description,
		};

		const formDataObj = new FormData();
		formDataObj.append('bcs', JSON.stringify(newFormData));
		formDataObj.append('bcsImage', selectedImages[0]);

		// console.log(formDataObj);
		createBcsService(
			formDataObj,
			setLoading,
			toast,
			form,
			setSelectedImages,
			setDescription
		);
	};

	const handleImageChange = (e) => {
		let files = e.target.files;
		// console.log({ files });
		const imageList = [];
		const newLength = files.length + selectedImages.length;

		const isImageQuantityValid =
			files.length > 4 || selectedImages.length > 4 || newLength > 4;

		if (isImageQuantityValid) {
			setSelectedImages([]);
			e.target.value = '';
			return alert('image cannot be more than 5 ');
		}

		setSelectedImages([...files]);
	};
	const handleRemoveSelectedImage = (index) => {
		const images = [...selectedImages];
		const deletedImage = images.splice(index, 1);
		setSelectedImages(images);
	};

	return (
		<div className='w-11/12 mx-auto'>
			{' '}
			<h1 className='text-3xl my-8 font-bold'>Add Bcs</h1>
			<form action='' onSubmit={handleSubmit}>
				<div>
					<div className='w-full'>
						<label className='font-bold cursor-pointer' htmlFor='title'>
							Title
						</label>{' '}
						<br />
						<input
							onChange={handleInput}
							className='border w-full border-purple-200 mt-3 p-3 '
							type='text'
							name='title'
							placeholder='আপনার বি সি এসের টাইটেল দেন...'
							id='title'
							required={true}
						/>
					</div>
					<div className='flex my-5 font-bold'>
						<div className='w-full mt-3 flex gap-5'>
							<label className='font-bold cursor-pointer' htmlFor='category'>
								Category
							</label>{' '}
							<br />
							<select
								required
								name='category'
								onChange={(e) => {
									handleInput(e);
									setSelectedCategoryIndex(e.target.selectedIndex);
								}}
								className='mb-2 border py-1 px-5 font-normal'
								id=''
							>
								<option value=''>Select Category</option>
								{bcsCategory.map((item, index) => (
									<option value={item.category} key={index}>
										{item.category}
									</option>
								))}
							</select>
						</div>
						<div className='w-full'>
							<div className='w-full mt-3 flex gap-5'>
								<label
									className='font-bold cursor-pointer'
									htmlFor='subcategory'
								>
									Subcategory
								</label>{' '}
								<br />
								<select
									required
									name='subcategory'
									onChange={(e) => handleInput(e)}
									className='mb-2 border py-1 px-5 font-normal'
									id=''
								>
									<option value=''>Select subcategory</option>
									{selectedCategoryIndex > 0 &&
										bcsCategory[selectedCategoryIndex - 1].subcategory.map(
											(item, index) => (
												<option value={item} key={index}>
													{item}
												</option>
											)
										)}
								</select>
							</div>
						</div>
					</div>

					<div className='w-full mt-5'>
						<div className='flex  gap-6'>
							<div className='w-full'>
								<label className=' font-bold cursor-pointer'>Image</label>{' '}
								<br />
								<input
									autoComplete='off'
									required
									type='file'
									name='images'
									accept='image/*'
									onChange={handleImageChange}
									className='w-full border-purple-200 p-3 mt-3'
									// onBlur={handleInputBlur}
								/>
								<br />
							</div>
						</div>
						{/* Image box    */}

						<div className='flex flex-wrap w-full min-h-[83px] mt-6'>
							{selectedImages.map((image, index) => (
								<div key={index} className='relative'>
									<img
										src={URL.createObjectURL(image)}
										alt={`Preview ${index}`}
										style={{
											maxWidth: '100px',
											maxHeight: '100px',
											margin: '5px',
										}}
									/>
									<Icon
										icon='lucide:delete'
										className='text-xl text-red-700 absolute cursor-pointer top-0 right-0'
										onClick={() => handleRemoveSelectedImage(index)}
									/>
								</div>
							))}
						</div>
					</div>

					<div className='mt-6'>
						<label className=' font-bold  cursor-pointer'>Description</label>{' '}
						<br />
						<div className='quill-container mt-3'>
							<ReactQuill
								theme='snow'
								value={description}
								onChange={setDescription}
								modules={modules}
								className=''
							/>
						</div>
					</div>
					<div className='flex justify-end my-10'>
						<button
							type='submit'
							className='flex justify-center btn items-center bg-[#282B35] hover:bg-[#3B95B0] rounded-none py-3 px-8 text-[#F5F5F5]'
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddBcsNews;
