import AddTask from "./AddTask/AddTask.vue";
import TasksList from "./List/TasksList.vue";
import Task from "./Task/Task.vue";
import TaskForm from "./TaskForm/TaskForm.vue";
import TaskFilter from "./TasksFilter/TaskFilter.vue";

export const tasksListComponents = [
	{ name: "AddTask", component: AddTask },
	{ name: "TasksList", component: TasksList },
	{ name: "TaskForm", component: TaskForm },
	{
		name: "TaskFilter",
		component: TaskFilter,
	},
	{ name: "Task", component: Task },
];
