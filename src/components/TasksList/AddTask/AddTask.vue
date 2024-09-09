<script setup lang="ts">
import type { Task } from "@/models/models";
import { Button } from "@shad/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@shad/dialog";

const emit = defineEmits<(e: "addTask", task: Omit<Task, "id">) => void>();

const addTask = (newTask: Omit<Task, "id">): void => {
	emit("addTask", newTask);
};
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" class="flex flex-row gap-2"><AddIcon class="size-5" />Add task</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add task</DialogTitle>
      </DialogHeader>
      <TaskForm :task="null" @submit-task="addTask" dialog-close />
    </DialogContent>
  </Dialog>
</template>