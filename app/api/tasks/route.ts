import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	const { title, content } = await request.json();

	try {
		if (title === "" || content === "") {
			return NextResponse.json(
				{ error: "Title and content are required" },
				{ status: 400 }
			);
		}

		const task = await prisma.task.create({
			data: {
				title,
				content,
			},
		});
		return NextResponse.json(task);
	} catch (error) {
		return NextResponse.json({ error: "Error creating task" }, { status: 500 });
	}
}

export async function GET(request: Request) {
	try {
		const url = new URL(request.url);
		const filter = url.searchParams.get("filter");

		const whereClause =
			filter && filter !== "all" ? { state: filter === "completed" } : {};

		const tasks = await prisma.task.findMany({
			where: whereClause,
			orderBy: {
				createdAt: "desc",
			},
		});
		return NextResponse.json(tasks);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching tasks" },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request) {
	const { id } = await request.json();

	try {
		if (!id || typeof id !== "number") {
			return NextResponse.json(
				{ error: "ID is required and must be a number" },
				{ status: 400 }
			);
		}

		const task = await prisma.task.delete({
			where: {
				id,
			},
		});
		return NextResponse.json(task);
	} catch (error) {
		return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
	}
}

export async function PUT(request: Request) {
	const { id, state } = await request.json();

	try {
		if (!id || typeof id !== "number") {
			return NextResponse.json(
				{ error: "ID is required and must be a number" },
				{ status: 400 }
			);
		}

		if (state === undefined || typeof state !== "boolean") {
			return NextResponse.json(
				{ error: "State is required and must be a boolean" },
				{ status: 400 }
			);
		}

		const task = await prisma.task.update({
			where: {
				id,
			},
			data: {
				state,
			},
		});
		return NextResponse.json(task);
	} catch (error) {
		return NextResponse.json({ error: "Error updating task" }, { status: 500 });
	}
}
