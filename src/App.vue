<script setup>
import Navbar from "@/components/organism/Navbar.organism.vue";
import { RouterView } from "vue-router";

// Prime Icons
import "primeicons/primeicons.css";
</script>

<template>
  <Navbar />
  <RouterView />
</template>
