<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { isEmpty } from "ramda";
import { useForm } from "vee-validate";
import { computed } from "vue";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import AuthenticationFormWrapper from "./AuthenticationFormWrapper.vue";

const formSchema = toTypedSchema(
	z
		.object({
			email: z.string().email("Enter a valid email"),
			password: z.string().min(1, "Required"),
			confirmPassword: z.string().min(1, "Required"),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ["confirmPassword"],
		}),
);

const { handleSubmit, errors, isFieldTouched, isSubmitting } = useForm({
	validationSchema: formSchema,
	validateOnMount: true,
	initialValues: {
		email: "",
		password: "",
		confirmPassword: "",
	},
});

const submit = handleSubmit((values) => {});

const isSubmitButtonDisabled = computed(() => {
	return isSubmitting.value || !isEmpty(errors.value);
});
</script>

<template>
  <AuthenticationFormWrapper>
    <template v-slot="{ isFieldTouched }">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="w-full">
          <label for="email" class="text-sm font-medium leading-none">Email</label>
          <FormControl v-auto-animate>
            <Input required data-testid="email" type="text" placeholder="user@example.com" v-bind="componentField" />
          </FormControl>
          <FormMessage v-if="isFieldTouched('email')"/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="w-full">
          <label for="password" class="text-sm font-medium leading-none">Password</label>
          <FormControl v-auto-animate>
            <Input required data-testid="password" type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage v-if="isFieldTouched('password')"/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem class="w-full">
          <label for="confirmPassword" class="text-sm font-medium leading-none">Confirm password</label>
          <FormControl v-auto-animate>
            <Input required data-testid="confirmPassword" type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage v-if="isFieldTouched('confirmPassword')"/>
        </FormItem>
      </FormField>
    </template>
  </AuthenticationFormWrapper>
</template>