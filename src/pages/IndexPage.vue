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
        <q-btn flat v-if="searchText" class="clear-search" @click="searchText = ''">
          <q-icon name="clear" />
        </q-btn>
      </template>
    </q-input>

    <PaginationOnPage v-if="movieList.length > 0 && !isLoadMovie" v-model="lastPage" :total-page />
    <CardMovieList :is-load="isLoadMovie" :cards="movieList" />
    <div class="sentinel" ref="sentinel" />
  </q-page>
</template>

<script setup lang="ts">
import type { IMovieShortInfo } from 'src/entities/Movie';
import * as api from 'src/api/api';

// Components
import CardMovieList from 'src/components/CardMovieList.vue';
// import PaginationOnPage from 'src/components/PaginationOnPage.vue';
//

// Data
const searchText = ref('');
const movieList = ref<IMovieShortInfo[]>([]);
const isLoadMovie = ref(false);
const totalPage = ref(1);
const itemOnPage = 10;
const lastPage = ref(1);

// Watch
watch(
  searchText,
  (newValue) => {
    void searchMovieByString(newValue); //
  },
  { immediate: true },
);

watch(lastPage, (newValue) => {
  void searchMovieByString(searchText.value, newValue);
});

const sentinel = useTemplateRef('sentinel');

onMounted(() => {
  initializeObserver();
});

// Methods
async function searchMovieByString(id: string, page?: number) {
  // isLoadMovie.value = true;
  return await api
    .searchMovieByString(id, page)
    .then((result) => {
      totalPage.value = Math.ceil(Number(result.totalResults) / itemOnPage);
      // movieList.value = result.Search;
      movieList.value.push(...result.Search);
      console.log(movieList.value);
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

function initializeObserver() {
  const options: IntersectionObserverInit = {
    // root: null,
    rootMargin: '-25px 0px 45px 0px',
    threshold: 1,
  };

  if (sentinel.value) {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lastPage.value++;
          console.log(1);
        }
      });
    }, options);

    observer.observe(sentinel.value);
  }
}
</script>

<style scoped>
.clear-search {
  &:hover {
    color: var(--text-hover);
  }

  &:deep(.q-focus-helper) {
    display: none;
  }
}

/* .sentinel {
  width: 100%;
  height: 1px;
  visibility: hidden;
} */
</style>
