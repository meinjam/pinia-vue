<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="newTask" />
    <button>Add</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useTasksStore } from '../store/TaskStore';

export default {
  setup() {
    const taskStore = useTasksStore();

    const newTask = ref('');

    const handleSubmit = () => {
      if (!newTask.value.length) {
        alert('Please add task!');
        return;
      }

      const postTask = {
        title: newTask.value,
        isFav: false,
        id: Math.floor(Math.random() * 1000000),
      };

      taskStore.addTask(postTask);
      newTask.value = '';
    };

    return { handleSubmit, newTask };
  },
};
</script>

<style></style>
