<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { isEmpty } from "ramda";
import { useForm } from "vee-validate";
import { computed } from "vue";
import { z } from "zod";
import { Button } from "../ui/button";

interface Props {
	isSignUp?: boolean;
}

const { isSignUp } = defineProps<Props>();

const formSchema = toTypedSchema(
	isSignUp
		? z
				.object({
					email: z.string().email("Enter a valid email"),
					password: z.string().min(1, "Required"),
					confirmPassword: z.string().min(1, "Required"),
				})
				.refine((data) => data.password === data.confirmPassword, {
					message: "Passwords don't match",
					path: ["confirmPassword"],
				})
		: z.object({
				email: z.string().email("Enter a valid email"),
				password: z.string().min(1, "Required"),
			}),
);

const { handleSubmit, errors, isFieldTouched, isSubmitting } = useForm({
	validationSchema: formSchema,
	validateOnMount: true,
	initialValues: isSignUp
		? {
				email: "",
				password: "",
				confirmPassword: "",
			}
		: {
				email: "",
				password: "",
			},
});

const submit = handleSubmit((values) => {});

const isSubmitButtonDisabled = computed(() => {
	return isSubmitting.value || !isEmpty(errors.value);
});
</script>

<template>
  <div class="flex justify-center w-full">
    <form class="flex flex-col gap-2 items-center w-64" @submit="submit">
      <slot :isFieldTouched="isFieldTouched" />
      <Button type="submit" class="mt-1 self-end" :disabled="isSubmitButtonDisabled">
        <span v-show="isSignUp">Sign up</span>
        <span v-show="!isSignUp">Sign in</span>
      </Button>
    </form>
  </div>
</template>