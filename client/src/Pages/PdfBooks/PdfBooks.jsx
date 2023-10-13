import { Icon } from '@iconify/react';
import pdfImage from '../../assets/Home/pdf.png';
import { useEffect, useState } from 'react';
const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
const PdfBooks = () => {
	const [categories, setCategories] = useState([]);

	const [pdfData, setPdfData] = useState([]);
	const [pdfFilteredData, setPdfFilteredData] = useState([]);
	const [activeCategory, setActiveCategory] = useState('');

	const handleDownload = async (pdf) => {
		try {
			const response = await fetch(
				`${apiBaseUrl}/pdf/download?pdf=${pdf.pdfUrl}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const blob = await response.blob();

			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = pdf.title; // Set the desired download filename
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		setPdfFilteredData(
			pdfData.filter((item) => item.category == activeCategory)
		);
	}, [activeCategory]);

	useEffect(() => {
		fetch(`${apiBaseUrl}/pdf`)
			.then((res) => res.json())
			.then((data) => {
				setPdfData(data.data);
				setActiveCategory(data.categories[0]);
				setCategories(data.categories);
				setPdfFilteredData(
					data.data.filter((item) => item.category == data.categories[0])
				);
			});
	}, []);

	return (
		<div>
			<div>
				<div className='flex justify-center mt-8 '>
					{categories?.map((news, index) => (
						<div key={index} className='cursor-pointer'>
							{' '}
							<div
								onClick={() => setActiveCategory(news)}
								className={` ${
									activeCategory === news ? 'bg-[#1F2659]' : 'bg-[#C21820]'
								} px-6 text-white font-bold py-3 border `}
							>
								<p>{news}</p>
							</div>
						</div>
					))}
				</div>

				{pdfFilteredData?.map((pdf) => (
					<div
						key={pdf._id}
						className='flex lg:flex-nowrap md:flex-wrap flex-wrap gap-10 mx-auto border rounded mt-7 p-4 w-10/12 '
					>
						<div className='w-[20%]'>
							<img src={pdfImage} className='w-full' alt='' />
						</div>
						<div className='w-[50%]'>
							<h2 className='text-3xl mb-3 font-bold uppercase'>{pdf.title}</h2>
							<p>{pdf.description}</p>
						</div>
						<div className='w-[30%] flex justify-center items-center'>
							{' '}
							<button
								onClick={() => handleDownload(pdf)}
								className='bg-indigo-900 text-white font-bold p-2  rounded'
							>
								<Icon icon='ic:round-download' className='text-lg' />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PdfBooks;
