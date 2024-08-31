import "./assets/index.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import App from "./App.vue";
import router from "./router";

dayjs.extend(LocalizedFormat);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
