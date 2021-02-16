import JobItem from './JobItem';

const JobList = ({ jobs }) => {
	console.log(jobs)
	return (
		<div>
			{jobs.map((job) => (
				<JobItem job={job} />
			))}
		</div>
	)
}

export default JobList;