"use client";

interface DeleteTaskProps {
	id: number;
	onDelete: (id: number) => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ id, onDelete }) => {
	const handleDelete = async () => {
		try {
			const response = await fetch("/api/tasks", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
				}),
			});

			if (response.ok) {
				console.log("Task deleted");
				onDelete(id); // Call the onDelete function to update the task list
			} else {
				console.error("Error deleting task:", await response.text());
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	return (
		<button
			className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded"
			onClick={handleDelete}
		>
			DeleteTask
		</button>
	);
};

export default DeleteTask;
