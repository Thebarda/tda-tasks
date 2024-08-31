<script setup lang="ts">
import type { ChangeTaskStatusProps, Task } from "@/models/models";
import { equals, find, findIndex } from "ramda";
import TaskComponent from "../Task/Task.vue";

interface Props {
	tasks: Array<Task>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "updateTask", { id, newTask }): void;
	(e: "deleteTask", id: number): void;
}>();

const changeTaskStatus = ({ id, newStatus }: ChangeTaskStatusProps): void => {
	const task = find((task) => equals(id, task.id), props.tasks) as Task;
	const taskIndex = findIndex((task) => equals(id, task.id), props.tasks);

	emit("updateTask", {
		id: taskIndex,
		newTask: { ...task, status: newStatus },
	});
};

const editTask = ({
	id,
	updatedTask,
}: { id: number; updatedTask: Task }): void => {
	const task = find((task) => equals(id, task.id), props.tasks) as Task;
	const taskIndex = findIndex((task) => equals(id, task.id), props.tasks);

	emit("updateTask", { id: taskIndex, newTask: { ...task, ...updatedTask } });
};

const deleteTask = (id: number): void => {
	const taskIndex = findIndex((task) => equals(id, task.id), props.tasks);

	emit("deleteTask", taskIndex);
};
</script>

<template>
  <div class="flex flex-col gap-3 max-h-[300px] overflow-auto scroll-smooth">
    <TaskComponent v-for="task in props.tasks" :key="task.id" :task="task" @change-task-status="changeTaskStatus" @delete-task="deleteTask" @edit-task="editTask" />
  </div>
</template>