import { Status, type Task } from "@/models/models";
import { defineStore } from "pinia";
import { filter, includes, isEmpty, pluck } from "ramda";
import { ref, watchEffect } from "vue";

const key = "TDA-tasks";

export const useTasksStore = defineStore("tasks", () => {
	const initialTasks = localStorage.getItem(key);
	const tasks = ref<Array<Task>>(initialTasks ? JSON.parse(initialTasks) : []);
	const searchInput = ref("");
	const statusFilters = ref<Array<Status>>([]);

	const filteredTasks = () => {
		const tasksFilteredByStatus = filter(
			({ status }) =>
				isEmpty(statusFilters.value) ||
				statusFilters.value.includes(status || Status.ToDo),
			tasks.value,
		);

		const tasksFilteredBySearchInput = filter(
			({ title, description }) =>
				includes(searchInput.value, title) ||
				includes(searchInput.value, description || ""),
			tasksFilteredByStatus,
		);

		return tasksFilteredBySearchInput;
	};

	const addTask = (task: Omit<Task, "id">): void => {
		const ids = pluck("id", tasks.value) as Array<number>;
		tasks.value.unshift({
			...task,
			id: isEmpty(ids) ? 1 : Math.max(...ids) + 1,
		});
	};

	watchEffect(() => {
		localStorage.setItem(key, JSON.stringify(tasks.value));
	});

	const updateTask = ({ id, newTask }): void => {
		tasks.value.splice(id, 1, newTask);
	};

	const deleteTask = (id: number): void => {
		tasks.value.splice(id, 1);
	};

	const updateSearchInput = (newSearch: string): void => {
		searchInput.value = newSearch;
	};

	const updateStatusFilter = (status: Array<Status>): void => {
		statusFilters.value = status;
	};

	return {
		tasks,
		addTask,
		updateTask,
		updateSearchInput,
		updateStatusFilter,
		deleteTask,
		filteredTasks,
	};
});
