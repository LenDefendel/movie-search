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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 45px;
  /* border: 2px solid var(--black); */
  width: 300px;
  height: 500px;
}

.title {
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 16px;
}

.movie-img {
  width: 280px;
  height: 420px;
}

.year {
  font-size: 18px;
}
</style>
