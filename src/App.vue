<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header class="bg-red-800 rounded-b-lg w-full mb-4 flex flex-row justify-between items-center h-16 px-4">
    <RouterLink to="/" class="text-white text-lg">TDA-tasks</RouterLink>
    <div class="flex flex-row gap-4 items-center">
      <RouterLink to="/signin" class="text-white">Sign in</RouterLink>
      <RouterLink to="/signup" class="text-white border-white border-[1px] rounded-md p-2">Sign up</RouterLink>
    </div>
  </header>
  <RouterView />
</template>
