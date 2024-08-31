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
import StatusSelect from "./StatusSelect.vue";

const meta = {
	title: "TasksList/StatusSelect",
	component: StatusSelect,
	tags: ["autodocs"],
} satisfies Meta<typeof StatusSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onChangeStatus: (status) => alert(`Status changed: ${status}`),
	},
	play: async ({ canvasElement, args }) => {
		args.onChangeStatus = fn();
		const canvas = within(canvasElement);
		const select = await canvas.findByTestId("Status select");
		await userEvent.click(select);
		const completedOption = await screen.findAllByText("Completed");
		await userEvent.click(completedOption[1]);
		await expect(select).toHaveTextContent("Completed");
		await expect(select).toHaveClass("bg-green-500");
		await waitFor(() => expect(args.onChangeStatus).toHaveBeenCalled());
	},
};

export const withADefinedStatus: Story = {
	args: {
		status: Status.InProgress,
	},
};
