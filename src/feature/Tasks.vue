<script setup lang="ts">
import Page from "@/components/Layout/Page.vue";
import AddTask from "@/components/TasksList/AddTask/AddTask.vue";
import TasksList from "@/components/TasksList/List/TasksList.vue";
import TaskFilter from "@/components/TasksList/TasksFilter/TaskFilter.vue";
import { useTasksStore } from "@/stores/tasks";

const {
	updateSearchInput,
	updateStatusFilter,
	addTask,
	updateTask,
	deleteTask,
	filteredTasks,
} = useTasksStore();
</script>

<template>
  <Page>
    <div class="flex flex-col gap-3 w-2/5">
      <div class="flex flex-row gap-3 self-start justify-between w-full">
        <AddTask @add-task="addTask" />
        <TaskFilter @update-search="updateSearchInput" @update-status-filter="updateStatusFilter" />
      </div>
      <TasksList :tasks="filteredTasks()" @update-task="updateTask" @delete-task="deleteTask" />
    </div>
  </Page>
</template>