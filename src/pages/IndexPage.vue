<template>
  <q-page>
    <q-input
      dense
      item-aligned
      borderless
      v-model="searchText"
      input-class="search-input"
      :debounce="1_000"
      placeholder="Search movie"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>

      <template #append>
        <q-btn flat v-if="searchText" class="cursor-pointer" @click="searchText = ''">
          <q-icon name="clear" />
        </q-btn>
      </template>
    </q-input>
    <CardMovieList :is-load="isLoadMovie" :cards="movieList" />
    <q-btn v-if="totalPage > 1" @click="backPage" label="back"></q-btn>
    <q-btn v-if="totalPage > 1" @click="nextPage" label="next"></q-btn>
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
const searchText = ref('');
const movieList = ref<IMovieShortInfo[]>([]);
const isLoadMovie = ref(false);
const currentPage = ref(1);
const totalPage = ref(1);
const itemOnPage = 10;

// Watch
watch(
  searchText,
  (newValue) => {
    void searchMovieByString(newValue); //
  },
  { immediate: true },
);

// Methods
async function searchMovieByString(id: string, page?: number) {
  isLoadMovie.value = true;
  return await api
    .searchMovieByString(id, page)
    .then((result) => {
      totalPage.value = Number(result.totalResults) / itemOnPage;
      movieList.value = result.Search;
    })
    .catch((error) => {
      if (error.cause === 'Movie not found!') {
        movieList.value = [];
        return;
      }
      console.warn(error.cause);
    })
    .finally(() => {
      isLoadMovie.value = false;
    });
}

function nextPage() {
  currentPage.value++;
  void searchMovieByString(searchText.value, currentPage.value);
}

function backPage() {
  currentPage.value--;
  void searchMovieByString(searchText.value, currentPage.value);
}
</script>

<style scoped>
/*  */
</style>
