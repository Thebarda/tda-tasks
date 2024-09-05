import { Status, type Task } from "@/models/models";
import { defineStore } from "pinia";
import { filter, includes, isEmpty, pluck, prepend } from "ramda";
import { computed, ref, watch } from "vue";

const key = "TDA-tasks";

export const useTasksStore = defineStore("tasks", () => {
	const initialTasks = localStorage.getItem(key);
	const tasks = ref<Array<Task>>(initialTasks ? JSON.parse(initialTasks) : []);
	const searchInput = ref("");
	const statusFilters = ref<Array<Status>>([]);

	const filteredTasks = computed(() => {
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
	});

	const updateTasks = (newTasks: Array<Task>): void => {
		tasks.value = newTasks;
	};

	const addTask = (task: Omit<Task, "id">): void => {
		const ids = pluck("id", tasks.value) as Array<number>;
		const newTask = {
			...task,
			id: isEmpty(ids) ? 1 : Math.max(...ids) + 1,
		};
		const newTasks = prepend(newTask, tasks.value);

		updateTasks(newTasks);
	};

	watch(tasks, () => {
		localStorage.setItem(key, JSON.stringify(tasks.value));
	});

	const updateSearchInput = (newSearch: string): void => {
		searchInput.value = newSearch;
	};

	const updateStatusFilter = (status: Array<Status>): void => {
		statusFilters.value = status;
	};

	return {
		tasks,
		addTask,
		updateSearchInput,
		updateStatusFilter,
		filteredTasks,
		updateTasks,
	};
});
