import type { Meta, StoryObj } from "@storybook/vue3";
import Tasks from "./Tasks.vue";

const date = new Date(2024, 3, 1);

const meta = {
	title: "feature/Tasks",
	component: Tasks,
	tags: ["autodocs"],
	parameters: {
		mockingDate: date,
	},
} satisfies Meta<typeof Tasks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
