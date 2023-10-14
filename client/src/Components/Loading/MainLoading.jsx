import React from 'react';
import './MainLoading.css';

const MainLoading = () => {
	return (
		<div className='fixed top-0 left-0 bottom-0 bg-[#3B95B0] right-0 flex justify-center items-center'>
			<span className='loader'></span>
		</div>
	);
};

export default MainLoading;
