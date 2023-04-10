import { defineStore } from 'pinia';

export const useTasksStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      { id: 1, title: 'buy some milk', isFav: false },
      { id: 2, title: 'play Gloomhaven', isFav: true },
    ],
    posts: null,
    isLoading: false,
  }),

  getters: {
    favs: (state) => state.tasks.filter((t) => t.isFav),
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount: (state) => state.tasks.length,
  },

  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;
    },
    async fetchTasks() {
      this.isLoading = true;
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      this.posts = data;
      this.isLoading = false;
    },
  },
});
