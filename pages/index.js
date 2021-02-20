import { API_URL } from '../constants';
import Nav from '../components/Nav';
import FilterItem from '../components/FilterItem';
import JobItem from '../components/JobItem';
import { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import { startCase } from 'lodash';

const Index = ({ jobs, searchOptions, filters }) => {
	const queryOptions = ['location', 'role', 'department', 'education', 'experience'];
	const [jobData, setJobData] = useState(jobs);
	const [activeQueries, setActiveQueries] = useState({});
	const [searchTerms, setSearchTerms] = useState([]);
	const [searchString, setSearchString] = useState('');
	const [searchFocus, setSearchFocus] = useState(false);

	useEffect(() => {
		fetchJobsData();
	}, [activeQueries, searchTerms])

	const setQuery = (query, option) => {
		if (activeQueries[query] !== option) {
			setActiveQueries({
				...activeQueries,
				[query]: option === 'clear' ? null : option
			});
		}
	};

	const fetchJobsData = async() => {
		let url = `${API_URL}/jobs?`;
		for (let activeQuery in activeQueries) {
			if (activeQueries[activeQuery]) {
				url += `&${activeQuery}=${activeQueries[activeQuery]}`;
			}
		}

		if (searchTerms.length > 0) {
			url += `&search=${searchTerms}`;
		}

		const res = await fetch(url);
		const data = await res.json();

		setJobData(data.jobs);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchString) {
			const term = searchString.toLowerCase().trim();
			if (!searchTerms.includes(term)) {
				setSearchTerms([...searchTerms, term])
			}
		}
		setSearchString('');
	};

	const clearSearchTerm = (term) => {
		setSearchTerms(searchTerms.filter(t => t !== term));
	}

	const autoComplete = (option) => {
		if (!searchTerms.includes(option)) {
			setSearchTerms([...searchTerms, option]);
		}
		setSearchString('');
	}

	const showOptions = () => {
		return (
			<ul className='absolute border bg-white w-full divide rounded-md overflow-y-auto max-h-40 text-lg'>
				{searchString
					? searchOptions
						.filter((option) => option.includes(searchString))
						.map((option) => (
							<li className='py-1/2 px-1' onMouseDown={() => autoComplete(option)}>
								{startCase(option)}
							</li>
						))
					: searchOptions
						.map((option) => (
							<li className='py-1/2 px-1' onMouseDown={() => autoComplete(option)}>
								{startCase(option)}
							</li>
						))
				}
			</ul>
		);
	}

	return (
		<>
			<Nav />
			<div className='bg-gray-200 mx-auto px-1 py-4'>
				<form onSubmit={(e) => handleSubmit(e)} className='flex-row relative mx-4 text-gray-600'>
					<span className='text-black absolute ml-9 mt-5 w-10'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
						</svg>
					</span>
					<input
						className='border-2 text-md border-gray-300 bg-white h-20 px-20 rounded-lg focus:outline-none w-full'
						type='search'
						name='search'
						placeholder='Search for any job, title, keywords or company'
						value={searchString}
						onChange={(e) => setSearchString(e.target.value.toLowerCase())}
						onFocus={() => setSearchFocus(true)}
						onBlur={() => setSearchFocus(false)}
					/>
					{searchFocus && searchString
						? showOptions()
						: null
					}
				</form>
				{searchTerms.length > 0
					? <div className='flex flex-wrap mx-4 mt-1'>
						{searchTerms.map((term) => (
							<div className='m-1 rounded-full bg-gray-400 text-white p-2'>
								{term}
								<button className='focus:outline-none font-bold' onClick={() => clearSearchTerm(term)}>&nbsp;X</button>
							</div>
						))}
					</div>
					: null
				}
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
							{jobData.map((job) => (
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

	const { jobs, searchOptions } = await jobsRes.json();
	const filters = await filtersRes.json();

	return {
		props: {
			jobs,
			searchOptions,
			filters
		}
	};
}