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

    <CardMovieList :is-load="isLoadMovie" :cards="movieList"> </CardMovieList>
    <!--  -->
    <div v-if="movieList.length > 0 && !isLoadMovie" class="pagination">
      <q-btn flat v-if="totalPage > 1" @click="backPage">
        <q-icon name="arrow_back_ios" />
      </q-btn>
      <q-btn flat v-if="totalPage > 1" @click="nextPage">
        <q-icon name="arrow_forward_ios" />
      </q-btn>
    </div>
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
  if (currentPage.value > totalPage.value) {
    currentPage.value = 1;
  }
  void searchMovieByString(searchText.value, currentPage.value);
}

function backPage() {
  currentPage.value--;
  if (currentPage.value < 1) {
    currentPage.value = totalPage.value;
  }
  void searchMovieByString(searchText.value, currentPage.value);
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: calc(60% + 2vw); /* Минимум 60px + 2% от ширины экрана */
  align-items: start;
  margin-bottom: 40px;
  margin-left: 40px;
  margin-right: 40px;
}
</style>
