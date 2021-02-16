import FilterItem from './FilterItem';

const FilterList = ({ filters }) => {
	return (
		<div className='container mx-auto flex flex-col space-y-4 justify-center items-center'>
			{Object.keys(filters).map((filter) => (
				<FilterItem name={filter.toUpperCase().replace('_', ' ')} data={filters[filter]} />
			))}
		</div>
	)
}

export default FilterList;