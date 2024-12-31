<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section
    class="text-center flex flex-col justify-center items-center h-96 flex gap-4 p-6"
  >
    <i class="pi pi-exclamation-triangle text-amber-300 text-4xl mb-5"> </i>
    <h1 class="text-4xl font-bold">Page Not Found...</h1>
    <RouterLink
      class="bg-green-500 px-4 py-2 rounded-md overflow-hidden text-white hover:bg-green-600"
      to="/"
    >
      Go back to Home
    </RouterLink>
  </section>
</template>
