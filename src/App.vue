<template>
  <main>
    <!-- Heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- Task Lists -->
    <div class="task-list">
      <div v-for="task in taskStore.tasks" :key="task">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import TaskDetails from "./components/TaskDetails.vue";
import { useTaskStore } from "./stores/TaskStore";
export default {
  components: {
    TaskDetails,
  },
  setup() {
    /**
     * State in store
     */
    const taskStore = useTaskStore();

    return { taskStore };
  },
};
</script>
