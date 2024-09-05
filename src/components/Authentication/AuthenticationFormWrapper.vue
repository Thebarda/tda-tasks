<script setup lang="ts">
import router from "@/router";
import { useAuthenticatedUser } from "@/stores/user";
import { supabase } from "@/supabase";
import { toTypedSchema } from "@vee-validate/zod";
import { isEmpty } from "ramda";
import { useForm } from "vee-validate";
import { computed, ref } from "vue";
import { z } from "zod";
import { Button } from "../ui/button";

interface Props {
	isSignUp?: boolean;
}

const props = defineProps<Props>();

const authenticationError = ref<string | null>(null);

const { changeEmail } = useAuthenticatedUser();

const formSchema = toTypedSchema(
	props.isSignUp
		? z
				.object({
					email: z.string().email("Enter a valid email"),
					password: z.string().min(6, "6 characters minimum"),
					confirmPassword: z.string().min(6, "6 characters minimum"),
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
	initialValues: props.isSignUp
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

const submit = handleSubmit(async (values) => {
	try {
		if (props.isSignUp) {
			const { data, error } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
			});

			if (error) {
				throw error;
			}

			changeEmail(data.user?.email);
			router.push("/tasks");

			return;
		}
		const { data, error } = await supabase.auth.signInWithPassword({
			email: values.email,
			password: values.password,
		});

		if (error) {
			throw error;
		}

		changeEmail(data.user?.email);
		router.push("/tasks");
	} catch (error) {
		if (error instanceof Error) {
			authenticationError.value = error.message;
		}
	}
});

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
			<p v-show="authenticationError" class="text-red-500">{{ authenticationError }}</p>
    </form>
  </div>
</template>