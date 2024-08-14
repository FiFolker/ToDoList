"use client";

import { Task } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import ChangeState from "./ChangeState";
import DeleteTask from "./DeleteTask";

interface TasksProps {
	key: number;
	filter: string;
}

const Tasks: React.FC<TasksProps> = ({ key, filter }) => {
	const [tasks, setTasks] = useState<Task[]>([]);

	// Fetch tasks from the server
	const fetchTasks = useCallback(async () => {
		const response = await fetch(
			"/api/tasks" + (filter ? "?filter=" + filter : "")
		);
		const tasks: Task[] = await response.json();
		setTasks(tasks);
	}, [filter]);

	useEffect(() => {
		fetchTasks();
	}, [key, filter, fetchTasks]);

	const handleDelete = (id: number) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	};

	const handleStateChange = (id: number, newState: boolean) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? { ...task, state: newState } : task
			)
		);
	};

	if (tasks.length === 0) {
		return <div>No tasks! Please add tasks </div>;
	}

	return (
		<ul>
			{tasks.map((task: Task) => (
				<li
					key={task.id}
					className={`flex flex-col gap-2 ${
						task.state ? "bg-green-200" : "bg-blue-200"
					} p-3 m-3 rounded shadow-lg`}
				>
					<div className="flex flex-row justify-between">
						<p className="font-bold">{task.title}</p>
						<p>
							Created on{" "}
							{new Intl.DateTimeFormat("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
								hour: "2-digit",
								minute: "2-digit",
							}).format(new Date(task.createdAt))}
						</p>
					</div>
					<p>{task.content}</p>
					<div className="flex flex-row gap-2">
						<ChangeState task={task} onStateChange={handleStateChange} />
						<DeleteTask id={task.id} onDelete={handleDelete} />
					</div>
				</li>
			))}
		</ul>
	);
};

export default Tasks;
