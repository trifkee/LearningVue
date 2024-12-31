import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.view.vue";
import Jobs from "@/views/Jobs.view.vue";
import SingleJob from "@/views/JobView.view.vue";
import NotFound from "@/views/NotFound.view.vue";
import AddJob from "@/views/AddJob.view.vue";
import EditJob from "@/views/EditJob.view.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home page",
      component: Home,
    },
    {
      path: "/jobs",
      name: "jobs page",
      component: Jobs,
    },
    {
      path: "/jobs/:id",
      name: "job-details",
      component: SingleJob,
    },
    {
      path: "/jobs/edit/:id",
      name: "edit-job",
      component: EditJob,
    },
    {
      path: "/jobs/add",
      name: "add-job",
      component: AddJob,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export default router;
