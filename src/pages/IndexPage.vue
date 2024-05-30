<template>
  <q-page>
    <q-input
      class="search"
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

    <CardMovieList :is-load="isLoadMovie" :cards="movieList"> </CardMovieList>
    <PaginationOnPage
      v-if="movieList.length > 0 && !isLoadMovie"
      v-model="currentPage"
      :total-page
    />
    <!--  -->
  </q-page>
</template>

<script setup lang="ts">
import type { IMovieShortInfo } from 'src/entities/Movie';
import * as api from 'src/api/api';

// Components
import CardMovieList from 'src/components/CardMovieList.vue';
import PaginationOnPage from 'src/components/PaginationOnPage.vue';

// Data
const searchText = ref('');
const movieList = ref<IMovieShortInfo[]>([]);
const isLoadMovie = ref(false);
const totalPage = ref(1);
const itemOnPage = 10;
const currentPage = ref(1);

// Watch
watch(
  searchText,
  (newValue) => {
    void searchMovieByString(newValue); //
  },
  { immediate: true },
);

watch(currentPage, (newValue) => {
  void searchMovieByString(searchText.value, newValue);
});

// Methods
async function searchMovieByString(id: string, page?: number) {
  isLoadMovie.value = true;
  return await api
    .searchMovieByString(id, page)
    .then((result) => {
      totalPage.value = Math.ceil(Number(result.totalResults) / itemOnPage);
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
</script>

<style scoped>
/*  */
</style>
