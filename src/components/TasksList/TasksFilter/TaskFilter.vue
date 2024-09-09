<script setup lang="ts">
import { Status, type StatusSelectEntry } from "@/models/models";
import { Button } from "@shad/button";
import { Input } from "@shad/input";
import { append, equals, find, findIndex, gt, pluck, remove } from "ramda";
import { ref, watch } from "vue";

const emit = defineEmits<{
	(e: "updateSearch", newSearch: string): void;
	(e: "updateStatusFilter", status: Array<Status>): void;
}>();

const input = ref("");
const selectedStatus = ref<Array<StatusSelectEntry>>([]);
const timeout = ref<NodeJS.Timeout | null>(null);

const statusOptions = [
	{ id: Status.ToDo, label: "To do" },
	{ id: Status.InProgress, label: "In progress" },
	{ id: Status.Completed, label: "Completed" },
];

const emitStatusUpdate = (): void => {
	emit("updateStatusFilter", pluck("id", selectedStatus.value));
};

const toggleStatus = (status: Status) => {
	const isSelectedIndex = findIndex(
		({ id }) => equals(id, status),
		selectedStatus.value,
	);

	if (gt(isSelectedIndex, -1)) {
		selectedStatus.value = remove(isSelectedIndex, 1, selectedStatus.value);
		emitStatusUpdate();
		return;
	}

	selectedStatus.value = append(
		find(({ id }) => equals(id, status), statusOptions) as StatusSelectEntry,
		selectedStatus.value,
	);
	emitStatusUpdate();
};

const isSelected = (status: Status): boolean =>
	selectedStatus.value.some(({ id }) => equals(id, status));

watch(input, () => {
	if (timeout.value) {
		clearTimeout(timeout.value);
	}
	setTimeout(() => {
		emit("updateSearch", input.value);
	}, 500);
});
</script>

<template>
  <div class="flex flex-row gap-1">
		<div class="relative w-52 max-w-sm items-center">
			<Input type="text" class="pl-10" v-model="input" placeholder="Search" data-testid="search"/>
			<span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
				<Search class="size-6 text-muted-foreground" />
			</span>
		</div>
    <div class="border-l-2" />
    <div class="flex flex-row gap-1">
      <Button v-for="status in statusOptions" variant="outline" @click="toggleStatus(status.id)" :class="{ 'bg-border': isSelected(status.id) }">
        {{ status.label }}
      </Button>
    </div>
  </div>
</template>