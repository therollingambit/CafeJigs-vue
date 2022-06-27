<template>
  <div class="flex items-center justify-center p-12 text-gray-600">
    <div class="mx-auto w-full max-w-[450px]">
      <form @submit.prevent="handleSubmit">
        <div class="mb-5 flex items-center justify-center text-xl">
          <h3 class="border-b-4">Login</h3>
        </div>
        <div class="mb-5">
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-8">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="error" v-if="error">
          {{ error }}
        </div>
        <button
          v-if="!isPending"
          class="hover:shadow-form rounded-md bg-[#430B05] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Login
        </button>
        <button
          v-if="isPending"
          disabled
          class="rounded-md bg-[#430B05] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Loading
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { error, login, isPending } = useLogin();
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  await login(email.value, password.value);
  if (!error.value) {
    console.log("I 🤍 Nisa Syakila");
    router.push({ name: "UserCafes" });
    // console.log(res);
  }
};
</script>

<style scoped></style>
