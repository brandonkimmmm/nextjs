const JobItem = ({ job }) => {
	return (
		<div className='flex relative'>
			<div>
				{job.name.toUpperCase().substring(0, 2)} {`${job.total_jobs_in_hospital} Jobs for ${job.name}`}
			</div>
		</div>
	)
}

export default JobItem;