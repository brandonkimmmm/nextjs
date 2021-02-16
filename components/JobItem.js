const JobItem = ({ job }) => {
	return (
		<div>
			<h3>{job.name.toUpperCase().substring(0, 2)}</h3>
		</div>
	)
}

export default JobItem;