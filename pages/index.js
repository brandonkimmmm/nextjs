import { API_URL } from '../constants';
import Nav from '../Components/Nav';
import FilterList from '../Components/FilterList';
import JobList from '../Components/JobList';

const Index = ({ jobs, filters }) => (
	<>
		<Nav />
		<div>
			<div>Search Bar</div>
			<FilterList filters={filters} />
			<JobList jobs={jobs.jobs} />
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