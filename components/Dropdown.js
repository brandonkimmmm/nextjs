import { useState } from 'react';

const Dropdown = ({ query, options, onOptionSelect }) => {
	const [active, setActive] = useState(false);
	const [activeOption, setActiveOption] = useState(null);

	return (
		<div
			onMouseEnter={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
		>
			<button>
				{`${query.charAt(0).toUpperCase()}${query.slice(1)}${activeOption ? (activeOption === 'asc' ? '\u21e7' : '\u21e9') : ''}`}
			</button>
			<div className={`absolute origin-top-right w-14 rounded-md space-y-1 shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-x-1 ${active ? null : 'hidden'}`}>
				{options.map((option) => (
					<div
						className={`p-1 cursor-pointer select-none ${activeOption === option ? 'bg-gray-200' : null}`}
						key={option}
						onClick={(e) => {
							setActiveOption(option === 'clear' ? null : option);
							onOptionSelect(query, option);
						}}
					>
						{option}
					</div>
				))}
			</div>
		</div>
	)
}

export default Dropdown;