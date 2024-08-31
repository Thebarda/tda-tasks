export enum Status {
	ToDo = "toDo",
	InProgress = "inProgress",
	Completed = "completed",
}

export interface Task {
	id: number;
	title: string;
	dueDate?: number;
	description?: string;
	status?: Status;
}

export interface ChangeTaskStatusProps {
	id: number;
	newStatus: Status;
}

export interface StatusSelectEntry {
	id: Status;
	label: string;
}
