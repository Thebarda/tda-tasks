import { Status } from "@/models/models";
import {
	expect,
	fn,
	screen,
	userEvent,
	waitFor,
	within,
} from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";
import dayjs from "dayjs";
import Task from "./Task.vue";

const meta = {
	title: "TasksList/Task",
	component: Task,
	tags: ["autodocs"],
	parameters: {
		mockingDate: new Date(2020, 2, 20),
	},
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

const date = new Date(2020, 2, 20);
const expired = new Date(2020, 2, 19);

export const Default: Story = {
	args: {
		task: {
			id: 1,
			title: "Task 1",
			description: "Task description",
			dueDate: date.getTime(),
		},
		onChangeTaskStatus: ({ id, newStatus }) =>
			alert(`Task ${id} status: ${newStatus}`),
		onDeleteTask: (id) => alert(`Task ${id} deleted`),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const title = await canvas.findByText("Task 1");
		const description = await canvas.findByText("Task description");
		const dueDate = await canvas.findByText("03/20/2020");
		const dueDateIcon = await canvas.findByTestId("CalendarIcon");
		const trashIcon = await canvas.findByTestId("TrashIcon");
		const select = await canvas.findByTestId("Status select");
		await waitFor(() => expect(title).toBeVisible());
		await expect(description).toBeVisible();
		await expect(dueDate).toBeVisible();
		await expect(dueDate).not.toHaveClass("text-red-600");
		await expect(dueDateIcon).toBeVisible();
		await expect(trashIcon).toBeVisible();
		await expect(select).toBeVisible();
	},
};

export const NoDueDate: Story = {
	args: {
		task: {
			id: 1,
			title: "Task 1",
			description: "Task description",
		},
		onChangeTaskStatus: ({ id, newStatus }) =>
			alert(`Task ${id} status: ${newStatus}`),
		onDeleteTask: (id) => alert(`Task ${id} deleted`),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.queryByTestId("03/20/2020")).not.toBeInTheDocument();
		await expect(canvas.queryByTestId("CalendarIcon")).not.toBeInTheDocument();
	},
};

export const DeleteTask: Story = {
	args: {
		task: {
			id: 1,
			title: "Task 1",
			description: "Task description",
			dueDate: date.getTime(),
		},
	},
	play: async ({ canvasElement, args }) => {
		args.onDeleteTask = fn();
		const canvas = within(canvasElement);
		const trashIcon = await canvas.findByTestId("TrashIcon");

		await userEvent.click(trashIcon);

		const confirmationMessage = await screen.findByText(
			"The task will be removed from the list",
		);
		const confirmationButton = await screen.findByText("Confirm");
		await expect(confirmationMessage).toBeInTheDocument();

		userEvent.click(confirmationButton);

		await waitFor(() => expect(args.onDeleteTask).toHaveBeenCalledWith(1));
	},
};

export const ChangeTaskStatus: Story = {
	args: {
		task: {
			id: 1,
			title: "Task 1",
			description: "Task description",
			dueDate: date.getTime(),
		},
	},
	play: async ({ canvasElement, args }) => {
		args.onChangeTaskStatus = fn();
		const canvas = within(canvasElement);

		const select = await canvas.findByTestId("Status select");
		await userEvent.click(select);
		const completedOption = await screen.findAllByText("Completed");
		await userEvent.click(completedOption[1]);

		await expect(select).toHaveTextContent("Completed");
		await waitFor(() =>
			expect(args.onChangeTaskStatus).toHaveBeenCalledWith({
				id: 1,
				newStatus: Status.Completed,
			}),
		);
	},
};

export const ExpiredTask: Story = {
	args: {
		task: {
			id: 1,
			title: "Task 1",
			description: "Task description",
			dueDate: expired.getTime(),
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const dueDate = await canvas.findByText(dayjs(expired).format("L"));
		await expect(dueDate).toHaveClass("text-red-600");
	},
};

export const UpdateTask: Story = {
	args: {
		task: {
			id: 1,
			title: "Task 1",
			description: "Task description",
			dueDate: date.getTime(),
		},
	},
	play: async ({ canvasElement, args }) => {
		args.onEditTask = fn();
		const canvas = within(canvasElement);
		const editIcon = await canvas.findByTestId("EditIcon");

		await userEvent.click(editIcon);

		const descriptionInput = await screen.findByTestId("description");
		await userEvent.type(descriptionInput, " updated");
		const confirmationButton = await screen.findByText("Save");

		userEvent.click(confirmationButton);

		await waitFor(() => expect(args.onEditTask).toHaveBeenCalled());

		await expect(
			await canvas.findByText("Task description updated"),
		).toBeVisible();
	},
};
