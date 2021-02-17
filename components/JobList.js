import JobItem from './JobItem';

const JobList = ({ jobs }) => {
	return (
		<div className='col-span-2 col-start-2 bg-white rounded-md items-left'>
			<div>
				<div className='float-left'>
					<strong>1423</strong> job postings
				</div>
				<div className='float-right'>
					Sort By
				</div>
				<div class="float-right">
					<input type="checkbox" id="sortbox" class="hidden absolute" />
					<label for="sortbox" class="flex items-center space-x-1 cursor-pointer">
						<span class="text-lg">Sort By</span>
					</label>
					<div id="sortboxmenu" class="absolute mt-1 right-1 top-full min-w-max shadow rounded opacity-0 bg-gray-300 border border-gray-400 transition delay-75 ease-in-out z-10">
						<ul class="block text-right text-gray-900">
							<li><a href="#" class="block px-3 py-2 hover:bg-gray-200">Featured</a></li>
							<li><a href="#" class="block px-3 py-2 hover:bg-gray-200">Newest</a></li>
							<li><a href="#" class="block px-3 py-2 hover:bg-gray-200">Price: Low to High</a></li>
							<li><a href="#" class="block px-3 py-2 hover:bg-gray-200">Price: High to Low</a></li>
						</ul>
					</div>
				</div>
			</div>
			{jobs.map((job) => (
				<JobItem job={job} />
			))}
		</div>
	)
}

export default JobList;