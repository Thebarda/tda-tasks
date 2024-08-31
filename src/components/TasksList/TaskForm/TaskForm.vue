<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { Task } from "@/models/models";
import {
	DateFormatter,
	type DateValue,
	getLocalTimeZone,
	parseDate,
	today,
} from "@internationalized/date";
import { Button } from "@shad/button";
import { Calendar } from "@shad/calendar";
import { DialogClose } from "@shad/dialog";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@shad/form";
import { Input } from "@shad/input";
import { Popover, PopoverContent, PopoverTrigger } from "@shad/popover";
import { toTypedSchema } from "@vee-validate/zod";
import dayjs from "dayjs";
import { toDate } from "radix-vue/date";
import { isEmpty, omit } from "ramda";
import { useForm } from "vee-validate";
import { computed } from "vue";
import * as z from "zod";
import { CalendarIcon } from "../../Icons";

interface Props {
	task: Task | null;
	dialogClose?: boolean;
}

const props = defineProps<Props>();

const emit =
	defineEmits<(e: "submitTask", task: Omit<Task, "id"> | Task) => void>();

const df = new DateFormatter("en-US", {
	dateStyle: "long",
});

const formSchema = toTypedSchema(
	z.object({
		title: z.string().min(3, "Enter a valid title"),
		description: z.string().optional(),
		dueDate: z.string().optional(),
	}),
);

const {
	handleSubmit,
	values,
	setFieldValue,
	errors,
	isFieldTouched,
	isSubmitting,
} = useForm({
	validationSchema: formSchema,
	validateOnMount: true,
	initialValues: {
		title: props.task?.title,
		dueDate: props.task?.dueDate
			? dayjs(props.task?.dueDate).format("YYYY-MM-DD")
			: undefined,
		description: props.task?.description,
	},
});

const submit = handleSubmit((values) => {
	const formattedDueDate = values.dueDate
		? { dueDate: dayjs(values.dueDate).valueOf() }
		: {};

	emit("submitTask", { ...omit(["dueDate"], values), ...formattedDueDate });
});

const value = computed({
	get: () => (values.dueDate ? parseDate(values.dueDate) : undefined),
	set: (val) => val,
});

const isSubmitButtonDisabled = computed(() => {
	return isSubmitting.value || !isEmpty(errors.value);
});
</script>

<template>
  <form @submit="submit" class="flex flex-col gap-2">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <label for="title" class="text-sm font-medium leading-none">Title</label>
        <FormControl v-auto-animate>
          <Input required data-testid="title" type="text" placeholder="My task" v-bind="componentField" />
        </FormControl>
        <FormMessage v-if="isFieldTouched('title')"/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel for="description">Description</FormLabel>
        <FormControl>
          <Input type="text" data-testid="description" placeholder="Description" v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField name="dueDate">
      <FormItem class="flex flex-col gap-1 mt-1">
        <FormLabel for="dueDate">Due date</FormLabel>
        <FormControl>
          <Popover>
            <PopoverTrigger as-child>
              <FormControl>
                <Button
                  variant="outline" :class="cn(
                    'w-[160px] ps-3 text-start font-normal',
                    !value && 'text-muted-foreground',
                  )"
                >
                  <span>{{ value ? df.format(toDate(value)) : "Pick a date" }}</span>
                  <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                </Button>
                <input hidden>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar
                v-model="value"
                calendar-label="Due date"
                :min-value="today(getLocalTimeZone())"
                @update:model-value="(v: DateValue | undefined) => {
                  if (v) {
                    setFieldValue('dueDate', v.toString());
                    return;
                  }
                    setFieldValue('dueDate', undefined)
                }"
              />
            </PopoverContent>
          </Popover>
        </FormControl>
      </FormItem>
    </FormField>
    <DialogClose as-child v-if="dialogClose">
      <Button type="submit" class="mt-1 self-end" :disabled="isSubmitButtonDisabled">
        Save
      </Button>
    </DialogClose>
    <Button v-else type="submit" class="mt-1 self-end" :disabled="isSubmitButtonDisabled">
      Save
    </Button>
  </form>
</template>