<script>
export default {
  data() {
    return {
      name: "TEST TEST TEST",
      status: true,
      tasks: ["task1", "task2", "task3"],
      link: "http://google.com",
    };
  },
  methods: {
    testMethod() {
      alert("Test Method");
      this.status = !this.statusv;
    },
  },
};
</script>

<template>
  <h1>Test Vue JS: {{ name }}</h1>
  <p v-if="status">User is Active</p>
  <p v-else>User is Inactive</p>

  <h3>TASKS:</h3>
  <ul>
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>

  <a v-bind:href="link">Google...</a>
  <a :href="link">Google...</a>

  <button v-on:click="testMethod"></button>
</template>

<!--  -->

<script setup>
import { ref, onMounted } from "vue";

const name = ref("John Doe");
const status = ref(true);
const tasks = ref(["Task 1", "Task 2", "Task 3"]);
const newTask = ref("");

const toggleStatus = () => {
  status.value = !status.value;
};

const addTask = () => {
  if (newTask.value.trim() !== "") {
    tasks.value.push(newTask.value);
    newTask.value = "";
  }
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

onMounted(async () => {
  console.log("Component Mounted");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await res.json();

    tasks.value = data.map((task) => task.title);
  } catch (error) {
    console.error("Error while fetching tasks! //", error);
  }
});
</script>

<template>
  <h1>Test Vue JS: {{ name }}</h1>
  <p v-if="status">User is Active</p>
  <p v-else>User is Inactive</p>

  <form @submit.prevent="addTask">
    <label for="newTask">Add Task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask" />
    <button>Submit</button>
  </form>

  <h3>TASKS:</h3>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>{{ task }}</span> <button @click="deleteTask(index)">X</button>
    </li>
  </ul>

  <a v-bind:href="link">Google...</a>
  <a :href="link">Google...</a>

  <button v-on:click="toggleStatus">Change Status</button>
</template>
