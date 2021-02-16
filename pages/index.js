import { API_URL } from '../constants';
import Nav from '../components/Nav';
import FilterList from '../components/FilterList';
import JobList from '../components/JobList';

const Index = ({ jobs, filters }) => (
	<>
		<Nav />
		<div className='container bg-gray-200'>
			<div className="pt-2 relative mx-auto text-gray-600">
				<input
					className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
					type="search"
					name="search"
					placeholder="Search"
				/>
				<button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
					<div>hi</div>
				</button>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FilterList filters={filters} />
				<JobList jobs={jobs.jobs} />
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