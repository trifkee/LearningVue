<script setup>
import Hero from "@/components/atoms/Hero.atom.vue";
import HomeCards from "@/components/organism/HomeCards.organism.vue";
import JobListings from "@/components/organism/JobListings.organism.vue";
</script>

<template>
  <Hero title="Find Perfect Job!" />
  <HomeCards />
  <JobListings :limit="3" :showButton="true" />
</template>
