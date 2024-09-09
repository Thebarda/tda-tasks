import { type Preview, setup } from "@storybook/vue3";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { createPinia } from "pinia";
import type { App } from "vue";
import "../src/assets/index.css";
import {
	iconComponents,
	statusSelectComponents,
	tasksListComponents,
} from "../src/components";
import { registerGlobalComponents } from "../src/registerComponents";

const pinia = createPinia();

setup((app: App) => {
	app.use(pinia);
	registerGlobalComponents({
		app,
		components: [
			...iconComponents,
			...tasksListComponents,
			...statusSelectComponents,
		],
	});
});

dayjs.extend(localizedFormat);
dayjs.extend(isSameOrAfter);

const preview: Preview = {
	parameters: {
		test: {
			dangerouslyIgnoreUnhandledErrors: true,
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
