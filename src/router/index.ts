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

// router.beforeEach((to) => {
// 	const auth = useAuthenticatedUser();

// 	if (isNil(auth.authenticatedEmail) && equals(to.name, "tasks")) {
// 		return "/";
// 	}

// 	if (
// 		auth.authenticatedEmail &&
// 		includes(to.name, ["signin", "signup", "home"])
// 	) {
// 		return "/tasks";
// 	}
// });

export default router;
