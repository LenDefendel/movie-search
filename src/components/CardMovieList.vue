<template>
  <div class="card-main">
    <CardMovie v-for="card in props.cards" :key="card.imdbID" :card="card" />
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
.card-main {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-template-rows: repeat(auto-fill, 480px);
  justify-content: center;
  column-gap: 60px;
  row-gap: 60px;
  margin: 50px;
  flex-wrap: wrap;
  max-width: 100%;
  max-height: 100%;
}
</style>
