import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import TasksView from "@/views/TasksView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/signin",
			name: "signin",
			component: SignInView,
		},
		{
			path: "/signup",
			name: "signup",
			component: SignUpView,
		},
		{
			path: "/tasks",
			name: "tasks",
			component: TasksView,
		},
	],
});

export default router;
