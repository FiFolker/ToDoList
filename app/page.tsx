"use client";

import AddTask from "@/components/AddTask";
import FilterTasks from "@/components/FilterTasks";
import Tasks from "@/components/Tasks";
import { useState } from "react";

export default function Home() {
	const [taskKey, setTaskKey] = useState<number>(0);
	const [filter, setFilter] = useState<string>("All");

	const handleTaskAdded = () => {
		setTaskKey((prevKey: number) => prevKey + 1);
	};

	const handleFilterChange = (filter: string) => {
		setFilter(filter);
	};

	return (
		<div>
			<div className="flex flex-row justify-between border-b-2 border-gray-500 bg-lime-300 p-3">
				<p className="text-lg font-bold">To Do List</p>
				<p className="text-xs self-end">Created by Elouan</p>
			</div>
			<AddTask onTaskAdded={handleTaskAdded} />
			<FilterTasks onFilterChange={handleFilterChange} />
			<Tasks key={taskKey} filter={filter.toLowerCase()} />
		</div>
	);
}
