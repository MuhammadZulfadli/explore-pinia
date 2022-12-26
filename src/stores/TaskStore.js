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
});
