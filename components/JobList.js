import JobItem from './JobItem';

const JobList = ({ jobs }) => {
	return (
		<div className='container bg-white rounded-md'>
			<div className='flex'>123 job postings</div>
			
			{jobs.map((job) => (
				<JobItem job={job} />
			))}
		</div>
	)
}

export default JobList;