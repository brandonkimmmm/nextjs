const FilterItem = ({ name, data }) => {
	return (
		<div className='bg-white rounded-lg w-full border py-3 px-1'>
			<h3 className='p-1'>{name}</h3>
			<ul>
				{data.map((d) => (
					<li className='p-1'>{d.key} <span>{d.doc_count}</span></li>
				))}
			</ul>
		</div>
	)
}

export default FilterItem;