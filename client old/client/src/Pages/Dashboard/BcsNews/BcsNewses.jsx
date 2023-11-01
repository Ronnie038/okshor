import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBcsNewses } from '../../../store/slices/bcsNewsSlices';
import BcsNewsTable from './BcsNewsTable';
import { bcsCategory } from '../../../api/fakeData/fakedata';

const BcsNewses = () => {
	const dispatch = useDispatch();
	const { status, subcategory, data } = useSelector((state) => state.bcsNewses);

	const [refetch, setRefetch] = useState(false);
	const [category, setCategory] = useState('all');

	useEffect(() => {
		// Fetch bcsNewses when the category changes
		dispatch(fetchBcsNewses(category));

		// Cleanup function for the subscription (if necessary)
		return () => {
			// Implement any necessary cleanup here (e.g., canceling ongoing requests)
		};
	}, [category, dispatch, refetch]);
	return (
		<div className='w-11/12 mx-auto'>
			<p className='text-3xl my-8 font-semibold'>Bcs </p>
			<div className='flex gap-10'>
				<div className='border text-center border-green-500 rounded-lg w-[200px] py-8 px-5'>
					<p>Total News</p>
					<p className='text-4xl mt-3 font-semibold'>{data.length}</p>
				</div>
				<div className='border text-center border-green-500 rounded-lg w-[200px] py-8 px-5'>
					<select
						name=''
						id=''
						className='outline-none p-2 border'
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value='all'>সব খবর</option>
						{bcsCategory.map((item) => (
							<option
								key={item.category}
								value={item.category}
								className='outline-none border-none inline-block '
							>
								{item.category}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className='mt-8 md:grid-cols-2 grid-cols-1'>
				<BcsNewsTable newses={data} setRefetch={setRefetch} />
			</div>
		</div>
	);
};

export default BcsNewses;
