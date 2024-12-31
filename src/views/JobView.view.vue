<script setup>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";

import BackButtonAtom from "@/components/atoms/BackButton.atom.vue";

import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const jobId = route.params.id;

console.log(jobId, "jobId");

const state = reactive({
  job: {},
  isLoading: true,
});

const getJob = async () => {
  try {
    const data = await axios.get(`/api/jobs/${jobId}`);
    state.job = data.data;
  } catch (error) {
    console.error("Error Fetching Job", error);
  } finally {
    state.isLoading = false;
  }
};

async function deleteJob() {
  try {
    const confirm = window.confirm("Are you sure you want to delete this job?");

    if (!confirm) return;

    await axios.delete(`/api/jobs/${jobId}`);
    toast.success("Successfully Deleted a job!");
    router.push("/jobs");
  } catch (error) {
    toast.error(`We couldn't delete the job. Please try again later.`);
    console.log(`Error while deleting a job:`, error);
  }
}

onMounted(async () => {
  getJob(jobId);
});
</script>

<template>
  <BackButtonAtom />
  <section v-if="!state.isLoading" class="bg-green-50">
    <section v-if="true" class="bg-green-50">
      <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
              <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
              <div
                class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
                <p class="text-orange-700">{{ state.job.location }}</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-green-800 text-lg font-bold mb-6">
                Job Description
              </h3>

              <p class="mb-4">
                {{ state.job.description }}
              </p>

              <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

              <p class="mb-4">{{ state.job.salary }} / Year</p>
            </div>
          </main>

          <!-- Sidebar -->
          <aside>
            <!-- Company Info -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-6">Company Info</h3>

              <h2 class="text-2xl">{{ state.job.company.name }}</h2>

              <p class="my-2">
                {{ state.job.company.description }}
              </p>

              <hr class="my-4" />

              <h3 class="text-xl">Contact Email:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">
                {{ state.job.company.contactEmail }}
              </p>

              <h3 class="text-xl">Contact Phone:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">
                {{ state.job.company.contactPhone }}
              </p>
            </div>

            <!-- Manage -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-xl font-bold mb-6">Manage Job</h3>
              <RouterLink
                :to="`/jobs/edit/${state.job.id}`"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Job</RouterLink
              >
              <button
                @click="deleteJob"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Job
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </section>

  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>
