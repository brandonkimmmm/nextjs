import { useState } from 'react';
import moment from 'moment';

const JobItem = ({ job }) => {

	const [showJobs, setShowJobs] = useState(false);

	const [showJobDetails, setShowJobDetails] = useState({});

	const toggleJobs = (e) => {
		setShowJobs(!showJobs);
		setShowJobDetails({});
	}

	const toggleJobDetails = (e, id) => {
		setShowJobDetails({
			...showJobDetails,
			[id]: !showJobDetails[id]
		});
	}

	const jobDetails = (item) => {
		return (
			<div className='flex flex-wrap lg:flex-row'>
				<div className='flex flex-col space-y-4 w-full lg:w-5/6'>
					<div className='flex flex-col lg:flex-row'>
						<strong className='w-full lg:w-1/2'>Department:</strong>
						<div className='w-full lg:w-1/2'>{item.department.join(', ')}</div>
					</div>
					<div className='flex flex-col lg:flex-row'>
						<strong className='w-full lg:w-1/2'>Hours / shifts:</strong>
						<div className='w-full lg:w-1/2'>{`${item.hours[0]} Hours / ${item.work_schedule}`}</div>
					</div>
					<div className='flex flex-col lg:flex-row'>
						<strong className='w-full lg:w-1/2'>Summary:</strong>
						<div className='w-full lg:w-1/2'>{item.description}</div>
					</div>
				</div>
				<div className='flex flex-row lg:flex-col w-full lg:w-1/6 lg:justify-center space-x-2 lg:space-y-2 items-start mt-4 lg:items-end'>
					<button type='submit' className='rounded-md border p-3 text-lg bg-blue-400 text-white'>
						<div>Job details</div>
					</button>
					<button type='submit' className='rounded-md border p-3 text-lg text-blue-400 border-blue-400'>
						<div>Save job</div>
					</button>
				</div>
			</div>
		)
	}

	const jobsList = () => {
		if (showJobs) {
			return (
				<ul className='divide-y'>
					<li className='mt-4'></li>
					{job.items.map((item) => (
						<li className='flex flex-col space-y-4 py-4'>
							<div className='flex flex-row w-full items-center' onClick={(e) => toggleJobDetails(e, item.job_id)}>
								<div className='flex-1 flex-col'>
									<strong>{item.job_title}</strong>
									<div>
										{`${item.job_type} | $${item.salary_range[0]} - $${item.salary_range[1]} an hour | ${item.city}`}
									</div>
									<div className='lg:hidden'>
										{moment(item.created).startOf('days').fromNow()}
									</div>
								</div>
								<div className='hidden lg:flex'>
									{moment(item.created).startOf('days').fromNow()}
								</div>
							</div>
							{showJobDetails[item.job_id] ?
								jobDetails(item)
							: null}
						</li>
					))}
				</ul>
			)
		}
	}

	return (
		<div>
			<div className='flex items-center' onClick={(e) => toggleJobs(e)}>
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