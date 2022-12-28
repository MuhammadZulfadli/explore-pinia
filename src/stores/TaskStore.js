/**
 * Store
 */

import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: "Buy some egg",
        isFav: false,
      },
      {
        id: 2,
        title: "Buy some Keyboard",
        isFav: true,
      },
    ],
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
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });
    },
    toggleFav(id) {
      const task = this.tasks.find((t) => t.id == id);
      task.isFav = !task.isFav;
    },
  },
});
