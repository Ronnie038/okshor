import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HTMLStringToComponent from '../../Components/HTMLStringToComponent/HTMLStringToComponent';
import { setDocumentTitle } from '../../Components/UseDocumentTitle/UseDocumentTitle';
import { setTimeformat } from '../../api/setTimeFormat';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchBcsNewses,
	getFilteredBcsNewses,
} from '../../store/slices/bcsNewsSlices';

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const SingleBcsNews = () => {
	const dispatch = useDispatch();
	const { status, subcategory, filteredData } = useSelector(
		(state) => state.bcsNewses
	);

	const { id } = useParams();
	const [news, setNews] = useState(null);

	setDocumentTitle(`অক্ষর | ${news?.category}`);

	useEffect(() => {
		// Fetch the news data from the JSON file
		fetch(`${apiBaseUrl}/bcsNews/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setNews(data.data);
			})
			.catch((error) => {
				console.error('Error fetching news:', error);
			});
	}, [id]);

	useEffect(() => {
		dispatch(getFilteredBcsNewses(news?.subcategory));
	}, [news?.subcategory]);

	useEffect(() => {
		// Fetch bcsNewses when the category changes
		dispatch(fetchBcsNewses(news?.category));

		// Cleanup function for the subscription (if necessary)
		return () => {
			// Implement any necessary cleanup here (e.g., canceling ongoing requests)
		};
	}, [news?.category, dispatch]);

	return (
		<div className='lg:w-10/12 w-[90%] mx-auto py-10'>
			{news ? (
				<div className='flex flex-col md:flex-row gap-3 justify-between'>
					<div className=' w-full md:w-[70%] mx-5 shadow-md rounded-sm p-5'>
						<div className=' md:w-full h-[400px]'>
							<img
								src={news?.image}
								className='w-full h-full rounded-md'
								alt='news image not found'
							/>
						</div>
						<div className='w-full mt-5'>
							<div className='flex justify-between items-center'>
								<h2 className='text-3xl mb-3 leading-normal font-medium'>
									{news.title}
								</h2>
								<p>{setTimeformat(news?.updatedAt)}</p>
							</div>
							<hr className='mb-5' />

							<HTMLStringToComponent htmlString={news?.description} />
						</div>
					</div>
					<div className='md:w-[30%] w-full'>
						<div className='flex  justify-between items-center'>
							<p className='text-red-600 font-bold'>Related News</p>
							<p className='text-[#1F2659] font-bold hidden lg:block'>
								Total News : {filteredData?.length}
							</p>
						</div>

						<div className='mt-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 gap-2'>
							{filteredData?.map((news, idx) => (
								<Link to={`/singleBcsNews/${news?._id}`} key={idx}>
									{' '}
									<div className=' flex flex-col lg:flex-row sm:justify-between gap-2 sm:border-b-2 sm:border-gray-500 mb-4 h-[300px] sm:h-[200px] md:h-auto'>
										{' '}
										<img
											src={news?.image}
											alt=''
											className='lg:w-[60px] w-full'
										/>
										<div className='p-2 flex flex-col justify-between'>
											<p className='text-[11px]'>{news.title}</p>
											<p className='text-[10px] text-right mt-1'>
												{setTimeformat(news.updatedAt)}
											</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			) : (
				<p>News not found</p>
			)}
		</div>
	);
};

export default SingleBcsNews;
