<template>
  <div class="card-main">
    <div v-if="isLoad">загрузка</div>
    <CardMovie v-for="card in props.cards" :key="card.imdbID" :card="card" />
    <div v-if="errorFind">фильм не найден</div>
  </div>
</template>

<script setup lang="ts">
import type { IMovieShortInfo } from 'src/entities/Movie';

// Components
import CardMovie from 'src/components/CardMovie.vue';

// Data
const props = defineProps<{
  isLoad: boolean;
  cards: Array<IMovieShortInfo>;
  errorFind: boolean;
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
