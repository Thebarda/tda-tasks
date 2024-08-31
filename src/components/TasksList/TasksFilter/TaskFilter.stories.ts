import { Status } from "@/models/models";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/vue3";
import TaskFilter from "./TaskFilter.vue";

const meta = {
	title: "TasksList/TaskFilter",
	component: TaskFilter,
	tags: ["autodocs"],
} satisfies Meta<typeof TaskFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EditSearch: Story = {
	args: {},
	play: async ({ canvasElement, args }) => {
		args.onUpdateSearch = fn();
		const canvas = within(canvasElement);

		const searchInput = await canvas.findByTestId("search");

		await userEvent.type(searchInput, "Task");

		expect(searchInput).toHaveValue("Task");

		await waitFor(() =>
			expect(args.onUpdateSearch).toHaveBeenCalledWith("Task"),
		);
	},
};

export const ToggleStatusFilter: Story = {
	args: {},
	play: async ({ canvasElement, args }) => {
		args.onUpdateStatusFilter = fn();
		const canvas = within(canvasElement);

		const todoButton = await canvas.findByText("To do");
		const inProgressButton = await canvas.findByText("In progress");
		const comnpletedButton = await canvas.findByText("Completed");

		await userEvent.click(todoButton);
		await userEvent.click(inProgressButton);

		expect(todoButton).toHaveClass("bg-border");
		expect(inProgressButton).toHaveClass("bg-border");
		expect(comnpletedButton).not.toHaveClass("bg-border");

		await waitFor(() =>
			expect(args.onUpdateStatusFilter).toHaveBeenCalledWith([Status.ToDo]),
		);
	},
};
