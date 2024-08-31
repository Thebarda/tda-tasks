<script setup lang="ts">
import { Status } from "@/models/models";
import { equals } from "ramda";
import { computed, ref, watch } from "vue";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface Props {
	status?: Status;
}

const statusOptions = [
	{ id: Status.ToDo, label: "To do" },
	{ id: Status.InProgress, label: "In progress" },
	{ id: Status.Completed, label: "Completed" },
];

const props = withDefaults(defineProps<Props>(), { status: Status.ToDo });
const emit = defineEmits<(e: "changeStatus", newStatus: Status) => void>();

const status = ref(props.status);

const isCompleted = computed(() => equals(status.value, Status.Completed));

watch(status, () => emit("changeStatus", status.value));
</script>
<template>
  <Select v-model="status">
    <SelectTrigger class="w-[150px]" :class="{ 'bg-green-500': isCompleted }" data-testid="Status select">
      <SelectValue placeholder="Select a status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="status in statusOptions" :value="status.id" :data-testid="status.id">
        {{ status.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>