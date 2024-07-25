<template>
  <RouterLink
    :to="link"
    active-class="bg-white"
    class="p-2.5 rounded-tl-full rounded-bl-full flex gap-2.5 items-center "
    v-slot="{ isActive }"
  >
    <div
      :class="[
        'rounded-full w-[30px] h-[30px]',
        isActive ? 'bg-[#f1f1f1]' : 'bg-[#fff]',
      ]"
    ></div>
    <div>{{ name }}</div>
  </RouterLink>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
export default {
  props: ['name', 'link'],
};
</script>

<style scoped></style>
