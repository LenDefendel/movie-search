<template>
  <q-page>
    <q-input
      dense
      item-aligned
      borderless
      v-model="text"
      input-class="search-input"
      :debounce="1_000"
      placeholder="Search movie"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>

      <template #append>
        <q-icon v-if="text" name="clear" class="cursor-pointer" @click="text = ''" />
      </template>
    </q-input>
    <CardMovieList :cards="movieList" />
  </q-page>
</template>

<script setup lang="ts">
// import { searchMovieByString } from 'src/api/api';
import type { IMovieShortInfo } from 'src/entities/Movie';
// import type { imdbID } from 'src/types';
import * as api from 'src/api/api';
import { ref, watch } from 'vue';

// Components
import CardMovieList from 'src/components/CardMovieList.vue';

// Data
const text = ref('');
const movieList = ref<IMovieShortInfo[]>([]);

// Watch
watch(
  text,
  (newValue) => {
    void searchMovieByString(newValue); //
  },
  { immediate: true },
);

// Hooks
// onMounted(() => {
//   void searchMovieByString("");
// });

// Methods
async function searchMovieByString(id: string) {
  return await api
    .searchMovieByString(id)
    .then((result) => {
      movieList.value = result.Search;
    })
    .catch((error) => {
      console.warn(error);
    });
}
</script>

<style scoped>
/*  */
</style>
