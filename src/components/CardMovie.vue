<template>
  <div class="card">
    <span>{{ props.card.Title }}</span>
    <img :src="props.card.Poster" alt="" />
  </div>
</template>

<script setup lang="ts">
import type { IMovieShortInfo } from 'src/entities/Movie';

const props = defineProps<{
  card: IMovieShortInfo;
}>();
</script>

<style scoped>
.card {
  margin: 20px;
  border: 2px solid var(--black);
  width: 150px;
  height: 250px;
}
</style>
