import {
	expect,
	fn,
	screen,
	userEvent,
	waitFor,
	within,
} from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";
import AddTask from "./AddTask.vue";

const date = new Date(2024, 3, 1);

const meta = {
	title: "TasksList/AddTask",
	component: AddTask,
	tags: ["autodocs"],
	parameters: {
		mockingDate: date,
	},
} satisfies Meta<typeof AddTask>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const Add: Story = {
	args: {},
	play: async ({ canvasElement, args }) => {
		args.onAddTask = fn();
		const canvas = within(canvasElement);
		const addTask = await canvas.findByText("Add task");

		await userEvent.click(addTask);

		const titleInput = await screen.findByTestId("title");
		const descriptionInput = await screen.findByTestId("description");
		const dueDateValue = await screen.findByText("Pick a date");
		const submitButton = await screen.findByText("Save");

		await userEvent.type(titleInput, "My task");
		await userEvent.type(descriptionInput, "My description");
		await userEvent.click(dueDateValue);

		const date = await screen.findByText("30");

		await userEvent.click(date);
		await userEvent.click(dueDateValue);

		await expect(await screen.findByText("April 30, 2024")).toBeVisible();

		await userEvent.click(submitButton);

		await waitFor(() =>
			expect(args.onAddTask).toHaveBeenCalledWith({
				title: "My task",
				description: "My description",
				dueDate: 1714428000000,
			}),
		);
	},
};
