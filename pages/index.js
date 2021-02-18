import { API_URL } from '../constants';
import Nav from '../components/Nav';
import FilterList from '../components/FilterList';
import JobList from '../components/JobList';

const Index = ({ jobs, filters }) => (
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
			<div className='grid grid-cols-3 gap-4 mx-4 mt-4'>
				<FilterList filters={filters} />
				<JobList jobs={jobs.jobs} />
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
)

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