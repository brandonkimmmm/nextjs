import JobItem from './JobItem';

const JobList = ({ jobs }) => {
	return (
		<div className='col-span-2 col-start-2 p-4 bg-white rounded-md'>
			<div className='flex'>
				<div className='flex-1'>
					<strong>7,753</strong> job postings
				</div>
				<div>
					Sort By
					Location
					Role
					Department
					Education
					Experience
				</div>
			</div>
			<div className='mt-12'>
				<ul className='space-y-8'>
					{jobs.map((job) => (
						<li>
							<JobItem job={job} />
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default JobList;