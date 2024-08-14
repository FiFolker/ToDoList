import { Task } from "@prisma/client";
import { useState } from "react";

interface ChangeStateProps {
	task: Task;
	onStateChange: (id: number, newState: boolean) => void;
}

const ChangeState: React.FC<ChangeStateProps> = ({ task, onStateChange }) => {
	const [state, setState] = useState<boolean>(task.state);

	const handleState = async () => {
		try {
			const response = await fetch("/api/tasks", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: task.id,
					state: !state,
				}),
			});

			if (response.ok) {
				console.log("Task state changed");
				setState(!state);
				onStateChange(task.id, !state);
			} else {
				console.error("Error changing task state:", await response.text());
			}
		} catch (error) {
			console.error("Network error:", error);
		}
	};

	return (
		<button
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
			onClick={handleState}
		>
			{state ? "Mark as Incomplete" : "Mark as Complete"}
		</button>
	);
};

export default ChangeState;
