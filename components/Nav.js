import { useState } from 'react';

const Nav = () => {

	const [isActive, setIsActive] = useState(false);
	return (
		<nav className='flex flex-wrap items-center justify-between p-5 bg-white'>
			<div className='flex flex-row items-center xl:hidden'>
				<div classsName='absolute' onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
					<button className='focus:outline-none'>
						<img className='toggle block' src='https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png' width='40' height='40' />
					</button>
					<ul className={`dropdown-menu absolute ${!isActive ? 'hidden' : null} z-50 bg-gray-600 rounded-md`}>
						<li><a href='#' className='block font-medium uppercase md:inline-block text-white hover:text-gray-600 hover:bg-white w-full px-3 py-3'>Profile</a></li>
						<li><a href='#' className='block font-medium uppercase md:inline-block text-white hover:text-gray-600 hover:bg-white w-full px-3 py-3'>Jobs</a></li>
						<li><a href='#' className='block font-medium uppercase md:inline-block text-white hover:text-gray-600 hover:bg-white w-full px-3 py-3'>Professional Network</a></li>
						<li><a href='#' className='block font-medium uppercase md:inline-block text-white hover:text-gray-600 hover:bg-white w-full px-3 py-3'>Lounge</a></li>
						<li><a href='#' className='block font-medium uppercase md:inline-block text-white hover:text-gray-600 hover:bg-white w-full px-3 py-3'>Salary</a></li>
						<li><a href='#' className='block font-medium uppercase md:inline-block text-blue-400 hover:bg-blue-400 hover:text-white w-full px-3 py-3'>Create Job</a></li>
						<li><a href='#' className='block font-medium uppercase md:inline-block text-red-400 hover:text-white hover:bg-red-400 px-3 py-3 w-full'>Logout</a></li>
					</ul>
				</div>
				<a href='#' className='flex font-semibold text-xl xl:hidden ml-4 uppercase text-blue-400'>Health Explore</a>
			</div>
			<a href='#' className='hidden xl:flex font-semibold text-xl uppercase text-blue-400'>Health Explore</a>
			<div className='toggle hidden w-full xl:w-auto xl:flex text-right text-bold mt-5 xl:mt-0'>
				<a href='#' className='block font-medium uppercase md:inline-block text-black hover:text-blue-400 px-3 py-3'>Profile</a>
				<a href='#' className='block font-medium uppercase md:inline-block text-black hover:text-blue-400 px-3 py-3'>Jobs</a>
				<a href='#' className='block font-medium uppercase md:inline-block text-black hover:text-blue-400 px-3 py-3'>Professional Network</a>
				<a href='#' className='block font-medium uppercase md:inline-block text-black hover:text-blue-400 px-3 py-3'>Lounge</a>
				<a href='#' className='block font-medium uppercase md:inline-block text-black hover:text-blue-400 px-3 py-3'>Salary</a>
			</div>
			<div className='toggle flex items-center w-auto text-right text-bold mt-0'>
				<a href='#' className='hidden xl:block mr-5 font-medium text-blue-400 border border-blue-400 rounded-lg hover:text-white hover:border-white hover:bg-blue-400 px-3 py-3'>CREATE JOB</a>
				<button className='p-3 relative text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500'>
					<div className='rounded-full bg-blue-400 relative p-2 text-lg text-white'>BK</div>
					<span className='absolute inset-0 object-right-top -mr-6'>
						<div className='inline-flex items-center px-1.5 py-0.5 border-white border-4 rounded-full text-xs font-semibold leading-4 bg-red-500 text-white'>
							2
						</div>
					</span>
				</button>
				<a href='#' className='hidden xl:block uppercase font-medium text-black hover:text-red-400 px-3 py-3'>Logout</a>
			</div>
		</nav>
	)
}

export default Nav