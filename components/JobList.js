import JobItem from './JobItem';
import { useState } from 'react';
import Dropdown from './Dropdown';

const JobList = ({ jobs }) => {

	const queryOptions = ['location', 'role', 'department', 'education', 'experience'];

	const [activeQueries, setActiveQueries] = useState({});

	const setQuery = (query, option) => {
		setActiveQueries({
			...activeQueries,
			[query]: option
		});
	};


	return (
		<div className='col-span-2 col-start-2 py-6 px-4 bg-white rounded-md'>
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
				{jobs.map((job) => (
					<li>
						<JobItem job={job} />
					</li>
				))}
			</ul>
		</div>
	)
}

export default JobList;