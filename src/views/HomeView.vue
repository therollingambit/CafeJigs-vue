<template>
  <div>
    <div v-if="error" class="error">Could not fetch data</div>
    <div v-if="documents">
      <section class="container px-5 py-5 mx-auto">
        <div class="flex flex-col justify-center items-center">
          <label for="country" class="mt-2 mb-3 text-lg text-zinc-500">
            Filter cafes by location:
          </label>
          <select
            id="location"
            v-model="location"
            class="rounded-md w-40 border border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          >
            <option value="all">All</option>
            <option value="Singapore">Singapore</option>
            <option value="Johor Bahru">Johor Bahru</option>
          </select>
        </div>
      </section>

      <CafesList v-if="!location" :cafes="documents" />
      <CafesList v-else :cafes="filteredCafes" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CafesList from "../components/cafes/CafesList.vue";
import getCollection from "../composables/getCollection";

const location = ref("");

const { error, documents } = getCollection("cafes");

const filteredCafes = computed(() => {
  if (location.value === "all") {
    return documents.value;
  }
  return documents.value.filter((doc) => doc.location === location.value);
});
</script>

<style scoped></style>
