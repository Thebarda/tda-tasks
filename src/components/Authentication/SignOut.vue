<script setup lang="ts">
import router from "@/router";
import { useAuthenticatedUser } from "@/stores/user";
import { supabase } from "@/supabase";
import { Button } from "../ui/button";

const { changeEmail } = useAuthenticatedUser();

const signOut = async (): Promise<void> => {
	await supabase.auth.signOut();
	router.push("/");
	changeEmail(null);
};
</script>

<template>
  <Button @click="signOut" variant="outline" class="bg-transparent text-white">Sign out</Button>
</template>