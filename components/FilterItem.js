import { useState } from 'react';

const FilterItem = ({ name, data }) => {

	const [splitItems, setSplitItems] = useState([data.slice(0, 10), data.slice(10)]);
	const [showExtra, setShowExtra] = useState(splitItems[1].length > 0 ? false : true);
	return (
		<div className='bg-white rounded-lg w-full border p-6'>
			<strong className='text-lg'>{name}</strong>
			<ul className='mt-4 space-y-3'>
				{splitItems[0].map((d, i) => (
					<li key={d.key}>
						<span className='cursor-pointer select-none hover:bg-gray-400 rounded-lg p-1'>
							{d.key}
						</span>
						&nbsp;&nbsp;
						<span className='text-gray-400 text-sm'>
							{d.doc_count}
						</span>
					</li>
				))}
				{splitItems[1].length > 0 && showExtra
					? splitItems[1].map((d, i) => (
						<li key={d.key}>
							<span className='cursor-pointer select-none hover:bg-gray-400 rounded-lg p-1'>
								{d.key}
							</span>
							&nbsp;&nbsp;
							<span className='text-gray-400 text-sm'>
								{d.doc_count}
							</span>
						</li>
					))
					: null
				}
			</ul>
			{splitItems[1].length > 0
				? <div className='text-blue-400 mt-4 cursor-pointer select-none font-bold' onClick={() => setShowExtra(!showExtra)}>{showExtra ? 'Show Less' : 'Show More'}</div>
				: null
			}
		</div>
	)
}

export default FilterItem;