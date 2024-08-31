import { Status, type Task } from "@/models/models";
import {
	expect,
	fn,
	screen,
	userEvent,
	waitFor,
	within,
} from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";
import TasksList from "./TasksList.vue";

const date = new Date(2020, 2, 20);
const now = new Date();

const tasks: Array<Task> = [
	{
		id: 1,
		title: "Task 1",
		status: Status.ToDo,
	},
	{
		id: 2,
		title: "Task 2",
		description: "Description",
	},
	{
		id: 3,
		title: "Task 3",
		description: "Description",
		dueDate: now.getTime(),
	},
	{
		id: 4,
		title: "Task 4",
		description: "Description",
		dueDate: date.getTime(),
	},
	{
		id: 5,
		title: "Task 5",
		description: "Description",
		dueDate: now.getTime(),
		status: Status.InProgress,
	},
];

const meta = {
	title: "TasksList/TasksList",
	component: TasksList,
	tags: ["autodocs"],
	args: {
		tasks,
	},
} satisfies Meta<typeof TasksList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const tasks = await canvas.findAllByTestId("task");

		await expect(tasks).toHaveLength(5);
	},
};

export const DeleteTask: Story = {
	play: async ({ canvasElement, args }) => {
		args.onDeleteTask = fn();
		const canvas = within(canvasElement);
		const trashIcon = await canvas.findAllByTestId("TrashIcon");

		await userEvent.click(trashIcon[3]);

		const confirmationButton = await screen.findByText("Confirm");

		userEvent.click(confirmationButton);

		await waitFor(() => expect(args.onDeleteTask).toHaveBeenCalledWith(3));
	},
};

export const UpdateTask: Story = {
	play: async ({ canvasElement, args }) => {
		args.onUpdateTask = fn();
		const canvas = within(canvasElement);
		const editIcon = await canvas.findAllByTestId("EditIcon");

		await userEvent.click(editIcon[0]);

		const descriptionInput = await screen.findByTestId("description");
		await userEvent.type(descriptionInput, "Task description");
		const confirmationButton = await screen.findByText("Save");

		userEvent.click(confirmationButton);

		await waitFor(() =>
			expect(args.onUpdateTask).toHaveBeenCalledWith({
				id: 0,
				newTask: {
					id: 1,
					description: "Task description",
					status: "toDo",
					title: "Task 1",
				},
			}),
		);
	},
};

export const ChangeTaskStatus: Story = {
	play: async ({ canvasElement, args }) => {
		args.onUpdateTask = fn();
		const canvas = within(canvasElement);
		const select = await canvas.findAllByTestId("Status select");
		await userEvent.click(select[0]);
		const completedOption = await screen.findAllByText("Completed");
		await userEvent.click(completedOption[5]);

		await expect(select[0]).toHaveTextContent("Completed");

		await waitFor(() =>
			expect(args.onUpdateTask).toHaveBeenCalledWith({
				id: 0,
				newTask: {
					id: 1,
					status: Status.Completed,
					title: "Task 1",
				},
			}),
		);
	},
};
