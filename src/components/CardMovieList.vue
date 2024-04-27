<template>
  <div class="card-main-container">
    <div class="card-main">
      <CardMovie v-for="card in props.cards" :key="card.imdbID" :card="card" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMovieShortInfo } from 'src/entities/Movie';

// Components
import CardMovie from 'src/components/CardMovie.vue';

// Data
const props = defineProps<{
  cards: Array<IMovieShortInfo>;
}>();
//
</script>

<style scoped>
.card-main-container {
  display: flex;
  justify-content: center;
  /* flex-wrap: wrap; */
}
.card-main {
  /* gap: 30px calc(10rem - 10px); */
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  max-width: 100%;
  max-height: 100%;
}
</style>
