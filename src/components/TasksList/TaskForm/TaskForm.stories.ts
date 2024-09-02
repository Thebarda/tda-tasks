import {
	expect,
	fn,
	screen,
	userEvent,
	waitFor,
	within,
} from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";
import TaskForm from "./TaskForm.vue";

const date = new Date(2024, 3, 1);

const meta = {
	title: "TasksList/TaskForm",
	component: TaskForm,
	tags: ["autodocs"],
	parameters: {
		mockingDate: date,
	},
} satisfies Meta<typeof TaskForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		task: null,
	},
};

export const InitialValues: Story = {
	args: {
		task: {
			id: 1,
			title: "Task",
			description: "Description",
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const titleInput = await canvas.findByTestId("title");
		const descriptionInput = await canvas.findByTestId("description");
		const dueDateValue = await canvas.findByText("Pick a date");
		const submitButton = await canvas.findByText("Save");

		await expect(titleInput).toHaveValue("Task");
		await expect(descriptionInput).toHaveValue("Description");
		await expect(dueDateValue).toBeVisible();
		await expect(submitButton).toBeEnabled();
	},
};

export const TitleError: Story = {
	args: {
		task: {
			id: 1,
			title: "Task",
			description: "Description",
			dueDate: date.getTime(),
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const titleInput = await canvas.findByTestId("title");
		const submitButton = await canvas.findByText("Save");

		userEvent.clear(titleInput);
		titleInput.blur();

		await expect(await canvas.findByText("Enter a valid title")).toBeVisible();
		await expect(submitButton).toBeDisabled();
	},
};

export const Submit: Story = {
	args: {
		task: null,
	},
	play: async ({ canvasElement, args }) => {
		args.onSubmitTask = fn();
		const canvas = within(canvasElement);
		const titleInput = await canvas.findByTestId("title");
		const descriptionInput = await canvas.findByTestId("description");
		const dueDateValue = await canvas.findByText("Pick a date");
		const submitButton = await canvas.findByText("Save");

		await userEvent.type(titleInput, "My task");
		await userEvent.type(descriptionInput, "My description");
		await userEvent.click(dueDateValue);

		const date = await screen.findByText("30");

		await userEvent.click(date);
		await userEvent.click(dueDateValue);

		await expect(await canvas.findByText("April 30, 2024")).toBeVisible();

		await userEvent.click(submitButton);

		await waitFor(() => expect(args.onSubmitTask).toHaveBeenCalled());
	},
};
