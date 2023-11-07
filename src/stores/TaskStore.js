/**
 * Store
 */

import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  /**
   *Getters
   */
  getters: {
    /**
     *
     * @returns Get data when key isfav is true
     */
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },

    /**
     * @returns Get data when key isFinished is true
     */
    finished() {
      return this.tasks.filter((a) => a.isFinished);
    },

    /**
     *
     * @returns count data when tasks isFav is true
     */
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },

    /**
     *
     * @returns count data when tasks isFinished is true
     */
    finishedCount() {
      return this.tasks.reduce((a, b) => {
        return b.isFinished ? a + 1 : a;
      }, 0);
    },

    /**
     *
     * @returns Get total data in state
     */
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
  /**
   * Actions
   */
  actions: {
    async getTasks() {
      this.loading = true;
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const data = await response.json();
        this.tasks = data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async addTask(task) {
      this.tasks.push(task);

      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (response.error) {
        console.log(response.error);
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });

      const response = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE",
      });
      if (response.error) {
        console.log(response.error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id == id);
      task.isFav = !task.isFav;

      const response = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.error) {
        console.log(response.error);
      }
    },
    async toggleFinished(id) {
      const task = this.tasks.find((a) => a.id == id);
      task.isFinished = !task.isFinished;
      const response = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFinished: task.isFinished }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.error) {
        console.log(response.error);
      }
    },
  },
});
