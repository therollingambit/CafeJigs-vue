<template>
  <div class="user-playlists">
    <div class="mt-9 flex items-center justify-center text-2xl">
      <h2 class="border-b-4">My Cafes</h2>
    </div>
    <div class="mt-5 mb-3 md:mb-0 flex items-center justify-center text-l">
      <router-link
        :to="{ name: 'CreateCafe' }"
        class="rounded-md bg-[#430B05] py-2 px-8 text-base font-semibold text-white outline-none"
      >
        Add a Cafe
      </router-link>
    </div>
    <div v-if="cafes">
      <CafesList :cafes="cafes" />
    </div>
  </div>
</template>

<script setup>
import CafesList from "../../components/cafes/CafesList.vue";
import getCollection from "../../composables/getCollection";
import getUser from "../../composables/getUser";

const { user } = getUser();

const { documents: cafes } = getCollection("cafes", [
  "userId",
  "==",
  user.value.uid,
]);

console.log(cafes);
</script>

<style scoped></style>
