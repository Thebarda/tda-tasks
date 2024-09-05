<script setup lang="ts">
import type { ChangeTaskStatusProps, Status, Task } from "@/models/models";
import { Button } from "@shad/button";
import { Card } from "@shad/card";
import { DialogContent } from "@shad/dialog";
import Dialog from "@shad/dialog/Dialog.vue";
import { Popover, PopoverContent, PopoverTrigger } from "@shad/popover";
import dayjs from "dayjs";
import { computed, ref } from "vue";
import { CalendarIcon, EditIcon, TrashIcon } from "../../Icons";
import StatusSelect from "../../StatusSelect/StatusSelect.vue";
import TaskForm from "../TaskForm/TaskForm.vue";

interface Props {
	task: Task;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "changeTaskStatus", { id, newStatus }: ChangeTaskStatusProps): void;
	(e: "deleteTask", id: number): void;
	(e: "editTask", { id, updatedTask }): void;
}>();

const task = ref(props.task);
const isAskingBeforeDelete = ref(false);
const taskBeingEdited = ref<Task | null>(null);

const formattedDate = computed(() => dayjs(props.task.dueDate).format("L"));
const isExpired = computed(
	() => props.task.dueDate && dayjs().isAfter(dayjs(props.task.dueDate), "day"),
);

const askBeforeDelete = (): void => {
	isAskingBeforeDelete.value = true;
};

const editTask = (): void => {
	taskBeingEdited.value = props.task;
};

const submitTaskEdition = (updatedTask: Task): void => {
	task.value = updatedTask;
	emit("editTask", { id: props.task.id, updatedTask });
	taskBeingEdited.value = null;
};

const closeTaskEdition = (): void => {
	taskBeingEdited.value = null;
};

const deleteTask = () => {
	isAskingBeforeDelete.value = false;
	emit("deleteTask", props.task.id);
};

const changeStatus = (newStatus: Status): void => {
	task.value.status = newStatus;
	emit("changeTaskStatus", { id: task.value.id, newStatus });
};
</script>

<template>
  <Card class="flex flex-row p-3 items-center px-4 shadow gap-4 card-animation" :id="`task-${task.id}`" data-testid="task">
    <div class="grow">
      <p class="text-xl font-bold">{{ task.title }}</p>
      <p class="text-base" v-if="task.description">{{ task.description }}</p>
      <div class="flex flex-row gap-2" v-if="task.dueDate"><CalendarIcon class="size-6 text-gray-500" /><p class="text-gray-600" :class="{ 'text-red-600': isExpired, 'font-medium': isExpired }">{{ formattedDate }}</p></div>
    </div>
    <div class="basis-16">
      <StatusSelect :status="task.status" @change-status="changeStatus"/>
    </div>
    <div class="basis-10">
      <Button variant="outline" size="icon" @click="editTask">
        <EditIcon class="size-6 text-gray-500 hover:text-blue-500" />
      </Button>
    </div>
    <div class="basis-14 h-full">
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" size="icon" @click="askBeforeDelete">
            <TrashIcon class="size-6 text-gray-500 hover:text-red-500" />
          </Button>
        </PopoverTrigger>
      <PopoverContent class="w-80 flex flex-col items-end" default-open v-if="isAskingBeforeDelete">
        <p class="self-start">The task will be removed from the list</p>
        <Button variant="destructive" class="mt-2" @click="deleteTask">Confirm</Button>
      </PopoverContent>
    </Popover>
    </div>
    <Dialog default-open v-if="Boolean(taskBeingEdited)" v-on:update:open="closeTaskEdition">
      <DialogContent>
        <TaskForm :task="taskBeingEdited" @submit-task="submitTaskEdition" />
      </DialogContent>
    </Dialog>
  </Card>
</template>

<style lang="css" scoped>
@keyframes display {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.card-animation {
  animation: display 300ms ease-out;
}
</style>