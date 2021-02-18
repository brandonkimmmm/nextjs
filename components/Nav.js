const Nav = () => {
	return (
		<nav className='flex flex-wrap items-center justify-between p-5 bg-white'>
			<a href='#' className='flex font-semibold text-xl uppercase text-blue-400'>Health Explore</a>
			<div className='flex md:hidden'>
				<button id='hamburger'>
				<img className='toggle block' src='https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png' width='40' height='40' />
				<img className='toggle hidden' src='https://img.icons8.com/fluent-systems-regular/2x/close-window.png' width='40' height='40' />
				</button>
			</div>
			<div className='toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0'>
				<a href='#' className='block font-medium uppercase md:inline-block text-black hover:text-blue-400 px-3 py-3'>Profile</a>
				<a href='#' className='block font-medium uppercase md:inline-block text-black hover:text-blue-400 px-3 py-3'>Jobs</a>
				<a href='#' className='block font-medium uppercase md:inline-block text-black hover:text-blue-400 px-3 py-3'>Professional Network</a>
				<a href='#' className='block font-medium uppercase md:inline-block text-black hover:text-blue-400 px-3 py-3'>Lounge</a>
				<a href='#' className='block font-medium uppercase md:inline-block text-black hover:text-blue-400 px-3 py-3'>Salary</a>
			</div>
			<div className='toggle items-center hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0'>
				<a href='#' className='block md:inline-block mr-5 font-medium text-blue-400 border border-blue-400 rounded-lg hover:text-white hover:border-white hover:bg-blue-400 px-3 py-3'>CREATE JOB</a>
				<button className="p-3 relative text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500">
					<div className='rounded-full bg-blue-400 relative p-2 text-lg text-white'>BK</div>
					<span className="absolute inset-0 object-right-top -mr-6">
						<div className="inline-flex items-center px-1.5 py-0.5 border-white border-4 rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
							2
						</div>
					</span>
				</button>
				<a href='#' className='block md:inline-block uppercase font-medium text-black hover:text-red-400 px-3 py-3'>Logout</a>
			</div>
		</nav>
	)
}

export default Nav