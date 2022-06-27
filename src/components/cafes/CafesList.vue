<template>
  <div>
    <section class="overflow-hidden text-gray-700">
      <div class="container px-5 py-5 mx-auto lg:pt-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="flex col-span-1 flex-col shadow-lg shadow-gray-400 rounded-xl"
            v-for="cafe in props.cafes"
            :key="cafe.id"
          >
            <div
              class="h-full rounded-xl border dark:bg-[#01353F] hover:scale-105 transition-all duration-100 ease-in-out"
            >
              <router-link
                :to="{ name: 'CafeDetail', params: { id: cafe.id } }"
              >
                <img class="rounded-t-lg" :src="cafe.coverUrl" />

                <div class="p-5">
                  <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    {{ cafe.title }}
                  </h5>

                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {{ cafe.description }}
                  </p>
                  <span
                    class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white focus:ring-4 focus:outline-none dark:bg-[#430B05] dark:hover:bg-[#D46F4D] dark:focus:ring-gray-800"
                  >
                    View details
                    <svg
                      class="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// import BaseCard from "../base/BaseCard.vue";

const props = defineProps(["cafes"]);
</script>
