import Nav from '../components/Nav';
import FilterItem from '../components/FilterItem';
import JobItem from '../components/JobItem';
import { useState, useEffect } from 'react';
import Dropdown from '../components/Dropdown';
import { startCase } from 'lodash';

const API_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;

const Index = ({ jobs, searchOptions, filters }) => {
	const queryOptions = ['location', 'role', 'department', 'education', 'experience'];
	const [jobData, setJobData] = useState(jobs);
	const [activeQueries, setActiveQueries] = useState({});
	const [searchTerms, setSearchTerms] = useState([]);
	const [searchString, setSearchString] = useState('');
	const [searchFocus, setSearchFocus] = useState(false);
	const [apiLoading, setApiLoading] = useState(false);

	useEffect(async () => {
		setApiLoading(true);
		await fetchJobsData();
		setApiLoading(false);
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

		try {
			const res = await fetch(url);
			const data = await res.json();
			setJobData(data.jobs);
		} catch (err) {
			console.log(`error during API call: ${err.message}`);
		}
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
						.filter((option) => option.includes(searchString) && !searchTerms.includes(option))
						.map((option) => (
							<li key={option} className='py-1/2 px-1 cursor-pointer select-none hover:bg-gray-400 hover:text-white' onMouseDown={() => autoComplete(option)}>
								{startCase(option)}
							</li>
						))
					: searchOptions
						.filter((option) => !searchTerms.includes(option))
						.map((option) => (
							<li key={option} className='py-1/2 px-1 cursor-pointer select-none hover:bg-gray-400 hover:text-white' onMouseDown={() => autoComplete(option)}>
								{startCase(option)}
							</li>
						))
				}
			</ul>
		);
	}

	return (
		<div>
			<Nav />
			<div className='bg-gray-200 w-full xl:px-4 xl:py-4'>
				<form onSubmit={(e) => handleSubmit(e)} className='flex-row text-gray-600'>
					<span className='text-black absolute ml-9 mt-5 w-10'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
						</svg>
					</span>
					<input
						className='xl:border my-1 text-md border-gray-300 bg-white h-20 px-20 xl:rounded-lg focus:outline-none w-full'
						type='search'
						name='search'
						placeholder='Search for any job, title, keywords or company'
						value={searchString}
						onChange={(e) => setSearchString(e.target.value.toLowerCase())}
						onFocus={() => setSearchFocus(true)}
						onBlur={() => setSearchFocus(false)}
					/>
					{searchFocus
						? showOptions()
						: null
					}
				</form>
				{searchTerms.length > 0
					? <div className='flex flex-wrap items-center mb-1 xl:mt-2 xl:mb-0'>
						{searchTerms.map((term) => (
							<div key={term} className='m-1 rounded-full bg-gray-400 text-white p-2'>
								{term}
								<button className='focus:outline-none font-bold p-1' onClick={() => clearSearchTerm(term)}>&nbsp;X</button>
							</div>
						))}
					</div>
					: null
				}
				<div className='flex flex-row xl:space-x-4 xl:mt-4'>
					<div className='hidden xl:flex flex-col w-1/3 space-y-4 items-center'>
						{Object.keys(filters).map((filter) => (
							<FilterItem key={filter} name={filter.toUpperCase().replace('_', ' ')} data={filters[filter]} />
						))}
					</div>
					<div className='w-full xl:w-2/3 py-6 px-4 mb-4 flex flex-col bg-white xl:rounded-md'>
						<div className='flex flex-row pt-4'>
							<div className='flex-1'>
								<strong className='text-xl'>7,753</strong> job postings
							</div>
							<div className='hidden md:flex flex-row space-x-2'>
								<div className='text-gray-400'>
									Sort By
								</div>
								{queryOptions.map((query) => (
									<Dropdown key={query} query={query} options={['asc', 'desc', 'clear']} onOptionSelect={setQuery} />
								))}
							</div>
						</div>
						{!apiLoading
							? <ul className='pt-10 space-y-8'>
								{jobData.length > 0
									? jobData.map((job) => (
										<li key={job.name}>
											<JobItem job={job} />
										</li>
									))
									: <li className='text-2xl font-bold'>NO JOBS FOUND</li>
								}
							</ul>
							: <svg className='bg-black animate-spin h-5 w-5 ml-5 mt-10' viewBox='0 0 24 24'></svg>
						}
					</div>
				</div>
			</div>
			<div className='flex flex-wrap lg:flex-row p-6 space-y-2'>
				<div className='flex flex-col w-full lg:w-3/5 space-y-0 lg:space-y-2'>
					<strong className='text-2xl'>About us</strong>
					<div>We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that they love.</div>
					<div>All copyrights reserved &copy; 2020 - Health Explore</div>
				</div>
				<div className='flex flex-col w-full lg:w-1/5 space-y-0 lg:space-y-2'>
					<strong className='text-2xl'>Sitemap</strong>
					<a href='#' className='cursor-pointer select-none'>Nurses</a>
					<a href='#' className='cursor-pointer select-none'>Employers</a>
					<a href='#' className='cursor-pointer select-none'>Social networking</a>
					<a href='#' className='cursor-pointer select-none'>Jobs</a>
				</div>
				<div className='flex flex-col w-full lg:w-1/5 space-y-0 lg:space-y-2'>
				<strong className='text-2xl'>Privacy</strong>
					<a href='#' className='cursor-pointer select-none'>Terms of use</a>
					<a href='#' className='cursor-pointer select-none'>Privacy policy</a>
					<a href='#' className='cursor-pointer select-none'>Cookie policy</a>
				</div>
			</div>
		</div>
	);
};

export default Index

export const getServerSideProps = async () => {
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