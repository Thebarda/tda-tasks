<script setup lang="ts">
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import AuthenticationFormWrapper from "./AuthenticationFormWrapper.vue";
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
    </template>
  </AuthenticationFormWrapper>
</template>