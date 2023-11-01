import React from 'react';
import { Icon } from '@iconify/react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
	return (
		<>
			<div className='flex xl:flex-nowrap lg:flex-wrap md:flex-wrap flex-wrap justify-between'>
				<Sidebar />
				<div className='w-full'>
					<Outlet></Outlet>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
