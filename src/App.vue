<template>
  <HeaderComponent />
  <main class="py-4">
    <router-view />
  </main>
</template>

<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<style>
</style>