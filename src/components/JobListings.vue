<script setup>
import { defineProps, onMounted, reactive } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import JobListing from "@/components/JobListing.vue";

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  jobs: [],
  isLoading: true,
});

const getJobs = async () => {
  try {
    const data = await axios.get("/api/jobs");
    state.jobs = data.data;
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
};

onMounted(async () => {
  getJobs();
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs..
      </h2>

      <!-- Show Loading Spinner -->
      <PulseLoader
        v-if="state.isLoading"
        class="text-center text-gray-500 py-6"
      />

      <div v-else class="grid grid-cols-1 gap-6">
        <JobListing
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>

      <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink
          to="/jobs"
          class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Jobs
        </RouterLink>
      </section>
    </div>
  </section>
</template>
