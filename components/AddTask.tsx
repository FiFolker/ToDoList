"use client";

import { useState } from "react";

const AddTask = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [error, setError] = useState<string>("");

	const handleAddTask = async () => {
		setError("");
		try {
			const response = await fetch("/api/tasks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					content,
				}),
			});

			if (response.ok) {
				// Optionally handle the response
				console.log("Task added:", await response.json());
				// Clear input fields after successful addition
				setTitle("");
				setContent("");
				onTaskAdded();
			} else {
				const responseData = await response.json();
				const errorMessage = responseData.error || "Unknown error occurred";
				setError(errorMessage);
				console.error("Error adding task:", errorMessage);
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	return (
		<div className="rounded m-5 shadow-md bg-gray-50">
			<div className="flex flex-col">
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="p-1 m-3 border border-gray-300 self-start"
				/>
				<input
					type="text"
					placeholder="Content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="p-3 m-3 border border-gray-300"
				/>
				{error && <p className="self-center text-red-500">{error}</p>}
				<button
					className="bg-green-500 hover:bg-green-700 font-bold text-white p-3 rounded self-center m-3"
					onClick={handleAddTask}
				>
					Add Task
				</button>
			</div>
		</div>
	);
};

export default AddTask;
