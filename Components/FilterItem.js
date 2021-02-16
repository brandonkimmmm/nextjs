const FilterItem = ({ name, data }) => {
	return (
		<div>
			<h3>{name}</h3>
			{data.map((d) => (
				<p>{d.key} <span>{d.doc_count}</span></p>
			))}
		</div>
	)
}

export default FilterItem;