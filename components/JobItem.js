const JobItem = ({ job }) => {
	return (
		<div className='flex items-center justify-content'>
			<div className='rounded-lg w-10 flex justify-center bg-gray-300 text-xl p-1 mr-2  text-white'>
				{job.name.toUpperCase().substring(0, 2)}
			</div>
			{`${job.total_jobs_in_hospital} Jobs for ${job.name}`}
		</div>
	)
}

export default JobItem;