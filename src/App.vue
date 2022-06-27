<template>
  <Navbar />
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <div :key="route.name">
        <component :is="slotProps.Component"></component>
      </div>
    </transition>
  </router-view>
</template>

<script setup>
import { useRoute } from "vue-router";
import Navbar from "./components/layout/Navbar.vue";
const route = useRoute();
</script>

<style>
.route-enter-from {
  /* start from */
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  /* leaving */
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
