<script setup lang="ts">
import type { ChangeTaskStatusProps, Task } from "@/models/models";
import { equals, find, findIndex, reject, update } from "ramda";

interface Props {
	tasks: Array<Task>;
}

const props = defineProps<Props>();

const emit = defineEmits<(e: "updateTasks", newTasks: Array<Task>) => void>();

const editTask = ({
	id,
	updatedTask,
}: { id: number; updatedTask: Partial<Task> }): void => {
	const task = find((task) => equals(id, task.id), props.tasks) as Task;
	const taskIndex = findIndex((task) => equals(id, task.id), props.tasks);
	const newTasks = update(taskIndex, { ...task, ...updatedTask }, props.tasks);

	emit("updateTasks", newTasks);
};

const changeTaskStatus = ({ id, newStatus }: ChangeTaskStatusProps): void => {
	editTask({ id, updatedTask: { status: newStatus } });
};

const deleteTask = (id: number): void => {
	const newTasks = reject((task) => equals(id, task.id), props.tasks);

	emit("updateTasks", newTasks);
};
</script>

<template>
  <div class="flex flex-col gap-3 max-h-[80vh] overflow-auto scroll-smooth">
    <Task v-for="task in props.tasks" :key="task.id" :task="task" @change-task-status="changeTaskStatus" @delete-task="deleteTask" @edit-task="editTask" />
  </div>
</template>