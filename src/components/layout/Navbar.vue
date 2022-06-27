<template>
  <header class="bg-cyan-900">
    <nav class="md:flex p-7 justify-between items-center text-gray-100">
      <h1>
        <router-link
          class="logo font-mono text-2xl md:text-3xl"
          :to="{ name: 'Home' }"
        >
          Cafe<span class="text-zinc-400">Jigs</span>
        </router-link>
      </h1>

      <ul class="md:flex text-center md:visible">
        <li v-if="user" class="md:px-4 pt-8 md:pt-0 cursor-pointer text-xl">
          <router-link
            class="hover:text-gray-200 duration-300 text-[#FEBF66]"
            :to="{ name: 'Home' }"
          >
            Home
          </router-link>
        </li>
        <li v-if="user" class="md:px-4 pt-8 md:pt-0 cursor-pointer text-xl">
          <router-link
            class="hover:text-gray-200 duration-300 text-[#FEBF66]"
            :to="{ name: 'UserCafes' }"
          >
            My Cafes
          </router-link>
        </li>
        <li v-if="user" class="pt-8 md:pt-1 font-mono text-sm md:px-4">
          Hi there 👋🏼,
          <span class="text-[#C2C8C5]">{{ user.displayName }}</span>
        </li>
        <li class="md:px-5 pt-8 md:pt-0 cursor-pointer">
          <button
            v-if="user"
            @click="handleClick"
            class="md:px-5 px-3 py-2 md:py-0 cursor-pointer text-xl rounded-lg bg-[#FEBF66] hover:bg-[#d0841b] text-[#01353F] outline-none"
          >
            Logout
          </button>
        </li>

        <li v-if="!user" class="md:px-5 pt-8 md:pt-0 cursor-pointer text-xl">
          <router-link
            class="hover:text-gray-200 duration-300 text-[#FEBF66]"
            :to="{ name: 'Signup' }"
          >
            Signup
          </router-link>
        </li>
        <li v-if="!user" class="md:px-5 pt-8 md:pt-0 cursor-pointer text-xl">
          <router-link
            class="hover:text-gray-200 duration-300 text-[#FEBF66]"
            :to="{ name: 'Login' }"
          >
            Login
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import useLogout from "../../composables/useLogout";
import getUser from "../../composables/getUser";
import { useRouter } from "vue-router";

const { user } = getUser();
const { logout } = useLogout();
const router = useRouter();

const handleClick = async () => {
  await logout();
  console.log("user logged out");
  router.replace({ name: "Login" });
};
</script>
