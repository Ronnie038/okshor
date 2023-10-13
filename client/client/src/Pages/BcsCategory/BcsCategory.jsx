import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// import Prili from "../../Components/Prili/Prili";
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchBcsNewses,
	getFilteredBcsNewses,
} from '../../store/slices/bcsNewsSlices';
import Prili from '../../Components/Prili/Prili';

const BcsCategory = () => {
	const dispatch = useDispatch();
	const { status, subcategory, filteredData } = useSelector(
		(state) => state.bcsNewses
	);
	const [activeSubcategory, setActiveSubcategory] = useState(subcategory[0]);

	const { category } = useParams();
	console.log(category);
	useEffect(() => {
		// Set the active subcategory
		setActiveSubcategory(subcategory[0]);
	}, [subcategory]);

	useEffect(() => {
		dispatch(getFilteredBcsNewses(activeSubcategory));
	}, [activeSubcategory]);

	useEffect(() => {
		// Fetch bcsNewses when the category changes
		dispatch(fetchBcsNewses(category));

		// Cleanup function for the subscription (if necessary)
		return () => {
			// Implement any necessary cleanup here (e.g., canceling ongoing requests)
		};
	}, [category, dispatch]);
	if (status === 'loading')
		return (
			<div className=' fixed h-full w-full flex justify-center items-center'>
				<span className='text-3xl'>loading...</span>
			</div>
		);
	return (
		<div>
			<div>
				<div>
					<div className='w-10/12 mx-auto '>
						<div className='flex justify-center mt-8 '>
							{subcategory?.map((news, index) => (
								<div key={index} className='cursor-pointer'>
									{' '}
									<div
										onClick={() => setActiveSubcategory(news)}
										className={` ${
											activeSubcategory === news
												? 'bg-[#1F2659]'
												: 'bg-[#C21820]'
										} px-6 text-white font-bold py-3 border `}
									>
										<p>{news}</p>
									</div>
								</div>
							))}
						</div>
						<div>
							<Prili data={filteredData} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BcsCategory;
