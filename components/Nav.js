const Nav = () => {
	return (
		<nav className='flex flex-wrap items-center justify-between p-5 bg-blue-200 h-20'>
			<div className='flex'>HEALTH EXPLORE</div>
			<div className='flex md:hidden'>
				<button id='hamburger'>
				<img className='toggle block' src='https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png' width='40' height='40' />
				<img className='toggle hidden' src='https://img.icons8.com/fluent-systems-regular/2x/close-window.png' width='40' height='40' />
				</button>
			</div>
			<div className='toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0'>
				<a href='#' className='block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3'>Home</a>
				<a href='#' className='block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3'>Products</a>
				<a href='#' className='block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3'>Pricing</a>
				<a href='#' className='block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3'>Contact</a>
			</div>
			<div className='toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0'>
				<a href='#' className='block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3'>CREATE JOB</a>
				<button class="py-3 px-3 relative text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500" aria-label="Cart">
					<svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
						<path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
					</svg>
					<span class="absolute inset-0 object-right-top -mr-6">
						<div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
							2
						</div>
					</span>
				</button>
				<a href='#' className='block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3'>LOGOUT</a>
			</div>
		</nav>
	)
}

export default Nav