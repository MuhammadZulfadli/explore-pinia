<template>
  <main>
    <!-- Heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- Filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Taks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>

    <!-- Task Lists -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" :key="task">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} fav left to do</p>
      <div v-for="task in taskStore.favs" :key="task">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
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
    const filter = ref("all");

    return { taskStore, filter };
  },
};
</script>
