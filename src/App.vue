<template>
  <div class="flex h-[100vh]">
    <Sidebar />
    <div class="w-full overflow-y-auto">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
</script>

<style scoped>

</style>
