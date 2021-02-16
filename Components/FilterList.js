import FilterItem from './FilterItem';

const FilterList = ({ filters }) => {
	return (
		<div>
			{Object.keys(filters).map((filter) => (
				<FilterItem name={filter.toUpperCase().replace('_', ' ')} data={filters[filter]} />
			))}
		</div>
	)
}

export default FilterList;