<template>
  <div v-if="error" class="error">
    {{ error }}
  </div>

  <div v-if="cafe" class="container mx-auto md:py-48">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="flex justify-center items-center p-4 md:p-0 rounded-xl">
        <img
          :src="cafe.coverUrl"
          class="rounded-xl mt-4 md:mt-0 h-full object-cover shadow-lg shadow-gray-500"
        />
      </div>
      <div
        class="grid grid-cols-1 p-6 text-l bg-gray-100 border-2 border-gray-200 rounded-xl"
      >
        <div>
          <h2 class="text-2xl md:text-3xl font-bold">{{ cafe.title }}</h2>
          <p class="mb-2">
            <star-rating
              v-model:rating="cafe.rating"
              read-only
              star-size="20"
              text-class="mt-2"
            ></star-rating>
          </p>
          <p class="text-gray-500">📍 {{ cafe.location }}</p>
          <p class="text-gray-500">Created by: {{ cafe.userName }}</p>
          <p class="mt-3 text-lg text-gray-400">Description:</p>
          <p class="text-lg">{{ cafe.description }}</p>
        </div>
        <div class="mt-16">
          <button
            v-if="ownership"
            @click="handleDelete"
            class="rounded-md bg-[#430B05] hover:bg-[#702737] py-2 px-6 text-base font-semibold text-white outline-none"
          >
            Delete cafe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import StarRating from "vue-star-rating";
import getDocument from "../../composables/getDocument";
import getUser from "../../composables/getUser";
import useDocument from "../../composables/useDocument";
import useStorage from "../../composables/useStorage";

const props = defineProps(["id"]);
const router = useRouter();

const { error, document: cafe } = getDocument("cafes", props.id);
const { user } = getUser();
const { deleteDoc } = useDocument("cafes", props.id);
const { deleteImage } = useStorage();

const ownership = computed(() => {
  return cafe.value && user.value && user.value.uid === cafe.value.userId;
});

const handleDelete = async () => {
  await deleteImage(cafe.value.filePath);
  await deleteDoc();
  router.push({ name: "Home" });
};
</script>

<style scoped></style>
