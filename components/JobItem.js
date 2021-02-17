import { useState } from 'react';

const JobItem = ({ job }) => {

	const [showJobs, setShowJobs] = useState(false);

	const toggleJobs = () => {
		setShowJobs(!showJobs);
	}

	const jobsList = () => {
		if (showJobs) {
			return (
				<ul className='divide-y'>
					<li className='mt-4'></li>
					{job.items.map((item) => (
						<li className='flex flex-col py-4'>
							<div>
								<strong>{item.job_title}</strong>
							</div>
							<div>
								{`${item.job_type} | $${item.salary_range[0]} - $${item.salary_range[1]} an hour | ${item.city}`}
							</div>
						</li>
					))}
				</ul>
			)
		}
	}

	return (
		<div>
			<div className='flex items-center justify-content' onClick={toggleJobs}>
				<div className='rounded-lg w-10 flex justify-center bg-gray-300 text-xl p-1 mr-2  text-white'>
					{job.name.toUpperCase().substring(0, 2)}
				</div>
				{`${job.total_jobs_in_hospital} Jobs for ${job.name}`}
			</div>
			{jobsList()}
		</div>
	)
}

export default JobItem;