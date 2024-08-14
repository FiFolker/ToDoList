import { useState } from "react";

interface FilterTasksProps {
	onFilterChange: (filter: string) => void;
}

const FilterTasks: React.FC<FilterTasksProps> = ({ onFilterChange }) => {
	const [activeFilter, setActiveFilter] = useState<string>("All");

	const handleFilterClick = (filter: string) => {
		setActiveFilter(filter);
		onFilterChange(filter);
	};

	return (
		<div className="flex flex-row gap-2 justify-center">
			<div className="self-center font-bold text-lg">Filters : </div>
			{["All", "Active", "Completed"].map((filter) => (
				<button
					key={filter}
					className={`${
						activeFilter.toLowerCase() === filter.toLowerCase()
							? "bg-blue-900"
							: "bg-blue-500 hover:bg-blue-700"
					} text-white font-bold p-2 rounded`}
					onClick={(e) => handleFilterClick(filter.toLowerCase())}
				>
					{filter}
				</button>
			))}
		</div>
	);
};

export default FilterTasks;
