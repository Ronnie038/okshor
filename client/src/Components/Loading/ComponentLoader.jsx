import React from 'react';
import './Loader.css';
import logo from '../../Assets/Images/globalit-01.png';
const ComponentLoader = () => {
	return (
		<div className='flex flex-col bg-black bg-opacity-50 justify-center  items-center fixed  h-full w-full'>
			<div className='flex'>
				<div className=' w-[300px] bg-opacity-10'>
					<img src={logo} alt='' />
				</div>
				<span class='loader'></span>
			</div>
			<span class='loader2'>L &nbsp; ading</span>
		</div>
	);
};

export default ComponentLoader;
