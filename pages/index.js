import { API_URL } from '../constants';
import Nav from '../components/Nav';
import FilterItem from '../components/FilterItem';
import JobItem from '../components/JobItem';
import { useState } from 'react';
import Dropdown from '../components/Dropdown';

const Index = ({ jobs, filters }) => {
	const queryOptions = ['location', 'role', 'department', 'education', 'experience'];

	const [activeQueries, setActiveQueries] = useState({});

	const setQuery = (query, option) => {
		setActiveQueries({
			...activeQueries,
			[query]: option
		});
	};


	return (
		<>
			<Nav />
			<div className='bg-gray-200 mx-auto px-1 py-4'>
				<div className="relative mx-4 text-gray-600">
					<input
						className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
						type="search"
						name="search"
						placeholder="Search"
					/>
					<button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
						<div>Submit</div>
					</button>
				</div>
				<div className='flex flex-row space-x-4 m-4'>
					<div className='flex flex-col w-1/3 space-y-4 items-center'>
						{Object.keys(filters).map((filter) => (
							<FilterItem name={filter.toUpperCase().replace('_', ' ')} data={filters[filter]} />
						))}
					</div>
					<div className='w-2/3 py-6 px-4 flex flex-col bg-white rounded-md'>
						<div className='flex flex-row pt-8 space-x-4'>
							<div className='flex-1'>
								<strong className='text-xl'>7,753</strong> job postings
							</div>
							<div className='text-gray-400'>
								Sort By
							</div>
							{queryOptions.map((query) => (
								<Dropdown query={query} options={['asc', 'desc', 'clear']} onOptionSelect={setQuery} />
							))}
						</div>
						<ul className='pt-10 space-y-8'>
							{jobs.jobs.map((job) => (
								<li>
									<JobItem job={job} />
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div className='flex flex-row p-6 w-full'>
				<div className='flex flex-col w-3/5 space-y-2'>
					<strong className='text-2xl'>About us</strong>
					<div>We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love.</div>
					<div>All copyrights reserved &copy; 2020 - Health Explore</div>
				</div>
				<div className='flex flex-col w-1/5 space-y-2'>
					<strong className='text-2xl'>Sitemap</strong>
					<div>Nurses</div>
					<div>Employers</div>
					<div>Social networking</div>
					<div>Jobs</div>
				</div>
				<div className='flex flex-col w-1/5 space-y-2'>
				<strong className='text-2xl'>Privacy</strong>
					<div>Terms of use</div>
					<div>Privacy policy</div>
					<div>Cookie policy</div>
				</div>
			</div>
		</>
	);
};

export default Index

export const getStaticProps = async () => {
	const jobsRes = await fetch(`${API_URL}/jobs`);
	const filtersRes = await fetch(`${API_URL}/filters`);

	const jobs = await jobsRes.json();
	const filters = await filtersRes.json();

	return {
		props: {
			jobs,
			filters
		}
	};
}