import FilterItem from './FilterItem';

const FilterList = ({ filters }) => {
	return (
		<div className='col-span-1 col-start-1 space-y-4 justify-center items-center'>
			{Object.keys(filters).map((filter) => (
				<FilterItem name={filter.toUpperCase().replace('_', ' ')} data={filters[filter]} />
			))}
		</div>
	)
}

export default FilterList;