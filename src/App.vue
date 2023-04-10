<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/img/pinit-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do.</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} tasks in your favs list.</p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import TaskDetails from './components/TaskDetails.vue';
import TaskForm from './components/TaskForm.vue';

import { useTasksStore } from './store/TaskStore';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

export default {
  components: { TaskDetails, TaskForm },

  setup() {
    const taskStore = useTasksStore();

    const { tasks, favs, totalCount, favCount } = storeToRefs(taskStore);

    const filter = ref('all');

    return { taskStore, filter, totalCount, favCount, tasks, favs };
  },
};
</script>

<style></style>
