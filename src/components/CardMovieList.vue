<template>
  <div>
    <div v-if="isLoad">
      <q-inner-loading
        class="loading"
        :showing="isLoad"
        label="Please wait..."
        label-style="font-size: 2em"
      />
    </div>
    <div class="not-found-text" v-else-if="props.cards.length === 0">
      <span> not found </span>
    </div>
    <div v-else class="card-main">
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
  isLoad: boolean;
  cards: Array<IMovieShortInfo>;
}>();
//
</script>

<style scoped>
.card-main {
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  justify-content: center;
  column-gap: 60px;
  row-gap: 60px;
  margin: 40px;
  flex-wrap: wrap;
  max-width: 100%;
  max-height: 100%;
  position: relative;
}

.not-found-text {
  margin-top: calc(100px + 1.5vw); /* Минимум 30px + 1.2% от ширины экрана */
  justify-self: center;
  font-size: calc(14px + 1.5vw); /* Минимум 16px + 1.5% от ширины экрана */
  color: var(--grey-4);
  position: absolute;
}
</style>
