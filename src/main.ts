import "./assets/index.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import App from "./App.vue";
import {
	authenticationComponents,
	iconComponents,
	layoutComponents,
	statusSelectComponents,
	tasksListComponents,
} from "./components";
import { featuresComponents } from "./feature";
import { registerGlobalComponents } from "./registerComponents";
import router from "./router";

dayjs.extend(LocalizedFormat);

const app = createApp(App);

app.use(createPinia());
app.use(router);

registerGlobalComponents({
	app,
	components: [
		...iconComponents,
		...tasksListComponents,
		...statusSelectComponents,
		...authenticationComponents,
		...layoutComponents,
		...featuresComponents,
	],
});

app.mount("#app");
