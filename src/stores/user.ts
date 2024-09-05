import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthenticatedUser = defineStore("authenticatedUser", () => {
	const authenticatedEmail = ref<string | null | undefined>(null);

	const changeEmail = (email: string | null | undefined): void => {
		authenticatedEmail.value = email;
	};

	return {
		authenticatedEmail,
		changeEmail,
	};
});
