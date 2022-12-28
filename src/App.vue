<template>
  <main>
    <!-- Heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- New Task Form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <div class="loading" v-if="loading">Loading...</div>

    <!-- Filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Taks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>

    <!-- Task Lists -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks" :key="task">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} fav left to do</p>
      <div v-for="task in favs" :key="task">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="reset">
      <button @click="taskStore.$reset">Reset State</button>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";
import { storeToRefs } from "pinia";
export default {
  components: {
    TaskDetails,
    TaskForm,
  },
  setup() {
    /**
     * State in store
     */
    const taskStore = useTaskStore();
    const filter = ref("all");

    const { tasks, loading, favs, totalCount, favCount } =
      storeToRefs(taskStore);

    /**
     * Fetch
     */
    taskStore.getTasks();

    return { taskStore, filter, tasks, loading, favs, totalCount, favCount };
  },
};
</script>
