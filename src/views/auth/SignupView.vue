<template>
  <div class="flex items-center justify-center p-12 text-gray-600">
    <div class="mx-auto w-full max-w-[450px]">
      <form @submit.prevent="handleSubmit">
        <div class="mb-5 flex items-center justify-center text-xl">
          <h3 class="border-b-4">Sign up</h3>
        </div>

        <div class="mb-5">
          <input
            type="text"
            placeholder="Display name"
            v-model="displayName"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
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
          class="rounded-md bg-[#430B05] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Sign up
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
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import useSignup from "../../composables/useSignup";

const router = useRouter();
const { error, signup, isPending } = useSignup();

const email = ref("");
const password = ref("");
const displayName = ref("");

const displayNameLower = computed(() => {
  return displayName.value.toLowerCase();
});

const handleSubmit = async () => {
  const res = await signup(email.value, password.value, displayNameLower.value);

  if (!error.value) {
    router.push({ name: "UserCafes" });
    console.log(res);
  }
};
</script>

<style scoped></style>
