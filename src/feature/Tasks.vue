<script setup lang="ts">
import Page from "@/components/Layout/Page.vue";
import AddTask from "@/components/TasksList/AddTask/AddTask.vue";
import TasksList from "@/components/TasksList/List/TasksList.vue";
import TaskFilter from "@/components/TasksList/TasksFilter/TaskFilter.vue";
import { useTasksStore } from "@/stores/tasks";

const tasks = useTasksStore();
</script>

<template>
  <Page>
    <div class="flex flex-col gap-3 xl:w-2/5 lg:w-4/6">
      <div class="flex flex-row gap-3 self-start justify-between w-full">
        <AddTask @add-task="tasks.addTask" />
        <TaskFilter @update-search="tasks.updateSearchInput" @update-status-filter="tasks.updateStatusFilter" />
      </div>
      <TasksList :tasks="tasks.filteredTasks" @update-tasks="tasks.updateTasks" />
    </div>
  </Page>
</template>