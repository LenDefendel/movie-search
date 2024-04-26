<template>
  <div>
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

<style scoped></style>
